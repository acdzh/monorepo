import React, { useState, useCallback, useEffect } from 'react';

export type ThemeType = 'light' | 'dark' | undefined;

declare global {
  interface Window {
    __currentTheme: ThemeType;
  }
}

function useTheme(): {
  theme: ThemeType;
  setTheme: React.Dispatch<React.SetStateAction<ThemeType>>;
  toggleTheme: () => void;
} {
  const [theme, setTheme] = useState<ThemeType>(
    typeof window === 'undefined' ? undefined : window.__currentTheme
  );

  useEffect(() => {
    if (!theme) return;
    window.__currentTheme = theme;
    const docElement = document.documentElement;

    if (theme === 'dark') {
      docElement.classList.add('dark');
    } else {
      docElement.classList.remove('dark');
    }
    const metaElement = document.querySelector('meta[name="theme-color"]');
    metaElement &&
      metaElement.setAttribute(
        'content',
        window.getComputedStyle(document.body).backgroundColor
      );
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(window.__currentTheme === 'light' ? 'dark' : 'light');
  }, []);

  return { theme, setTheme, toggleTheme };
}

export default useTheme;
