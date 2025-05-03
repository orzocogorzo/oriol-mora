<?php

add_filter(
    'block_type_metadata_settings',
    function ($settings, $metadata) {
        if (
            isset($metadata['name'], $settings['render_callback']) &&
            'core/template-part' === $metadata['name'] &&
            $settings['render_callback'] === 'render_block_core_template_part'
        ) {
            $settings['render_callback'] =
                'wpct_localized_template_part_render_callback';
        }

        return $settings;
    },
    20,
    2
);

add_filter(
    'get_block_templates',
    function ($query_result, $query, $type) {
        $is_wpml_active = defined('ICL_SITEPRESS_VERSION');
        if ($is_wpml_active) {
            return $query_result;
        }

        if (empty($query['slug__in'])) {
            return $query_result;
        } else {
            $names = array_filter($query['slug__in'], function ($slug) {
                return wpct_is_localized_template($slug) === false;
            });
        }

        $custom_localized_templates = wpct_get_localized_templates_from_db(
            $names,
            $type
        );

        foreach ($custom_localized_templates as $custom_template) {
            [$base_name] = wpct_split_localized_template_name(
                $custom_template->slug
            );
            $index = array_search($base_name, $names);
            if ($index !== false) {
                unset($names[$index]);
            }
        }

        $names = array_values(array_unique($names));

        $localized_templates = [];
        foreach ($names as $name) {
            $localized_template = wpct_get_localized_template_from_file(
                $name,
                $type
            );
            if ($localized_template) {
                $localized_templates[] = $localized_template;
            }
        }

        $localized_templates = array_merge(
            $custom_localized_templates,
            $localized_templates
        );
        if (empty($localized_templates)) {
            return $query_result;
        }

        $localized_query_result = [];

        for ($i = 0; $i < count($query['slug__in']); $i++) {
            $query_slug = $query['slug__in'][$i];
            $found_localized = false;

            foreach ($localized_templates as $template) {
                [$base_name] = wpct_split_localized_template_name(
                    $template->slug
                );

                $found_localized = $base_name === $query_slug;
                if ($found_localized) {
                    $localized_query_result[] = $template;
                }
            }

            if (!$found_localized) {
                foreach ($query_result as $template) {
                    if ($template->slug === $query_slug) {
                        $localized_query_result[] = $template;
                    }
                }
            }
        }

        return $localized_query_result;
    },
    10,
    3
);

add_filter(
    'pre_get_block_file_template',
    function ($template, $id, $type) {
        $name_parts = explode('//', $id);

        if (count($name_parts) < 2) {
            return $template;
        }

        [$template_id, $name] = $name_parts;

        if ($template_id !== get_stylesheet()) {
            return $template;
        }

        $localized_template = wpct_get_localized_template_from_file(
            $name,
            $type
        );
        if (!$localized_template) {
            return $template;
        }

        return $localized_template;
    },
    15,
    3
);

function wpct_is_localized_template($name)
{
    [$base_name, $locale] = wpct_split_localized_template_name($name);
    return $name === $base_name . '-' . $locale;
}

function wpct_split_localized_template_name($name)
{
    $locale = strtolower(get_locale());
    if (
        preg_match('/-([a-z]{2}(_[a-z]{2})?)$/', $name, $matches) &&
        strtolower($matches[1]) === $locale
    ) {
        $name = str_replace($matches[0], '', $name);
        $locale = $matches[1];
    }

    return [$name, $locale];
}

function wpct_get_theme_localized_template($type, $name, $locale = null)
{
    $locale = $locale ?: strtolower(get_locale());

    if ($type === 'wp_template') {
        return wpct_get_theme_localized_custom_template($name, $locale);
    } elseif ($type === 'wp_template_part') {
        return wpct_get_theme_localized_template_part($name, $locale);
    }
}

function wpct_get_theme_localized_custom_template($name, $locale)
{
    $theme_json_data = WP_Theme_JSON_Resolver::get_theme_data();

    $custom_templates = $theme_json_data->get_data()['customTemplates'] ?? [];

    if (empty($custom_templates)) {
        return;
    }

    foreach ($custom_templates as $data) {
        if (
            preg_match(
                strtolower('/' . $name . '-(' . $locale . ')$/'),
                strtolower($data['name']),
                $matches
            )
        ) {
            $data['locale'] = $matches[1];
            return $data;
        } elseif (
            isset($data['locale']) &&
            $data['locale'] === $locale &&
            $data['name'] === $name
        ) {
            return $data;
        }
    }
}

function wpct_get_theme_localized_template_part($name, $locale)
{
    $theme_json_data = WP_Theme_JSON_Resolver::get_theme_data();

    $template_parts = $theme_json_data->get_data()['templateParts'] ?? [];

    if (empty($template_parts)) {
        return;
    }

    foreach ($template_parts as $data) {
        if (
            preg_match(
                strtolower('/' . $name . '-(' . $locale . ')$/'),
                strtolower($data['name']),
                $matches
            )
        ) {
            $data['locale'] = $matches[1];
            return $data;
        } elseif (
            isset($data['locale']) &&
            $data['locale'] === $locale &&
            $data['name'] === $name
        ) {
            return $data;
        }
    }
}

function wpct_get_localized_template_from_file($name, $type)
{
    [$base_name, $locale] = wpct_split_localized_template_name($name);
    $localized = wpct_get_theme_localized_template($type, $base_name, $locale);

    if (!$localized) {
        return;
    }

    $localized_file = _get_block_template_file($type, $localized['name']);

    if (!$localized_file) {
        return;
    }

    return _build_block_template_result_from_file($localized_file, $type);
}

function wpct_get_localized_templates_from_db($names, $type = 'wp_template')
{
    $query_args = [
        // 'post_status' => ['auto-draft', 'draft', 'publish'],
        'post_type' => $type,
        'posts_per_page' => -1,
        'no_found_rows' => true,
        'lazy_load_term_meta' => false,
        'tax_query' => [
            [
                'taxonomy' => 'wp_theme',
                'field' => 'name',
                'terms' => get_stylesheet(),
            ],
        ],
    ];

    if (!empty($names)) {
        $localized_names = [];
        foreach ($names as $name) {
            [$base_name, $locale] = wpct_split_localized_template_name($name);
            $localized = wpct_get_theme_localized_template(
                $type,
                $base_name,
                $locale
            );

            if ($localized && $localized['name'] !== $name) {
                $localized_names[] = $localized['name'];
            }
        }

        if (empty($localized_names)) {
            return [];
        }

        $query_args['post_name__in'] = $localized_names;
        $query_args['posts_per_page'] = count(array_unique($localized_names));
    }

    $posts = get_posts($query_args);

    $templates = [];
    foreach ($posts as $post) {
        $template = _build_block_template_result_from_post($post);
        if (!is_wp_error($template)) {
            $templates[] = $template;
        }
    }

    return $templates;
}

function wpct_localized_template_part_render_callback($attributes)
{
    static $seen_ids = [];

    $theme = $attributes['theme'] ?? get_stylesheet();

    if (isset($attributes['slug']) && $theme === get_stylesheet()) {
        [$base_name, $locale] = wpct_split_localized_template_name(
            $attributes['slug']
        );
        $localized_name = $base_name . '-' . $locale;
        $localized_id = $theme . '//' . $localized_name;

        $template_part = get_block_template($localized_id, 'wp_template_part');

        if ($template_part && !empty($template_part->content)) {
            if (isset($seen_ids[$localized_id])) {
                return WP_DEBUG && WP_DEBUG_DISPLAY
                    ? __('[block rendering halted]', 'wp-coop-theme')
                    : '';
            }

            $area = $template_part->area ?? null;

            $area_definition = null;
            $defined_areas = get_allowed_block_template_part_areas();
            foreach ($defined_areas as $defined_area) {
                if ($defined_area['area'] === $area) {
                    $area_definition = $defined_area;
                    break;
                }
            }

            if (!$area_definition) {
                $area_definition = WP_TEMPLATE_PART_AREA_UNCATEGORIZED;
            }

            $content = shortcode_unautop($template_part->content);
            $content = do_shortcode($content);

            $seen_ids[$localized_id] = true;
            $content = do_blocks($content);
            unset($seen_ids[$localized_id]);

            $content = wptexturize($content);
            $content = convert_smilies($content);
            $content = wp_filter_content_tags(
                $content,
                "template_part_{$template_part->area}"
            );

            // Handle embeds for block template parts.
            global $wp_embed;
            $content = $wp_embed->autoembed($content);

            if (
                empty($attributes['tagName']) ||
                tag_escape($attributes['tagName']) !== $attributes['tagName']
            ) {
                $area_tag = 'div';
                if ($area_definition && isset($area_definition['area_tag'])) {
                    $area_tag = $area_definition['area_tag'];
                }
                $html_tag = $area_tag;
            } else {
                $html_tag = esc_attr($attributes['tagName']);
            }

            $wrapper_attributes = get_block_wrapper_attributes();
            return "<$html_tag $wrapper_attributes>" .
                str_replace(']]>', ']]&gt;', $content) .
                "</$html_tag>";
        }
    }

    return render_block_core_template_part($attributes);
}
