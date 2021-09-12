import React, { useState, useEffect } from 'react';

export const WidthDebug: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const listener = () => {
      requestAnimationFrame(function () {
        setWidth(window.innerWidth);
      });
    };
    window.addEventListener('resize', listener);
    return () => {
      window.removeEventListener('resize', listener);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-10 bg-teal-100 text-black font-mono">
      [{width}px] <span className="inline-block sm:hidden">sm: 0 - 640px</span>
      <span className="hidden sm:inline-block md:hidden">
        md: 640px - 768px
      </span>
      <span className="hidden md:inline-block lg:hidden">
        lg: 768px - 1024px
      </span>
      <span className="hidden lg:inline-block xl:hidden">
        xl: 1024px - 1280px
      </span>
      <span className="hidden xl:inline-block 2xl:hidden">
        2xl: 1280px - 1536px
      </span>
      <span className="hidden 2xl:inline-block 3xl:hidden">
        3xl: 1536px - ∞
      </span>
    </div>
  );
};
