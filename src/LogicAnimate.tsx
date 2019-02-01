import * as React from 'react';
import { useRef } from 'react';
import { useLogicAnimate, UseLogicAnimateProps } from './useLogicAnimate';

export type LogicAnimateProps = UseLogicAnimateProps &
  JSX.ElementChildrenAttribute;

export function LogicAnimate({ children, ...props }: LogicAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  useLogicAnimate(ref.current, { ...props });

  return <div ref={ref}>{children}</div>;
}
