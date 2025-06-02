'use client'

import { Carousel as AntCarousel } from 'antd';
import { CaretLeftFilled, CaretRightFilled } from '@ant-design/icons';
import { useRef } from 'react';
import Spinner from './spinner';
import './carousel.css';

interface IProps {
  loading: boolean;
  children: any;
  autoplay?: boolean;
}

export const Carousel: React.FC<IProps> = ({ children, loading, autoplay }) => {
  const ref: any = useRef();

  return (
    <Spinner loading={loading}>
      <div className='carousel'>
        <div className='carousel_control carousel_control_left'>
          <CaretLeftFilled onClick={() => ref.current?.prev()} />
          <CaretRightFilled onClick={() => ref.current?.prev()} />
        </div>
        <div className='carousel_images'>
          <AntCarousel ref={ref} dots={false} adaptiveHeight fade autoplay={autoplay}>
            {children}
          </AntCarousel >
        </div>
        <div className='carousel_control carousel_control_right'>
          <CaretLeftFilled onClick={() => ref.current?.prev()} />
          <CaretRightFilled onClick={() => ref.current?.prev()} />
        </div>
      </div>
    </Spinner>
  );
};
