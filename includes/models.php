<?php

add_action('init', function () {
    register_post_type('work', [
        'labels' => [
            'name' => __('Obres', 'oriol-mora'),
            'singular_name' => __('Obra', 'oriol-mora'),
        ],
        'has_archive' => true,
        'public' => true,
        'public_queryable' => true,
        'menu_icon' => 'dashicons-admin-customizer',
        'menu_position' => 10,
        'query_var' => true,
        'show_in_menu' => true,
        'show_ui' => true,
        'show_in_rest' => true,
        'supports' => [
            'title',
            'author',
            'escerpt',
            'custom-fields',
            'thumbnail',
        ],
        'rewrite' => ['work' => 'obres'],
        'taxonomies' => ['category'],
    ]);
});
