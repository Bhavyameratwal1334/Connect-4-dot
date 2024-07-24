import React from "react";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../constants";

const Footer = ({onNewClick,onSuggestClick,gameState}) =>{
    const conditionalRender=(gameState) =>{
        if(gameState === GAME_STATE_PLAYING){
            return <button onClick={onSuggestClick}>Suggest</button>
        }
        else if(gameState === GAME_STATE_DRAW || gameState === GAME_STATE_WIN){
            return <button onClick={onNewClick}>New Game</button> 
        }
    }
   return (
       <div className="panel footer">
            {conditionalRender(gameState)}
       </div>
   );
};

export default Footer;