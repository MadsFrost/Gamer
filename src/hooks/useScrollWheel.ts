import { useState, useEffect } from 'react';

const useScrollPosition = (): number => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const updatePosition = (ev: WheelEvent): void => {
    setScrollPosition((prev) => prev + ev.deltaY * 5 / 100);
  };
  
  useEffect(() => {

    document.addEventListener('wheel', updatePosition);

    return () => {
      document.removeEventListener('wheel', updatePosition);
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;