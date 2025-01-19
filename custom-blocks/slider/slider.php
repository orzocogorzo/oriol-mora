<?php

add_action('init', 'wpct_block_slider_init');
function wpct_block_slider_init()
{
    register_block_type(__DIR__ . '/build');
}

add_action('wp_enqueue_scripts', 'wpct_block_slider_scripts');
function wpct_block_slider_scripts()
{
    wp_enqueue_script(
        'slick-slider-js',
        '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js',
        ['jquery'],
        '1.8.1'
    );

    wp_enqueue_style(
        'slick-slider-css',
        '//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css',
        [],
        '1.8.1'
    );
}
