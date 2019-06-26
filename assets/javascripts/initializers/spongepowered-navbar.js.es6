import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { iconNode } from 'discourse/helpers/fa-icon-node';
import { wantsNewWindow } from 'discourse/lib/intercept-click';
import DiscourseURL from 'discourse/lib/url';

import * as HomeLogo from 'discourse/widgets/home-logo';

export default {
  name: 'spongepowered-navbar',
  initialize() {
    HomeLogo.default = createWidget('home-logo', {
      tagName: 'div.title',

      settings: {
        href: '/',
      },

      href() {
        const href = this.settings.href;
        return (typeof href === "function") ? href() : href;
      },

      click(e) {
        var $target = $(e.target);
        if (!$target.closest(".sp-forums-home").length && !!$target.closest(".sp-skip-handler").length) return true;
        if (!!$target.closest(".sp-menu-toggle").length) {
          // check to see if we currently have the menu open
          if ($(".sp-logo-container").is(":focus")) {
            // blur it
            $(".sp-logo-container").blur();
          } else {
            $(".sp-logo-container").focus();
          }

          e.preventDefault();
          return true;
        }

        if (wantsNewWindow(e)) { return false; }
        e.preventDefault();

        DiscourseURL.routeToTag($target.closest('a')[0]);
        return false;
      },

      spContainerClass() {
        const classes = [];
        classes.push(this.attrs.minimized ? 'sp-logo-small' : 'sp-logo-not-small');
        classes.push(this.showMobileLogo ? 'sp-logo-mobile': 'sp-logo-not-mobile');
        classes.push(this.site.mobileView ? 'sp-mobileview' : 'sp-not-mobileview');
        return classes.join('.');
      },

      logo() {
        const { siteSettings } = this;
        const mobileView = this.site.mobileView;

        const mobileLogoUrl = siteSettings.site_mobile_logo_url || "";
        const showMobileLogo = mobileView && (mobileLogoUrl.length > 0);

        const logoUrl = siteSettings.site_logo_url || '';
        const title = siteSettings.title;

        if (!mobileView && this.attrs.minimized) {
          const logoSmallUrl = siteSettings.site_logo_small_url || '';
          if (logoSmallUrl.length) {
            return h('img#site-logo.logo-small', { key: 'logo-small', attributes: { src: logoSmallUrl, alt: title } });
          } else {
            return iconNode('home');
          }
        } else if (showMobileLogo) {
          return h('img#site-logo.logo-big', { key: 'logo-mobile', attributes: { src: mobileLogoUrl, alt: title } });
        } else if (logoUrl.length) {
          return [
            h('img#site-logo.logo-big', { key: 'logo-big', attributes: { src: logoUrl, alt: title, height: 40, width: 40 } }),
            h('h1#site-text-logo.text-logo', { key: 'logo-text' }, 'Sponge'),
          ];
        } else {
          return h('h1#site-text-logo.text-logo', { key: 'logo-text' }, 'Sponge');
        }
      },

      ulTo(linkTo, id, icon, text) {
        const attributes = { a: { href: linkTo }, li: {} };

        if (id == 'forums') {
            attributes.a.class = 'sp-forums-home';
            attributes.li.class = 'active';
        }

        return h('a', { key: `sp-link-${id}`, attributes: attributes.a },
          h('li', { key: `sp-li-${id}`, attributes: attributes.li }, [
            icon, ' ', text,
          ])
        );
      },

      oreIcon() {
        return h('img.fa.d-icon.ore-logo', {
          key: 'sp-img-ore',
          attributes: {
            src: 'https://www.spongepowered.org/assets/img/icons/ore.svg',
            alt: '',
          },
        });
      },

      html() {
        return h(`a.sp-logo-container.${this.spContainerClass()}`, { key: 'sp-logo-container' }, [
          h('a.sp-logo-link', { attributes: { href: this.href(), 'data-auto-route': true } }, this.logo()),
          h('.div.sp-logo-bg', { key: 'sp-logo-bg' }),
          h(this.site.mobileView ? 'a.sp-logo-chevron.sp-menu-toggle' : 'div.sp-logo-chevron', { key: 'sp-logo-chevron' },
            iconNode('chevron-down', { attributes: { style: 'vertical-align: middle' } })
          ),
          h('div.sp-logo-menu.sp-skip-handler', [
            h('ul.sp-logo-dropdown#ddleft', { key: 'sp-logo-dropdown' }, [
              this.ulTo('https://www.spongepowered.org', 'home', iconNode('home'), 'Homepage', false),
              this.ulTo('https://forums.spongepowered.org', 'forums', iconNode('comments'), 'Forums', false),
              this.ulTo('https://github.com/SpongePowered', 'github', iconNode('code'), 'Code', false),
              this.ulTo('https://docs.spongepowered.org', 'docs', iconNode('book'), 'Docs', false),
              this.ulTo('https://jd.spongepowered.org', 'jd', iconNode('graduation-cap'), 'Javadocs', false),
              this.ulTo('https://ore.spongepowered.org', 'plugins', this.oreIcon(), 'Plugins (Ore)', false),
              this.ulTo('https://www.spongepowered.org/downloads', 'dl', iconNode('download'), 'Downloads', false),
              this.ulTo('https://www.spongepowered.org/chat', 'chat', iconNode('comment'), 'Chat', false),
            ]),
          ]),
        ]);
      },

    });
  }
};
