import { useTheme } from 'gatsby-plugin-use-dark-mode';
import React from 'react';

const Codepen: React.FC<{
  id: string;
  height?: number;
  defaultTab?: string;
  editable?: boolean;
}> = ({ id, height = 600, defaultTab = 'html,result', editable = false }) => {
  const { theme } = useTheme();
  return (
    <p className="rounded-md border dark:border-true-gray-700 light:shadow">
      <iframe
        className="rounded-md"
        height={height}
        scrolling="no"
        style={{
          width: '100%',
        }}
        title="CodePen"
        src={`https://codepen.io/acdzh/embed/${id}?height=${height}&theme-id=${theme}&default-tab=${defaultTab}&editable=${editable}`}
        frameBorder="no"
        loading="lazy"
        allowTransparency
        allowFullScreen
      ></iframe>
    </p>
  );
};

export const codepen = Codepen;
