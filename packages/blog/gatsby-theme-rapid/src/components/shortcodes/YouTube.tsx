import React from 'react';
import './responsive-iframe.css';

export const YouTube: React.FC<{
  id: string;
  width?: number;
  height?: number;
  start?: number;
  showControls?: boolean;
}> = ({ id, width = 16, height = 9, start = 0, showControls = true }) => (
  <div style={{ maxWidth: '860px', margin: 'auto' }}>
    <div
      className="responsive-iframe-container"
      style={{
        paddingTop: `${(100 * height) / width}%`,
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?${
          showControls ? '' : 'controls=0'
        }&start=${start}`}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        title="YouTube"
      ></iframe>
    </div>
  </div>
);
