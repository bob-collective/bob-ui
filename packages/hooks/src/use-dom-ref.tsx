import type { Ref, RefObject } from 'react';

import { useImperativeHandle, useRef } from 'react';

// Points parent ref passed as argument (forwardRef) to the children ref
function useDOMRef<T extends HTMLElement = HTMLElement>(ref: RefObject<T | null> | Ref<T | null>): RefObject<T> {
  const domRef = useRef<T>(null);

  useImperativeHandle(ref, () => domRef.current);

  return domRef;
}

export { useDOMRef };
