import { useEffect, useLayoutEffect } from 'react';

export interface UseLogicAnimateProps {
  noAnimate?: boolean;
  beforeAnimate?: (ref: HTMLDivElement) => void;
  transitionDelay?: string;
  transition?: string;
}

const defaultProps: UseLogicAnimateProps = {
  transition: 'transform 250ms ease-in-out',
  transitionDelay: '0s'
};

type Rect = ClientRect | DOMRect | null;

export function useLogicAnimate(
  ref: HTMLDivElement | null = null,
  opts: UseLogicAnimateProps
) {
  const {
    transition = defaultProps.transition,
    transitionDelay = defaultProps.transitionDelay,
    noAnimate,
    beforeAnimate
  } = opts;

  let currentFrom: Rect;
  onLoad();
  useLayoutEffect(layoutEffect);
  useEffect(effect);

  function onLoad() {
    if (ref) {
      ref.style.transition = '';
      currentFrom = ref.getBoundingClientRect();
    }
  }

  function layoutEffect() {
    if (!noAnimate && ref) {
      if (typeof beforeAnimate === 'function') {
        beforeAnimate(ref);
      }

      const [tx, ty] = getCoords(ref);

      if (currentFrom) {
        const x = tx - currentFrom.left;
        const y = ty - currentFrom.top;

        ref.style.transform = `translate3d(${-x}px, ${-y}px, 0)`;
      }
    }
  }

  function effect() {
    if (!noAnimate && ref) {
      ref.style.transition = `${transition} ${transitionDelay}`;
      ref.style.transform = `translate3d(${0}px, ${0}px, 0)`;
    }
  }

  function getCoords(div: HTMLDivElement) {
    const rect = div.getBoundingClientRect();
    return [rect.left, rect.top];
  }
}
