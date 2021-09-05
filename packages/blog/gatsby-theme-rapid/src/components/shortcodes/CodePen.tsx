import React from 'react';

export const CodePen: React.FC<{
  id: string;
  height?: number;
  theme: 'light' | 'dark';
  defaultTab?: string;
}> = ({ id, height = 400, theme = 'dark', defaultTab = 'html,result' }) => (
  <div
    style={{
      width: '100%',
    }}
  >
    <iframe
      height={height}
      scrolling="no"
      style={{
        width: '100%',
      }}
      title="i18next-icu plural blank issue"
      src={`https://codepen.io/acdzh/embed/${id}?height=${height}&theme-id=${theme}&default-tab=${defaultTab}`}
      frameBorder="no"
      loading="lazy"
      allowTransparency
      allowFullScreen
    ></iframe>
  </div>
);
