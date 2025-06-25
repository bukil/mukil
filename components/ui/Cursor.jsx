import React, { useEffect, useRef, useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';

const Cursor = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);
  const [isClickable, setIsClickable] = useState(false);
  
  // Color mode aware outline color
  const outlineColor = useColorModeValue(
    'rgba(0, 0, 0, 0.6)', // Dark outline for light mode
    'rgba(255, 255, 255, 0.21)' // Light outline for dark mode
  );

  useEffect(() => {
    // More robust cursor hiding with higher specificity
    const hideDefaultCursor = () => {
      // Add a global style to ensure cursor is hidden
      if (!document.getElementById('cursor-hide-style')) {
        const style = document.createElement('style');
        style.id = 'cursor-hide-style';
        style.textContent = `
          * {
            cursor: none !important;
          }
          *:hover {
            cursor: none !important;
          }
          a, button, input, select, textarea, [role="button"], [role="link"], [tabindex] {
            cursor: none !important;
          }
          a:hover, button:hover, input:hover, select:hover, textarea:hover, [role="button"]:hover, [role="link"]:hover, [tabindex]:hover {
            cursor: none !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Also set cursor style directly on body and html
      document.body.style.cursor = 'none';
      document.documentElement.style.cursor = 'none';
      
      // Set cursor on all existing elements
      const elements = document.getElementsByTagName('*');
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.cursor = 'none';
      }
    };

    // Initial hide
    hideDefaultCursor();

    // Hide cursor on new elements with a more comprehensive observer
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              // Set cursor on the new element and all its children
              const setCursorOnElement = (element) => {
                element.style.cursor = 'none';
                const children = element.getElementsByTagName('*');
                for (let i = 0; i < children.length; i++) {
                  children[i].style.cursor = 'none';
                }
              };
              setCursorOnElement(node);
            }
          });
        }
      });
    });
    
    observer.observe(document.body, { 
      childList: true, 
      subtree: true,
      attributes: true,
      attributeFilter: ['style']
    });

    const moveCursor = (e) => {
      if (cursorRef.current && outlineRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
        outlineRef.current.style.left = `${e.clientX}px`;
        outlineRef.current.style.top = `${e.clientY}px`;
      }
    };

    // Enhanced clickable element detection
    const handlePointerMove = (e) => {
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return setIsClickable(false);

      const computedStyle = window.getComputedStyle(el);
      const tag = el.tagName.toLowerCase();
      
      // Check for interactive elements
      const isInteractiveElement = 
        // Links and buttons
        tag === 'a' || 
        tag === 'button' ||
        // Form elements
        tag === 'input' ||
        tag === 'select' ||
        tag === 'textarea' ||
        // Interactive elements
        tag === 'summary' ||
        tag === 'details' ||
        // Custom interactive elements
        el.getAttribute('role') === 'button' ||
        el.getAttribute('role') === 'link' ||
        el.getAttribute('role') === 'menuitem' ||
        el.getAttribute('role') === 'tab' ||
        el.getAttribute('role') === 'option' ||
        // Elements with click handlers
        el.onclick !== null ||
        // Elements with pointer cursor (but we override this)
        computedStyle.cursor === 'pointer' ||
        // Elements with tabindex
        el.getAttribute('tabindex') !== null ||
        // Elements with click event listeners
        el._reactListenersID !== undefined ||
        // Elements with data-interactive attribute
        el.hasAttribute('data-interactive') ||
        // Elements with draggable attribute
        el.draggable === true ||
        // Elements with contenteditable
        el.isContentEditable ||
        // Elements with href
        el.hasAttribute('href') ||
        // Elements with onclick attribute
        el.hasAttribute('onclick') ||
        // Elements with data-clickable attribute
        el.hasAttribute('data-clickable');

      setIsClickable(isInteractiveElement);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousemove', handlePointerMove);
    
    // Cleanup function
    return () => {
      observer.disconnect();
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousemove', handlePointerMove);
      
      // Remove the global style
      const styleElement = document.getElementById('cursor-hide-style');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return (
    <>
      {/* SVG Filter for Glass Distortion */}
      <svg style={{ display: 'none', position: 'absolute' }}>
        <filter id="cursor-glass-distortion" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="turbulence" baseFrequency="0.015" numOctaves="1" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" />
        </filter>
      </svg>
      
      {/* Cursor with Distortion */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isClickable ? 120 : 48,
          height: isClickable ? 12 : 48,
          background: 'rgba(255, 255, 255, 0)',
          borderRadius: isClickable ? '15px' : '100%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 999999,
          boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          transition: 'width 0.22s cubic-bezier(.4,2,.3,1), height 0.22s cubic-bezier(.4,2,.3,1), background 0.22s, border 0.22s, box-shadow 0.22s, transform 0.08s, border-radius 0.22s cubic-bezier(.4,2,.3,1)',
          filter: 'url(#cursor-glass-distortion)',
        }}
      />
      
      {/* Outline with Higher Z-Index */}
      <div
        ref={outlineRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: isClickable ? 120 : 48,
          height: isClickable ? 12 : 48,
          borderRadius: isClickable ? '15px' : '100%',
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000000,
          border: `0.5px solid ${outlineColor}`,
          transition: 'width 0.22s cubic-bezier(.4,2,.3,1), height 0.22s cubic-bezier(.4,2,.3,1), border-radius 0.22s cubic-bezier(.4,2,.3,1)',
        }}
      />
    </>
  );
};

export default Cursor; 