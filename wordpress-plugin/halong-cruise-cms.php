<?php
/**
 * Plugin Name: Ha Long Cruise CMS
 * Description: Headless content backend for the Ha Long Bay Cruises Next.js site.
 *              Registers the "Cruise" post type + the exact fields the frontend
 *              expects, and exposes them at /wp-json/wp/v2/cruises. Also stores
 *              inquiry-form submissions from the site.
 * Version: 1.0.0
 * Requires Plugins: advanced-custom-fields
 *
 * SETUP (see ../SETUP-WORDPRESS.md for the full walkthrough):
 *   1. Install & activate the free "Advanced Custom Fields" plugin.
 *   2. Upload this file as a plugin (or drop it in wp-content/plugins/halong-cruise-cms/
 *      as halong-cruise-cms.php) and activate it.
 *   3. Go to Cruises in the WP admin sidebar and start editing — every field
 *      below shows up automatically in a clean editing screen.
 *   4. Set WORDPRESS_URL in the Next.js project's .env.local to this site's URL.
 */

if (!defined('ABSPATH')) exit;

/* ------------------------------------------------------------------ */
/* 1. Custom Post Type: Cruise                                        */
/* ------------------------------------------------------------------ */
add_action('init', function () {
    register_post_type('cruise', [
        'label' => 'Cruises',
        'labels' => [
            'name' => 'Cruises',
            'singular_name' => 'Cruise',
            'add_new_item' => 'Add New Cruise',
            'edit_item' => 'Edit Cruise',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'cruises',
        'menu_icon' => 'dashicons-palmtree',
        'supports' => ['title', 'thumbnail'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'cruises'],
    ]);
});

/* ------------------------------------------------------------------ */
/* 2. ACF field groups — mirror src/lib/types.ts exactly.             */
/*    Editors never see PHP; this just pre-wires the admin UI.        */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_cruise',
        'title' => 'Cruise details',
        'show_in_rest' => 1, // exposes all fields below under the "acf" key in the REST response
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'cruise']]],
        'fields' => [
            ['key' => 'field_tagline', 'name' => 'tagline', 'label' => 'Tagline', 'type' => 'text',
                'instructions' => 'One sentence, shown under the ship name on the hero.'],
            ['key' => 'field_region', 'name' => 'region', 'label' => 'Region', 'type' => 'select',
                'choices' => ['Ha Long Bay' => 'Ha Long Bay', 'Lan Ha Bay' => 'Lan Ha Bay',
                    'Ha Long Bay & Lan Ha Bay' => 'Ha Long Bay & Lan Ha Bay', 'Bai Tu Long Bay' => 'Bai Tu Long Bay']],
            ['key' => 'field_breadcrumb', 'name' => 'breadcrumb_label', 'label' => 'Display name (breadcrumb / cards)', 'type' => 'text'],
            ['key' => 'field_days', 'name' => 'duration_days', 'label' => 'Duration — days', 'type' => 'number', 'required' => 1],
            ['key' => 'field_nights', 'name' => 'duration_nights', 'label' => 'Duration — nights', 'type' => 'number', 'required' => 1],
            ['key' => 'field_guests', 'name' => 'guests_max', 'label' => 'Max guests', 'type' => 'number'],
            ['key' => 'field_cabin_count', 'name' => 'cabin_count', 'label' => 'Total cabins', 'type' => 'number'],
            ['key' => 'field_price', 'name' => 'starting_price', 'label' => 'Starting price (USD, per person)', 'type' => 'number',
                'instructions' => 'Leave blank to show "Price on request".'],

            ['key' => 'field_overview', 'name' => 'overview', 'label' => 'Overview', 'type' => 'textarea',
                'instructions' => 'One paragraph per line. Each line becomes a <p>.', 'rows' => 6],
            ['key' => 'field_life', 'name' => 'life_on_board', 'label' => 'Life on board', 'type' => 'textarea',
                'instructions' => 'One paragraph per line.', 'rows' => 6],
            ['key' => 'field_highlights', 'name' => 'highlights', 'label' => 'Highlights', 'type' => 'textarea',
                'instructions' => 'One bullet per line.', 'rows' => 4],
            ['key' => 'field_tags', 'name' => 'tags', 'label' => 'Category tags', 'type' => 'textarea',
                'instructions' => 'One per line. Used by the homepage category tiles — recognized values: luxury, deluxe, budget, newest, best, honeymoon, family, group.',
                'rows' => 3],

            ['key' => 'field_gallery', 'name' => 'gallery', 'label' => 'Gallery', 'type' => 'gallery',
                'return_format' => 'array', 'preview_size' => 'medium'],

            ['key' => 'field_itinerary', 'name' => 'itinerary', 'label' => 'Itinerary', 'type' => 'repeater',
                'instructions' => 'Add one row per day, in order.',
                'button_label' => 'Add day',
                'sub_fields' => [
                    ['key' => 'field_it_title', 'name' => 'title', 'label' => 'Day title', 'type' => 'text'],
                    ['key' => 'field_it_location', 'name' => 'location', 'label' => 'Location', 'type' => 'text'],
                    ['key' => 'field_it_image', 'name' => 'image', 'label' => 'Image', 'type' => 'image', 'return_format' => 'array'],
                    ['key' => 'field_it_am', 'name' => 'am', 'label' => 'Morning (AM)', 'type' => 'textarea', 'rows' => 3],
                    ['key' => 'field_it_pm', 'name' => 'pm', 'label' => 'Afternoon (PM)', 'type' => 'textarea', 'rows' => 3],
                    ['key' => 'field_it_eve', 'name' => 'eve', 'label' => 'Evening', 'type' => 'textarea', 'rows' => 3],
                ]],

            ['key' => 'field_social', 'name' => 'social_areas', 'label' => 'Social areas', 'type' => 'repeater',
                'instructions' => 'Restaurant, sundeck, spa, bar, etc.',
                'button_label' => 'Add area',
                'sub_fields' => [
                    ['key' => 'field_sa_name', 'name' => 'name', 'label' => 'Name', 'type' => 'text'],
                    ['key' => 'field_sa_image', 'name' => 'image', 'label' => 'Image', 'type' => 'image', 'return_format' => 'array'],
                ]],

            ['key' => 'field_cabins', 'name' => 'cabins', 'label' => 'Cabin categories', 'type' => 'repeater',
                'button_label' => 'Add cabin category',
                'sub_fields' => [
                    ['key' => 'field_cb_name', 'name' => 'name', 'label' => 'Category name', 'type' => 'text'],
                    ['key' => 'field_cb_count', 'name' => 'cabin_count', 'label' => 'Number of cabins', 'type' => 'number'],
                    ['key' => 'field_cb_guests', 'name' => 'guests', 'label' => 'Guests (e.g. "2–3")', 'type' => 'text'],
                    ['key' => 'field_cb_size', 'name' => 'size', 'label' => 'Size (e.g. "20 m² / 215 ft²")', 'type' => 'text'],
                    ['key' => 'field_cb_beds', 'name' => 'beds', 'label' => 'Beds', 'type' => 'text'],
                    ['key' => 'field_cb_desc', 'name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 4],
                    ['key' => 'field_cb_image', 'name' => 'image', 'label' => 'Main Room Image', 'type' => 'image', 'return_format' => 'array'],
                    ['key' => 'field_cb_gallery', 'name' => 'gallery_images', 'label' => 'Room Photo Gallery', 'type' => 'gallery', 'return_format' => 'array', 'preview_size' => 'medium'],
                ]],

            ['key' => 'field_features', 'name' => 'features', 'label' => 'Features', 'type' => 'textarea',
                'instructions' => 'One per line, e.g. "Air conditioning".', 'rows' => 4],
            ['key' => 'field_equipment', 'name' => 'equipment', 'label' => 'Equipment', 'type' => 'textarea',
                'instructions' => 'One per line, e.g. "Kayaks".', 'rows' => 4],
            ['key' => 'field_deckplan', 'name' => 'deck_plan', 'label' => 'Deck plan image', 'type' => 'image', 'return_format' => 'array'],

            ['key' => 'field_related', 'name' => 'related', 'label' => 'Related cruises', 'type' => 'relationship',
                'post_type' => ['cruise'], 'return_format' => 'object',
                'instructions' => 'Pick 2–3 other cruises to show at the bottom of this page.'],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 3. Inquiry storage: a private CPT + the REST endpoint the site     */
/*    posts to from src/app/api/inquiry/route.ts.                     */
/* ------------------------------------------------------------------ */
add_action('init', function () {
    register_post_type('inquiry', [
        'label' => 'Inquiries',
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email',
        'supports' => ['title'],
        'capability_type' => 'post',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('halong/v1', '/inquiries', [
        'methods' => 'POST',
        'permission_callback' => '__return_true', // public write endpoint — see SETUP-WORDPRESS.md for rate-limiting notes
        'callback' => function (WP_REST_Request $req) {
            $data = $req->get_json_params();
            if (empty($data['name']) || empty($data['email'])) {
                return new WP_Error('missing_fields', 'Name and email are required.', ['status' => 400]);
            }

            $post_id = wp_insert_post([
                'post_type' => 'inquiry',
                'post_title' => sanitize_text_field($data['name']) . ' — ' . sanitize_email($data['email']),
                'post_status' => 'private',
                'meta_input' => [
                    'email' => sanitize_email($data['email'] ?? ''),
                    'phone' => sanitize_text_field($data['phone'] ?? ''),
                    'cruise' => sanitize_text_field($data['cruise'] ?? ''),
                    'dates' => sanitize_text_field($data['dates'] ?? ''),
                    'guests' => sanitize_text_field($data['guests'] ?? ''),
                    'message' => sanitize_textarea_field($data['message'] ?? ''),
                ],
            ]);

            $notify = get_option('admin_email');
            if ($notify) {
                wp_mail(
                    $notify,
                    'New cruise inquiry — ' . sanitize_text_field($data['name']),
                    "Name: {$data['name']}\nEmail: {$data['email']}\nPhone: " . ($data['phone'] ?? '-') .
                    "\nCruise: " . ($data['cruise'] ?? '-') . "\nDates: " . ($data['dates'] ?? '-') .
                    "\nGuests: " . ($data['guests'] ?? '-') . "\n\nMessage:\n" . ($data['message'] ?? '-')
                );
            }

            return ['ok' => true, 'id' => $post_id];
        },
    ]);
});
