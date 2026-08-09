<?php
/**
 * Plugin Name: Ha Long Cruise CMS
 * Description: Complete headless CMS for the Ha Long Bay Cruises Next.js website. Includes ACF Free repeater support, direct image URLs, navigation, branding, cruises, tours, and frontend pages.
 * Version: 6.0.0
 * Author: Ha Long Best Cruises
 */

if (!defined('ABSPATH')) exit;

/* ------------------------------------------------------------------ */
/* ACF Free compatibility: lightweight Repeater field                 */
/* ------------------------------------------------------------------ */
add_action('acf/include_field_types', function () {
    if (!class_exists('acf_field') || acf_get_field_type('repeater')) return;

    class Halong_ACF_Free_Repeater extends acf_field {
        public function __construct() {
            $this->name = 'repeater';
            $this->label = 'Repeater (Ha Long CMS / ACF Free)';
            $this->category = 'layout';
            $this->defaults = ['sub_fields' => [], 'button_label' => 'Add Row'];
            parent::__construct();
        }

        private function render_input($name, $sub, $value = '') {
            $type = $sub['type'] ?? 'text';
            $label = esc_html($sub['label'] ?? $sub['name'] ?? 'Field');
            if ($type === 'textarea' || $type === 'wysiwyg' || $type === 'repeater') {
                if ($type === 'repeater' && is_array($value)) {
                    $urls = [];
                    foreach ($value as $item) $urls[] = is_array($item) ? ($item['image_url'] ?? reset($item)) : $item;
                    $value = implode("\n", array_filter($urls));
                }
                echo '<label class="halong-cell-label">' . $label . '</label>';
                echo '<textarea name="' . esc_attr($name) . '" rows="3">' . esc_textarea((string) $value) . '</textarea>';
                return;
            }
            if ($type === 'select') {
                echo '<label class="halong-cell-label">' . $label . '</label><select name="' . esc_attr($name) . '">';
                foreach (($sub['choices'] ?? []) as $option_value => $option_label) {
                    echo '<option value="' . esc_attr($option_value) . '" ' . selected($value, $option_value, false) . '>' . esc_html($option_label) . '</option>';
                }
                echo '</select>';
                return;
            }
            $html_type = in_array($type, ['url', 'email', 'number'], true) ? $type : 'text';
            echo '<label class="halong-cell-label">' . $label . '</label>';
            echo '<input type="' . esc_attr($html_type) . '" name="' . esc_attr($name) . '" value="' . esc_attr(is_scalar($value) ? $value : '') . '">';
        }

        public function render_field($field) {
            $rows = is_array($field['value']) ? $field['value'] : [];
            $sub_fields = is_array($field['sub_fields'] ?? null) ? $field['sub_fields'] : [];
            echo '<div class="halong-free-repeater" data-name="' . esc_attr($field['name']) . '">';
            echo '<div class="halong-repeater-rows">';
            foreach ($rows as $index => $row) $this->render_row($field['name'], $sub_fields, $row, $index);
            echo '</div>';
            echo '<template class="halong-repeater-template">';
            $this->render_row($field['name'], $sub_fields, [], '__INDEX__');
            echo '</template>';
            echo '<button type="button" class="button halong-add-row">' . esc_html($field['button_label'] ?: 'Add Row') . '</button>';
            echo '</div>';
        }

        private function render_row($base_name, $sub_fields, $row, $index) {
            echo '<div class="halong-repeater-row">';
            echo '<span class="halong-drag" title="Row order">⋮⋮</span><div class="halong-repeater-grid">';
            foreach ($sub_fields as $sub) {
                $sub_name = $sub['name'] ?? $sub['key'];
                echo '<div class="halong-repeater-cell">';
                $this->render_input($base_name . '[' . $index . '][' . $sub_name . ']', $sub, $row[$sub_name] ?? '');
                echo '</div>';
            }
            echo '</div><div class="halong-row-actions"><button type="button" class="button halong-move-up" title="Move up">↑</button><button type="button" class="button halong-move-down" title="Move down">↓</button><button type="button" class="button-link-delete halong-remove-row">Remove</button></div></div>';
        }

        public function update_value($value, $post_id, $field) {
            if (!is_array($value)) return [];
            return array_values(array_filter($value, function ($row) {
                if (!is_array($row)) return false;
                foreach ($row as $cell) if ($cell !== '' && $cell !== null && $cell !== []) return true;
                return false;
            }));
        }

        public function format_value($value, $post_id, $field) {
            if (!is_array($value)) return [];
            foreach ($value as &$row) {
                if (!is_array($row)) continue;
                foreach (($field['sub_fields'] ?? []) as $sub) {
                    $name = $sub['name'] ?? $sub['key'];
                    if (($sub['type'] ?? '') === 'repeater' && is_string($row[$name] ?? null)) {
                        $row[$name] = array_values(array_filter(array_map(function ($url) { return ['image_url' => trim($url)]; }, preg_split('/\r\n|\r|\n/', $row[$name]))));
                    }
                }
            }
            return $value;
        }
    }

    new Halong_ACF_Free_Repeater();
}, 5);

add_action('acf/input/admin_footer', function () {
    ?>
    <style>
        .halong-free-repeater{border:1px solid #ccd0d4;padding:12px;background:#f6f7f7}.halong-repeater-row{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1px solid #dcdcde;padding:12px;margin-bottom:10px}.halong-repeater-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px;flex:1}.halong-repeater-cell input,.halong-repeater-cell textarea,.halong-repeater-cell select{width:100%}.halong-cell-label{display:block;font-weight:600;margin-bottom:4px}.halong-drag{color:#8c8f94;font-size:18px}.halong-add-row{margin-top:4px}.halong-row-actions{display:flex;flex-direction:column;gap:6px;align-items:center}.halong-row-actions .button{min-width:32px;padding:0}
    </style>
    <script>
    (function(){
      function init(root){
        if(root.dataset.halongReady) return; root.dataset.halongReady='1';
        var rows=root.querySelector('.halong-repeater-rows'), template=root.querySelector('.halong-repeater-template');
        root.querySelector('.halong-add-row').addEventListener('click',function(){
          var index=rows.children.length, html=template.innerHTML.replaceAll('__INDEX__',index); rows.insertAdjacentHTML('beforeend',html);
        });
        root.addEventListener('click',function(e){
          var row=e.target.closest('.halong-repeater-row'); if(!row) return;
          if(e.target.classList.contains('halong-remove-row')) row.remove();
          if(e.target.classList.contains('halong-move-up') && row.previousElementSibling) rows.insertBefore(row,row.previousElementSibling);
          if(e.target.classList.contains('halong-move-down') && row.nextElementSibling) rows.insertBefore(row.nextElementSibling,row);
        });
      }
      function scan(){document.querySelectorAll('.halong-free-repeater').forEach(init)}
      document.addEventListener('DOMContentLoaded',scan); document.addEventListener('acf/setup_fields',scan); scan();
    })();
    </script>
    <?php
});

/* Live previews for direct image URLs, including the website logo. */
add_action('admin_footer', function () {
    if (!function_exists('get_current_screen')) return;
    $screen = get_current_screen();
    if (!$screen || !in_array($screen->post_type, ['cruise', 'tour_collection', 'homepage_content', 'frontend_page'], true)) return;
    ?>
    <style>
      .halong-image-preview{display:block;max-width:240px;max-height:150px;margin-top:8px;border:1px solid #c3c4c7;border-radius:8px;background:#fff;object-fit:contain;padding:4px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
      .halong-image-preview.is-logo{max-height:80px;background:#102f31}
    </style>
    <script>
    (function(){
      function looksLikeImageField(input){
        var name=(input.name||'').toLowerCase(), field=input.closest('.acf-field'), label=field?field.textContent.toLowerCase():'';
        return name.includes('image')||name.includes('logo')||name.includes('gallery')||label.includes('image url')||label.includes('logo');
      }
      function preview(input){
        if(!looksLikeImageField(input)) return;
        var value=(input.value||'').trim(), old=input.parentNode.querySelector(':scope > .halong-image-preview');
        if(!/^https?:\/\//i.test(value)){if(old) old.remove();return;}
        var image=old||document.createElement('img');
        image.className='halong-image-preview'+((input.name||'').toLowerCase().includes('logo')?' is-logo':'');
        image.alt='Image preview'; image.onerror=function(){this.style.display='none'}; image.onload=function(){this.style.display='block'};
        image.src=value; if(!old) input.insertAdjacentElement('afterend',image);
      }
      function scan(){document.querySelectorAll('.acf-field input[type="url"],.acf-field input[type="text"],.halong-free-repeater input[type="url"]').forEach(preview)}
      document.addEventListener('input',function(e){if(e.target.matches('input[type="url"],input[type="text"]')) preview(e.target)});
      document.addEventListener('change',function(e){if(e.target.matches('input[type="url"],input[type="text"]')) preview(e.target)});
      document.addEventListener('DOMContentLoaded',scan); setTimeout(scan,500); setTimeout(scan,1500);
    })();
    </script>
    <?php
});

/* ------------------------------------------------------------------ */
/* 1. Custom Post Types                                               */
/* ------------------------------------------------------------------ */
add_action('init', function () {
    register_post_type('cruise', [
        'label' => 'Cruises',
        'labels' => [
            'name' => 'Cruises',
            'singular_name' => 'Cruise',
            'add_new' => 'Add New',
            'add_new_item' => 'Add New Cruise',
            'edit_item' => 'Edit Cruise',
            'new_item' => 'New Cruise',
            'all_items' => 'All Cruises',
        ],
        'public' => true,
        'show_in_rest' => true,
        'rest_base' => 'cruises',
        'menu_icon' => 'dashicons-palmtree',
        'supports' => ['title', 'thumbnail', 'editor', 'revisions'],
        'has_archive' => false,
        'rewrite' => ['slug' => 'cruises'],
    ]);

    register_post_type('inquiry', [
        'label' => 'Inquiries',
        'labels' => [
            'name' => 'Inquiries',
            'singular_name' => 'Inquiry',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title', 'editor'],
    ]);

    register_post_type('tour_collection', [
        'labels' => ['name' => 'Tour Collections', 'singular_name' => 'Tour Collection', 'add_new_item' => 'Add Tour Collection', 'edit_item' => 'Edit Tour Collection'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'tour-collections',
        'menu_icon' => 'dashicons-location-alt', 'supports' => ['title', 'revisions'],
        'rewrite' => ['slug' => 'tour-collections'],
    ]);

    register_post_type('homepage_content', [
        'labels' => ['name' => 'Homepage & Global', 'singular_name' => 'Homepage Settings', 'add_new_item' => 'Add Homepage Settings', 'edit_item' => 'Edit Homepage Settings'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'homepage-content',
        'menu_icon' => 'dashicons-admin-home', 'supports' => ['title', 'revisions'],
        'rewrite' => false,
    ]);

    register_post_type('frontend_page', [
        'labels' => ['name' => 'Frontend Pages', 'singular_name' => 'Frontend Page', 'add_new_item' => 'Add Frontend Page', 'edit_item' => 'Edit Frontend Page'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'frontend-pages',
        'menu_icon' => 'dashicons-layout', 'supports' => ['title', 'editor', 'revisions'],
        'rewrite' => false,
    ]);
});

/* ------------------------------------------------------------------ */
/* 2. Quick Website Settings (compatible with ACF Free and ACF PRO)  */
/* ------------------------------------------------------------------ */
add_action('admin_menu', function () {
    add_menu_page(
        'Website Quick Settings',
        'Website Settings',
        'edit_posts',
        'site-homepage-settings',
        'render_halong_cms_homepage_settings',
        'dashicons-admin-home',
        6
    );
});

function render_halong_cms_homepage_settings() {
    if (isset($_POST['save_halong_options'])) {
        check_admin_referer('halong_options_verify');
        $fields = [
            'home_hero_title', 'home_hero_subtitle', 'home_hero_image',
            'site_whatsapp', 'site_email', 'tour_day_title',
            'tour_2d1n_title', 'tour_3d2n_title', 'tour_halong_title',
            'tour_lanha_title', 'tour_baitulong_title'
        ];
        foreach ($fields as $field) {
            if (isset($_POST[$field])) {
                update_option($field, sanitize_text_field($_POST[$field]));
            }
        }
        echo '<div class="notice notice-success is-dismissible"><p><strong>Website settings saved successfully.</strong></p></div>';
    }

    $hero_title = get_option('home_hero_title', 'Every budget. Every travel style. One bay you\'ll never forget.');
    $hero_sub   = get_option('home_hero_subtitle', '64 handpicked cruises — day trips to 3-night voyages — across Ha Long, Lan Ha & Bai Tu Long Bay.');
    $hero_img   = get_option('home_hero_image', 'https://www.halongbestcruises.com/wp-content/uploads/2026/08/cruise-ship-heritage-cruise-binh-chuan-2-336163417-1.jpg');
    $whatsapp   = get_option('site_whatsapp', '+84905999888');
    $email      = get_option('site_email', 'hello@halongbestcruises.com');
    
    $tour_day   = get_option('tour_day_title', 'Ha Long Bay Day Cruises');
    $tour_2d1n  = get_option('tour_2d1n_title', '2 Day 1 Night Ha Long Bay Cruises');
    $tour_3d2n  = get_option('tour_3d2n_title', '3 Day 2 Night Ha Long Bay Cruises');
    $tour_hl    = get_option('tour_halong_title', 'Ha Long Bay Cruises');
    $tour_lh    = get_option('tour_lanha_title', 'Lan Ha Bay Cruises');
    $tour_btl   = get_option('tour_baitulong_title', 'Bai Tu Long Bay Cruises');
    ?>
    <div class="wrap">
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 20px;">Website Quick Settings</h1>
        <form method="post" action="">
            <?php wp_nonce_field('halong_options_verify'); ?>
            <div style="background: #fff; padding: 25px; border-radius: 8px; border: 1px solid #ccd0d4; max-w: 900px;">
                <h2 style="font-size: 18px; border-bottom: 2px solid #2271b1; padding-bottom: 8px; margin-top: 0;">1. Homepage Hero</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="home_hero_title">Main Hero Title (H1)</label></th>
                        <td><input name="home_hero_title" type="text" id="home_hero_title" value="<?php echo esc_attr($hero_title); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="home_hero_subtitle">Hero Subtitle</label></th>
                        <td><textarea name="home_hero_subtitle" id="home_hero_subtitle" rows="3" class="large-text" style="width: 100%;"><?php echo esc_textarea($hero_sub); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="home_hero_image">Hero Background Image URL</label></th>
                        <td><input name="home_hero_image" type="text" id="home_hero_image" value="<?php echo esc_attr($hero_img); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="site_whatsapp">WhatsApp Number</label></th>
                        <td><input name="site_whatsapp" type="text" id="site_whatsapp" value="<?php echo esc_attr($whatsapp); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="site_email">Contact Email</label></th>
                        <td><input name="site_email" type="text" id="site_email" value="<?php echo esc_attr($email); ?>" class="regular-text"></td>
                    </tr>
                </table>

                <h2 style="font-size: 18px; border-bottom: 2px solid #2271b1; padding-bottom: 8px; margin-top: 30px;">2. Tour and Destination Page Titles</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="tour_day_title">Day Cruises Page</label></th>
                        <td><input name="tour_day_title" type="text" id="tour_day_title" value="<?php echo esc_attr($tour_day); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_2d1n_title">2 Days / 1 Night Page</label></th>
                        <td><input name="tour_2d1n_title" type="text" id="tour_2d1n_title" value="<?php echo esc_attr($tour_2d1n); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_3d2n_title">3 Days / 2 Nights Page</label></th>
                        <td><input name="tour_3d2n_title" type="text" id="tour_3d2n_title" value="<?php echo esc_attr($tour_3d2n); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_halong_title">Ha Long Bay Page</label></th>
                        <td><input name="tour_halong_title" type="text" id="tour_halong_title" value="<?php echo esc_attr($tour_hl); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_lanha_title">Lan Ha Bay Page</label></th>
                        <td><input name="tour_lanha_title" type="text" id="tour_lanha_title" value="<?php echo esc_attr($tour_lh); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_baitulong_title">Bai Tu Long Bay Page</label></th>
                        <td><input name="tour_baitulong_title" type="text" id="tour_baitulong_title" value="<?php echo esc_attr($tour_btl); ?>" class="regular-text"></td>
                    </tr>
                </table>

                <p class="submit" style="margin-top: 25px;">
                    <input type="submit" name="save_halong_options" id="submit" class="button button-primary button-large" value="Save Website Settings">
                </p>
            </div>
        </form>
    </div>
    <?php
}

/* ------------------------------------------------------------------ */
/* 3. Cruise Fields                                                   */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_cruise_cms',
        'title' => 'Cruise Details',
        'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'cruise']]],
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'fields' => [

            /* TAB 1: GENERAL */
            ['key' => 'tab_general', 'label' => 'General & Pricing', 'type' => 'tab'],
            ['key' => 'field_tagline', 'name' => 'tagline', 'label' => 'Tagline', 'type' => 'text',
                'instructions' => 'A short sentence displayed below the cruise name on the hero banner.'],
            ['key' => 'field_breadcrumb', 'name' => 'breadcrumb_label', 'label' => 'Display Name', 'type' => 'text',
                'instructions' => 'Optional display name used in breadcrumbs and cruise cards.'],
            ['key' => 'field_region', 'name' => 'region', 'label' => 'Cruising Region', 'type' => 'select',
                'choices' => ['Ha Long Bay' => 'Ha Long Bay', 'Lan Ha Bay' => 'Lan Ha Bay', 'Bai Tu Long Bay' => 'Bai Tu Long Bay', 'Ha Long Bay & Lan Ha Bay' => 'Ha Long Bay & Lan Ha Bay']],
            ['key' => 'field_price', 'name' => 'starting_price', 'label' => 'Starting Price (USD per guest)', 'type' => 'number',
                'instructions' => 'Leave blank to display "Price on request".'],
            ['key' => 'field_days', 'name' => 'duration_days', 'label' => 'Duration — Days', 'type' => 'number', 'default_value' => 2],
            ['key' => 'field_nights', 'name' => 'duration_nights', 'label' => 'Duration — Nights', 'type' => 'number', 'default_value' => 1],
            ['key' => 'field_cabin_count', 'name' => 'cabin_count', 'label' => 'Total Cabins', 'type' => 'number'],
            ['key' => 'field_guests', 'name' => 'guests_max', 'label' => 'Maximum Guests', 'type' => 'number'],
            ['key' => 'field_tags', 'name' => 'tags', 'label' => 'Category Tags', 'type' => 'checkbox',
                'choices' => [
                    'best-value' => 'Best Value', 'best' => 'Best Cruise', 'deluxe' => 'Deluxe',
                    'luxury' => 'Luxury', '5-star' => '5-Star', 'boutique' => 'Boutique',
                    'family' => 'Family', 'couples' => 'Couples / Honeymoon',
                    'group' => 'Group / Charter', 'private-charter' => 'Private Charter',
                    'small-ship' => 'Small Ship', 'newest' => 'Newest', 'popular' => 'Popular',
                ]],

            /* TAB 2: CONTENT */
            ['key' => 'tab_content', 'label' => 'Overview & Highlights', 'type' => 'tab'],
            ['key' => 'field_overview', 'name' => 'overview', 'label' => 'Overview', 'type' => 'wysiwyg',
                'instructions' => 'Introduce the cruise, design style, service, and guest experience.'],
            ['key' => 'field_highlights', 'name' => 'highlights', 'label' => 'Highlights', 'type' => 'textarea',
                'instructions' => 'Enter one highlight per line.', 'rows' => 5],
            ['key' => 'field_life', 'name' => 'life_on_board', 'label' => 'Life on Board', 'type' => 'textarea',
                'instructions' => 'Dining, spa, kayaking, entertainment, and onboard activities. Enter one item per line.', 'rows' => 5],

            ['key' => 'tab_cruise_urls', 'label' => 'Images & Gallery', 'type' => 'tab'],
            ['key' => 'field_hero_image_url', 'name' => 'hero_image_url', 'label' => 'Hero Image URL', 'type' => 'url',
                'instructions' => 'Paste the full exterior cruise image URL. A live preview is displayed below the field.'],
            ['key' => 'field_external_gallery', 'name' => 'external_gallery', 'label' => 'Direct Image URL Gallery', 'type' => 'repeater', 'button_label' => 'Add Gallery Image',
                'sub_fields' => [
                    ['key' => 'field_external_gallery_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url', 'required' => 1],
                    ['key' => 'field_external_gallery_alt', 'name' => 'alt_text', 'label' => 'Alt Text / Description', 'type' => 'text'],
                ]],

            /* TAB 3: CABINS */
            ['key' => 'tab_cabins', 'label' => 'Cabin Categories', 'type' => 'tab'],
            ['key' => 'field_cabins', 'name' => 'cabins', 'label' => 'Cabin Categories', 'type' => 'repeater',
                'button_label' => 'Add Cabin Category',
                'sub_fields' => [
                    ['key' => 'field_cb_name', 'name' => 'name', 'label' => 'Category Name', 'type' => 'text', 'required' => 1],
                    ['key' => 'field_cb_count', 'name' => 'cabin_count', 'label' => 'Number of Cabins', 'type' => 'number'],
                    ['key' => 'field_cb_size', 'name' => 'size', 'label' => 'Cabin Size (for example: 28 m²)', 'type' => 'text'],
                    ['key' => 'field_cb_guests', 'name' => 'guests', 'label' => 'Guests (for example: 2–3)', 'type' => 'text'],
                    ['key' => 'field_cb_beds', 'name' => 'beds', 'label' => 'Bed Type (for example: Double / Twin)', 'type' => 'text'],
                    ['key' => 'field_cb_desc', 'name' => 'description', 'label' => 'Description', 'type' => 'textarea', 'rows' => 3],
                    ['key' => 'field_cb_image', 'name' => 'image_url', 'label' => 'Main Cabin Image URL', 'type' => 'url'],
                    ['key' => 'field_cb_gallery', 'name' => 'gallery_urls', 'label' => 'Cabin Image URLs', 'type' => 'repeater', 'button_label' => 'Add Cabin Image',
                        'sub_fields' => [['key' => 'field_cb_gallery_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url']]],
                ]],

            /* TAB 4: ITINERARIES */
            ['key' => 'tab_itinerary', 'label' => 'Itineraries', 'type' => 'tab'],
            ['key' => 'field_itinerary_2d1n', 'name' => 'itinerary_2d1n', 'label' => '2 Days / 1 Night Itinerary', 'type' => 'repeater',
                'button_label' => 'Add Itinerary Day',
                'sub_fields' => [
                    ['key' => 'field_it_2d1n_title', 'name' => 'title', 'label' => 'Day Title', 'type' => 'text'],
                    ['key' => 'field_it_2d1n_location', 'name' => 'location', 'label' => 'Location', 'type' => 'text'],
                    ['key' => 'field_it_2d1n_image', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                    ['key' => 'field_it_2d1n_am', 'name' => 'am', 'label' => 'Morning (AM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_2d1n_pm', 'name' => 'pm', 'label' => 'Afternoon (PM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_2d1n_eve', 'name' => 'eve', 'label' => 'Evening', 'type' => 'textarea', 'rows' => 2],
                ]],
            ['key' => 'field_itinerary_3d2n', 'name' => 'itinerary_3d2n', 'label' => '3 Days / 2 Nights Itinerary', 'type' => 'repeater',
                'button_label' => 'Add Itinerary Day',
                'sub_fields' => [
                    ['key' => 'field_it_3d2n_title', 'name' => 'title', 'label' => 'Day Title', 'type' => 'text'],
                    ['key' => 'field_it_3d2n_location', 'name' => 'location', 'label' => 'Location', 'type' => 'text'],
                    ['key' => 'field_it_3d2n_image', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                    ['key' => 'field_it_3d2n_am', 'name' => 'am', 'label' => 'Morning (AM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_3d2n_pm', 'name' => 'pm', 'label' => 'Afternoon (PM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_3d2n_eve', 'name' => 'eve', 'label' => 'Evening', 'type' => 'textarea', 'rows' => 2],
                ]],
            ['key' => 'field_itinerary', 'name' => 'itinerary', 'label' => 'Legacy / Default Itinerary', 'type' => 'repeater',
                'instructions' => 'Kept for compatibility with existing data. New cruises should use the duration-specific itineraries above.',
                'button_label' => 'Add Itinerary Day',
                'sub_fields' => [
                    ['key' => 'field_it_title', 'name' => 'title', 'label' => 'Day Title', 'type' => 'text'],
                    ['key' => 'field_it_location', 'name' => 'location', 'label' => 'Location', 'type' => 'text'],
                    ['key' => 'field_it_image', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                    ['key' => 'field_it_am', 'name' => 'am', 'label' => 'Morning (AM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_pm', 'name' => 'pm', 'label' => 'Afternoon (PM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_eve', 'name' => 'eve', 'label' => 'Evening', 'type' => 'textarea', 'rows' => 2],
                ]],

            /* TAB 5: FACILITIES */
            ['key' => 'tab_media', 'label' => 'Social Areas & Facilities', 'type' => 'tab'],
            ['key' => 'field_social', 'name' => 'social_areas', 'label' => 'Social Areas (Restaurant, Sundeck, Bar)', 'type' => 'repeater',
                'button_label' => 'Add Social Area',
                'sub_fields' => [
                    ['key' => 'field_sa_name', 'name' => 'name', 'label' => 'Area Name', 'type' => 'text'],
                    ['key' => 'field_sa_image', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                    ['key' => 'field_sa_alt', 'name' => 'alt_text', 'label' => 'Alt Text', 'type' => 'text'],
                ]],
            ['key' => 'field_features', 'name' => 'features', 'label' => 'Features & Amenities', 'type' => 'textarea',
                'instructions' => 'Enter one feature per line.', 'rows' => 5],
            ['key' => 'field_equipment', 'name' => 'equipment', 'label' => 'Equipment', 'type' => 'textarea', 'instructions' => 'Enter one item per line.', 'rows' => 5],
            ['key' => 'field_deck_plan_url', 'name' => 'deck_plan_url', 'label' => 'Deck Plan Image URL', 'type' => 'url'],
            ['key' => 'field_related', 'name' => 'related', 'label' => 'Related Cruises', 'type' => 'relationship', 'post_type' => ['cruise'], 'return_format' => 'object', 'filters' => ['search']],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 3B. Homepage, navigation, footer, tours, and frontend pages       */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    $link_fields = function ($prefix) {
        return [
            ['key' => "field_{$prefix}_label", 'name' => 'label', 'label' => 'Label', 'type' => 'text'],
            ['key' => "field_{$prefix}_href", 'name' => 'href', 'label' => 'Link / URL', 'type' => 'text'],
        ];
    };

    acf_add_local_field_group([
        'key' => 'group_halong_tour_collection_v5', 'title' => 'Tour Collection Details', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'tour_collection']]],
        'fields' => [
            ['key' => 'field_tc_type', 'name' => 'collection_type', 'label' => 'Collection Type', 'type' => 'select', 'choices' => ['region' => 'Region', 'style' => 'Travel Style / Category']],
            ['key' => 'field_tc_eyebrow', 'name' => 'eyebrow', 'label' => 'Hero Eyebrow', 'type' => 'text'],
            ['key' => 'field_tc_title', 'name' => 'title', 'label' => 'H1 Title', 'type' => 'text'],
            ['key' => 'field_tc_subtitle', 'name' => 'subtitle', 'label' => 'Hero Subtitle', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_tc_hero_url', 'name' => 'hero_image_url', 'label' => 'Hero Image URL', 'type' => 'url'],
            ['key' => 'field_tc_description', 'name' => 'description_paragraphs', 'label' => 'Introduction', 'type' => 'textarea', 'instructions' => 'Enter one paragraph per line.', 'rows' => 8],
            ['key' => 'field_tc_highlights', 'name' => 'key_highlights', 'label' => 'Key Highlights', 'type' => 'textarea', 'instructions' => 'Enter one highlight per line.', 'rows' => 6],
            ['key' => 'field_tc_price', 'name' => 'price_range_text', 'label' => 'Price Range', 'type' => 'text'],
            ['key' => 'field_tc_months', 'name' => 'best_months_text', 'label' => 'Best Months', 'type' => 'text'],
            ['key' => 'field_tc_advice', 'name' => 'expert_advice', 'label' => 'Expert Advice', 'type' => 'textarea'],
            ['key' => 'field_tc_faqs', 'name' => 'faqs', 'label' => 'Frequently Asked Questions', 'type' => 'repeater', 'button_label' => 'Add FAQ', 'sub_fields' => [
                ['key' => 'field_tc_faq_q', 'name' => 'question', 'label' => 'Question', 'type' => 'text'],
                ['key' => 'field_tc_faq_a', 'name' => 'answer', 'label' => 'Answer', 'type' => 'textarea'],
            ]],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_halong_homepage_v5', 'title' => 'Homepage & Global Website Settings', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'homepage_content']]],
        'fields' => [
            ['key' => 'tab_home_hero', 'label' => 'Hero', 'type' => 'tab'],
            ['key' => 'field_home_hero_title', 'name' => 'hero_title', 'label' => 'Hero Title', 'type' => 'text'],
            ['key' => 'field_home_hero_subtitle', 'name' => 'hero_subtitle', 'label' => 'Hero Subtitle', 'type' => 'textarea'],
            ['key' => 'field_home_hero_bg_url', 'name' => 'hero_background_url', 'label' => 'Default Hero Image URL', 'type' => 'url'],
            ['key' => 'field_home_hero_slides', 'name' => 'hero_slides', 'label' => 'Hero Slides', 'type' => 'repeater', 'button_label' => 'Add Slide', 'sub_fields' => [
                ['key' => 'field_home_slide_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                ['key' => 'field_home_slide_name', 'name' => 'name', 'label' => 'Slide Name / Alt Text', 'type' => 'text'],
                ['key' => 'field_home_slide_link', 'name' => 'slug', 'label' => 'Slug or Link', 'type' => 'text'],
            ]],

            ['key' => 'tab_home_sections', 'label' => 'Homepage Sections', 'type' => 'tab'],
            ['key' => 'field_home_trip_title', 'name' => 'trip_types_title', 'label' => 'Trip Types Title', 'type' => 'text'],
            ['key' => 'field_home_trip_desc', 'name' => 'trip_types_description', 'label' => 'Trip Types Description', 'type' => 'textarea'],
            ['key' => 'field_home_styles', 'name' => 'selected_styles', 'label' => 'Selected Travel Styles', 'type' => 'relationship', 'post_type' => ['tour_collection'], 'return_format' => 'object', 'filters' => ['search']],
            ['key' => 'field_home_regions_title', 'name' => 'regions_title', 'label' => 'Regions Title', 'type' => 'text'],
            ['key' => 'field_home_regions_desc', 'name' => 'regions_description', 'label' => 'Regions Description', 'type' => 'textarea'],
            ['key' => 'field_home_regions', 'name' => 'selected_regions', 'label' => 'Selected Regions', 'type' => 'relationship', 'post_type' => ['tour_collection'], 'return_format' => 'object', 'filters' => ['search']],
            ['key' => 'field_home_featured_title', 'name' => 'featured_title', 'label' => 'Featured Fleet Title', 'type' => 'text'],
            ['key' => 'field_home_featured', 'name' => 'featured_cruises', 'label' => 'Featured Cruises', 'type' => 'relationship', 'post_type' => ['cruise'], 'return_format' => 'object', 'filters' => ['search']],
            ['key' => 'field_home_testimonials_title', 'name' => 'testimonials_title', 'label' => 'Testimonials Title', 'type' => 'text'],
            ['key' => 'field_home_testimonials', 'name' => 'testimonials', 'label' => 'Testimonials', 'type' => 'repeater', 'button_label' => 'Add Testimonial', 'sub_fields' => [
                ['key' => 'field_home_testimonial_quote', 'name' => 'quote', 'label' => 'Quote', 'type' => 'textarea', 'rows' => 3],
                ['key' => 'field_home_testimonial_author', 'name' => 'author', 'label' => 'Author', 'type' => 'text'],
                ['key' => 'field_home_testimonial_location', 'name' => 'location', 'label' => 'Location', 'type' => 'text'],
            ]],
            ['key' => 'field_home_guides_title', 'name' => 'guides_title', 'label' => 'Travel Guides Title', 'type' => 'text'],
            ['key' => 'field_home_guides', 'name' => 'guides_list', 'label' => 'Travel Guides', 'type' => 'repeater', 'button_label' => 'Add Guide', 'sub_fields' => [
                ['key' => 'field_home_guide_title', 'name' => 'title', 'label' => 'Title', 'type' => 'text'],
                ['key' => 'field_home_guide_url', 'name' => 'url', 'label' => 'Link / URL', 'type' => 'text'],
                ['key' => 'field_home_guide_image_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                ['key' => 'field_home_guide_date', 'name' => 'date', 'label' => 'Date', 'type' => 'text'],
                ['key' => 'field_home_guide_read', 'name' => 'read_time', 'label' => 'Read Time', 'type' => 'text'],
            ]],
            ['key' => 'field_home_category_eyebrow', 'name' => 'category_section_eyebrow', 'label' => 'Category Section Eyebrow', 'type' => 'text'],
            ['key' => 'field_home_category_title', 'name' => 'category_section_title', 'label' => 'Category Section Title', 'type' => 'text'],
            ['key' => 'field_home_category_desc', 'name' => 'category_section_desc', 'label' => 'Category Section Description', 'type' => 'textarea'],
            ['key' => 'field_home_category_tiles', 'name' => 'category_tiles', 'label' => 'Category Tiles', 'type' => 'repeater', 'button_label' => 'Add Category Tile', 'sub_fields' => [
                ['key' => 'field_home_tile_label', 'name' => 'label', 'label' => 'Label', 'type' => 'text'],
                ['key' => 'field_home_tile_subtitle', 'name' => 'subtitle', 'label' => 'Subtitle', 'type' => 'text'],
                ['key' => 'field_home_tile_href', 'name' => 'href', 'label' => 'Link / URL', 'type' => 'text'],
                ['key' => 'field_home_tile_image_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
                ['key' => 'field_home_tile_badge', 'name' => 'badge', 'label' => 'Badge', 'type' => 'text'],
            ]],

            ['key' => 'tab_home_global', 'label' => 'Header / Footer / CTA', 'type' => 'tab'],
            ['key' => 'field_home_logo_url', 'name' => 'header_logo_url', 'label' => 'Logo Image URL', 'type' => 'url', 'instructions' => 'Paste a transparent PNG, SVG, WebP, or hosted WordPress image URL. A live preview appears below.'],
            ['key' => 'field_home_logo_alt', 'name' => 'header_logo_alt', 'label' => 'Logo Alt Text', 'type' => 'text', 'default_value' => 'Ha Long Bay Cruises'],
            ['key' => 'field_home_logo_width', 'name' => 'header_logo_width', 'label' => 'Logo Width (pixels)', 'type' => 'number', 'default_value' => 180, 'min' => 60, 'max' => 500],
            ['key' => 'field_home_cruises_label', 'name' => 'header_cruises_label', 'label' => 'Cruises Menu Label', 'type' => 'text', 'default_value' => 'Cruises'],
            ['key' => 'field_home_header_cruises', 'name' => 'header_cruises', 'label' => 'Cruises Menu Items', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_cruises')],
            ['key' => 'field_home_tours_label', 'name' => 'header_tours_label', 'label' => 'Tours Menu Label', 'type' => 'text', 'default_value' => 'Tours & Packages'],
            ['key' => 'field_home_header_tours', 'name' => 'header_tours', 'label' => 'Tours Menu Items', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_tours')],
            ['key' => 'field_home_guides_label', 'name' => 'header_guides_label', 'label' => 'Guides Menu Label', 'type' => 'text', 'default_value' => 'Travel Guides'],
            ['key' => 'field_home_header_guides', 'name' => 'header_guides', 'label' => 'Guides Menu Items', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_guides')],
            ['key' => 'field_home_about_label', 'name' => 'header_about_label', 'label' => 'About Menu Label', 'type' => 'text', 'default_value' => 'About Us'],
            ['key' => 'field_home_header_cta_label', 'name' => 'header_cta_label', 'label' => 'Header CTA Label', 'type' => 'text', 'default_value' => 'Plan My Cruise'],
            ['key' => 'field_home_header_cta_url', 'name' => 'header_cta_url', 'label' => 'Header CTA Link', 'type' => 'text', 'default_value' => '/inquire'],
            ['key' => 'field_home_top_text', 'name' => 'top_bar_text', 'label' => 'Announcement Bar Text', 'type' => 'text'],
            ['key' => 'field_home_top_link_text', 'name' => 'top_bar_link_text', 'label' => 'Announcement Link Text', 'type' => 'text'],
            ['key' => 'field_home_top_link_url', 'name' => 'top_bar_link_url', 'label' => 'Announcement Link URL', 'type' => 'text'],
            ['key' => 'field_home_footer_address', 'name' => 'footer_address', 'label' => 'Footer Address', 'type' => 'textarea'],
            ['key' => 'field_home_footer_phone', 'name' => 'footer_phone', 'label' => 'Footer Phone', 'type' => 'text'],
            ['key' => 'field_home_footer_email', 'name' => 'footer_email', 'label' => 'Footer Email', 'type' => 'email'],
            ['key' => 'field_home_footer_cruises', 'name' => 'footer_cruises', 'label' => 'Link Cruises Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_cruises')],
            ['key' => 'field_home_footer_tours', 'name' => 'footer_tours', 'label' => 'Link Tours Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_tours')],
            ['key' => 'field_home_footer_guides', 'name' => 'footer_guides', 'label' => 'Link Guides Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_guides')],
            ['key' => 'field_home_seo_title', 'name' => 'seo_title', 'label' => 'Homepage SEO Block Title', 'type' => 'text'],
            ['key' => 'field_home_seo_text', 'name' => 'seo_text', 'label' => 'Homepage SEO Content', 'type' => 'textarea', 'rows' => 8],
            ['key' => 'field_home_shortlist_title', 'name' => 'shortlist_form_title', 'label' => 'Shortlist Form Title', 'type' => 'text'],
            ['key' => 'field_home_shortlist_subtitle', 'name' => 'shortlist_form_subtitle', 'label' => 'Shortlist Form Subtitle', 'type' => 'text'],
            ['key' => 'field_home_shortlist_desc', 'name' => 'shortlist_form_desc', 'label' => 'Shortlist Form Description', 'type' => 'textarea'],
            ['key' => 'field_home_sticky_text', 'name' => 'sticky_cta_text', 'label' => 'Sticky CTA Text', 'type' => 'text'],
            ['key' => 'field_home_sticky_whatsapp', 'name' => 'sticky_cta_whatsapp', 'label' => 'Sticky CTA WhatsApp Number', 'type' => 'text', 'instructions' => 'Include the country code without the plus sign.'],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_halong_frontend_page_v5', 'title' => 'Frontend Page Content', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'frontend_page']]],
        'fields' => [
            ['key' => 'field_fp_route', 'name' => 'route', 'label' => 'Frontend Route', 'type' => 'text', 'instructions' => 'Examples: /about, /contact, or /guides/best-cruises', 'required' => 1],
            ['key' => 'field_fp_eyebrow', 'name' => 'eyebrow', 'label' => 'Hero Eyebrow', 'type' => 'text'],
            ['key' => 'field_fp_title', 'name' => 'hero_title', 'label' => 'Hero Title', 'type' => 'text'],
            ['key' => 'field_fp_subtitle', 'name' => 'hero_subtitle', 'label' => 'Hero Subtitle', 'type' => 'textarea'],
            ['key' => 'field_fp_image_url', 'name' => 'hero_image_url', 'label' => 'Hero Image URL', 'type' => 'url'],
            ['key' => 'field_fp_content', 'name' => 'content_html', 'label' => 'Main Content', 'type' => 'wysiwyg'],
            ['key' => 'field_fp_sections', 'name' => 'sections', 'label' => 'Additional Content Sections', 'type' => 'repeater', 'button_label' => 'Add Section', 'sub_fields' => [
                ['key' => 'field_fp_section_title', 'name' => 'title', 'label' => 'Title', 'type' => 'text'],
                ['key' => 'field_fp_section_text', 'name' => 'text', 'label' => 'Content', 'type' => 'wysiwyg'],
                ['key' => 'field_fp_section_image_url', 'name' => 'image_url', 'label' => 'Image URL', 'type' => 'url'],
            ]],
            ['key' => 'field_fp_meta_title', 'name' => 'meta_title', 'label' => 'SEO Title', 'type' => 'text'],
            ['key' => 'field_fp_meta_desc', 'name' => 'meta_description', 'label' => 'SEO Description', 'type' => 'textarea'],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 4. REST API Endpoints & Order Handlers                             */
/* ------------------------------------------------------------------ */
add_action('rest_api_init', function () {
    register_rest_route('halong/v1', '/frontend-page', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function (WP_REST_Request $req) {
            $route = '/' . ltrim(sanitize_text_field($req->get_param('route') ?: ''), '/');
            $posts = get_posts(['post_type' => 'frontend_page', 'post_status' => 'publish', 'numberposts' => -1]);
            foreach ($posts as $post) {
                if ('/' . ltrim((string) get_field('route', $post->ID), '/') !== $route) continue;
                $sections = [];
                foreach ((array) get_field('sections', $post->ID) as $section) {
                    $sections[] = [
                        'title' => $section['title'] ?? '',
                        'text' => $section['text'] ?? '',
                        'image' => $section['image_url'] ?? '',
                    ];
                }
                return new WP_REST_Response([
                    'route' => $route,
                    'eyebrow' => get_field('eyebrow', $post->ID) ?: '',
                    'heroTitle' => get_field('hero_title', $post->ID) ?: get_the_title($post),
                    'heroSubtitle' => get_field('hero_subtitle', $post->ID) ?: '',
                    'heroImage' => get_field('hero_image_url', $post->ID) ?: '',
                    'contentHtml' => get_field('content_html', $post->ID) ?: apply_filters('the_content', $post->post_content),
                    'sections' => $sections,
                    'metaTitle' => get_field('meta_title', $post->ID) ?: '',
                    'metaDescription' => get_field('meta_description', $post->ID) ?: '',
                ], 200);
            }
            return new WP_Error('halong_page_not_found', 'Frontend page not found', ['status' => 404]);
        },
    ]);

    register_rest_route('halong/v1', '/inquiries', [
        'methods' => 'POST',
        'permission_callback' => '__return_true',
        'callback' => function (WP_REST_Request $req) {
            $data = $req->get_json_params();
            $name = sanitize_text_field($data['name'] ?? 'Guest');
            $email = sanitize_email($data['email'] ?? '');
            $phone = sanitize_text_field($data['phone'] ?? '');
            $cruise = sanitize_text_field($data['cruise'] ?? 'Cruise consultation');
            $notes = sanitize_textarea_field($data['notes'] ?? '');

            $post_id = wp_insert_post([
                'post_type' => 'inquiry',
                'post_title' => "Cruise inquiry: {$name} - {$cruise}",
                'post_content' => "Name: {$name}\nEmail: {$email}\nPhone: {$phone}\nCruise: {$cruise}\nNotes: {$notes}",
                'post_status' => 'publish',
            ]);

            if ($post_id) {
                return new WP_REST_Response(['status' => 'success', 'id' => $post_id], 200);
            }
            return new WP_REST_Response(['status' => 'error'], 500);
        },
    ]);
    
    register_rest_route('halong/v1', '/site-options', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            return new WP_REST_Response([
                'home_hero_title' => get_option('home_hero_title', 'Every budget. Every travel style. One bay you\'ll never forget.'),
                'home_hero_subtitle' => get_option('home_hero_subtitle', '64 handpicked cruises — day trips to 3-night voyages — across Ha Long, Lan Ha & Bai Tu Long Bay.'),
                'home_hero_image' => get_option('home_hero_image', 'https://www.halongbestcruises.com/wp-content/uploads/2026/08/cruise-ship-heritage-cruise-binh-chuan-2-336163417-1.jpg'),
                'site_whatsapp' => get_option('site_whatsapp', '+84905999888'),
                'site_email' => get_option('site_email', 'hello@halongbestcruises.com'),
                'tour_day_title' => get_option('tour_day_title', 'Ha Long Bay Day Cruises'),
                'tour_2d1n_title' => get_option('tour_2d1n_title', '2 Day 1 Night Ha Long Bay Cruises'),
                'tour_3d2n_title' => get_option('tour_3d2n_title', '3 Day 2 Night Ha Long Bay Cruises'),
                'tour_halong_title' => get_option('tour_halong_title', 'Ha Long Bay Cruises'),
                'tour_lanha_title' => get_option('tour_lanha_title', 'Lan Ha Bay Cruises'),
                'tour_baitulong_title' => get_option('tour_baitulong_title', 'Bai Tu Long Bay Cruises'),
            ], 200);
        },
    ]);
});
