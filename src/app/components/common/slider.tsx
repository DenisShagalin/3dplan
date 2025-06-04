'use client';

import './slider.css'

import { useCallback, useRef, useState } from 'react';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';

const CONTROL_WIDTH = 40;

export const Slider = ({ left, right }: { left: string, right: string }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [coordX, setCoordX] = useState<number>(0);
  const [controlPosition, setControlPosition] = useState<number>(50);

  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerDown = useCallback((event: React.MouseEvent) => {
    setIsDragging(true);
    setCoordX(event.pageX);
  }, []);

  const onPointerMove = useCallback((event: React.MouseEvent) => {
    if (isDragging && ref.current) {
      event.preventDefault();
      event.stopPropagation();
      const width = ref.current.clientWidth;
      const rect = ref.current.getBoundingClientRect();
      const x = event.pageX - rect.x;
      const percent = (x * 100) / width;
      setCoordX(event.pageX);
      setControlPosition(Number(percent));
    }
  }, [
    isDragging,
    coordX,
    ref,
  ])

  const onTouchMove = useCallback((event: React.TouchEvent) => {
    if (isDragging && ref.current) {
      const touch = event.touches[0];
      const width = ref.current.clientWidth;
      const rect = ref.current.getBoundingClientRect();
      const x = touch.pageX - rect.x;
      const percent = (x * 100) / width;
      setCoordX(touch.pageX);
      setControlPosition(Number(percent));
    }
  }, [
    isDragging,
    coordX,
    ref,
  ]);

  return (
    <div
      ref={ref}
      className='slider'
      onPointerUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onPointerMove={onPointerMove}
      onTouchMove={onTouchMove}
    >
      <div
        className='slider_control'
        style={{
          left: `calc(${controlPosition}% - ${CONTROL_WIDTH / 2}px)`,
          top: `calc(50% - ${CONTROL_WIDTH / 2}px)`,
        }}
      >
        <div
          className='control'
          style={{
            width: `${CONTROL_WIDTH}px`,
            height: `${CONTROL_WIDTH}px`
          }}
          onPointerDown={onPointerDown}
        >
          <CaretLeftFilled />
          <CaretRightFilled />
        </div>
      </div>

      <div
        className='slider_item'
        style={{
          left: `calc(-100% + ${controlPosition}%)`,
        }}
      >
        <div
          style={{
            right: `calc(-100% + ${controlPosition}%)`
          }}
        >
          <img src={left} alt={left} />
        </div>
      </div>

      <div
        className='slider_item'
        style={{
          left: `calc(-100% + ${controlPosition}%)`,
        }}
      >
        <div
          style={{
            right: `${controlPosition}%`
          }}
        >
          <img src={right} alt={right} />
        </div>
      </div>

    </div>
  )
};
