import React from 'react';
import _ from 'lodash';

import {Link, safePrefix, classNames} from '../utils';
import ActionLink from './ActionLink';
import Submenu from './Submenu';

export default class Header extends React.Component {
    render() {
        return (
            <header id="masthead" className="site-header outer">
              <div className="inner">
                <div className="site-header-inside">
                  <div className="site-branding">
                    {_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img') ? 
                    <p className="site-logo"><Link to={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.url') || '/')}><img src={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.logo_img'))} alt={_.get(this.props, 'pageContext.site.siteMetadata.header.title')} /></Link></p>
                     : 
                    <p className="site-title"><Link to={safePrefix(_.get(this.props, 'pageContext.site.siteMetadata.header.url') || '/')}>{_.get(this.props, 'pageContext.site.siteMetadata.header.title')}</Link></p>
                    }
                  </div>
                  {_.get(this.props, 'pageContext.site.siteMetadata.header.has_nav') && <React.Fragment>
                  <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
                    <div className="site-nav-inside">
                      <button id="menu-close" className="menu-toggle"><span className="screen-reader-text">Open Menu</span><span className="icon-close" aria-hidden="true" /></button>
                      <ul className="menu">
                        {_.map(_.get(this.props, 'pageContext.site.siteMetadata.header.nav_links'), (action, action_idx) => (
                        <li key={action_idx} className={classNames('menu-item', {'has-children': _.get(action, 'has_subnav') && _.get(action, 'subnav_links'), 'current': _.get(this.props, 'pageContext.url') === _.get(action, 'url'), 'menu-button': _.get(action, 'type') !== 'link'})}>
                          <ActionLink {...this.props} action={action} />
                          {(_.get(action, 'has_subnav') && _.get(action, 'subnav_links')) && 
                            <Submenu {...this.props} submenu={_.get(action, 'subnav_links')} menu_class={'submenu'} page={this.props.pageContext} />
                          }
                        </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                  <button id="menu-open" className="menu-toggle"><span className="screen-reader-text">Close Menu</span><span className="icon-menu" aria-hidden="true" /></button>
                  </React.Fragment>}
                </div>
              </div>
            </header>
        );
    }
}
