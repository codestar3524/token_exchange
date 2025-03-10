import React from 'react';

const MainBackground = () => {
  return (
    <div className="main-background">
      <img className="coin-bubble" width={250} src="/assets/images/Etherium-1.png" alt="" />
      <img className="coin-bubble" width={100} src="/assets/images/Etherium-2.png" alt="" />
      <img className="line-mark"  src="/assets/images/line-mark.png" alt="" />
      <div className="main-bg-comets">
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
      </div>
      {/* <img className="main-bg" src="/assets/images/background/mainbg/ground.svg" /> */}
    </div>
  );
};

export default MainBackground;