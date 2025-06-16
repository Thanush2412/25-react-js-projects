import React, { useState, useRef, useEffect } from 'react';

function AccordionItem({ title, content, isOpen, onClick }) {
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${isOpen ? 'active' : ''}`}
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="accordion-title">{title}</span>
        <span className="accordion-icon">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      <div
        className="accordion-content"
        style={{ height: `${contentHeight}px` }}
        aria-hidden={!isOpen}
      >
        <div className="accordion-body" ref={contentRef}>
          {content}
        </div>
      </div>
    </div>
  );
}

export default AccordionItem; 