import React from 'react';
import '../Game.css'


const GameCircle = ({id,className,onCircleClicked,children}) => {
    
    return (
        <div className={ `gamecircle ${className}`} onClick={() => onCircleClicked(id)}>
            {children}
        </div>
    )
}

export default GameCircle