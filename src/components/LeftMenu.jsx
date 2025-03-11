import React, { useEffect } from 'react';

const LeftMenu = () => {
  useEffect(() => {
    // Add click event listener to the menu button
    const menuBtn = document.getElementById('left_menu_btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', toggleMenu);
    }

    // Clean up event listener when component unmounts
    return () => {
      if (menuBtn) {
        menuBtn.removeEventListener('click', toggleMenu);
      }
    };
  }, []);

  const toggleMenu = () => {
    const menuWrap = document.getElementById('left_menu_wrap');
    if (menuWrap) {
      // Toggle the 'opened' class that your CSS already uses
      if (menuWrap.classList.contains('active')) {
        menuWrap.classList.remove('active');
      } else {
        menuWrap.classList.add('active');
      }
    }
  };

  return (
    <div className="left-menu-wrap" id="left_menu_wrap">
      <div id="left_menu_btn">
        <div><span></span><span></span><span></span></div>
      </div>
      <nav className="left-menu" id="left_menu">
        <section>
          <ul id="left_menu_content" className="menu linkhl">
            <li className="menu-head"><span>Payrius</span></li>
            <li><a href="/about">About</a></li>
            <li className="menu-head"><span>Rules</span></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
          </ul>
        </section>
      </nav>
    </div>
  );
};

export default LeftMenu;