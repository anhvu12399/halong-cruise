<?php
/**
 * Plugin Name: Ha Long Cruise CMS
 * Description: Quản lý toàn bộ frontend Headless Next.js. Có Repeater riêng chạy với ACF Free, hỗ trợ ảnh URL/CDN và tương thích ACF PRO.
 * Version: 5.1.0
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
            $this->defaults = ['sub_fields' => [], 'button_label' => 'Thêm dòng'];
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
            echo '<button type="button" class="button halong-add-row">' . esc_html($field['button_label'] ?: 'Thêm dòng') . '</button>';
            echo '</div>';
        }

        private function render_row($base_name, $sub_fields, $row, $index) {
            echo '<div class="halong-repeater-row">';
            echo '<span class="halong-drag" title="Kéo để sắp xếp">⋮⋮</span><div class="halong-repeater-grid">';
            foreach ($sub_fields as $sub) {
                $sub_name = $sub['name'] ?? $sub['key'];
                echo '<div class="halong-repeater-cell">';
                $this->render_input($base_name . '[' . $index . '][' . $sub_name . ']', $sub, $row[$sub_name] ?? '');
                echo '</div>';
            }
            echo '</div><div class="halong-row-actions"><button type="button" class="button halong-move-up" title="Đưa lên">↑</button><button type="button" class="button halong-move-down" title="Đưa xuống">↓</button><button type="button" class="button-link-delete halong-remove-row">Xóa</button></div></div>';
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

/* ------------------------------------------------------------------ */
/* 1. Đăng ký Custom Post Type: Cruises, Inquiries & Page Settings    */
/* ------------------------------------------------------------------ */
add_action('init', function () {
    register_post_type('cruise', [
        'label' => 'Du Thuyền Hạ Long',
        'labels' => [
            'name' => '🚢 Du Thuyền',
            'singular_name' => 'Du Thuyền',
            'add_new' => 'Thêm Tàu Mới',
            'add_new_item' => 'Thêm Tàu Mới',
            'edit_item' => 'Chỉnh Sửa Du Thuyền',
            'new_item' => 'Tàu Mới',
            'all_items' => 'Tất Cả Du Thuyền',
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
        'label' => 'Yêu Cầu Đặt Tàu',
        'labels' => [
            'name' => '✉️ Đơn Đặt Tàu & Tư Vấn',
            'singular_name' => 'Yêu Cầu',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title', 'editor'],
    ]);

    register_post_type('tour_collection', [
        'labels' => ['name' => '🗺️ Trang Tour & Danh Mục', 'singular_name' => 'Trang Tour', 'add_new_item' => 'Thêm Trang Tour'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'tour-collections',
        'menu_icon' => 'dashicons-location-alt', 'supports' => ['title', 'revisions'],
        'rewrite' => ['slug' => 'tour-collections'],
    ]);

    register_post_type('homepage_content', [
        'labels' => ['name' => '🏠 Nội Dung Trang Chủ', 'singular_name' => 'Trang Chủ', 'add_new_item' => 'Tạo Nội Dung Trang Chủ'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'homepage-content',
        'menu_icon' => 'dashicons-admin-home', 'supports' => ['title', 'revisions'],
        'rewrite' => false,
    ]);

    register_post_type('frontend_page', [
        'labels' => ['name' => '📄 Nội Dung Các Trang', 'singular_name' => 'Trang Frontend', 'add_new_item' => 'Thêm Trang Frontend'],
        'public' => true, 'show_in_rest' => true, 'rest_base' => 'frontend-pages',
        'menu_icon' => 'dashicons-layout', 'supports' => ['title', 'editor', 'revisions'],
        'rewrite' => false,
    ]);
});

/* ------------------------------------------------------------------ */
/* 2. Đăng Ký Menu "🌐 Cấu Hình Trang Chủ" Trên WordPress Admin Menu   */
/*    (Tương thích 100% với cả ACF Free lẫn ACF PRO)                  */
/* ------------------------------------------------------------------ */
add_action('admin_menu', function () {
    add_menu_page(
        'Cấu Hình Trang Chủ & Website',
        '🌐 Cấu Hình Trang Chủ',
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
        echo '<div class="notice notice-success is-dismissible"><p><strong>✅ Đã lưu cấu hình Trang Chủ & Các Trang Tour thành công!</strong></p></div>';
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
        <h1 style="font-size: 24px; font-weight: 600; margin-bottom: 20px;">🌐 Quản Lý Nội Dung Trang Chủ & Các Trang Tour</h1>
        <form method="post" action="">
            <?php wp_nonce_field('halong_options_verify'); ?>
            <div style="background: #fff; padding: 25px; border-radius: 8px; border: 1px solid #ccd0d4; max-w: 900px;">
                <h2 style="font-size: 18px; border-bottom: 2px solid #2271b1; padding-bottom: 8px; margin-top: 0;">🏠 1. Cấu Hình Banner Trang Chủ (Homepage Hero)</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="home_hero_title">Tiêu Đề Banner Chính (H1)</label></th>
                        <td><input name="home_hero_title" type="text" id="home_hero_title" value="<?php echo esc_attr($hero_title); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="home_hero_subtitle">Mô Tả Phụ Giới Thiệu</label></th>
                        <td><textarea name="home_hero_subtitle" id="home_hero_subtitle" rows="3" class="large-text" style="width: 100%;"><?php echo esc_textarea($hero_sub); ?></textarea></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="home_hero_image">Link Ảnh Banner Nền Trang Chủ</label></th>
                        <td><input name="home_hero_image" type="text" id="home_hero_image" value="<?php echo esc_attr($hero_img); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="site_whatsapp">Số WhatsApp Tư Vấn</label></th>
                        <td><input name="site_whatsapp" type="text" id="site_whatsapp" value="<?php echo esc_attr($whatsapp); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="site_email">Email Liên Hệ</label></th>
                        <td><input name="site_email" type="text" id="site_email" value="<?php echo esc_attr($email); ?>" class="regular-text"></td>
                    </tr>
                </table>

                <h2 style="font-size: 18px; border-bottom: 2px solid #2271b1; padding-bottom: 8px; margin-top: 30px;">🚢 2. Tiêu Đề Các Trang Tour & Điểm Đến</h2>
                
                <table class="form-table">
                    <tr>
                        <th scope="row"><label for="tour_day_title">Trang Day Cruises</label></th>
                        <td><input name="tour_day_title" type="text" id="tour_day_title" value="<?php echo esc_attr($tour_day); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_2d1n_title">Trang 2 Days 1 Night</label></th>
                        <td><input name="tour_2d1n_title" type="text" id="tour_2d1n_title" value="<?php echo esc_attr($tour_2d1n); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_3d2n_title">Trang 3 Days 2 Nights</label></th>
                        <td><input name="tour_3d2n_title" type="text" id="tour_3d2n_title" value="<?php echo esc_attr($tour_3d2n); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_halong_title">Trang Vịnh Hạ Long</label></th>
                        <td><input name="tour_halong_title" type="text" id="tour_halong_title" value="<?php echo esc_attr($tour_hl); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_lanha_title">Trang Vịnh Lan Hạ</label></th>
                        <td><input name="tour_lanha_title" type="text" id="tour_lanha_title" value="<?php echo esc_attr($tour_lh); ?>" class="regular-text"></td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="tour_baitulong_title">Trang Vịnh Bái Tử Long</label></th>
                        <td><input name="tour_baitulong_title" type="text" id="tour_baitulong_title" value="<?php echo esc_attr($tour_btl); ?>" class="regular-text"></td>
                    </tr>
                </table>

                <p class="submit" style="margin-top: 25px;">
                    <input type="submit" name="save_halong_options" id="submit" class="button button-primary button-large" value="💾 Lưu Cấu Hình Website">
                </p>
            </div>
        </form>
    </div>
    <?php
}

/* ------------------------------------------------------------------ */
/* 3. Cấu hình Trường Dữ Liệu ACF Trực Quan Cho Bài Viết Du Thuyền    */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    acf_add_local_field_group([
        'key' => 'group_cruise_cms',
        'title' => '⚙️ CẤU HÌNH CHI TIẾT DU THUYỀN',
        'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'cruise']]],
        'menu_order' => 0,
        'position' => 'normal',
        'style' => 'default',
        'label_placement' => 'top',
        'instruction_placement' => 'label',
        'fields' => [

            /* TAB 1: THÔNG TIN CHUNG */
            ['key' => 'tab_general', 'label' => '📌 Thông Tin Chung & Giá', 'type' => 'tab'],
            ['key' => 'field_tagline', 'name' => 'tagline', 'label' => 'Dòng Giới Thiệu Ngắn (Tagline)', 'type' => 'text',
                'instructions' => '1 câu ngắn gọn hiển thị dưới tên tàu trên Banner.'],
            ['key' => 'field_region', 'name' => 'region', 'label' => 'Khu Vực Hành Trình', 'type' => 'select',
                'choices' => ['Ha Long Bay' => 'Ha Long Bay', 'Lan Ha Bay' => 'Lan Ha Bay', 'Bai Tu Long Bay' => 'Bai Tu Long Bay', 'Ha Long Bay & Lan Ha Bay' => 'Ha Long Bay & Lan Ha Bay']],
            ['key' => 'field_price', 'name' => 'starting_price', 'label' => 'Giá Bắt Đầu ($ USD/khách)', 'type' => 'number',
                'instructions' => 'Bỏ trống nếu muốn hiển thị "Price on request".'],
            ['key' => 'field_days', 'name' => 'duration_days', 'label' => 'Số Ngày', 'type' => 'number', 'default_value' => 2],
            ['key' => 'field_nights', 'name' => 'duration_nights', 'label' => 'Số Đêm', 'type' => 'number', 'default_value' => 1],
            ['key' => 'field_cabin_count', 'name' => 'cabin_count', 'label' => 'Tổng Số Phòng Trên Tàu', 'type' => 'number'],
            ['key' => 'field_guests', 'name' => 'guests_max', 'label' => 'Sức Chứa Tối Đa (Khách)', 'type' => 'number'],
            ['key' => 'field_tags', 'name' => 'tags', 'label' => 'Nhãn Phân Loại (Tags)', 'type' => 'checkbox',
                'choices' => [
                    'best-value' => 'Best Value (Giá Tốt)',
                    'deluxe' => 'Deluxe (Cao Cấp)',
                    'luxury' => 'Luxury (Sang Trọng)',
                    'family' => 'Family (Gia Đình)',
                    'couples' => 'Couples/Honeymoon (Cặp Đôi)',
                    'group' => 'Group/Charter (Đoàn/Bao Tàu)',
                    'small-ship' => 'Small Ship (Tàu Nhỏ Quây Quần)',
                    'newest' => 'Newest (Tàu Mới Ra Mắt)',
                ]],

            /* TAB 2: NỘI DUNG & NỔI BẬT */
            ['key' => 'tab_content', 'label' => '📝 Tổng Quan & Điểm Nổi Bật', 'type' => 'tab'],
            ['key' => 'field_overview', 'name' => 'overview', 'label' => 'Mô Tả Tổng Quan', 'type' => 'wysiwyg',
                'instructions' => 'Giới thiệu về du thuyền, phong cách thiết kế và trải nghiệm.'],
            ['key' => 'field_highlights', 'name' => 'highlights', 'label' => 'Điểm Nổi Bật Mấy Hàng', 'type' => 'textarea',
                'instructions' => 'Mỗi dòng 1 gạch đầu dòng nổi bật (ví dụ: Bồn tắm kính hướng biển, Sân golf mini trên boong...).', 'rows' => 5],
            ['key' => 'field_life', 'name' => 'life_on_board', 'label' => 'Trải Nghiệm Trên Tàu (Life on board)', 'type' => 'textarea',
                'instructions' => 'Ẩm thực, Spa, chèo thuyền Kayak, câu mực đêm...', 'rows' => 5],

            ['key' => 'tab_cruise_urls', 'label' => '🔗 Ảnh bằng URL', 'type' => 'tab'],
            ['key' => 'field_hero_image_url', 'name' => 'hero_image_url', 'label' => 'URL Ảnh Hero / Ảnh Đại Diện', 'type' => 'url',
                'instructions' => 'Dán URL ảnh đầy đủ, ví dụ https://.../image.webp'],
            ['key' => 'field_external_gallery', 'name' => 'external_gallery', 'label' => 'Gallery Ảnh URL', 'type' => 'repeater', 'button_label' => '➕ Thêm URL ảnh',
                'sub_fields' => [
                    ['key' => 'field_external_gallery_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url', 'required' => 1],
                ]],

            /* TAB 3: DANH SÁCH HẠNG PHÒNG */
            ['key' => 'tab_cabins', 'label' => '🛏️ Các Hạng Phòng (Cabins)', 'type' => 'tab'],
            ['key' => 'field_cabins', 'name' => 'cabins', 'label' => 'Danh Sách Hạng Phòng', 'type' => 'repeater',
                'button_label' => '➕ Thêm Hạng Phòng Mới',
                'sub_fields' => [
                    ['key' => 'field_cb_name', 'name' => 'name', 'label' => 'Tên Hạng Phòng', 'type' => 'text', 'required' => 1],
                    ['key' => 'field_cb_size', 'name' => 'size', 'label' => 'Diện Tích (vd: 28 m²)', 'type' => 'text'],
                    ['key' => 'field_cb_guests', 'name' => 'guests', 'label' => 'Số Khách (vd: 2-3 người)', 'type' => 'text'],
                    ['key' => 'field_cb_beds', 'name' => 'beds', 'label' => 'Loại Giường (vd: Double / Twin)', 'type' => 'text'],
                    ['key' => 'field_cb_desc', 'name' => 'description', 'label' => 'Mô Tả Chi Tiết Phòng', 'type' => 'textarea', 'rows' => 3],
                    ['key' => 'field_cb_image', 'name' => 'image_url', 'label' => 'URL Ảnh Đại Diện Phòng', 'type' => 'url'],
                    ['key' => 'field_cb_gallery', 'name' => 'gallery_urls', 'label' => 'Bộ URL Ảnh Phòng', 'type' => 'repeater', 'button_label' => '➕ Thêm URL ảnh',
                        'sub_fields' => [['key' => 'field_cb_gallery_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url']]],
                ]],

            /* TAB 4: LỊCH TRÌNH THEO NGÀY */
            ['key' => 'tab_itinerary', 'label' => '📅 Hành Trình Chi Tiết', 'type' => 'tab'],
            ['key' => 'field_itinerary', 'name' => 'itinerary', 'label' => 'Lịch Trình Theo Ngày', 'type' => 'repeater',
                'button_label' => '➕ Thêm Ngày Mới',
                'sub_fields' => [
                    ['key' => 'field_it_title', 'name' => 'title', 'label' => 'Tiêu Đề Ngày (vd: Ngày 1: Hà Nội - Vịnh Hạ Long)', 'type' => 'text'],
                    ['key' => 'field_it_location', 'name' => 'location', 'label' => 'Địa Điểm (vd: Vịnh Lan Hạ)', 'type' => 'text'],
                    ['key' => 'field_it_image', 'name' => 'image_url', 'label' => 'URL Ảnh Điểm Đến Trong Ngày', 'type' => 'url'],
                    ['key' => 'field_it_am', 'name' => 'am', 'label' => 'Buổi Sáng (AM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_pm', 'name' => 'pm', 'label' => 'Buổi Chiều (PM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_eve', 'name' => 'eve', 'label' => 'Buổi Tối (Evening)', 'type' => 'textarea', 'rows' => 2],
                ]],

            /* TAB 5: HÌNH ẢNH & TIỆN ÍCH */
            ['key' => 'tab_media', 'label' => '🖼️ Thư Viện Ảnh & Tiện Nghi', 'type' => 'tab'],
            ['key' => 'field_social', 'name' => 'social_areas', 'label' => 'Khu Vực Chung (Nhà Hàng, Sundeck, Bar)', 'type' => 'repeater',
                'button_label' => '➕ Thêm Khu Vực',
                'sub_fields' => [
                    ['key' => 'field_sa_name', 'name' => 'name', 'label' => 'Tên Khu Vực', 'type' => 'text'],
                    ['key' => 'field_sa_image', 'name' => 'image_url', 'label' => 'URL Hình Ảnh', 'type' => 'url'],
                ]],
            ['key' => 'field_features', 'name' => 'features', 'label' => 'Trang Thiết Bị & Tiện Nghi', 'type' => 'textarea',
                'instructions' => 'Mỗi tiện ích 1 dòng (vd: Điều hòa, Wi-Fi miễn phí, Bồn tắm Jacuzzi...).', 'rows' => 5],
            ['key' => 'field_equipment', 'name' => 'equipment', 'label' => 'Thiết Bị Khác', 'type' => 'textarea', 'instructions' => 'Mỗi thiết bị một dòng.', 'rows' => 5],
            ['key' => 'field_deck_plan_url', 'name' => 'deck_plan_url', 'label' => 'URL Ảnh Sơ Đồ Boong Tàu', 'type' => 'url'],
            ['key' => 'field_related', 'name' => 'related', 'label' => 'Du Thuyền Liên Quan', 'type' => 'relationship', 'post_type' => ['cruise'], 'return_format' => 'object'],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 3B. Trang chủ, menu/footer, trang tour và các trang frontend       */
/*     Ảnh dùng URL để tương thích CDN/Booking/Trip.com/WordPress.    */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    $link_fields = function ($prefix) {
        return [
            ['key' => "field_{$prefix}_label", 'name' => 'label', 'label' => 'Nhãn', 'type' => 'text'],
            ['key' => "field_{$prefix}_href", 'name' => 'href', 'label' => 'Đường dẫn', 'type' => 'text'],
        ];
    };

    acf_add_local_field_group([
        'key' => 'group_halong_tour_collection_v5', 'title' => '🗺️ NỘI DUNG TRANG TOUR / DANH MỤC', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'tour_collection']]],
        'fields' => [
            ['key' => 'field_tc_type', 'name' => 'collection_type', 'label' => 'Loại trang', 'type' => 'select', 'choices' => ['region' => 'Khu vực', 'style' => 'Phong cách / Danh mục']],
            ['key' => 'field_tc_eyebrow', 'name' => 'eyebrow', 'label' => 'Nhãn nhỏ trên Hero', 'type' => 'text'],
            ['key' => 'field_tc_title', 'name' => 'title', 'label' => 'Tiêu đề H1', 'type' => 'text'],
            ['key' => 'field_tc_subtitle', 'name' => 'subtitle', 'label' => 'Mô tả Hero', 'type' => 'textarea', 'rows' => 3],
            ['key' => 'field_tc_hero_url', 'name' => 'hero_image_url', 'label' => 'URL ảnh Hero', 'type' => 'url'],
            ['key' => 'field_tc_description', 'name' => 'description_paragraphs', 'label' => 'Nội dung giới thiệu', 'type' => 'textarea', 'instructions' => 'Mỗi đoạn một dòng.', 'rows' => 8],
            ['key' => 'field_tc_highlights', 'name' => 'key_highlights', 'label' => 'Điểm nổi bật', 'type' => 'textarea', 'instructions' => 'Mỗi ý một dòng.', 'rows' => 6],
            ['key' => 'field_tc_price', 'name' => 'price_range_text', 'label' => 'Khoảng giá', 'type' => 'text'],
            ['key' => 'field_tc_months', 'name' => 'best_months_text', 'label' => 'Thời gian tốt nhất', 'type' => 'text'],
            ['key' => 'field_tc_advice', 'name' => 'expert_advice', 'label' => 'Lời khuyên chuyên gia', 'type' => 'textarea'],
            ['key' => 'field_tc_faqs', 'name' => 'faqs', 'label' => 'Câu hỏi thường gặp', 'type' => 'repeater', 'button_label' => '➕ Thêm FAQ', 'sub_fields' => [
                ['key' => 'field_tc_faq_q', 'name' => 'question', 'label' => 'Câu hỏi', 'type' => 'text'],
                ['key' => 'field_tc_faq_a', 'name' => 'answer', 'label' => 'Trả lời', 'type' => 'textarea'],
            ]],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_halong_homepage_v5', 'title' => '🏠 TOÀN BỘ NỘI DUNG TRANG CHỦ & WEBSITE', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'homepage_content']]],
        'fields' => [
            ['key' => 'tab_home_hero', 'label' => 'Hero', 'type' => 'tab'],
            ['key' => 'field_home_hero_title', 'name' => 'hero_title', 'label' => 'Tiêu đề Hero', 'type' => 'text'],
            ['key' => 'field_home_hero_subtitle', 'name' => 'hero_subtitle', 'label' => 'Mô tả Hero', 'type' => 'textarea'],
            ['key' => 'field_home_hero_bg_url', 'name' => 'hero_background_url', 'label' => 'URL ảnh Hero mặc định', 'type' => 'url'],
            ['key' => 'field_home_hero_slides', 'name' => 'hero_slides', 'label' => 'Các slide Hero', 'type' => 'repeater', 'button_label' => '➕ Thêm slide', 'sub_fields' => [
                ['key' => 'field_home_slide_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url'],
                ['key' => 'field_home_slide_name', 'name' => 'name', 'label' => 'Tên ảnh/slide', 'type' => 'text'],
                ['key' => 'field_home_slide_link', 'name' => 'slug', 'label' => 'Slug hoặc đường dẫn', 'type' => 'text'],
            ]],

            ['key' => 'tab_home_sections', 'label' => 'Các khối Trang Chủ', 'type' => 'tab'],
            ['key' => 'field_home_trip_title', 'name' => 'trip_types_title', 'label' => 'Tiêu đề Trip Types', 'type' => 'text'],
            ['key' => 'field_home_trip_desc', 'name' => 'trip_types_description', 'label' => 'Mô tả Trip Types', 'type' => 'textarea'],
            ['key' => 'field_home_styles', 'name' => 'selected_styles', 'label' => 'Trang phong cách hiển thị', 'type' => 'relationship', 'post_type' => ['tour_collection'], 'return_format' => 'object'],
            ['key' => 'field_home_regions_title', 'name' => 'regions_title', 'label' => 'Tiêu đề khu vực', 'type' => 'text'],
            ['key' => 'field_home_regions_desc', 'name' => 'regions_description', 'label' => 'Mô tả khu vực', 'type' => 'textarea'],
            ['key' => 'field_home_regions', 'name' => 'selected_regions', 'label' => 'Khu vực hiển thị', 'type' => 'relationship', 'post_type' => ['tour_collection'], 'return_format' => 'object'],
            ['key' => 'field_home_featured_title', 'name' => 'featured_title', 'label' => 'Tiêu đề tàu nổi bật', 'type' => 'text'],
            ['key' => 'field_home_featured', 'name' => 'featured_cruises', 'label' => 'Tàu nổi bật', 'type' => 'relationship', 'post_type' => ['cruise'], 'return_format' => 'object'],
            ['key' => 'field_home_guides_title', 'name' => 'guides_title', 'label' => 'Tiêu đề Guides', 'type' => 'text'],
            ['key' => 'field_home_guides', 'name' => 'guides_list', 'label' => 'Danh sách Guide', 'type' => 'repeater', 'button_label' => '➕ Thêm guide', 'sub_fields' => [
                ['key' => 'field_home_guide_title', 'name' => 'title', 'label' => 'Tiêu đề', 'type' => 'text'],
                ['key' => 'field_home_guide_url', 'name' => 'url', 'label' => 'Đường dẫn', 'type' => 'text'],
                ['key' => 'field_home_guide_image_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url'],
                ['key' => 'field_home_guide_date', 'name' => 'date', 'label' => 'Ngày', 'type' => 'text'],
                ['key' => 'field_home_guide_read', 'name' => 'read_time', 'label' => 'Thời gian đọc', 'type' => 'text'],
            ]],
            ['key' => 'field_home_category_eyebrow', 'name' => 'category_section_eyebrow', 'label' => 'Nhãn khối danh mục', 'type' => 'text'],
            ['key' => 'field_home_category_title', 'name' => 'category_section_title', 'label' => 'Tiêu đề khối danh mục', 'type' => 'text'],
            ['key' => 'field_home_category_desc', 'name' => 'category_section_desc', 'label' => 'Mô tả khối danh mục', 'type' => 'textarea'],
            ['key' => 'field_home_category_tiles', 'name' => 'category_tiles', 'label' => 'Các ô danh mục', 'type' => 'repeater', 'button_label' => '➕ Thêm ô', 'sub_fields' => [
                ['key' => 'field_home_tile_label', 'name' => 'label', 'label' => 'Tên', 'type' => 'text'],
                ['key' => 'field_home_tile_subtitle', 'name' => 'subtitle', 'label' => 'Mô tả', 'type' => 'text'],
                ['key' => 'field_home_tile_href', 'name' => 'href', 'label' => 'Đường dẫn', 'type' => 'text'],
                ['key' => 'field_home_tile_image_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url'],
                ['key' => 'field_home_tile_badge', 'name' => 'badge', 'label' => 'Nhãn nổi bật', 'type' => 'text'],
            ]],

            ['key' => 'tab_home_global', 'label' => 'Header / Footer / CTA', 'type' => 'tab'],
            ['key' => 'field_home_logo_url', 'name' => 'header_logo_url', 'label' => 'URL Logo', 'type' => 'url'],
            ['key' => 'field_home_header_cruises', 'name' => 'header_cruises', 'label' => 'Menu Cruises', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_cruises')],
            ['key' => 'field_home_header_tours', 'name' => 'header_tours', 'label' => 'Menu Tours', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_tours')],
            ['key' => 'field_home_header_guides', 'name' => 'header_guides', 'label' => 'Menu Guides', 'type' => 'repeater', 'sub_fields' => $link_fields('home_header_guides')],
            ['key' => 'field_home_top_text', 'name' => 'top_bar_text', 'label' => 'Thông báo đầu trang', 'type' => 'text'],
            ['key' => 'field_home_top_link_text', 'name' => 'top_bar_link_text', 'label' => 'Chữ liên kết thông báo', 'type' => 'text'],
            ['key' => 'field_home_top_link_url', 'name' => 'top_bar_link_url', 'label' => 'Đường dẫn thông báo', 'type' => 'text'],
            ['key' => 'field_home_footer_address', 'name' => 'footer_address', 'label' => 'Địa chỉ Footer', 'type' => 'textarea'],
            ['key' => 'field_home_footer_phone', 'name' => 'footer_phone', 'label' => 'Điện thoại Footer', 'type' => 'text'],
            ['key' => 'field_home_footer_email', 'name' => 'footer_email', 'label' => 'Email Footer', 'type' => 'email'],
            ['key' => 'field_home_footer_cruises', 'name' => 'footer_cruises', 'label' => 'Link Cruises Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_cruises')],
            ['key' => 'field_home_footer_tours', 'name' => 'footer_tours', 'label' => 'Link Tours Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_tours')],
            ['key' => 'field_home_footer_guides', 'name' => 'footer_guides', 'label' => 'Link Guides Footer', 'type' => 'repeater', 'sub_fields' => $link_fields('home_footer_guides')],
            ['key' => 'field_home_seo_title', 'name' => 'seo_title', 'label' => 'Tiêu đề SEO cuối trang chủ', 'type' => 'text'],
            ['key' => 'field_home_seo_text', 'name' => 'seo_text', 'label' => 'Nội dung SEO cuối trang chủ', 'type' => 'textarea', 'rows' => 8],
            ['key' => 'field_home_shortlist_title', 'name' => 'shortlist_form_title', 'label' => 'Tiêu đề form shortlist', 'type' => 'text'],
            ['key' => 'field_home_shortlist_subtitle', 'name' => 'shortlist_form_subtitle', 'label' => 'Mô tả ngắn shortlist', 'type' => 'text'],
            ['key' => 'field_home_shortlist_desc', 'name' => 'shortlist_form_desc', 'label' => 'Mô tả form shortlist', 'type' => 'textarea'],
            ['key' => 'field_home_sticky_text', 'name' => 'sticky_cta_text', 'label' => 'Nội dung Sticky CTA', 'type' => 'text'],
            ['key' => 'field_home_sticky_whatsapp', 'name' => 'sticky_cta_whatsapp', 'label' => 'Số WhatsApp Sticky CTA', 'type' => 'text'],
        ],
    ]);

    acf_add_local_field_group([
        'key' => 'group_halong_frontend_page_v5', 'title' => '📄 NỘI DUNG TRANG FRONTEND', 'show_in_rest' => 1,
        'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => 'frontend_page']]],
        'fields' => [
            ['key' => 'field_fp_route', 'name' => 'route', 'label' => 'Đường dẫn trang', 'type' => 'text', 'instructions' => 'Ví dụ: /about, /contact hoặc /guides/best-cruises', 'required' => 1],
            ['key' => 'field_fp_eyebrow', 'name' => 'eyebrow', 'label' => 'Nhãn nhỏ Hero', 'type' => 'text'],
            ['key' => 'field_fp_title', 'name' => 'hero_title', 'label' => 'Tiêu đề Hero', 'type' => 'text'],
            ['key' => 'field_fp_subtitle', 'name' => 'hero_subtitle', 'label' => 'Mô tả Hero', 'type' => 'textarea'],
            ['key' => 'field_fp_image_url', 'name' => 'hero_image_url', 'label' => 'URL ảnh Hero', 'type' => 'url'],
            ['key' => 'field_fp_content', 'name' => 'content_html', 'label' => 'Nội dung chính', 'type' => 'wysiwyg'],
            ['key' => 'field_fp_sections', 'name' => 'sections', 'label' => 'Các khối nội dung bổ sung', 'type' => 'repeater', 'button_label' => '➕ Thêm khối', 'sub_fields' => [
                ['key' => 'field_fp_section_title', 'name' => 'title', 'label' => 'Tiêu đề', 'type' => 'text'],
                ['key' => 'field_fp_section_text', 'name' => 'text', 'label' => 'Nội dung', 'type' => 'wysiwyg'],
                ['key' => 'field_fp_section_image_url', 'name' => 'image_url', 'label' => 'URL ảnh', 'type' => 'url'],
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
            $name = sanitize_text_field($data['name'] ?? 'Khách hàng');
            $email = sanitize_email($data['email'] ?? '');
            $phone = sanitize_text_field($data['phone'] ?? '');
            $cruise = sanitize_text_field($data['cruise'] ?? 'Yêu cầu tư vấn');
            $notes = sanitize_textarea_field($data['notes'] ?? '');

            $post_id = wp_insert_post([
                'post_type' => 'inquiry',
                'post_title' => "Đơn đặt tàu: {$name} - {$cruise}",
                'post_content' => "Họ tên: {$name}\nEmail: {$email}\nĐiện thoại: {$phone}\nTàu quan tâm: {$cruise}\nGhi chú: {$notes}",
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
