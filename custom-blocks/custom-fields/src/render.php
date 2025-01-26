<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 */

$is_remote_frontend = shortcode_exists('wpct_custom_fields');

if ($is_remote_frontend) {
    echo do_shortcode("[wpct_custom_fields]{$content}[/wpct_custom_fields]");
} else {
    echo $content;
}
