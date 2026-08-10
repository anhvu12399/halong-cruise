<?php
/**
 * Plugin Name: Ha Long Travel Guides (Add-on)
 * Description: Adds a "Travel Guides" article post type to the Ha Long Cruise CMS,
 *              matching the Next.js /guides feature. Ships as a separate plugin
 *              on purpose — it only adds a new post type, so activating it can't
 *              touch anything the main "Ha Long Cruise CMS" plugin already does.
 * Version: 1.0.0
 * Requires Plugins: advanced-custom-fields
 *
 * INSTALL
 *   1. Keep your existing "Ha Long Cruise CMS" plugin exactly as it is.
 *   2. Upload this file as its own plugin (Plugins → Add New → Upload Plugin),
 *      or drop it in wp-content/plugins/halong-travel-guides/ and activate it.
 *   3. A new "Travel Guides" item appears in the sidebar. Write guides there
 *      like a normal blog post (title + body in the main editor) and fill in
 *      the "Guide Details" box below it (excerpt, cover image URL, region,
 *      read time, related cruises).
 *   4. Nothing to change on the Next.js side — /guides and /guides/[slug]
 *      already read from /wp-json/wp/v2/guides once WORDPRESS_URL is set.
 */

if (!defined('ABSPATH')) exit;

add_action('admin_notices', function () {
    if (function_exists('acf_add_local_field_group')) return;
    echo '<div class="notice notice-error"><p><strong>Ha Long Travel Guides:</strong> Install and activate the free <a href="' . esc_url(admin_url('plugin-install.php?s=Advanced%20Custom%20Fields&tab=search&type=term')) . '">Advanced Custom Fields (ACF)</a> plugin — it\'s the same one the Cruise CMS plugin needs, so you likely have it already.</p></div>';
});

/* ------------------------------------------------------------------ */
/* 1. Post type — body uses the normal WordPress editor (Gutenberg or */
/*    classic), exactly like writing a blog post.                     */
/* ------------------------------------------------------------------ */
add_action('init', function () {
    register_post_type('guide', [
        'labels' => [
            'name' => 'Travel Guides',
            'singular_name' => 'Guide',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Guide',
            'edit_item' => 'Edit Guide',
            'new_item' => 'New Guide',
            'all_items' => 'All Guides',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'guides',
        'menu_icon' => 'dashicons-book-alt',
        'supports' => ['title', 'editor', 'thumbnail', 'revisions'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'guides'],
    ]);
});

/* ------------------------------------------------------------------ */
/* 2. Guide Details — same "direct URL" convention as the Cruise CMS. */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_halong_guide_v1',
        'title' => 'Guide Details',
        'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'guide']]],
        'fields' => [
            ['key' => 'field_guide_excerpt', 'name' => 'excerpt', 'label' => 'Excerpt', 'type' => 'textarea', 'rows' => 2,
                'instructions' => 'One or two sentences — shown on guide cards and the homepage teaser.'],
            ['key' => 'field_guide_cover_url', 'name' => 'cover_image_url', 'label' => 'Cover Image URL', 'type' => 'url',
                'instructions' => 'Paste the full image URL. A live preview is shown below the field, same as the Cruise CMS image fields.'],
            ['key' => 'field_guide_region', 'name' => 'region', 'label' => 'Region (optional)', 'type' => 'select',
                'allow_null' => 1, 'choices' => [
                    'Ha Long Bay' => 'Ha Long Bay',
                    'Lan Ha Bay' => 'Lan Ha Bay',
                    'Bai Tu Long Bay' => 'Bai Tu Long Bay',
                    'Ha Long Bay & Lan Ha Bay' => 'Ha Long Bay & Lan Ha Bay',
                ]],
            ['key' => 'field_guide_read', 'name' => 'read_minutes', 'label' => 'Read Time (minutes)', 'type' => 'number', 'default_value' => 5],
            ['key' => 'field_guide_related', 'name' => 'related', 'label' => 'Related Cruises', 'type' => 'relationship',
                'post_type' => ['cruise'], 'return_format' => 'object', 'filters' => ['search'],
                'instructions' => 'Cruises to recommend at the bottom of this guide.'],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 3. Admin polish to match the Cruise CMS list screens.               */
/* ------------------------------------------------------------------ */
function halong_guide_field($name, $post_id) {
    return function_exists('get_field') ? get_field($name, $post_id) : get_post_meta($post_id, $name, true);
}

function halong_guide_frontend_base_url() {
    // Reuses the Cruise CMS's saved "Frontend Website URL" setting if present,
    // so both plugins point at the same Next.js deployment automatically.
    $url = trim((string) get_option('frontend_site_url', ''));
    return $url ? untrailingslashit($url) : 'https://halong-cruise.vercel.app';
}

function halong_guide_frontend_url($post_id) {
    return halong_guide_frontend_base_url() . '/guides/' . get_post_field('post_name', $post_id);
}

add_filter('manage_guide_posts_columns', function ($columns) {
    return [
        'cb' => $columns['cb'],
        'halong_guide_image' => 'Cover',
        'title' => 'Title',
        'halong_guide_region' => 'Region',
        'halong_guide_read' => 'Read Time',
        'halong_guide_frontend' => 'Frontend',
        'date' => $columns['date'] ?? 'Date',
    ];
});

add_action('manage_guide_posts_custom_column', function ($column, $post_id) {
    if ($column === 'halong_guide_image') {
        $image = halong_guide_field('cover_image_url', $post_id) ?: get_the_post_thumbnail_url($post_id, 'thumbnail');
        echo $image ? '<img src="' . esc_url($image) . '" alt="" style="width:72px;height:48px;object-fit:cover;border-radius:5px">' : '<span aria-hidden="true">—</span>';
    } elseif ($column === 'halong_guide_region') {
        echo esc_html(halong_guide_field('region', $post_id) ?: '—');
    } elseif ($column === 'halong_guide_read') {
        $minutes = halong_guide_field('read_minutes', $post_id);
        echo $minutes ? esc_html($minutes . ' min') : '—';
    } elseif ($column === 'halong_guide_frontend') {
        echo '<a class="button button-small" target="_blank" rel="noopener" href="' . esc_url(halong_guide_frontend_url($post_id)) . '">View Frontend ↗</a>';
    }
}, 10, 2);

add_filter('post_row_actions', function ($actions, $post) {
    if ($post->post_type === 'guide') {
        $actions['halong_guide_frontend'] = '<a target="_blank" rel="noopener" href="' . esc_url(halong_guide_frontend_url($post->ID)) . '">View Frontend</a>';
    }
    return $actions;
}, 10, 2);

add_action('post_submitbox_misc_actions', function ($post) {
    if (!$post || $post->post_type !== 'guide' || !$post->ID) return;
    echo '<div class="misc-pub-section"><span class="dashicons dashicons-external" style="margin-right:6px"></span><a target="_blank" rel="noopener" href="' . esc_url(halong_guide_frontend_url($post->ID)) . '"><strong>View this guide on frontend</strong></a></div>';
});

add_action('admin_head-edit.php', function () {
    $screen = function_exists('get_current_screen') ? get_current_screen() : null;
    if ($screen && $screen->post_type === 'guide') echo '<style>.column-halong_guide_image{width:88px}.column-halong_guide_region,.column-halong_guide_read{width:110px}.column-halong_guide_frontend{width:135px}</style>';
});

/* Reuse the Cruise CMS's live image-URL preview script if that plugin is
   active (it hooks admin_footer for post types 'cruise', 'tour_collection',
   'homepage_content', 'frontend_page'); this just adds 'guide' the same way
   in case the Cruise CMS version installed hasn't been updated to include it. */
add_action('admin_footer', function () {
    if (!function_exists('get_current_screen')) return;
    $screen = get_current_screen();
    if (!$screen || $screen->post_type !== 'guide') return;
    ?>
    <script>
    (function () {
      function preview(input) {
        var value = (input.value || '').trim();
        var old = input.parentNode.querySelector(':scope > .halong-guide-image-preview');
        if (!/^https?:\/\//i.test(value)) { if (old) old.remove(); return; }
        var image = old || document.createElement('img');
        image.className = 'halong-guide-image-preview';
        image.style.cssText = 'display:block;max-width:240px;max-height:150px;margin-top:8px;border:1px solid #c3c4c7;border-radius:8px;background:#fff;object-fit:contain;padding:4px';
        image.onerror = function () { this.style.display = 'none'; };
        image.onload = function () { this.style.display = 'block'; };
        image.src = value;
        if (!old) input.insertAdjacentElement('afterend', image);
      }
      function scan() {
        document.querySelectorAll('.acf-field[data-name="cover_image_url"] input[type="url"], .acf-field[data-name="cover_image_url"] input[type="text"]').forEach(preview);
      }
      document.addEventListener('input', function (e) { if (e.target.matches('input[type="url"],input[type="text"]')) preview(e.target); });
      document.addEventListener('DOMContentLoaded', scan);
      setTimeout(scan, 500);
    })();
    </script>
    <?php
});
