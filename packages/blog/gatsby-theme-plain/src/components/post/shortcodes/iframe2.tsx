import React from 'react';

const IFrame2: React.FC<React.HTMLAttributes<HTMLIFrameElement>> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/prop-types
  const { width = 16, height = 9, src = '' } = props as any;
  return (
    <p
      className="responsive-iframe-container group"
      style={{
        paddingTop: `${(100 * height) / width}%`,
      }}
    >
      <iframe title="iframe" allowFullScreen loading="lazy" {...props}></iframe>
      <div
        className="
          w-full py-6px text-center text-10px
          absolute bottom-0 left-0
          bg-primary bg-opacity-60
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          overflow-hidden
        "
      >
        原始链接:{' '}
        <a href={src} target="_blank" rel="noopener noreferrer">
          {src}
        </a>
      </div>
    </p>
  );
};

export const iframe2 = IFrame2;
