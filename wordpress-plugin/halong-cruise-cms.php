<?php
/**
 * Plugin Name: Ha Long Cruise CMS (Visual Editor Pro v2.1)
 * Description: Quản lý toàn bộ nội dung Du Thuyền & Các Trang Tours / Trang Chủ cho Headless Next.js. Giao diện trực quan, chia Tab thông minh, dễ dùng nhất cho biên tập viên.
 * Version: 2.1.0
 * Author: Ha Long Best Cruises
 */

if (!defined('ABSPATH')) exit;

/* ------------------------------------------------------------------ */
/* 1. Đăng ký Custom Post Type: Cruises (Du Thuyền) & Inquiries       */
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
/* 2. Đăng ký Trang Cấu Hình Website & Homepage                      */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => '🌐 Cấu Hình Trang Chủ & Các Trang Tours',
            'menu_title' => '🌐 Cấu Hình Website',
            'menu_slug'  => 'site-homepage-settings',
            'capability' => 'edit_posts',
            'redirect'   => false,
            'icon_url'   => 'dashicons-admin-site-alt3',
            'show_in_rest' => true,
        ]);
    }
});

/* ------------------------------------------------------------------ */
/* 3. Cấu hình Trường Dữ Liệu ACF Trực Quan Cho Du Thuyền             */
/* ------------------------------------------------------------------ */
add_action('acf/init', function () {
    if (!function_exists('acf_add_local_field_group')) return;

    /* A. FIELDS CHO BÀI VIẾT DU THUYỀN */
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

    /* B. FIELDS CHO TRANG CẤU HÌNH SITE & HOMEPAGE */
    acf_add_local_field_group([
        'key' => 'group_site_options',
        'title' => '🌐 Quản Lý Nội Dung Trang Chủ & Các Trang Tour',
        'show_in_rest' => 1,
        'location' => [[['param' => 'options_page', 'operator' => '==', 'value' => 'site-homepage-settings']]],
        'fields' => [
            /* TAB HOMEPAGE */
            ['key' => 'tab_opt_home', 'label' => '🏠 Trang Chủ (Homepage)', 'type' => 'tab'],
            ['key' => 'field_home_title', 'name' => 'home_hero_title', 'label' => 'Tiêu Đề Banner Chính (H1)', 'type' => 'text',
                'default_value' => 'Every budget. Every travel style. One bay you\'ll never forget.'],
            ['key' => 'field_home_sub', 'name' => 'home_hero_subtitle', 'label' => 'Mô Tả Banner Phụ', 'type' => 'textarea',
                'default_value' => '64 handpicked cruises — day trips to 3-night voyages — across Ha Long, Lan Ha & Bai Tu Long Bay.', 'rows' => 2],
            ['key' => 'field_home_hero_img', 'name' => 'home_hero_image', 'label' => 'Ảnh Banner Trang Chủ', 'type' => 'image', 'return_format' => 'url'],
            ['key' => 'field_whatsapp', 'name' => 'site_whatsapp', 'label' => 'Số WhatsApp Liên Hệ', 'type' => 'text', 'default_value' => '+84905999888'],
            ['key' => 'field_email', 'name' => 'site_email', 'label' => 'Email Tư Vấn', 'type' => 'text', 'default_value' => 'hello@halongbestcruises.com'],

            /* TAB TOURS */
            ['key' => 'tab_opt_tours', 'label' => '🚢 Các Trang Tours & Điểm Đến', 'type' => 'tab'],
            ['key' => 'field_tour_day_title', 'name' => 'tour_day_title', 'label' => 'Trang Day Cruises - Tiêu Đề', 'type' => 'text', 'default_value' => 'Ha Long Bay Day Cruises'],
            ['key' => 'field_tour_2d1n_title', 'name' => 'tour_2d1n_title', 'label' => 'Trang 2D1N Cruises - Tiêu Đề', 'type' => 'text', 'default_value' => '2 Day 1 Night Ha Long Bay Cruises'],
            ['key' => 'field_tour_3d2n_title', 'name' => 'tour_3d2n_title', 'label' => 'Trang 3D2N Cruises - Tiêu Đề', 'type' => 'text', 'default_value' => '3 Day 2 Night Ha Long Bay Cruises'],
            ['key' => 'field_tour_halong_title', 'name' => 'tour_halong_title', 'label' => 'Trang Vịnh Hạ Long - Tiêu Đề', 'type' => 'text', 'default_value' => 'Ha Long Bay Cruises'],
            ['key' => 'field_tour_lanha_title', 'name' => 'tour_lanha_title', 'label' => 'Trang Vịnh Lan Hạ - Tiêu Đề', 'type' => 'text', 'default_value' => 'Lan Ha Bay Cruises'],
            ['key' => 'field_tour_baitulong_title', 'name' => 'tour_baitulong_title', 'label' => 'Trang Vịnh Bái Tử Long - Tiêu Đề', 'type' => 'text', 'default_value' => 'Bai Tu Long Bay Cruises'],
        ],
    ]);
});

/* ------------------------------------------------------------------ */
/* 4. REST API Endpoints & Order Handlers                             */
/* ------------------------------------------------------------------ */
add_action('rest_api_init', function () {
    // REST API Endpoint gửi Đơn Đặt Tàu về Admin WordPress
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
    
    // REST API Endpoint lấy Cấu Hình Website / Homepage Options
    register_rest_route('halong/v1', '/site-options', [
        'methods' => 'GET',
        'permission_callback' => '__return_true',
        'callback' => function () {
            if (function_exists('get_fields')) {
                $fields = get_fields('option');
                return new WP_REST_Response($fields ?: [], 200);
            }
            return new WP_REST_Response([], 200);
        },
    ]);
});
