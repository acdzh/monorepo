import React from 'react';

export const iframe: React.FC<React.HTMLAttributes<HTMLIFrameElement>> = (
  props
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { width = 16, height = 9 } = props as any;
  return (
    <p
      className="responsive-iframe-container "
      style={{
        paddingTop: `${(100 * height) / width}%`,
      }}
    >
      <iframe title="iframe" allowFullScreen loading="lazy" {...props}></iframe>
    </p>
  );
};
