# react-logic-animate

Move your react component without thinking about animation.

Test it out  
https://xl4nk5zpp.codesandbox.io/

## How to use

### Component

```
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { LogicAnimate } from "react-logic-animate";

import "./styles.css";

function App() {
  const [arr, setArr] = useState([{ id: "1" }, { id: "2" }]);

  return (
    <div className="App">
      <h1>React logic animate</h1>
      <button
        onClick={() => {
          setArr([arr[1], arr[0]]);
        }}
      >
        Switch
      </button>
      {arr.map(item => (
        <LogicAnimate key={item.id}>
          <div style={{ border: "1px solid black", marginBottom: ".5rem" }}>
            Item
          </div>
        </LogicAnimate>
      ))}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### Hook

```
import { useLogicAnimate } from 'react-logic-animate';

function myHook( { children } ) {
    const ref = useRef(null);
    useLogicAnimate(ref.current, opts)

    return (
        <div ref={ref}>
            ..... Everything inside here will animate to their new position if moved in the dom
            {children}
        </div>
    )
}
```

## opts

```
interface UseLogicAnimateProps {
  noAnimate?: boolean;
  preLayoutEffect?: (ref: HTMLDivElement) => void;
  transitionTime?: string;
  transitionType?: AnimationTimingFunction;
  transitionDelay?: string;
}

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
  | { int: number; startEnd?: 'start' | 'end' } // steps(int, start|end)
  | { x1: number; y1: number; x2: number; y2: number }; // cubic-bezier(x1, y1, x2, y2)
```

https://www.w3schools.com/cssref/css3_pr_animation-timing-function.asp

### noAnimate

Will not animate anything if true.

### preLayoutEffect

Will run before any preLayoutEffect values are given to the ref.  
**Note**:
_ref.style.transform_ & _ref.style.transition_ will be overwritten by library for animation purposes  
Can be used to reset parent styles with ref.parentNode.style....

### transitionTime & transitionType & transitionDelay

Will be combined into valid transition value: transform ${transitionTime} ${transitionType} \${transitionDelay}
