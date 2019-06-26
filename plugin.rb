# name: plugin_spongepowered_navbar
# about: Adds the SpongePowered navigation bar header
# authors: Luke Granger-Brown (lukegb)

register_asset "stylesheets/sponge-navbar.scss"

register_svg_icon "home" if respond_to?(:register_svg_icon)
register_svg_icon "comments" if respond_to?(:register_svg_icon)
register_svg_icon "code" if respond_to?(:register_svg_icon)
register_svg_icon "book" if respond_to?(:register_svg_icon)
register_svg_icon "graduation-cap" if respond_to?(:register_svg_icon)
register_svg_icon "download" if respond_to?(:register_svg_icon)
register_svg_icon "comment" if respond_to?(:register_svg_icon)
