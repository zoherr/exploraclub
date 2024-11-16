import React, { useEffect, useState } from 'react';

const CustomCursor = ({ label = 'Anonymous' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMoveHandler = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Arrow and Label */}
      <div className="flex items-center">
        <div
          className="arrow"
          style={{
            width: '15px',
            transform: 'translateY(-50%) rotate(-45deg)', // Added rotation
            height: '15px',
            border: '2px solid #4967FF', // Border around arrow
            backgroundColor: '#000',
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          }}
        ></div>
        <div
          style={{
            marginLeft: '8px',
            padding: '4px 8px',
            backgroundColor: '#4967FF',
            color: '#fff',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
};

export default CustomCursor;
