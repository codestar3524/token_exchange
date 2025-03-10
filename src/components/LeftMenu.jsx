import React from 'react';

const LeftMenu = () => {
  return (
    <div className="left-menu-wrap" id="left_menu_wrap">
      <div id="left_menu_btn">
        <div>
          <span />
          <span />
          <span />
        </div>
      </div>
      <nav className="left-menu" id="left_menu">
        <section>
          <ul id="left_menu_content" className="menu linkhl">
            <li className="menu-head">
              <span>Payrius</span>
            </li>
            <li>
              <a href="#about">Contact</a>
            </li>
            <li className="menu-head">
              <span>Rules</span>
            </li>
            <li>
              <a href="#terms-of-service">Terms of Service</a>
            </li>
            <li>
              <a href="#privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </section>
      </nav>
    </div>
  );
};

export default LeftMenu;