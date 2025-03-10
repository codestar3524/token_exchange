import React from 'react';

const MainBackground = () => {
  return (
    <div className="main-background">
      {/* Ocean waves effect */}
      <div className="ocean">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
        <div className="wave wave4"></div>
      </div>
      
      {/* Existing elements */}
      <img className="coin-bubble" width={250} src="/assets/images/Etherium-1.png" alt="" />
      {/* <img className="coin-bubble" width={100} src="/assets/images/Etherium-2.png" alt="" /> */}
      {/* <img className="line-mark" src="/assets/images/line-mark.png" alt="" /> */}
      
      <div className="main-bg-comets">
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
      </div>
    </div>
  );
};

export default MainBackground;