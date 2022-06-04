import React, { useRef } from 'react';
import './responsive-iframe.css';

const isSSR = typeof window === 'undefined';

export const shadertoy: React.FC<{
  id?: string;
  gui?: boolean;
  t?: number;
  paused?: boolean;
  muted?: boolean;
  width?: number;
  height?: number;
  src?: string;
}> = ({
  id = '',
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
  src,
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return (
    <p
      className="responsive-iframe-container"
      style={{
        paddingTop: `${(100 * height) / width}%`,
      }}
    >
      {!src ? (
        <iframe
          allowFullScreen
          loading="lazy"
          title="shadertoy"
          src={`https://www.shadertoy.com/embed/${id}?gui=${gui}&t=${t}&paused=${paused}&muted=${muted}`}
        ></iframe>
      ) : (
        <iframe
          allowFullScreen
          loading="lazy"
          title="shadertoy"
          src={`/embed/shadertoy.html?gui=${gui}&t=${t}&paused=${paused}&muted=${muted}`}
          onLoad={(event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            event.target.contentWindow.postMessage(
              { type: 'set_code', code: src },
              '*'
            );
          }}
        ></iframe>
      )}
    </p>
  );
};
