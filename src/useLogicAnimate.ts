import { useEffect, useLayoutEffect } from 'react';

type AnimationTimingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'step-start'
  | 'step-end'
  | 'initial'
  | 'inherit'
  | { int: number; startEnd?: 'start' | 'end' }
  | { x1: number; y1: number; x2: number; y2: number };

export interface UseLogicAnimateProps {
  noAnimate?: boolean;
  preLayoutEffect?: (ref: HTMLDivElement) => void;
  transitionTime?: string;
  transitionType?: AnimationTimingFunction;
  transitionDelay?: string;
}

const defaultProps: UseLogicAnimateProps = {
  transitionTime: '250ms',
  transitionType: 'ease-in-out',
  transitionDelay: '0s'
};

type Rect = ClientRect | DOMRect | null;

export function useLogicAnimate(
  ref: HTMLDivElement | null = null,
  opts: UseLogicAnimateProps
) {
  const {
    transitionTime = defaultProps.transitionTime,
    transitionType = defaultProps.transitionType,
    transitionDelay = defaultProps.transitionDelay,
    noAnimate,
    preLayoutEffect
  } = opts;

  const type = getTransitionType();
  const transition = `transform ${transitionTime} ${type} ${transitionDelay}`;
  let currentFrom: Rect;

  onLoad();
  useLayoutEffect(layoutEffect);
  useEffect(effect);

  function getTransitionType() {
    if (!transitionType) {
      return defaultProps.transitionType;
    }
    if (typeof transitionType === 'string') {
      return transitionType;
    }
    if ('x1' in transitionType) {
      return `cubic-bezier(${transitionType.x1}, ${transitionType.y1}, ${
        transitionType.x2
      }, ${transitionType.y2})`;
    }
    if ('int' in transitionType) {
      return `steps(${transitionType.int}, ${transitionType.startEnd ||
        'end'})`;
    }
  }

  function onLoad() {
    if (ref) {
      ref.style.transition = '';
      currentFrom = ref.getBoundingClientRect();
    }
  }

  function layoutEffect() {
    if (!noAnimate && ref) {
      if (typeof preLayoutEffect === 'function') {
        preLayoutEffect(ref);
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
      ref.style.transition = transition;
      ref.style.transform = ``;
    }
  }

  function getCoords(div: HTMLDivElement) {
    const rect = div.getBoundingClientRect();
    return [rect.left, rect.top];
  }
}
