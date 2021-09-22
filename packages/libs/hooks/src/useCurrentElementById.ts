// Thanks for https://nicified.com/post/gatsby-toc
import { useState, useEffect } from 'react';

function useCurrentElementById(elementIds: string[]): string {
  const [currentElementId, setCurrentElementId] = useState(elementIds[0] || '');

  useEffect(() => {
    if (
      typeof document === 'undefined' ||
      typeof IntersectionObserver === 'undefined'
    )
      return;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const { isIntersecting, target } of entries) {
          isIntersecting && setCurrentElementId(target.id);
        }
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    elementIds.forEach((elementId) => {
      const element = document.getElementById(elementId);
      element && intersectionObserver.observe(element);
    });

    return () => {
      intersectionObserver.disconnect();
    };
  }, [elementIds]);

  return currentElementId;
}

export default useCurrentElementById;
