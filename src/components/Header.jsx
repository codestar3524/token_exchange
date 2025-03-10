import React, { useEffect, useRef } from 'react';
import LeftMenu from './LeftMenu';

const Header = () => {
  const edgeRef = useRef(null);

  useEffect(() => {
    // Code to generate the 3D coin edge
    if (edgeRef.current) {
      const edge = edgeRef.current;
      const segments = 120; // More segments for smoother edge
      const coinRadius = 50; // Adjusted for better fit
      const thickness = 10;   // Coin thickness in pixels
      const centerOffset = 50; // Center of the coin (200px width / 2)

      // Calculate circumference = 2 * PI * radius
      const circumference = 2 * Math.PI * coinRadius;
      // Calculate each segment width = circumference / number of segments
      const segmentWidth = circumference / segments;

      // Clear any existing segments
      while (edge.firstChild) {
        edge.removeChild(edge.firstChild);
      }

      for (let i = 0; i < segments; i++) {
        const segment = document.createElement('div');
        segment.className = 'edge-segment';

        // Set the width for this segment
        segment.style.width = `${segmentWidth}px`;

        // Calculate angle in degrees and convert to radians
        const angle = i * (360 / segments);
        const radian = angle * (Math.PI / 180);

        // Calculate x and z positions using trigonometry to form a perfect circle
        const x = Math.sin(radian) * coinRadius;
        const z = Math.cos(radian) * coinRadius;

        // Position and rotate the segment - center correctly relative to the coin center
        segment.style.transform = `translate3d(${x + centerOffset - segmentWidth / 2}px, 0, ${z}px) rotateY(${angle}deg)`;

        // Add the segment to the edge
        edge.appendChild(segment);
      }
    }
  }, []);
  return (
    <header id="header">
      <div className="wrapper">
        {/* <LeftMenu /> */}
        <nav>
          <a href="/" id="logo" className="logo darkbg flex items-center">
            <div className="coin-container">
              <div className="scene">
                <div className="coin">
                  <div className="coin-front"></div>
                  <div className="coin-back"></div>
                  <div className="coin-edge" id="edge" ref={edgeRef}></div>
                </div>
              </div>
            </div>
            <h2>Payrius Exchange</h2>
          </a>
        </nav>
        <div className="shadow-body" />
      </div>
    </header>
  );
};

export default Header;