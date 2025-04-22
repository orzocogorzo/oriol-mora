<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 */

$from = $_SERVER['REQUEST_URI'] ?? '';
$is_admin = preg_match('/(wp-json|wp-admin|wp-ajax)/', $from);

if (!$is_admin) { ?>
<ul class="oriol-mora-language-switcher has-small-font-size">
	<?php pll_the_languages(['display_names_as' => 'slug']); ?>
</ul>
<?php } else { ?>
<ul class="oriol-mora-language-switcher has-small-font-size">
	<li>cat</li>
	<li>cast</li>
	<li>eng</li>
</ul>
<?php }
