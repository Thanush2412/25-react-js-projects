import React from 'react';
import Carousel from './components/Carousel';
import './App.css';

function App() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=400&fit=crop',
      alt: 'Beautiful mountain landscape with lake'
    },
    {
      url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=400&fit=crop',
      alt: 'Sunset over mountains'
    },
    {
      url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=400&fit=crop',
      alt: 'Forest landscape with trees'
    },
    {
      url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=400&fit=crop',
      alt: 'Mountain range at sunset'
    }
  ];

  return (
    <div className="App">
      <h1>Marquee Image Slider</h1>
      <div className="carousel-wrapper">
        <Carousel images={images} speed={100} />
      </div>
    </div>
  );
}

export default App;
