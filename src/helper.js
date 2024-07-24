import { NO_PLAYER } from "./constants";

export const isWinner = (gameBoard,id,currentPlayer) => {
    const board=[...gameBoard]
    board[id]=currentPlayer;
    const winlines=[
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
        [0,4,8,12],
        [1,5,9,13],
        [2,6,10,14],
        [3,7,11,15],
        [0,5,10,15],
        [3,6,9,12]
    ]

    for(let i=0;i<winlines.length;i++){
        const [c1,c2,c3,c4]=winlines[i];
    board[id]=currentPlayer;
        if(board[c1]>0 &&
            board[c1]===board[c2] &&
            board[c1]===board[c3] &&
            board[c1]===board[c4])
            {
                return true;
            }
        
    }
    return false;
}

export const isDraw =(gameBoard,currentPlayer,id) =>{
    const board=[...gameBoard]
    board[id]=currentPlayer;
    
    for (let i=0;i<gameBoard.length;i++){
        if(board[i] === NO_PLAYER){
            return false;
        }
    }
    return true;

}

export const getRandomComputerMove = (gameBoard) =>{
    const validMove=[]
    for(let i=0;i<gameBoard.length;i++){
        if(gameBoard[i] === 0){
            validMove.push(i);
        }
    }
    let rndMove=Math.floor(Math.random()*validMove.length);
    return validMove[rndMove]
}

const getMoves = (gameBoard,moveChecks)=>{
    for(let check=0;check<moveChecks.length;check++){
        for(let i=0;
            i<moveChecks[check].max;
            i+=moveChecks[check].step){
            let series= gameBoard[i+moveChecks[check].indices[0]].toString()+
            gameBoard[i+moveChecks[check].indices[1]].toString()+
            gameBoard[i+moveChecks[check].indices[2]].toString()+
            gameBoard[i+moveChecks[check].indices[3]].toString();

            switch(series){
                case "1110":
                case "2220":
                    return i+moveChecks[check].indices[3];
                case "1101":
                case "2202":
                    return i+moveChecks[check].indices[2];
                case "1011":
                case "2022":
                    return i+moveChecks[check].indices[1];
                case "0111":
                case "0222":
                    return i+moveChecks[check].indices[0];
                default:
            }
        }
    }
    return -1
}


export const getComputedMove = (gameBoard) =>{
    let moveChecks=[
        {
            indices:[0,4,8,12],
            max:4,
            step:1
        },
        {
            indices:[0,1,2,3],
            max:16,
            step:4
        },{
            indices:[0,5,10,15],
            max:16,
            step:16
        },{
            indices:[3,6,9,12],
            max:16,
            step:16
        }
    ];
    let positon = getMoves(gameBoard,moveChecks);
    if (positon > -1)return positon;

    return getRandomComputerMove(gameBoard);

}