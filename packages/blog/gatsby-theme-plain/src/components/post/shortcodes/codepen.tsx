import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';

const Codepen: React.FC<{
  id: string;
  height?: number;
  defaultTab?: string;
}> = ({ id, height = 600, defaultTab = 'html,result' }) => {
  const { theme } = useTheme();
  return (
    <p className="rounded-md border dark:border-true-gray-700 light:shadow">
      <iframe
        height={height}
        scrolling="no"
        style={{
          width: '100%',
        }}
        title="CodePen"
        src={`https://codepen.io/acdzh/embed/${id}?height=${height}&theme-id=${theme}&default-tab=${defaultTab}`}
        frameBorder="no"
        loading="lazy"
        allowTransparency
        allowFullScreen
      ></iframe>
    </p>
  );
};

export const codepen = Codepen;
