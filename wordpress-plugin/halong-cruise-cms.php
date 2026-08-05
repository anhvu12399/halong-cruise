<?php
/**
 * Plugin Name: Ha Long Cruise CMS
 * Description: Quản lý toàn bộ nội dung Du Thuyền & Các Trang Tours / Trang Chủ cho Headless Next.js. Giao diện trực quan, chia Tab thông minh, dễ dùng nhất cho biên tập viên.
 * Version: 4.1.0
 * Author: Ha Long Best Cruises
 */

if (!defined('ABSPATH')) exit;

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
                    ['key' => 'field_cb_image', 'name' => 'image', 'label' => 'Ảnh Đại Diện Phòng', 'type' => 'image', 'return_format' => 'url'],
                    ['key' => 'field_cb_gallery', 'name' => 'gallery_images', 'label' => 'Bộ Sưu Tập Ảnh Phòng (Nhiều Ảnh)', 'type' => 'gallery', 'return_format' => 'url'],
                ]],

            /* TAB 4: LỊCH TRÌNH THEO NGÀY */
            ['key' => 'tab_itinerary', 'label' => '📅 Hành Trình Chi Tiết', 'type' => 'tab'],
            ['key' => 'field_itinerary', 'name' => 'itinerary', 'label' => 'Lịch Trình Theo Ngày', 'type' => 'repeater',
                'button_label' => '➕ Thêm Ngày Mới',
                'sub_fields' => [
                    ['key' => 'field_it_title', 'name' => 'title', 'label' => 'Tiêu Đề Ngày (vd: Ngày 1: Hà Nội - Vịnh Hạ Long)', 'type' => 'text'],
                    ['key' => 'field_it_location', 'name' => 'location', 'label' => 'Địa Điểm (vd: Vịnh Lan Hạ)', 'type' => 'text'],
                    ['key' => 'field_it_image', 'name' => 'image', 'label' => 'Ảnh Điểm Đến Trong Ngày', 'type' => 'image', 'return_format' => 'url'],
                    ['key' => 'field_it_am', 'name' => 'am', 'label' => 'Buổi Sáng (AM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_pm', 'name' => 'pm', 'label' => 'Buổi Chiều (PM)', 'type' => 'textarea', 'rows' => 2],
                    ['key' => 'field_it_eve', 'name' => 'eve', 'label' => 'Buổi Tối (Evening)', 'type' => 'textarea', 'rows' => 2],
                ]],

            /* TAB 5: HÌNH ẢNH & TIỆN ÍCH */
            ['key' => 'tab_media', 'label' => '🖼️ Thư Viện Ảnh & Tiện Nghi', 'type' => 'tab'],
            ['key' => 'field_gallery', 'name' => 'gallery', 'label' => 'Bộ Ảnh Du Thuyền (Album)', 'type' => 'gallery',
                'return_format' => 'url', 'preview_size' => 'medium'],
            ['key' => 'field_social', 'name' => 'social_areas', 'label' => 'Khu Vực Chung (Nhà Hàng, Sundeck, Bar)', 'type' => 'repeater',
                'button_label' => '➕ Thêm Khu Vực',
                'sub_fields' => [
                    ['key' => 'field_sa_name', 'name' => 'name', 'label' => 'Tên Khu Vực', 'type' => 'text'],
                    ['key' => 'field_sa_image', 'name' => 'image', 'label' => 'Hình Ảnh', 'type' => 'image', 'return_format' => 'url'],
                ]],
            ['key' => 'field_features', 'name' => 'features', 'label' => 'Trang Thiết Bị & Tiện Nghi', 'type' => 'textarea',
                'instructions' => 'Mỗi tiện ích 1 dòng (vd: Điều hòa, Wi-Fi miễn phí, Bồn tắm Jacuzzi...).', 'rows' => 5],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 4. REST API Endpoints & Order Handlers                             */
/* ------------------------------------------------------------------ */
add_action('rest_api_init', function () {
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
