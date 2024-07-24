 import React from "react";
import { GAME_STATE_DRAW, GAME_STATE_PLAYING, GAME_STATE_WIN } from "../constants";

 const Header = ({gameState,currentplayer,winplayer}) =>{
    const renderlabel= () =>{

        switch(gameState){
            case GAME_STATE_PLAYING:
                return <div>Player {currentplayer} turn</div>;
            case GAME_STATE_WIN:
                return <div>Player {winplayer} wins</div>;
            case GAME_STATE_DRAW:
                return <div>Game is a Draw!</div>
            default:
        }

    }

    return (
        <div className="panel header">
            <div className="header-text">{renderlabel()}</div>
        </div>
    );
 };

 export default Header;