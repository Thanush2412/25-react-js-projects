import React, { useState, useEffect, useRef } from 'react';
import './AnimatedSVG.css';

const AnimatedSVG = () => {
  const [mousePosition, setMousePosition] = useState({ x: 200, y: 200 });
  const [particles, setParticles] = useState([]);
  const svgRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Initialize particles
  useEffect(() => {
    const initialParticles = Array.from({ length: 50 }, (_, index) => ({
      id: index,
      x: Math.random() * 400,
      y: Math.random() * 400,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
      hue: Math.random() * 60 + 180, // Blue to purple range
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(initialParticles);
  }, []);

  // Handle mouse movement
  const handleMouseMove = (event) => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  // Update particle positions
  useEffect(() => {
    const updateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Calculate distance from mouse
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Apply repulsion force when mouse is close
          let newSpeedX = particle.speedX;
          let newSpeedY = particle.speedY;

          if (distance < 100) {
            const force = (100 - distance) / 100;
            newSpeedX -= (dx / distance) * force * 0.5;
            newSpeedY -= (dy / distance) * force * 0.5;
          }

          // Update position
          let newX = particle.x + newSpeedX;
          let newY = particle.y + newSpeedY;

          // Bounce off edges
          if (newX < 0 || newX > 400) {
            newSpeedX *= -0.8;
            newX = Math.max(0, Math.min(400, newX));
          }
          if (newY < 0 || newY > 400) {
            newSpeedY *= -0.8;
            newY = Math.max(0, Math.min(400, newY));
          }

          // Add some randomness to movement
          newSpeedX += (Math.random() - 0.5) * 0.1;
          newSpeedY += (Math.random() - 0.5) * 0.1;

          // Limit speed
          const maxSpeed = 2;
          const currentSpeed = Math.sqrt(newSpeedX * newSpeedX + newSpeedY * newSpeedY);
          if (currentSpeed > maxSpeed) {
            newSpeedX = (newSpeedX / currentSpeed) * maxSpeed;
            newSpeedY = (newSpeedY / currentSpeed) * maxSpeed;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(updateParticles);
    };

    animationFrameRef.current = requestAnimationFrame(updateParticles);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div className="animated-svg-container">
      <h2>Interactive Particle Flow</h2>
      <p className="description">Move your mouse to interact with the particles</p>
      
      <div className="svg-wrapper">
        <svg
          ref={svgRef}
          viewBox="0 0 400 400"
          className="animated-svg"
          onMouseMove={handleMouseMove}
        >
          {/* Background gradient */}
          <defs>
            <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.4)" />
            </radialGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx="200"
            cy="200"
            r="200"
            fill="url(#bg-gradient)"
            className="background-circle"
          />

          {/* Particles */}
          {particles.map((particle) => (
            <circle
              key={particle.id}
              cx={particle.x}
              cy={particle.y}
              r={particle.size}
              className="particle"
              style={{
                fill: `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`,
              }}
            />
          ))}

          {/* Mouse interaction area */}
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="100"
            className="mouse-area"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedSVG; 