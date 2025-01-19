<?php

/**
 * Oriol Mora Theme functions and definitions
 *
 * @link https://developers.wordpress.org/themes/basics/theme-functions/
 *
 * @package Oriol Mora
 * @since 1.0.0
 */

require_once 'custom-blocks/slider/slider.php';
require_once 'custom-blocks/slider-loop/slider-loop.php';
require_once 'custom-blocks/slider-row/slider-row.php';

require_once 'includes/models.php';

add_action(
    'after_setup_theme',
    function () {
        add_theme_support('title-tag');
        add_theme_support('html5', [
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ]);
        add_theme_support('custom-logo');
        add_theme_support('post-thumbnails');
        add_theme_support('custom-line-height');
        add_theme_support('align-wide');
        add_theme_support('border');
        add_theme_support('link-color');
        add_theme_support('block-template-parts');

        // Add support for block styles.
        add_theme_support('wp-block-styles');
    },
    90
);

add_action('after_setup_theme', function () {
    $uri = get_theme_file_uri('assets/css/theme.bundle.css');
    add_editor_style($uri);
    add_filter(
        'http_request_args',
        function ($args, $url) use ($uri) {
            if ($url === $uri) {
                $args['sslverify'] = false;
            }
            return $args;
        },
        10,
        2
    );
});

add_action('wp_enqueue_scripts', function () {
    $theme = wp_get_theme();
    $parent = $theme->parent();

    wp_enqueue_style(
        $parent->get_stylesheet(),
        $parent->get_stylesheet_directory_uri() . '/style.css',
        [],
        $parent->get('Version')
    );

    wp_enqueue_style(
        $theme->get_stylesheet(),
        $theme->get_stylesheet_directory_uri() . '/style.css',
        [],
        $theme->get('Version')
    );

    wp_enqueue_script(
        $theme->get_stylesheet(),
        $theme->get_stylesheet_directory_uri() . '/assets/js/theme.bundle.js',
        [],
        $theme->get('Version')
    );

    $gfonts_url = '';
    if ($gfonts_url) {
        wp_enqueue_style(
            $theme->get_stylesheet() . '-fonts',
            $gfonts_url,
            [],
            null
        );
    }

    wp_enqueue_style('wp-block-paragraph');
});

add_action('admin_menu', function () {
    add_menu_page(
        'Reusable Blocks',
        'Reusable Blocks',
        'edit_posts',
        'edit.php?post_type=wp_block',
        '',
        'dashicons-editor-table',
        22
    );
});

add_action('after_setup_theme', function () {
    $theme = wp_get_theme();
    $domain = $theme->get('TextDomain');
    $path = $theme->get('DomainPath');
    load_theme_textdomain($domain, $theme->get_stylesheet_directory() . $path);
});

add_filter('comments_open', '__return_false', 20, 2);
add_filter('pings_open', '__return_false', 20, 2);
add_filter('should_load_remote_block_patterns', '__return_false', 90);

add_action('admin_init', function () {
    add_settings_section(
        'oriol-mora-smtp',
        __('SMTP email sending', 'oriol-mora'),
        function () {
            echo __(
                'Configure WP to send emails through your SMTP server',
                'oriol-mora'
            );
        },
        'general'
    );

    add_settings_field(
        'oriol-mora-smtp',
        __('Credentials', 'oriol-mora'),
        'oriol_mora_smtp_credentials',
        'general',
        'oriol-mora-smtp'
    );

    register_setting('general', 'oriol-mora-smtp', [
        'type' => 'object',
        'show_in_rest' => false,
        'default' => [
            'enabled' => false,
            'host' => '',
            'port' => '',
            'secure' => '',
            'username' => '',
            'password' => '',
            'from' => '',
        ],
    ]);
});

function oriol_mora_smtp_credentials()
{
    $value = (array) get_option('oriol-mora-smtp', []);

    echo '<fieldset style="width:fit-content">';
    echo '<legend class="screen-reader-text"><span>Credencials SMTP</span></legend>';
    oriol_mora_smtp_field('checkbox', 'enabled', (bool) $value['enabled']);
    oriol_mora_smtp_field('text', 'host', $value['host']);
    oriol_mora_smtp_field('text', 'port', $value['port']);
    oriol_mora_smtp_field('select', 'secure', $value['secure'], ['tls', 'ssl']);
    oriol_mora_smtp_field('text', 'username', $value['username']);
    oriol_mora_smtp_field('password', 'password', $value['password']);
    oriol_mora_smtp_field('text', 'from', $value['from']);
    echo '</fieldset>';
}

function oriol_mora_smtp_field($type, $name, $value, $options = [])
{
    $label = __($name, 'oriol-mora');
    echo "<label style='display:flex;justify-content:space-between;width:100%'><b style='margin-right:1em'>{$label}</b>";
    if ($type === 'select') {
        $options =
            '<option></option>' .
            implode(
                '',
                array_map(function ($opt) use ($value) {
                    $label = __($opt, 'oriol-mora');
                    $selected = $value === $opt ? 'selected' : '';
                    return "<option value='{$opt}' {$selected}>{$label}</option>";
                }, $options)
            );
        echo "<select id='oriol-mora-smtp[{$name}]' name='oriol-mora-smtp[{$name}]' style='width:196px'>{$options}</select>";
    } elseif ($type === 'checkbox') {
        $checked = $value ? 'checked' : '';
        echo "<input type='checkbox' name='oriol-mora-smtp[{$name}]' id='oriol-mora-smtp[{$name}]' {$checked} />";
    } else {
        echo "<input type='{$type}' name='oriol-mora-smtp[{$name}]' id='oriol-mora-smtp[{$name}]' value='{$value}' />";
    }
    echo '</label><br />';
}

add_action('phpmailer_init', function ($phpmailer) {
    $smtp = (array) get_option('oriol-mora-smtp', []);
    if ($enabled = $smtp['enabled'] ?? false) {
        return;
    }

    if (
        !(
            $smtp['host'] &&
            $smtp['port'] &&
            $smtp['secure'] &&
            $smtp['username'] &&
            $smtp['password']
        )
    ) {
        return;
    }

    extract($smtp);
    $phpmailer->isSMTP();
    $phpmailer->Host = $host;
    $phpmailer->Port = (int) $port;
    $phpmailer->SMTPSecure = $secure;
    $phpmailer->SMTPAuth = true;
    $phpmailer->Username = $username;
    $phpmailer->Password = $password;
    $phpmailer->From = $username;
    if (!empty($from)) {
        $phpmailer->FromName = $from;
        $phpmailer->addReplyTo($username, $from);
    }
});

add_action('wp_mail_failed', function ($error) {
    error_log('# WP Email Error');
    error_log(print_r($error, true));
});

add_action(
    'init',
    function () {
        $registry = WP_Block_Patterns_Registry::get_instance();
        $theme = wp_get_theme();
        $parent = $theme->parent();
        $patterns = $parent->get_block_patterns();
        foreach ($patterns as $file => $pattern_data) {
            $categories = $pattern_data['categories'] ?? [];
            if (
                in_array('footer', $categories) ||
                in_array('header', $categories)
            ) {
                continue;
            }
            if ($registry->is_registered($pattern_data['slug'])) {
                unregister_block_pattern($pattern_data['slug']);
            }
        }
    },
    20
);

add_filter('wpcf7_autop_or_not', '__return_false');
