import React from 'react';
import './responsive-iframe.css';

const isSSR = typeof window === 'undefined';

export const shadertoy: React.FC<{
  id: string;
  gui?: boolean;
  t?: number;
  paused?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
}> = ({
  id,
  gui = true,
  t = 0,
  paused = isSSR
    ? true
    : window.navigator.userAgent.includes('Mobile')
    ? true
    : false,
  muted = true,
  width = 16,
  height = 9,
}) => (
  <p
    className="responsive-iframe-container"
    style={{
      paddingTop: `${(100 * height) / width}%`,
    }}
  >
    <iframe
      allowFullScreen
      loading="lazy"
      title="shadertoy"
      src={`https://www.shadertoy.com/embed/${id}?gui=${gui}&t=${t}&paused=${paused}&muted=${muted}`}
    ></iframe>
  </p>
);
