import React,{useState,useEffect}from "react";
import  '../Game.css'
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import {getComputedMove, isDraw, isWinner} from "../helper";
import{PLAYER_1,PLAYER_2,NO_PLAYER,NO_CIRCLE,GAME_STATE_PLAYING,GAME_STATE_WIN, GAME_STATE_DRAW} from "../constants";


const Gameboard = () => {
    const [gameBoard,setgameBoard] =useState(Array(16).fill(NO_PLAYER));
    const [currentPlayer,setcurrentPlayer] = useState(PLAYER_1);
    const [gameState,setgameState]=useState(GAME_STATE_PLAYING);
    const [winPlayer,setWinPlayer]=useState(NO_PLAYER);

    useEffect(() =>{
        initGame();
    },[]);

    const initGame = () =>{
        console.log("init game");
        setgameBoard(Array(NO_CIRCLE).fill(NO_PLAYER));
        setcurrentPlayer(PLAYER_1);
        setgameState(GAME_STATE_PLAYING);
    }

    const initBoard = () => {
        const circles=[];
        for(let i=0;i<NO_CIRCLE;i++){
            circles.push(renderCircle(i));
        }
        return circles;
    }
    
    const suggestMove = () =>{
        circleClicked(getComputedMove(gameBoard));
    }

    console.log(gameBoard);

    const circleClicked = (id) =>{
        console.log('circle Clicked:'+id);

        if(gameBoard[id] !== NO_PLAYER)return;
        if(gameState !== GAME_STATE_PLAYING)return;
        if(isWinner(gameBoard,id,currentPlayer)){
            setgameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        if(isDraw(gameBoard,currentPlayer,id)){
            setgameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }
        setgameBoard(prev =>{
            return prev.map((circle,pos) => {
                if(pos===id)return currentPlayer;
                return circle;
            })
        })
        setcurrentPlayer(currentPlayer===PLAYER_1?PLAYER_2:PLAYER_1);
        console.log(gameBoard);
    }

    const renderCircle = (id) =>{
        return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked}/>
    }
    
    return (
    <>
        <Header gameState={gameState} currentplayer={currentPlayer} winplayer={winPlayer}/>
        <div className="gameboard">
            {initBoard()}
        </div>
        <Footer onNewClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
    </>
    )
}

export default Gameboard;