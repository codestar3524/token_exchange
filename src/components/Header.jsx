import React from 'react';
import LeftMenu from './LeftMenu';

const Header = () => {
  return (
    <header id="header">
      <div className="wrapper">
        <LeftMenu />
        <nav>
          <a href="/" id="logo" className="logo darkbg">
            <span className="logo-text-fixed" id="logo_text_from" data-value="ETH" />
            <div className="ico">
              <span className="logo-arrow-from" id="logo_arrow_from" />
              <span className="logo-arrow-to" id="logo_arrow_to" />
            </div>
            <span className="logo-text-float" id="logo_text_to" data-value="BTC" />
          </a>
          <div className="nav-right">
            <ul className="nav menu hoverhl">
            </ul>
            <div className="loc hoverhl">
              <div className="menu-focus-opened">
              </div>
            </div>
            <div className="nav userbar hoverhl">
            </div>
          </div>
        </nav>
        <div className="shadow-body" />
      </div>
    </header>
  );
};

export default Header;