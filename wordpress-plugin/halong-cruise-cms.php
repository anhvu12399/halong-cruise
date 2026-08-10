<?php
/**
 * Plugin Name: Ha Long Cruise CMS
 * Description: Complete headless CMS for the Ha Long Bay Cruises Next.js website. Includes ACF Free repeater support, direct image URLs, navigation, branding, cruises, tours, guides, frontend pages, and instant Next.js revalidation.
 * Version: 6.6.3
 * Author: Ha Long Best Cruises
 */

if (!defined('ABSPATH')) exit;

/* Explain the only required companion plugin instead of silently hiding fields. */
add_action('admin_notices', function () {
    if (function_exists('acf_add_local_field_group')) return;
    echo '<div class="notice notice-error"><p><strong>Ha Long Cruise CMS:</strong> Install and activate the free <a href="' . esc_url(admin_url('plugin-install.php?s=Advanced%20Custom%20Fields&tab=search&type=term')) . '">Advanced Custom Fields (ACF)</a> plugin to display the Cruise & Guide details fields. ACF Pro is not required.</p></div>';
});

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
    if (!$screen || !in_array($screen->post_type, ['cruise', 'tour_collection', 'homepage_content', 'frontend_page', 'guide'], true)) return;
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

/* Enable Classic Editor interface for Cruises, Guides, and Tour Collections (Kiểu ngày xưa) */
add_filter('use_block_editor_for_post_type', function ($use_block_editor, $post_type) {
    if (in_array($post_type, ['cruise', 'guide', 'tour_collection'], true)) {
        return false;
    }
    return $use_block_editor;
}, 10, 2);

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

    register_taxonomy('cruise_category', 'cruise', [
        'labels' => [
            'name' => 'Cruise Categories',
            'singular_name' => 'Cruise Category',
            'search_items' => 'Search Categories',
            'all_items' => 'All Categories',
            'edit_item' => 'Edit Category',
            'update_item' => 'Update Category',
            'add_new_item' => 'Add New Category',
            'new_item_name' => 'New Category Name',
            'menu_name' => 'Categories (Phân loại tàu)',
        ],
        'hierarchical' => true,
        'show_ui' => true,
        'show_in_rest' => true,
        'rest_base' => 'cruise-categories',
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => ['slug' => 'cruise-category'],
    ]);

    $default_terms = [
        'Luxury' => 'Full-service ships, top cabins',
        'Deluxe' => 'Comfortable, well-priced',
        'Budget' => 'Simple, well-run, cheaper',
        'Newest' => 'Launched in the last year',
        'Honeymoon' => 'Quiet cabins, private decks',
        'Family' => 'Space to spread out',
        'Best Cruises' => 'Our highest-rated sailings (Editors Picks)',
        'Group' => 'Charters & larger parties',
        'Special Deals' => 'Best offers & promotions',
    ];
    foreach ($default_terms as $term_name => $desc) {
        if (!term_exists($term_name, 'cruise_category')) {
            wp_insert_term($term_name, 'cruise_category', [
                'description' => $desc,
                'slug' => sanitize_title($term_name),
            ]);
        }
    }

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

    register_post_type('guide', [
        'labels' => ['name' => 'Travel Guides', 'singular_name' => 'Guide', 'add_new' => 'Add New', 'add_new_item' => 'Add New Guide', 'edit_item' => 'Edit Guide', 'new_item' => 'New Guide', 'all_items' => 'All Guides'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'guides',
        'menu_icon' => 'dashicons-book-alt', 'supports' => ['title', 'editor', 'thumbnail', 'revisions'],
        'has_archive' => false, 'rewrite' => ['slug' => 'guides'],
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

function halong_frontend_base_url() {
    $url = trim((string) get_option('frontend_site_url', ''));
    if (!$url) {
        $url = 'https://www.halongbestcruises.com';
    }
    return untrailingslashit($url);
}

function halong_cruise_frontend_url($post_id) {
    $base = halong_frontend_base_url();
    $post_type = get_post_type($post_id);
    $slug = get_post_field('post_name', $post_id);
    if ($post_type === 'guide') {
        if ($slug === 'asia-shore-excursions' || strpos($slug, 'halong-bay-cruises-shore-excursions') !== false) {
            return $base . '/' . $slug;
        }
        return $base . '/guides/' . $slug;
    }
    return $base . '/cruises/' . $slug;
}

function render_halong_cms_homepage_settings() {
    if (isset($_POST['save_halong_options'])) {
        check_admin_referer('halong_options_verify');
        $fields = [
            'home_hero_title', 'home_hero_subtitle', 'home_hero_image',
            'site_whatsapp', 'site_email', 'frontend_site_url', 'tour_day_title',
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
    $frontend_url = halong_frontend_base_url();
    
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
            <div style="background: #fff; padding: 25px; border-radius: 8px; border: 1px solid #ccd0d4; max-width: 900px;">
                <h2 style="font-size: 18px; border-bottom: 2px solid #2271b1; padding-bottom: 8px; margin-top: 0;">1. Homepage Hero & Frontend URL</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="frontend_site_url">Frontend Website URL</label></th>
                        <td><input name="frontend_site_url" type="url" id="frontend_site_url" value="<?php echo esc_attr($frontend_url); ?>" class="regular-text" style="width:100%"><p class="description">Used by the View Frontend links for Cruises and Travel Guides.</p></td>
                    </tr>
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

                <p class="submit" style="margin-top: 25px;">
                    <input type="submit" name="save_halong_options" id="submit" class="button button-primary button-large" value="Save Website Settings">
                </p>
            </div>
        </form>
    </div>
    <?php
}

/* Make headless cruise data and its frontend destination visible in the list. */
function halong_cruise_field($name, $post_id) {
    return function_exists('get_field') ? get_field($name, $post_id) : get_post_meta($post_id, $name, true);
}

/* Cruises admin list columns */
add_filter('manage_cruise_posts_columns', function ($columns) {
    return [
        'cb' => $columns['cb'],
        'halong_image' => 'Image',
        'title' => 'Cruise Name',
        'halong_category' => 'Category',
        'halong_region' => 'Region',
        'halong_price' => 'Starting Price',
        'halong_duration' => 'Duration',
        'halong_frontend' => 'Frontend',
        'date' => $columns['date'] ?? 'Date',
    ];
});

add_action('manage_cruise_posts_custom_column', function ($column, $post_id) {
    if ($column === 'halong_image') {
        $image = halong_cruise_field('hero_image_url', $post_id);
        if (!$image) $image = get_the_post_thumbnail_url($post_id, 'thumbnail');
        echo $image ? '<img src="' . esc_url($image) . '" alt="" style="width:72px;height:48px;object-fit:cover;border-radius:5px">' : '<span aria-hidden="true">—</span>';
    } elseif ($column === 'halong_category') {
        $terms = wp_get_post_terms($post_id, 'cruise_category', ['fields' => 'names']);
        echo !empty($terms) ? '<span style="background:#e7f3ff;color:#0c4a6e;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600">' . esc_html(implode(', ', $terms)) . '</span>' : '<span style="color:#999">—</span>';
    } elseif ($column === 'halong_region') {
        echo esc_html(halong_cruise_field('region', $post_id) ?: '—');
    } elseif ($column === 'halong_price') {
        $price = halong_cruise_field('starting_price', $post_id);
        echo $price !== '' && $price !== null ? esc_html('$' . number_format_i18n((float) $price)) : '<span style="color:#777">On request</span>';
    } elseif ($column === 'halong_duration') {
        $days = halong_cruise_field('duration_days', $post_id);
        $nights = halong_cruise_field('duration_nights', $post_id);
        echo ($days || $nights) ? esc_html($days . 'D / ' . $nights . 'N') : '—';
    } elseif ($column === 'halong_frontend') {
        echo '<a class="button button-small" target="_blank" rel="noopener" href="' . esc_url(halong_cruise_frontend_url($post_id)) . '">View Frontend ↗</a>';
    }
}, 10, 2);

/* Guides admin list columns */
add_filter('manage_guide_posts_columns', function ($columns) {
    return [
        'cb' => $columns['cb'],
        'halong_image' => 'Cover',
        'title' => 'Title',
        'halong_region' => 'Region',
        'halong_read_time' => 'Read Time',
        'halong_frontend' => 'Frontend',
        'date' => $columns['date'] ?? 'Date',
    ];
});

add_action('manage_guide_posts_custom_column', function ($column, $post_id) {
    if ($column === 'halong_image') {
        $image = halong_cruise_field('cover_image_url', $post_id);
        if (!$image) $image = get_the_post_thumbnail_url($post_id, 'thumbnail');
        echo $image ? '<img src="' . esc_url($image) . '" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:4px">' : '<span aria-hidden="true">—</span>';
    } elseif ($column === 'halong_region') {
        echo esc_html(halong_cruise_field('region', $post_id) ?: 'Ha Long Bay');
    } elseif ($column === 'halong_read_time') {
        $mins = halong_cruise_field('read_minutes', $post_id);
        echo esc_html(($mins ?: 5) . ' min');
    } elseif ($column === 'halong_frontend') {
        echo '<a class="button button-small" target="_blank" rel="noopener" href="' . esc_url(halong_cruise_frontend_url($post_id)) . '">View Frontend ↗</a>';
    }
}, 10, 2);

/* Tour Collections admin list columns */
add_filter('manage_tour_collection_posts_columns', function ($columns) {
    return [
        'cb' => $columns['cb'],
        'halong_image' => 'Image',
        'title' => 'Collection Title',
        'halong_type' => 'Type',
        'halong_price_range' => 'Price Range',
        'halong_best_months' => 'Best Months',
        'date' => $columns['date'] ?? 'Date',
    ];
});

add_action('manage_tour_collection_posts_custom_column', function ($column, $post_id) {
    if ($column === 'halong_image') {
        $image = halong_cruise_field('hero_image_url', $post_id);
        if (!$image) $image = get_the_post_thumbnail_url($post_id, 'thumbnail');
        echo $image ? '<img src="' . esc_url($image) . '" alt="" style="width:60px;height:40px;object-fit:cover;border-radius:4px">' : '<span aria-hidden="true">—</span>';
    } elseif ($column === 'halong_type') {
        $type = halong_cruise_field('collection_type', $post_id);
        echo esc_html($type ? ucfirst($type) : 'Style');
    } elseif ($column === 'halong_price_range') {
        echo esc_html(halong_cruise_field('price_range_text', $post_id) ?: '—');
    } elseif ($column === 'halong_best_months') {
        echo esc_html(halong_cruise_field('best_months_text', $post_id) ?: '—');
    }
}, 10, 2);

add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_halong_tour_collection_cms',
        'title' => 'Tour Collection Details',
        'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'tour_collection']]],
        'fields' => [
            ['key' => 'field_tour_hero_image_url', 'name' => 'hero_image_url', 'label' => 'Hero Image URL', 'type' => 'url'],
            ['key' => 'field_tour_eyebrow', 'name' => 'eyebrow', 'label' => 'Eyebrow', 'type' => 'text'],
            ['key' => 'field_tour_subtitle', 'name' => 'subtitle', 'label' => 'Subtitle / Tagline', 'type' => 'textarea', 'rows' => 2],
            ['key' => 'field_tour_collection_type', 'name' => 'collection_type', 'label' => 'Collection Type', 'type' => 'select',
                'choices' => ['style' => 'By Style', 'region' => 'By Region', 'duration' => 'By Duration']],
            ['key' => 'field_tour_price_range_text', 'name' => 'price_range_text', 'label' => 'Price Range Text', 'type' => 'text'],
            ['key' => 'field_tour_best_months_text', 'name' => 'best_months_text', 'label' => 'Best Months Text', 'type' => 'text'],
            ['key' => 'field_tour_key_highlights', 'name' => 'key_highlights', 'label' => 'Key Highlights (1 per line)', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_tour_expert_advice', 'name' => 'expert_advice', 'label' => 'Expert Advice', 'type' => 'textarea', 'rows' => 2],
        ],
    ]);
});

add_filter('post_row_actions', function ($actions, $post) {
    if (in_array($post->post_type, ['cruise', 'guide', 'tour_collection'], true)) {
        $actions['halong_frontend'] = '<a target="_blank" rel="noopener" href="' . esc_url(halong_cruise_frontend_url($post->ID)) . '">View Frontend ↗</a>';
    }
    return $actions;
}, 10, 2);

add_action('add_meta_boxes', function () {
    add_meta_box(
        'halong_cruise_category_meta',
        '🚢 Cruise Category / Style (Phân loại tàu)',
        function ($post) {
            wp_nonce_field('halong_cruise_category_nonce', 'halong_cruise_category_nonce');
            $selected_categories = wp_get_post_terms($post->ID, 'cruise_category', ['fields' => 'ids']);
            $all_terms = get_terms(['taxonomy' => 'cruise_category', 'hide_empty' => false]);
            $acf_tags = halong_cruise_field('tags', $post->ID);
            
            echo '<div style="margin-bottom:8px;font-size:12px;color:#50575e;">Chọn phân loại cho tàu (hiển thị trên các ô danh mục ở trang chủ):</div>';
            echo '<div style="display:flex;flex-wrap:wrap;gap:6px 12px;background:#f9f9f9;padding:10px;border:1px solid #ccd0d4;border-radius:6px;">';
            if (!empty($all_terms) && !is_wp_error($all_terms)) {
                foreach ($all_terms as $term) {
                    $checked = in_array($term->term_id, $selected_categories, true) ? 'checked' : '';
                    echo '<label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;font-size:13px;font-weight:500;">';
                    echo '<input type="checkbox" name="halong_cruise_categories[]" value="' . esc_attr($term->term_id) . '" ' . $checked . '>';
                    echo esc_html($term->name);
                    echo '</label>';
                }
            }
            echo '</div>';
            echo '<div style="margin-top:10px;"><label style="font-weight:600;display:block;margin-bottom:3px;font-size:12px;">Custom Tags (Mỗi từ 1 dòng):</label>';
            echo '<textarea name="halong_cruise_tags" rows="2" style="width:100%;font-family:monospace;font-size:12px;" placeholder="luxury&#10;best&#10;family">' . esc_textarea(is_string($acf_tags) ? $acf_tags : implode("\n", (array)$acf_tags)) . '</textarea></div>';
        },
        'cruise',
        'side',
        'default'
    );

    add_meta_box(
        'halong_guide_details_meta',
        '📖 Guide Details (Thông tin Cẩm nang)',
        function ($post) {
            wp_nonce_field('halong_guide_meta_nonce', 'halong_guide_meta_nonce');
            $cover = halong_cruise_field('cover_image_url', $post->ID);
            $excerpt = halong_cruise_field('excerpt', $post->ID);
            $region = halong_cruise_field('region', $post->ID) ?: 'Ha Long Bay';
            $read_time = halong_cruise_field('read_minutes', $post->ID) ?: 5;
            
            echo '<div style="margin-bottom:12px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Cover Image URL (Đường dẫn ảnh bìa):</label>';
            echo '<input type="url" name="halong_guide_cover_image_url" value="' . esc_attr($cover) . '" style="width:100%;padding:6px;" placeholder="https://..."></div>';

            echo '<div style="margin-bottom:12px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Excerpt / Subtitle (Mô tả ngắn):</label>';
            echo '<textarea name="halong_guide_excerpt" rows="2" style="width:100%;padding:6px;" placeholder="Mô tả tóm tắt bài viết...">' . esc_textarea($excerpt) . '</textarea></div>';

            echo '<div style="display:flex;gap:15px;margin-bottom:6px;">';
            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Region (Khu vực):</label>';
            echo '<select name="halong_guide_region" style="width:100%;padding:5px;">';
            foreach (['Ha Long Bay', 'Lan Ha Bay', 'Bai Tu Long Bay', 'Ha Long Bay & Lan Ha Bay'] as $r) {
                $sel = ($r === $region) ? 'selected' : '';
                echo '<option value="' . esc_attr($r) . '" ' . $sel . '>' . esc_html($r) . '</option>';
            }
            echo '</select></div>';

            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Read Time (Số phút đọc):</label>';
            echo '<input type="number" name="halong_guide_read_minutes" value="' . esc_attr($read_time) . '" style="width:100%;padding:5px;"></div>';
            echo '</div>';
        },
        'guide',
        'normal',
        'high'
    );

    add_meta_box(
        'halong_tour_collection_details_meta',
        '🗺️ Tour Collection Details (Thông tin Bộ sưu tập Tour / Hành trình)',
        function ($post) {
            wp_nonce_field('halong_tour_meta_nonce', 'halong_tour_meta_nonce');
            $hero_image = halong_cruise_field('hero_image_url', $post->ID);
            $eyebrow = halong_cruise_field('eyebrow', $post->ID);
            $subtitle = halong_cruise_field('subtitle', $post->ID);
            $type = halong_cruise_field('collection_type', $post->ID) ?: 'style';
            $price_range = halong_cruise_field('price_range_text', $post->ID);
            $best_months = halong_cruise_field('best_months_text', $post->ID);
            $highlights = halong_cruise_field('key_highlights', $post->ID);
            $expert_advice = halong_cruise_field('expert_advice', $post->ID);

            echo '<div style="margin-bottom:12px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Hero Image URL (Đường dẫn ảnh bìa / Banner):</label>';
            echo '<input type="url" name="halong_tour_hero_image_url" value="' . esc_attr($hero_image) . '" style="width:100%;padding:6px;" placeholder="https://..."></div>';

            echo '<div style="display:flex;gap:15px;margin-bottom:12px;">';
            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Eyebrow (Tiêu đề phụ nhỏ):</label>';
            echo '<input type="text" name="halong_tour_eyebrow" value="' . esc_attr($eyebrow) . '" style="width:100%;padding:6px;" placeholder="Curated Sailings"></div>';
            
            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Collection Type (Phân loại):</label>';
            echo '<select name="halong_tour_collection_type" style="width:100%;padding:6px;">';
            foreach (['style' => 'By Style (Luxury, Family, Honeymoon)', 'region' => 'By Region (Ha Long, Lan Ha, Bai Tu Long)', 'duration' => 'By Duration (Day Trips, 2D1N, 3D2N)'] as $val => $lbl) {
                $sel = ($val === $type) ? 'selected' : '';
                echo '<option value="' . esc_attr($val) . '" ' . $sel . '>' . esc_html($lbl) . '</option>';
            }
            echo '</select></div>';
            echo '</div>';

            echo '<div style="margin-bottom:12px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Subtitle / Tagline (Mô tả tóm tắt):</label>';
            echo '<textarea name="halong_tour_subtitle" rows="2" style="width:100%;padding:6px;" placeholder="Mô tả ngắn về bộ sưu tập này...">' . esc_textarea($subtitle) . '</textarea></div>';

            echo '<div style="display:flex;gap:15px;margin-bottom:12px;">';
            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Price Range Text (Khoảng giá):</label>';
            echo '<input type="text" name="halong_tour_price_range_text" value="' . esc_attr($price_range) . '" style="width:100%;padding:6px;" placeholder="$150 – $450 / person"></div>';
            
            echo '<div style="flex:1;"><label style="font-weight:600;display:block;margin-bottom:4px;">Best Months Text (Thời điểm đẹp nhất):</label>';
            echo '<input type="text" name="halong_tour_best_months_text" value="' . esc_attr($best_months) . '" style="width:100%;padding:6px;" placeholder="October to April"></div>';
            echo '</div>';

            echo '<div style="margin-bottom:12px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Key Highlights (Điểm nổi bật - Mỗi điểm 1 dòng):</label>';
            echo '<textarea name="halong_tour_key_highlights" rows="3" style="width:100%;padding:6px;" placeholder="Kayaking through hidden caves&#10;Private balcony in every cabin&#10;Gourmet seafood dinners">' . esc_textarea(is_string($highlights) ? $highlights : implode("\n", (array)$highlights)) . '</textarea></div>';

            echo '<div style="margin-bottom:6px;"><label style="font-weight:600;display:block;margin-bottom:4px;">Expert Advice / Tips (Lời khuyên của chuyên gia):</label>';
            echo '<textarea name="halong_tour_expert_advice" rows="2" style="width:100%;padding:6px;" placeholder="Lời khuyên khi chọn hành trình này...">' . esc_textarea($expert_advice) . '</textarea></div>';
        },
        'tour_collection',
        'normal',
        'high'
    );
});

add_action('save_post_tour_collection', function ($post_id) {
    if (!isset($_POST['halong_tour_meta_nonce']) || !wp_verify_nonce($_POST['halong_tour_meta_nonce'], 'halong_tour_meta_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['halong_tour_hero_image_url'])) {
        update_post_meta($post_id, 'hero_image_url', esc_url_raw($_POST['halong_tour_hero_image_url']));
    }
    if (isset($_POST['halong_tour_eyebrow'])) {
        update_post_meta($post_id, 'eyebrow', sanitize_text_field($_POST['halong_tour_eyebrow']));
    }
    if (isset($_POST['halong_tour_collection_type'])) {
        update_post_meta($post_id, 'collection_type', sanitize_text_field($_POST['halong_tour_collection_type']));
    }
    if (isset($_POST['halong_tour_subtitle'])) {
        update_post_meta($post_id, 'subtitle', sanitize_textarea_field($_POST['halong_tour_subtitle']));
    }
    if (isset($_POST['halong_tour_price_range_text'])) {
        update_post_meta($post_id, 'price_range_text', sanitize_text_field($_POST['halong_tour_price_range_text']));
    }
    if (isset($_POST['halong_tour_best_months_text'])) {
        update_post_meta($post_id, 'best_months_text', sanitize_text_field($_POST['halong_tour_best_months_text']));
    }
    if (isset($_POST['halong_tour_key_highlights'])) {
        update_post_meta($post_id, 'key_highlights', sanitize_textarea_field($_POST['halong_tour_key_highlights']));
    }
    if (isset($_POST['halong_tour_expert_advice'])) {
        update_post_meta($post_id, 'expert_advice', sanitize_textarea_field($_POST['halong_tour_expert_advice']));
    }
});

add_action('save_post_cruise', function ($post_id) {
    if (!isset($_POST['halong_cruise_category_nonce']) || !wp_verify_nonce($_POST['halong_cruise_category_nonce'], 'halong_cruise_category_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    $cat_ids = isset($_POST['halong_cruise_categories']) ? array_map('intval', $_POST['halong_cruise_categories']) : [];
    wp_set_object_terms($post_id, $cat_ids, 'cruise_category');

    if (isset($_POST['halong_cruise_tags'])) {
        update_post_meta($post_id, 'tags', sanitize_textarea_field($_POST['halong_cruise_tags']));
    }
});

add_action('save_post_guide', function ($post_id) {
    if (!isset($_POST['halong_guide_meta_nonce']) || !wp_verify_nonce($_POST['halong_guide_meta_nonce'], 'halong_guide_meta_nonce')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;

    if (isset($_POST['halong_guide_cover_image_url'])) {
        update_post_meta($post_id, 'cover_image_url', esc_url_raw($_POST['halong_guide_cover_image_url']));
    }
    if (isset($_POST['halong_guide_excerpt'])) {
        update_post_meta($post_id, 'excerpt', sanitize_textarea_field($_POST['halong_guide_excerpt']));
    }
    if (isset($_POST['halong_guide_region'])) {
        update_post_meta($post_id, 'region', sanitize_text_field($_POST['halong_guide_region']));
    }
    if (isset($_POST['halong_guide_read_minutes'])) {
        update_post_meta($post_id, 'read_minutes', intval($_POST['halong_guide_read_minutes']));
    }
});

/* Instant Next.js Revalidation Trigger on Save/Publish */
add_action('save_post', function ($post_id, $post, $update) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id)) return;
    if (!$post || !in_array($post->post_type, ['cruise', 'guide', 'frontend_page', 'tour_collection', 'homepage_content', 'post'], true)) return;

    $frontend_url = halong_frontend_base_url();
    $slug = $post->post_name;
    if ($slug === 'asia-shore-excursions' || strpos($slug, 'halong-bay-cruises-shore-excursions') !== false) {
        $path = '/' . $slug;
    } else {
        $path = '/' . ($post->post_type === 'guide' || $post->post_type === 'post' ? 'guides/' : ($post->post_type === 'cruise' ? 'cruises/' : '')) . $slug;
    }
    
    wp_remote_get($frontend_url . '/api/revalidate?secret=halong_secret_123&path=' . urlencode($path), [
        'blocking' => false,
        'timeout' => 5,
    ]);
}, 10, 3);

