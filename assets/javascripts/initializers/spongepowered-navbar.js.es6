import { iconHTML } from 'discourse/helpers/fa-icon';

export default {
  name: 'spongepowered-navbar',
  initialize() {
    require('discourse/components/home-logo').default.reopen({
      click: function(e) {
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
    
        return this._super(e);
      },
    
      spContainerClass() {
        const classes = [];
        classes.push(this.get('minimized') ? 'sp-logo-small' : 'sp-logo-not-small');
        classes.push(this.showMobileLogo ? 'sp-logo-mobile': 'sp-logo-not-mobile');
        classes.push(this.site.mobileView ? 'sp-mobileview' : 'sp-not-mobileview');
        return classes.join(' ');
      },
    
      render(buffer) {
        const { siteSettings } = this;
        const logoUrl = siteSettings.logo_url || '';
        const title = siteSettings.title;
    
        buffer.push(`<div class="sp-logo-container ${this.spContainerClass()}">`);
        buffer.push(`<a href="${this.linkUrl}" data-auto-route="true" class="sp-logo-link">`);
        if (!this.site.mobileView && this.get('minimized')) {
          const logoSmallUrl = siteSettings.logo_small_url || '';
          if (logoSmallUrl.length) {
            buffer.push(`<img id='site-logo' class="logo-small" src="${logoSmallUrl}" width="33" height="33" alt="${title}">`);
          } else {
            buffer.push(iconHTML('home'));
          }
        } else if (this.showMobileLogo) {
          buffer.push(`<img id="site-logo" class="logo-big" src="${siteSettings.mobile_logo_url}" alt="${title}">`);
        } else if (logoUrl.length) {
          buffer.push(`<img id="site-logo" class="logo-big" src="${logoUrl}" alt="${title}">`);
        } else {
          buffer.push(`<h2 id="site-text-logo" class="text-logo">${title}</h2>`);
        }
        buffer.push('</a>');
        buffer.push('<div class="sp-logo-bg"></div>');
        if (!this.site.mobileView) {
          buffer.push('<div class="sp-logo-chevron">');
        } else {
          buffer.push('<a class="sp-logo-chevron sp-menu-toggle">');
        }
        buffer.push('<i class="sp-icon-down-open-big" style="vertical-align:middle"></i>');
        if (!this.site.mobileView) {
          buffer.push('</div>');
        } else {
          buffer.push('</a>');
        }
        }
        buffer.push('<div class="sp-logo-menu sp-skip-handler">');
        buffer.push('<ul class="sp-logo-dropdown" id="ddleft">');
        buffer.push('<a href="https://www.spongepowered.org"><li><i class="sp-icon-home"></i> Homepage</li></a>');
        buffer.push('<a href="https://forums.spongepowered.org" class="sp-forums-home"><li class="active"><i class="sp-icon-pencil"></i> Forums</li></a>');
        buffer.push('<a href="https://github.com/SpongePowered"><li><i class="sp-icon-code"></i> Code</li></a>');
        buffer.push('<a href="https://docs.spongepowered.org"><li><i class="sp-icon-book-open"></i> SpongeDocs</li></a>');
        buffer.push('<a href="https://jd.spongepowered.org"><li><i class="sp-icon-graduation-cap"></i> JavaDocs</li></a>');
        buffer.push('<a href="https://forums.spongepowered.org/c/plugins/plugin-releases"><li><i class="sp-icon-tools"></i> Plugins</li></a>');
        buffer.push('<a href="https://forums.spongepowered.org/t/sponge-downloads/11448"><li><i class="sp-icon-download"></i> Get Sponge</li></a>');
        buffer.push('</ul>');
        buffer.push('</div>');
        buffer.push('</div>');
      }
    
    });
  }
};
