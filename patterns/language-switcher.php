<?php
/**
 * Title: Language Switcher
 * Slug: oriol-mora/language-switcher
 * Categories: general
 *
 * @package Oriol Mora Theme
 * @since 1.0.0
 */

$from = $_SERVER['REQUEST_URI'] ?? '';
$is_admin = preg_match('/(wp-json|wp-admin|wp-ajax)/', $from);

if (!$is_admin) {
    echo do_shortcode('[oriol_mora_language_switcher]');
} else {
     ?>

<!-- wp:list {"className":"oriol-mora-language-switcher"} -->
<ul class="wp-block-list oriol-mora-language-switcher">
	<!-- wp:list-item -->
	<li>ca</li>
	<!-- /wp:list-item -->

	<!-- wp:list-item -->
	<li>es</li>
	<!-- /wp:list-item -->

	<!-- wp:list-item -->
	<li>en</li>
	<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->

<?php
}
