import React, { FC } from 'react';
import './DrawingAnimation.css';
import backgroundImage from "./images.jpg"
import backgroundGlass from "./abstract-background-with-patterned-glass-texture.jpg"

type KenoDrawPropType = {
    isPlaying: boolean;
    drawNumber: number;
}
const DrawingAnimation: FC<KenoDrawPropType>  = ({isPlaying, drawNumber}) => {
  return (
    <div className='drawing-part'>
      <div className='draw-full-container'>
        <div className='top-draw-part'>
          <div className='top-draw-tube-above-tube-parent'>
            <div className='top-draw-tube-above-tube'></div>
          </div>
          <div className='top-draw-above-tube'></div>
          <div className='top-draw-tube-parent'>
            <div className='top-draw-tube'></div>
          </div>
          <div className='top-draw-plate'></div>
        </div>
        <div className='middle-draw-part'>
          <div className='internal-middle-draw-part'>

          { isPlaying &&(<div className="keno-ball-first" style={{ backgroundColor: drawNumber<41?'yellow':'rgb(230, 133, 19)'}}>{drawNumber}</div>)}

          </div>
        </div>
        <div className='bottom-draw-part'>        
          
        <div className='bottom-draw-plate'></div>
          <div className='top-draw-tube-parent'>
            <div className='bottom-draw-tube'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingAnimation;
