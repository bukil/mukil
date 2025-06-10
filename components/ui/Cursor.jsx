import React, { useEffect, useRef } from 'react';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Hide the default cursor only on the body
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = 'none';

    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.body.style.cursor = originalCursor;
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: 32,
        height: 32,
        background: 'rgba(255, 255, 255, 0.12)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
        border: '1.5px solid rgba(255,255,255,0.18)',
        transition: 'width 0.22s cubic-bezier(.4,2,.3,1), height 0.22s cubic-bezier(.4,2,.3,1), background 0.22s, border 0.22s, box-shadow 0.22s, transform 0.08s',
      }}
    />
  );
};

export default Cursor; 