import React, { useState, useEffect, useRef } from 'react';

function Carousel({ images, speed = 50 }) {
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    let animationFrame;
    let lastTimestamp;

    const animate = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;

      if (!isHovered) {
        setPosition(prev => {
          const newPosition = prev - (speed * delta) / 1000;
          return newPosition <= -containerWidth ? 0 : newPosition;
        });
      }

      lastTimestamp = timestamp;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [containerWidth, speed, isHovered]);

  // Duplicate images to create seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <div 
      className="marquee-container"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="marquee-track"
        style={{ transform: `translateX(${position}px)` }}
      >
        {duplicatedImages.map((image, index) => (
          <div key={index} className="marquee-slide">
            <img 
              src={image.url} 
              alt={image.alt} 
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel; 