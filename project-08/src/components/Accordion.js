import React, { useState } from 'react';
import AccordionItem from './AccordionItem';

function Accordion({ items, allowMultiple = false }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(index)
          ? prev.filter(item => item !== index)
          : [...prev, index]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(index) ? [] : [index]
      );
    }
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          content={item.content}
          isOpen={openItems.includes(index)}
          onClick={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}

export default Accordion; 