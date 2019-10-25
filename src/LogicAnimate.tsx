import * as React from 'react';
import { useRef } from 'react';
import { useLogicAnimate, UseLogicAnimateProps } from './useLogicAnimate';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  animateProps?: UseLogicAnimateProps;
}

export type LogicAnimateProps = UseLogicAnimateProps &
  JSX.ElementChildrenAttribute &
  Props;

export function LogicAnimate({
  children,
  animateProps,
  ...props
}: LogicAnimateProps) {
  const ref = useRef<HTMLDivElement>(null);
  useLogicAnimate(ref.current, { ...animateProps });

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
