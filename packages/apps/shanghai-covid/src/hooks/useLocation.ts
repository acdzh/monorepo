import { useEffect, useState } from 'react';

import { getLocation } from '../services';

export const useLocation = (): [
  [number, number],
  React.Dispatch<React.SetStateAction<[number, number]>>
] => {
  const [location, setLocation] = useState<[number, number]>([
    121.526, 31.2349,
  ]);
  useEffect(() => {
    getLocation().then(({ lng, lat, city }) => {
      if (city === 'Shanghai') {
        setLocation([lng, lat]);
      }
    });
  }, []);
  return [location, setLocation];
};
