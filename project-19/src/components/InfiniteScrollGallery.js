import React, { useState, useEffect, useRef, useCallback } from 'react';
import { images as initialImages } from '../data';
import './InfiniteScrollGallery.css';

const InfiniteScrollGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef();

  const lastImageElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading]);

  useEffect(() => {
    const loadMoreImages = () => {
      setLoading(true);
      // Simulate loading delay
      setTimeout(() => {
        const newImages = initialImages.map(img => ({
          ...img,
          id: img.id + (page - 1) * 10,
          url: img.url.replace(/\d+$/, (page * 10 + img.id) % 100)
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
        setLoading(false);
      }, 1000);
    };

    loadMoreImages();
  }, [page]);

  const handleImageClick = (imageUrl) => {
    window.open(imageUrl, '_blank');
  };

  return (
    <div className="gallery-container">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={index === images.length - 1 ? lastImageElementRef : null}
            className="image-card"
            onClick={() => handleImageClick(image.url)}
          >
            <div className="image-wrapper">
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
              />
              <div className="image-overlay">
                <div className="image-info">
                  <p className="author">
                    Photo by{' '}
                    <a
                      href={image.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {image.author}
                    </a>
                  </p>
                  <p className="likes">❤️ {image.likes}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {loading && (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollGallery; 