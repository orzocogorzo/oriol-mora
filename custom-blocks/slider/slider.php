<?php

add_action('init', function () {
    register_block_type(__DIR__ . '/build');
});

add_action('wp_enqueue_scripts', function () {
    wp_register_script(
        'slick-js',
        '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        ['jquery'],
        '1.8.1'
    );
});

add_action('after_setup_theme', function () {
    wp_enqueue_block_style('wpct-block/slider', [
        'handle' => 'slick-css',
        'src' => '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
        [],
        '1.8.1',
    ]);
});

add_filter(
    'render_block',
    function ($block_content, $block) {
        if ('wpct-block/slider' === $block['blockName']) {
            wp_enqueue_script('slick-js');
        }
        return $block_content;
    },
    10,
    2
);
