import React, { ReactNode, RefObject, useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { styled } from 'bumbag';

const tooltipMarginBottom = 8;
const TooltipBody = styled.div<ITooltipBody>`
  position: relative;
  margin-top: ${props => props.topMargin};
  margin-bottom: ${tooltipMarginBottom}px;
  background-color: yellow;
  display: ${props => props.hovering ? 'block' : 'none'};
  font-size: 1rem;
`;

interface ITooltipBody {
  topMargin: string;
  hovering: boolean;
}

interface ITooltipProps {
  message: string;
  children: ReactNode;
}

export const Tooltip: React.FC<ITooltipProps> = ({ children, message }) => {
  const [hovering, setHovering] = useState(false);
  const [childrenRect, childrenRef] = useClientRect();
  const [tooltipRect, tooltipRef] = useClientRect();
  const [topMargin, setTopMargin] = useState('0px');

  useEffect(() => {
    if(childrenRect && childrenRect.top) {
      setTopMargin(`-${childrenRect.height + tooltipMarginBottom}px`);
    }
  }, [childrenRect])

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseOut={() => setHovering(false)}
    >
      
        <TooltipBody
          topMargin={topMargin}
          hovering={hovering}
          ref={tooltipRef}
        >
            { message }
          </TooltipBody> 
      
      <div ref={childrenRef}>{ children }</div>
    </div>
  );
};

interface IRect {
  top: number;
  left: number;
}

// https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
const useClientRect = () => {
  // todo: This should be <ClientRect | null> I think but that errors, figure out later
  const [rect, setRect] = useState<any>(null);
  const ref = useCallback(node => {
    if (node !== null && rect === null) {
      const nodeRect: ClientRect = node.getBoundingClientRect();
      setRect(nodeRect);
      console.log('hi', nodeRect.top);
    }
  }, []);
  return [rect, ref];
}

