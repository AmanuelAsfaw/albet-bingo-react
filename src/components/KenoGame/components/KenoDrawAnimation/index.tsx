import React, { FC } from 'react';
import './KenoDrawAnimation.css';
import backgroundImage from "./images.jpg"
import backgroundGlass from "./abstract-background-with-patterned-glass-texture.jpg"

type KenoDrawPropType = {
    isPlaying: boolean;
    drawNumber: number;
}
const KenoDrawAnimation: FC<KenoDrawPropType>  = ({isPlaying, drawNumber}) => {
  return (
    <div className="keno-draw">
        <div className="pipeline-top" style={{ backgroundImage: `url(${backgroundGlass})`}}></div>
        <div className="pipeline-top-ring" style={{ backgroundImage: `url(${backgroundImage})`}}></div>
        <div className="keno-draw-container" style={{
            // borderImage: `url(${backgroundImage}) 30 round`
            }}>
            {isPlaying &&(<div className="keno-ball">{drawNumber}</div>)}
        </div>
        <div className="pipeline-bottom-ring" style={{ backgroundImage: `url(${backgroundImage})`}}></div>
        <div className="pipeline-bottom" style={{ backgroundImage: `url(${backgroundGlass})`}}></div>
    </div>
  );
};

export default KenoDrawAnimation;
