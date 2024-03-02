import { debounce } from "lodash";
import { useEffect, useState } from "react";

interface IUseBreakpointsHook {
  isMobile: boolean;
  isDesktop: boolean;
}

export const useBreakpoints = (): IUseBreakpointsHook => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  const handleResize = () => {
    const { innerWidth: newWidth } = window;
    setWidth(newWidth);
  };

  const debounced = debounce(handleResize, 50);

  useEffect(() => {
    window.addEventListener('resize', debounced);

    return () => {
      window.removeEventListener('resize', debounced);
    };
  }, []);

  return {
    isMobile: width <= 990,
    isDesktop: width > 990,
  };
}
