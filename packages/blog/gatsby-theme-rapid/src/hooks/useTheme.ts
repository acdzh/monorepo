import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useTheme = (): {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (value: 'light' | 'dark') => void;
} => {
  const { storedValue: theme, setValue: setThemeValue } = useLocalStorage<
    'light' | 'dark'
  >('theme', 'light');

  const toggleTheme = () => {
    setThemeValue((v) => (v === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (value: 'light' | 'dark'): void => {
    setThemeValue(value);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  return { theme, toggleTheme, setTheme };
};
