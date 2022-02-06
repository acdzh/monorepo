import React from 'react';
import './responsive-iframe.css';

export const bilibili: React.FC<{
  aid?: string;
  bid?: string;
  page?: number;
  width?: number;
  height?: number;
}> = ({ aid, bid, page = 1, width = 16, height = 9 }) => (
  <p
    className="responsive-iframe-container rounded-md border dark:border-true-gray-700 light:shadow"
    style={{
      paddingTop: `${(100 * height) / width + 7.69}%`,
    }}
  >
    <iframe
      src={`//player.bilibili.com/player.html?${[
        aid ? `aid=${aid}` : undefined,
        bid ? `bvid=${bid}` : undefined,
        `page=${page}`,
        'high_quality=1',
      ]
        .filter((i) => i)
        .join('&')}`}
      allowFullScreen
      loading="lazy"
      title="bilibili"
    ></iframe>
  </p>
);
