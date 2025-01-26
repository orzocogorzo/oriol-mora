<?php

add_action('init', function () {
    register_block_type(__DIR__ . '/build');
});

if (!is_admin()) {
    add_shortcode('wpct_custom_fields', function ($atts, $content = '') {
        $post_id = get_the_ID();

        // Gets replacement marks and exit if not found
        preg_match_all('/{{([^}]+)}}/', $content, $matches);
        if (empty($matches)) {
            return $content;
        }

        // Filters empty replace marks and trim its content
        $fields = array_values(
            array_filter(
                array_map(static function ($match) {
                    return trim($match);
                }, $matches[1]),
                static function ($field) {
                    return $field;
                }
            )
        );

        // Exit if no fields is defined
        if (empty($fields)) {
            return $content;
        }

        // Get remote field values
        $values = array_map(function ($field) use ($post_id) {
            return get_post_meta($post_id, $field, true);
        }, $fields);

        try {
            // Replace anchors on the shortcode content with values
            for ($i = 0; $i < count($fields); $i++) {
                $field = $fields[$i];
                $value = (string) $values[$i];
                $content = preg_replace(
                    '/{{' . preg_quote($field, '/') . '}}/',
                    $value,
                    $content
                );
            }

            return $content;
        } catch (ValueError $e) {
            return $e->getMessage();
        }
    });
}
