/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import blackPawn from "../../assets/black-no-bg/nigga-pawn-removebg.png";
import blackRook from "../../assets/black-no-bg/nigga-rook-removebg.png";
import blackKnight from "../../assets/black-no-bg/nigga-knight-removebg.png";
import blackBishop from "../../assets/black-no-bg/nigga-bishop-removebg.png";
import blackQueen from "../../assets/black-no-bg/nigga-queen-removebg.png";
import blackKing from "../../assets/black-no-bg/nigga-king-removebg.png";

import whitePawn from "../../assets/white-no-bg/pawn-removebg.png";
import whiteRook from "../../assets/white-no-bg/rook-removebg.png";
import whiteKnight from "../../assets/white-no-bg/knight-removebg.png";
import whiteBishop from "../../assets/white-no-bg/bishop-no-bg.png";
import whiteQueen from "../../assets/white-no-bg/queen-removebg.png";
import whiteKing from "../../assets/white-no-bg/king-removebg.png";

import logoImg from "/public/frochess-logo.png";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./play.css";

//en passant
//casttles
//checkmate
//menu
//engine
//styles
//accounts
//multiplayer???
//piece redactor???

function Play() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [prevPosition, setPrevPosition] = useState([null, null]);
  const [isTurnCheck, setIsTurnCheck] = useState(false);
  const [moveAmount, setMoveAmount] = useState(() => {
    const savedMoveAmount = localStorage.getItem("moveAmount");
    return savedMoveAmount && savedMoveAmount !== "undefined"
      ? JSON.parse(savedMoveAmount)
      : 0;
  });
  const [moveAmountArray, setMoveAmountArray] = useState(() => {
    const savedMoveAmount = localStorage.getItem("moveAmountArray");
    return savedMoveAmount && savedMoveAmount !== "undefined"
      ? JSON.parse(savedMoveAmount)
      : 1;
  });

  const navigate = useNavigate();

  const [chessBoard] = useState([
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
  ]);
  const [position, setPosition] = useState(() => {
    const savedPosition = localStorage.getItem("position");
    return savedPosition && savedPosition !== "undefined"
      ? JSON.parse(savedPosition)
      : [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 20, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 2, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
        ];
  });

  const [positionArray, setPositionArray] = useState(() => {
    const savedPositionArray = localStorage.getItem("positionArray");
    return savedPositionArray && savedPositionArray !== "undefined"
      ? JSON.parse(savedPositionArray)
      : [
          [
            [5, 4, 3, 9, 2, 3, 4, 5],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [10, 10, 10, 10, 10, 10, 10, 10],
            [50, 40, 30, 90, 20, 30, 40, 50],
          ],
        ];
  });
  const [attackedPositionWhite, setAttackedPositionWhite] = useState(() => {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  });
  const [attackedPositionBlack, setAttackedPositionBlack] = useState(() => {
    return [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];
  });
  //move and position updte local storage
  useEffect(() => {
    localStorage.setItem("position", JSON.stringify(position));
    localStorage.setItem("moveAmount", JSON.stringify(moveAmount));
    localStorage.setItem("moveAmountArray", JSON.stringify(moveAmountArray));
    localStorage.setItem("positionArray", JSON.stringify(positionArray));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkCheckWhite();
    checkCheckBlack();
    checkMate()
  }, [position, moveAmount, positionArray, moveAmountArray]);

  // {position upd after reload}
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition(positionArray[positionArray.length - 1]);
    setMoveAmountArray(moveAmount);
    checkCheckWhite();
    checkCheckBlack();
  }, []);

  const isDisabledButtonForArrowRight = moveAmount === moveAmountArray;
  const isDisabledButtonForArrowLeft = moveAmount < 1 || moveAmountArray < 1;
  //piece drawing
  const pieceType = (piece) => {
    const imgStyle = { width: "100%", height: "100%", objectFit: "contain" };
    switch (piece) {
      // Чорні фігури
      case 1:
        return <img src={blackPawn} alt="black pawn" style={imgStyle} />;
      case 2:
        return <img src={blackKing} alt="black king" style={imgStyle} />;
      case 3:
        return <img src={blackBishop} alt="black bishop" style={imgStyle} />;
      case 4:
        return <img src={blackKnight} alt="black knight" style={imgStyle} />;
      case 5:
        return <img src={blackRook} alt="black rook" style={imgStyle} />;
      case 9:
        return <img src={blackQueen} alt="black queen" style={imgStyle} />;

      // Білі фігури
      case 10:
        return <img src={whitePawn} alt="white pawn" style={imgStyle} />;
      case 20:
        return <img src={whiteKing} alt="white king" style={imgStyle} />;
      case 30:
        return <img src={whiteBishop} alt="white bishop" style={imgStyle} />;
      case 40:
        return <img src={whiteKnight} alt="white knight" style={imgStyle} />;
      case 50:
        return <img src={whiteRook} alt="white rook" style={imgStyle} />;
      case 90:
        return <img src={whiteQueen} alt="white queen" style={imgStyle} />;

      default:
        return null;
    }
  };
  const teamCheck = (piece) => {
    if (piece > 9) {
      return "white";
    }
    if (piece < 10 && piece > 0) {
      return "black";
    } else {
      return null;
    }
  };
  const positionUpdate = (rowIndex, tileIndex) => {
    const newPosition = position.map((row) => [...row]);
    newPosition[rowIndex][tileIndex] = selectedPiece;
    newPosition[prevPosition[0]][prevPosition[1]] = 0;
    setPosition(newPosition);

    setPositionArray([...positionArray, newPosition]);
  };
  const reset = () => {
    setSelectedPiece(null);
    setPrevPosition([null, null]);
  };
  const moveBack = () => {
    setPosition(positionArray[moveAmountArray - 1]);
    setMoveAmountArray(moveAmountArray - 1);
  };
  const moveForward = () => {
    setPosition(positionArray[moveAmountArray + 1]);
    setMoveAmountArray(moveAmountArray + 1);
  };
  //main logic
  const firstClick = (rowIndex, tileIndex, currentPiece) => {
    checkCheckWhite();
    checkCheckBlack();
    console.log("piece:", currentPiece);
    if (currentPiece !== 0) {
      setSelectedPiece(currentPiece);
    }
    setPrevPosition([rowIndex, tileIndex]);
  };
  const secondClick = (rowIndex, tileIndex, currentPiece) => {
    checkCheckWhite();
    checkCheckBlack();
    console.log(
      "curremtPiece:",
      selectedPiece,
      "previous pos:",
      prevPosition,
      "row",
      rowIndex,
      "tile",
      tileIndex,
      "piece",
      currentPiece,
    );
    //testing pieces placing logic
    if (prevPosition[0] === null) {
      const newPosition = position.map((row) => [...row]);
      newPosition[rowIndex][tileIndex] = selectedPiece;
      setPosition(newPosition);
      setPositionArray([...positionArray, newPosition]);
      setMoveAmount(moveAmount + 1);
      setMoveAmountArray(moveAmountArray + 1);
      reset();
      return;
    }
    //move order check
    if (currentPiece !== 1488) {
      if (
        (moveAmount % 2 === 0 &&
          teamCheck(selectedPiece) === "black" &&
          isTurnCheck) ||
        (moveAmount % 2 !== 0 &&
          teamCheck(selectedPiece) === "white" &&
          isTurnCheck)
      ) {
        reset();
        return;
      }
    }

    //check white or black and switch same color pieces
    if (currentPiece !== 1488) {
      if (
        currentPiece > 0 &&
        teamCheck(selectedPiece) === teamCheck(position[rowIndex][tileIndex])
      ) {
        setSelectedPiece(currentPiece);
        setPrevPosition([rowIndex, tileIndex]);
        return;
      }
    }

    //move logic

    //white pawn
    if (selectedPiece === 10) {
      //move back
      if (prevPosition[0] < rowIndex) {
        reset();
        return;
      }
      //start pos
      if (prevPosition[0] - rowIndex > 2 && prevPosition[0] === 6) {
        reset();
        return;
      }
      //move up
      if (prevPosition[0] - rowIndex > 1 && prevPosition[0] !== 6) {
        reset();
        return;
      }
      if (
        (prevPosition[0] - rowIndex === 1 &&
          prevPosition[1] === tileIndex &&
          teamCheck(position[rowIndex][tileIndex]) === "black") ||
        teamCheck(position[rowIndex][tileIndex]) === "white"
      ) {
        reset();
        return;
      }
      if (
        prevPosition[0] - rowIndex === 2 &&
        position[rowIndex + 1][tileIndex] !== 0
      ) {
        reset();
        return;
      }
      //capture diagonally
      if (
        prevPosition[1] !== tileIndex &&
        teamCheck(position[rowIndex][tileIndex]) !== "black"
      ) {
        reset();
        return;
      }
      //up capture fix
      if (
        teamCheck(position[rowIndex][tileIndex]) === "black" &&
        prevPosition[1] === tileIndex
      ) {
        reset();
        return;
      }
      //queen logic
      if (rowIndex === 3) {
        // return;
      }
    }
    //rook
    const isPieceOnPathRook = () => {
      if (prevPosition[0] > rowIndex && prevPosition[1] === tileIndex) {
        for (let i = prevPosition[0] - 1; i > rowIndex; i--) {
          if (position[i][tileIndex] !== 0) {
            return true;
          }
        }
      }
      if (prevPosition[0] < rowIndex && prevPosition[1] === tileIndex) {
        for (let i = prevPosition[0] + 1; i < rowIndex; i++) {
          if (position[i][tileIndex] !== 0) {
            return true;
          }
        }
      }

      if (prevPosition[1] > tileIndex && prevPosition[0] === rowIndex) {
        for (let i = prevPosition[1] - 1; i > tileIndex; i--) {
          if (position[rowIndex][i] !== 0) {
            return true;
          }
        }
      }
      if (prevPosition[1] < tileIndex && prevPosition[0] === rowIndex) {
        for (let i = prevPosition[1] + 1; i < tileIndex; i++) {
          if (position[rowIndex][i] !== 0) {
            return true;
          }
        }
      }
    };
    if (selectedPiece === 50 || selectedPiece === 5) {
      if (isPieceOnPathRook()) {
        reset();
        return;
      }
      //use same logic for bishop but inverted
      if (prevPosition[0] !== rowIndex && prevPosition[1] !== tileIndex) {
        reset();
        return;
      }
    }

    //knight
    const checkLegalMoveKnight = () => {
      if (
        prevPosition[0] === rowIndex - 2 &&
        prevPosition[1] === tileIndex - 1
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex - 2 &&
        prevPosition[1] === tileIndex + 1
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex - 1 &&
        prevPosition[1] === tileIndex + 2
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex + 1 &&
        prevPosition[1] === tileIndex + 2
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex + 2 &&
        prevPosition[1] === tileIndex - 1
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex + 2 &&
        prevPosition[1] === tileIndex + 1
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex - 1 &&
        prevPosition[1] === tileIndex - 2
      ) {
        return true;
      } else if (
        prevPosition[0] === rowIndex + 1 &&
        prevPosition[1] === tileIndex - 2
      ) {
        return true;
      } else {
        return false;
      }
    };
    if (selectedPiece === 40 || selectedPiece === 4) {
      if (!checkLegalMoveKnight()) {
        reset();
        return;
      }
    }

    //bishop
    const checkLegalMoveBishop = () => {
      if (prevPosition[0] - rowIndex === prevPosition[1] - tileIndex) {
        return true;
      } else if (
        prevPosition[0] - rowIndex ===
        (prevPosition[1] - tileIndex) * -1
      ) {
        return true;
      } else {
        return false;
      }
    };
    const isPieceOnPathBishop = () => {
      if (rowIndex < prevPosition[0] && tileIndex < prevPosition[1]) {
        for (
          let i = prevPosition[0] - 1, g = prevPosition[1] - 1;
          i > rowIndex && g > tileIndex;
          i--, g--
        ) {
          if (position[i][g] !== 0) {
            return true;
          }
        }
      }
      if (rowIndex < prevPosition[0] && tileIndex > prevPosition[1]) {
        for (
          let i = prevPosition[0] - 1, g = prevPosition[1] + 1;
          i > rowIndex && g < tileIndex;
          i--, g++
        ) {
          if (position[i][g] !== 0) {
            return true;
          }
        }
      }
      if (rowIndex > prevPosition[0] && tileIndex < prevPosition[1]) {
        for (
          let i = prevPosition[0] + 1, g = prevPosition[1] - 1;
          i < rowIndex && g > tileIndex;
          i++, g--
        ) {
          if (position[i][g] !== 0) {
            return true;
          }
        }
      }
      if (rowIndex > prevPosition[0] && tileIndex > prevPosition[1]) {
        for (
          let i = prevPosition[0] + 1, g = prevPosition[1] + 1;
          i < rowIndex && g < tileIndex;
          i++, g++
        ) {
          if (position[i][g] !== 0) {
            return true;
          }
        }
      }
      return false;
    };
    if (selectedPiece === 30 || selectedPiece === 3) {
      if (isPieceOnPathBishop()) {
        reset();
        return;
      }
      //case - -, - +, + -, + +

      if (!checkLegalMoveBishop()) {
        reset();
        return;
      }
      //|| prevPosition[0]-rowIndex!==(prevPosition[1]-tileIndex)*-1
    }
    //queen
    const checkLegalMoveQueen = () => {
      // (prevPosition[0] !== rowIndex && prevPosition[1] !== tileIndex) || !checkLegalMoveBishop()
      if (
        (prevPosition[0] !== rowIndex && prevPosition[1] === tileIndex) ||
        (prevPosition[0] === rowIndex && prevPosition[1] !== tileIndex)
      ) {
        return true;
      } else if (checkLegalMoveBishop()) {
        return true;
      } else {
        return false;
      }
    };
    if (selectedPiece === 90 || selectedPiece === 9) {
      if (isPieceOnPathRook() || isPieceOnPathBishop()) {
        reset();
        return;
      }
      //use same logic for bishop but inverted
      if (!checkLegalMoveQueen()) {
        reset();
        return;
      }
    }
    //king
    const checkLegalMoveKing = () => {
      if (
        (prevPosition[0] === rowIndex - 1 &&
          prevPosition[1] === tileIndex - 1) || //22
        (prevPosition[0] === rowIndex - 1 && prevPosition[1] === tileIndex) || //21
        (prevPosition[0] === rowIndex - 1 &&
          prevPosition[1] === tileIndex + 1) || //20
        (prevPosition[0] === rowIndex && prevPosition[1] === tileIndex - 1) || //10
        (prevPosition[0] === rowIndex + 1 &&
          prevPosition[1] === tileIndex + 1) || //00
        (prevPosition[0] === rowIndex + 1 && prevPosition[1] === tileIndex) || //01
        (prevPosition[0] === rowIndex + 1 &&
          prevPosition[1] === tileIndex - 1) || //02
        (prevPosition[0] === rowIndex && prevPosition[1] === tileIndex + 1) //11
      ) {
        return true;
      } else {
        return false;
      }
    };
    if (selectedPiece === 20) {
      if (
        !checkLegalMoveKing() ||
        attackedPositionBlack[rowIndex][tileIndex] !== 0
      ) {
        reset();
        return;
      } else if (checkMate()) {
        reset();
        return;
      }
    }
    if (selectedPiece === 2) {
      if (
        !checkLegalMoveKing() ||
        attackedPositionWhite[rowIndex][tileIndex] !== 0
      ) {
        reset();
        return;
      } else if (checkMate()) {
        reset();
        return;
      }
    }

    //black pawn
    if (selectedPiece === 1) {
      //move back
      if (prevPosition[0] > rowIndex) {
        reset();
        return;
      }
      //start pos
      if (rowIndex - prevPosition[0] > 2 && prevPosition[0] === 1) {
        reset();
        return;
      }
      if (
        rowIndex - prevPosition[0] === 2 &&
        position[rowIndex - 1][tileIndex] !== 0
      ) {
        reset();
        return;
      }

      //move up
      if (rowIndex - prevPosition[0] > 1 && prevPosition[0] !== 1) {
        reset();
        return;
      }
      if (
        (rowIndex - prevPosition[0] === 1 &&
          prevPosition[1] === tileIndex &&
          teamCheck(position[rowIndex][tileIndex]) === "white") ||
        teamCheck(position[rowIndex][tileIndex]) === "black"
      ) {
        reset();
        return;
      }
      //capture diagonally
      if (
        prevPosition[1] !== tileIndex &&
        teamCheck(position[rowIndex][tileIndex]) !== "white"
      ) {
        reset();
        return;
      }
      //up capture fix
      if (
        teamCheck(position[rowIndex][tileIndex]) === "white" &&
        prevPosition[1] === tileIndex
      ) {
        reset();
        return;
      }
      //queen logic
      if (rowIndex === 7) {
        // return;
      }
    }

    positionUpdate(rowIndex, tileIndex);

    //reset
    reset();
    setMoveAmount(moveAmount + 1);
    setMoveAmountArray(moveAmountArray + 1);
  };
  const checkMate = () => {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const pieceType = position[x][y];
        const isLegalMoveForKingWhite=()=>{

        }
        if (pieceType === 2 && attackedPositionWhite[x][y] === 1) {
          //disabled board === true 
          console.log("nigaKing:", "x", x, "y", y);
        }
      }
    }
  };
  //just click handle
  const handleMovePlace = (rowIndex, tileIndex, currentPiece) => {
    checkCheckWhite();
    checkCheckBlack();
    console.log("TEMA", teamCheck(position[rowIndex][tileIndex]));
    console.log("moveAmountArray:", moveAmountArray, "moveAmount:", moveAmount);
    if (moveAmountArray !== positionArray.length - 1) {
      return;
    }
    if (selectedPiece === null) {
      firstClick(rowIndex, tileIndex, currentPiece);
    } else {
      secondClick(rowIndex, tileIndex, currentPiece);
    }
  };
  //CHECK LOGIC(the most complicated thing)
  const checkCheckBlack = () => {
    const newAttackPosition = Array(8)
      .fill(null)
      .map(() => Array(8).fill(0));
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        const pieceType = position[x][y];
        if (pieceType === 5) {
          for (let i = x + 1; i < 8; i++) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let i = x - 1; i >= 0; i--) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let j = y + 1; j < 8; j++) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let j = y - 1; j >= 0; j--) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
        }
        if (pieceType === 1) {
          newAttackPosition[x + 1][y - 1] = 1;
          newAttackPosition[x + 1][y + 1] = 1;
        }
        if (pieceType === 3) {
          for (let i = x + 1, g = y + 1; i < 8 && g < 8; i++, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x + 1, g = y - 1; i < 8 && g >= 0; i++, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y + 1; i >= 0 && g < 8; i--, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y - 1; i >= 0 && g >= 0; i--, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
        }
        if (pieceType === 4) {
          if (newAttackPosition[x + 2]) {
            newAttackPosition[x + 2][y + 1] = 1;
            newAttackPosition[x + 2][y - 1] = 1;
          }
          if (newAttackPosition[x - 2]) {
            newAttackPosition[x - 2][y + 1] = 1;
            newAttackPosition[x - 2][y - 1] = 1;
          }
          if (newAttackPosition[x + 1]) {
            newAttackPosition[x + 1][y + 2] = 1;
            newAttackPosition[x + 1][y - 2] = 1;
          }
          if (newAttackPosition[x - 1]) {
            newAttackPosition[x - 1][y + 2] = 1;
            newAttackPosition[x - 1][y - 2] = 1;
          }
        }
        if (pieceType === 2) {
          if (newAttackPosition[x - 1]) {
            newAttackPosition[x - 1][y] = 1;
            newAttackPosition[x - 1][y + 1] = 1;
            newAttackPosition[x - 1][y - 1] = 1;
          }
          if (newAttackPosition[x]) {
            newAttackPosition[x][y + 1] = 1;
            newAttackPosition[x][y - 1] = 1;
          }
          if (newAttackPosition[x + 1]) {
            newAttackPosition[x + 1][y] = 1;
            newAttackPosition[x + 1][y + 1] = 1;
            newAttackPosition[x + 1][y - 1] = 1;
          }
        }
        if (pieceType === 9) {
          for (let i = x + 1; i < 8; i++) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let i = x - 1; i >= 0; i--) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let j = y + 1; j < 8; j++) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let j = y - 1; j >= 0; j--) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let i = x + 1, g = y + 1; i < 8 && g < 8; i++, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x + 1, g = y - 1; i < 8 && g >= 0; i++, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y + 1; i >= 0 && g < 8; i--, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y - 1; i >= 0 && g >= 0; i--, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
        }
        if (newAttackPosition[x].length > 8) {
          newAttackPosition[x].pop();
        }
      }
    }
    setAttackedPositionBlack(newAttackPosition);
  };
  const checkCheckWhite = () => {
    const newAttackPosition = Array(8)
      .fill(null)
      .map(() => Array(8).fill(0));
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        // console.log("piece:", position[x][y], "x", x, "y", y);
        const pieceType = position[x][y];
        if (pieceType === 10) {
          newAttackPosition[x - 1][y - 1] = 1;
          newAttackPosition[x - 1][y + 1] = 1;
        }
        if (pieceType === 50) {
          for (let i = x + 1; i < 8; i++) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let i = x - 1; i >= 0; i--) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let j = y + 1; j < 8; j++) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let j = y - 1; j >= 0; j--) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
        }
        if (pieceType === 30) {
          for (let i = x + 1, g = y + 1; i < 8 && g < 8; i++, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x + 1, g = y - 1; i < 8 && g >= 0; i++, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y + 1; i >= 0 && g < 8; i--, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y - 1; i >= 0 && g >= 0; i--, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
        }
        if (pieceType === 40) {
          if (newAttackPosition[x + 2]) {
            newAttackPosition[x + 2][y + 1] = 1;
            newAttackPosition[x + 2][y - 1] = 1;
          }
          if (newAttackPosition[x - 2]) {
            newAttackPosition[x - 2][y + 1] = 1;
            newAttackPosition[x - 2][y - 1] = 1;
          }
          if (newAttackPosition[x + 1]) {
            newAttackPosition[x + 1][y + 2] = 1;
            newAttackPosition[x + 1][y - 2] = 1;
          }
          if (newAttackPosition[x - 1]) {
            newAttackPosition[x - 1][y + 2] = 1;
            newAttackPosition[x - 1][y - 2] = 1;
          }
        }
        if (pieceType === 20) {
          if (newAttackPosition[x - 1]) {
            newAttackPosition[x - 1][y] = 1;
            newAttackPosition[x - 1][y + 1] = 1;
            newAttackPosition[x - 1][y - 1] = 1;
          }
          if (newAttackPosition[x]) {
            newAttackPosition[x][y + 1] = 1;
            newAttackPosition[x][y - 1] = 1;
          }
          if (newAttackPosition[x + 1]) {
            newAttackPosition[x + 1][y] = 1;
            newAttackPosition[x + 1][y + 1] = 1;
            newAttackPosition[x + 1][y - 1] = 1;
          }
        }
        if (pieceType === 90) {
          for (let i = x + 1; i < 8; i++) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let i = x - 1; i >= 0; i--) {
            newAttackPosition[i][y] = 1;
            if (position[i][y] !== 0) break;
          }
          for (let j = y + 1; j < 8; j++) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let j = y - 1; j >= 0; j--) {
            newAttackPosition[x][j] = 1;
            if (position[x][j] !== 0) break;
          }
          for (let i = x + 1, g = y + 1; i < 8 && g < 8; i++, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x + 1, g = y - 1; i < 8 && g >= 0; i++, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y + 1; i >= 0 && g < 8; i--, g++) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
          for (let i = x - 1, g = y - 1; i >= 0 && g >= 0; i--, g--) {
            newAttackPosition[i][g] = 1;
            if (position[i][g] !== 0) break;
          }
        }
        if (newAttackPosition[x].length > 8) {
          newAttackPosition[x].pop();
        }
      }
    }
    setAttackedPositionWhite(newAttackPosition);
  };
  const turnCheck = () => {
    if (isTurnCheck) {
      setIsTurnCheck(false);
    } else if (!isTurnCheck) {
      setIsTurnCheck(true);
    }
  };
  return (
    <div>
      <button onClick={() => navigate("/")}>
        <img
          src={logoImg}
          alt="Logo"
          style={{ width: "60px", height: "90px" }}
        />
      </button>
      {checkMate()}
      <h1>Play</h1>
      {/* is turn check on */}
      <ul className="testPiecePlaceList">
        <li>
          <button onClick={turnCheck}>Is move check ON???(For testing)</button>
        </li>
        <li>
          <button
            disabled={true}
            style={{ background: isTurnCheck ? "green" : "red" }}
          >
            {isTurnCheck ? "Y" : "N"}
          </button>
        </li>
      </ul>
      <ul className="testPiecePlaceList">
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(1);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(1)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(2);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(2)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(3);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(3)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(4);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(4)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(5);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(5)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(9);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(9)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(10);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(10)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(20);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(20)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(30);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(30)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(40);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(40)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(50);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(50)}
          </button>
        </li>
        <li className="testPiecePlace">
          <button
            onClick={() => {
              setSelectedPiece(90);
              console.log(selectedPiece);
            }}
            className="testPiece"
          >
            {pieceType(90)}
          </button>
        </li>
      </ul>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          gap: "25px",
        }}
      >
        <li>
          {/* <> && reset game */}
          <button
            style={{ padding: "2px 15px" }}
            onClick={() => {
              localStorage.removeItem("position");
              localStorage.removeItem("moveAmount");
              localStorage.removeItem("moveAmountArray");
              setMoveAmount(0);
              setMoveAmountArray(0);
              setPosition([
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 20, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
              ]);
              setPositionArray([
                [
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 20, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 2, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                  [0, 0, 0, 0, 0, 0, 0, 0],
                ],
              ]);
            }}
          >
            Reset Game
          </button>
        </li>
        <li>
          <button
            style={{ padding: "2px 15px" }}
            disabled={isDisabledButtonForArrowLeft}
            onClick={moveBack}
          >
            {"<"}
          </button>
        </li>
        <li>
          <button
            style={{ padding: "2px 15px" }}
            disabled={isDisabledButtonForArrowRight}
            onClick={moveForward}
          >
            {">"}
          </button>
        </li>
      </ul>
      <section>
        {/* debug */}
        {/* attack position white */}
        <div
          style={{
            position: "absolute",

            zIndex: 999,
            pointerEvents: "none",
          }}
        >
          {attackedPositionWhite.map((row, rowIndex) => (
            <div key={`attack-row-${rowIndex}`} style={{ display: "flex" }}>
              {row.map((tileValue, tileIndex) => (
                <div
                  key={`attack-tile-${tileIndex}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "green",
                  }}
                >
                  {tileValue}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* attack position black */}
        <div
          style={{
            position: "absolute",
            zIndex: 999,
            top: "220px",
            pointerEvents: "none",
          }}
        >
          {attackedPositionBlack.map((row, rowIndex) => (
            <div key={`attack-row-${rowIndex}`} style={{ display: "flex" }}>
              {row.map((tileValue, tileIndex) => (
                <div
                  key={`attack-tile-${tileIndex}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "red",
                  }}
                >
                  {tileValue}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* main board */}
        <div>
          {chessBoard.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((tile, tileIndex) => {
                const currentPiece = position[rowIndex][tileIndex];
                const isWhiteKingInCheck =
                  currentPiece === 20 &&
                  attackedPositionBlack[rowIndex][tileIndex] === 1;
                const isBlackKingInCheck =
                  currentPiece === 2 &&
                  attackedPositionWhite[rowIndex][tileIndex] === 1;
                const isKingInCheck = isWhiteKingInCheck || isBlackKingInCheck;
                return (
                  <button
                    key={tileIndex}
                    onClick={() => {
                      handleMovePlace(rowIndex, tileIndex, currentPiece);
                    }}
                    className={isKingInCheck ? "king-in-check" : ""}
                    style={{
                      border: "none",
                      width: "100px",
                      height: "100px",
                      backgroundColor:
                        prevPosition &&
                        prevPosition[0] === rowIndex &&
                        prevPosition[1] === tileIndex &&
                        selectedPiece > 0
                          ? "#807841"
                          : tile === 1
                            ? "#ffd36b"
                            : "#5c4000",
                      display: "flex",
                      position: "relative",
                      alignItems: "center",
                      justifyContent: "center",

                      padding: "4px",
                      boxSizing: "border-box",
                      cursor: currentPiece > 0 ? "pointer" : "default",
                    }}
                  >
                    {pieceType(currentPiece)}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Play;
