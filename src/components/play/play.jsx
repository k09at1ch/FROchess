/* eslint-disable no-constant-binary-expression */
/* eslint-disable no-constant-condition */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
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

function Play() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [prevPosition, setPrevPosition] = useState([null, null]);
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
          [5, 4, 3, 9, 2, 3, 4, 5],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 30, 0, 0, 50, 0, 0],
          [40, 0, 0, 0, 0, 40, 0, 0],
          [0, 0, 0, 0, 30, 0, 0, 0],
          [0, 90, 50, 0, 0, 0, 20, 0],
          [0, 0, 10, 10, 0, 10, 0, 10],
          [0, 0, 0, 0, 90, 0, 0, 0],
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
  //move and position updte local storage
  useEffect(() => {
    localStorage.setItem("position", JSON.stringify(position));
    localStorage.setItem("moveAmount", JSON.stringify(moveAmount));
    localStorage.setItem("moveAmountArray", JSON.stringify(moveAmountArray));
    localStorage.setItem("positionArray", JSON.stringify(positionArray));
  }, [position, moveAmount, positionArray, moveAmountArray]);
  //position history log
  // useEffect(() => {
  //   for (let i = 0; i < positionArray.length; i++) {
  //     console.table(i, positionArray[i]);
  //   }
  // }, [positionArray]);

  //position upd after reload
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition(positionArray[positionArray.length - 1]);
    setMoveAmountArray(moveAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setPrevPosition([]);
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
    console.log("piece:", currentPiece);
    if (currentPiece !== 0) {
      setSelectedPiece(currentPiece);
    }
    setPrevPosition([rowIndex, tileIndex]);
  };

  const secondClick = (rowIndex, tileIndex, currentPiece) => {
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

    //move order check
    if (currentPiece !== 1488) {
      if (
        (moveAmount % 2 === 0 && teamCheck(selectedPiece) === "black") ||
        (moveAmount % 2 !== 0 && teamCheck(selectedPiece) === "white")
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

    //white
    //pawn
    if (selectedPiece === 10) {
      //move back
      if (prevPosition[0] < rowIndex) {
        return;
      }
      //start pos
      if (prevPosition[0] - rowIndex > 2 && prevPosition[0] === 6) {
        return;
      }
      //move up
      if (prevPosition[0] - rowIndex > 1 && prevPosition[0] !== 6) {
        return;
      }
      if (
        (prevPosition[0] - rowIndex === 1 &&
          prevPosition[1] === tileIndex &&
          teamCheck(position[rowIndex][tileIndex]) === "black") ||
        teamCheck(position[rowIndex][tileIndex]) === "white"
      ) {
        return;
      }
      //capture diagonally
      if (
        prevPosition[1] !== tileIndex &&
        teamCheck(position[rowIndex][tileIndex]) !== "black"
      ) {
        return;
      }
      //up capture fix
      if (
        teamCheck(position[rowIndex][tileIndex]) === "black" &&
        prevPosition[1] === tileIndex
      ) {
        return;
      }
      //queen logic
      if (rowIndex === 3) {
        console.log("quenn promotion square");

        // return;
      }
    }
    //rook
    const isPieceOnPathRook = () => {
      if (prevPosition[0] > rowIndex && prevPosition[1] === tileIndex) {
        console.log("condition 1");
        for (let i = prevPosition[0] - 1; i > rowIndex; i--) {
          console.log("piece on path", i);
          if (position[i][tileIndex] !== 0) {
            return true;
          }
        }
      }
      if (prevPosition[0] < rowIndex && prevPosition[1] === tileIndex) {
        console.log("condition 2");
        for (let i = prevPosition[0] + 1; i < rowIndex; i++) {
          console.log("niga 1 1 1 ", i);
          if (position[i][tileIndex] !== 0) {
            return true;
          }
        }
      }

      if (prevPosition[1] > tileIndex && prevPosition[0] === rowIndex) {
        console.log("condition 3");
        for (let i = prevPosition[1] - 1; i > tileIndex; i--) {
          console.log("piece on path", i);
          if (position[rowIndex][i] !== 0) {
            return true;
          }
        }
      }
      if (prevPosition[1] < tileIndex && prevPosition[0] === rowIndex) {
        console.log("condition 4");
        for (let i = prevPosition[1] + 1; i < tileIndex; i++) {
          console.log("piece on path", i);
          if (position[rowIndex][i] !== 0) {
            return true;
          }
        }
      }
    };
    if (selectedPiece === 50) {
      console.log("white rook moving");
      if (isPieceOnPathRook()) {
        return;
      }
      //use same logic for bishop but inverted
      if (prevPosition[0] !== rowIndex && prevPosition[1] !== tileIndex) {
        return;
      }
    }
    //knight
    if (selectedPiece === 40) {
    }
    //bishop
    const checkLegalMoveBishop = () => {
      if (prevPosition[0] - rowIndex === prevPosition[1] - tileIndex) {
        console.log("checklegalmovebishop");
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
        console.log("condition 1");
        for (
          let i = prevPosition[0] - 1, g = prevPosition[1] - 1;
          i > rowIndex && g > tileIndex;
          i--, g--
        ) {
          console.log("piece on path condition 1", i, g);
          console.log(position[i][g]);
          if (position[i][g] !== 0) {
            console.log("ezzz");
            return true;
          }
        }
      }
      if (rowIndex < prevPosition[0] && tileIndex > prevPosition[1]) {
        console.log("condition 2");
        for (
          let i = prevPosition[0] - 1, g = prevPosition[1] + 1;
          i > rowIndex && g < tileIndex;
          i--, g++
        ) {
          console.log("piece on path condition 1", i, g);
          console.log(position[i][g]);
          if (position[i][g] !== 0) {
            console.log("ezzz");
            return true;
          }
        }
      }
      if (rowIndex > prevPosition[0] && tileIndex < prevPosition[1]) {
        console.log("condition 3");
        for (
          let i = prevPosition[0] + 1, g = prevPosition[1] - 1;
          i < rowIndex && g > tileIndex;
          i++, g--
        ) {
          console.log("piece on path condition 1", i, g);
          console.log(position[i][g]);
          if (position[i][g] !== 0) {
            console.log("ezzz");
            return true;
          }
        }
      }
      if (rowIndex > prevPosition[0] && tileIndex > prevPosition[1]) {
        console.log("condition 4");
        for (
          let i = prevPosition[0] + 1, g = prevPosition[1] + 1;
          i < rowIndex && g < tileIndex;
          i++, g++
        ) {
          console.log("piece on path condition 1", i, g);
          console.log(position[i][g]);
          if (position[i][g] !== 0) {
            console.log("ezzz");
            return true;
          }
        }
      }
      return false;
    };
    if (selectedPiece === 30) {
      console.log("bishop moving");
      if (isPieceOnPathBishop()) {
        return;
      }
      //case - -, - +, + -, + +

      if (!checkLegalMoveBishop()) {
        console.log(
          "prevpos",
          prevPosition[0],
          prevPosition[1],
          "row",
          rowIndex,
          "tileINdex",
          tileIndex,
        );
        return;
      }
      //|| prevPosition[0]-rowIndex!==(prevPosition[1]-tileIndex)*-1

      if (prevPosition[0] === rowIndex && prevPosition[1] === tileIndex) {
        return;
      }
    }
    //queen
    if (selectedPiece === 90) {
    }
    //king
    if (selectedPiece === 20) {
    }

    //black
    //pawn
    if (selectedPiece === 1) {
    }
    //rook
    if (selectedPiece === 5) {
    }
    //knight
    if (selectedPiece === 4) {
    }
    //bishop
    if (selectedPiece === 3) {
    }
    //queen
    if (selectedPiece === 9) {
    }
    //king
    if (selectedPiece === 2) {
    }

    positionUpdate(rowIndex, tileIndex);

    //reset
    reset();
    setMoveAmount(moveAmount + 1);
    setMoveAmountArray(moveAmountArray + 1);
  };

  //just click handle
  const handleMovePlace = (rowIndex, tileIndex, currentPiece) => {
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

  return (
    <div>
      <button onClick={() => navigate("/")}>
        <img
          src={logoImg}
          alt="Logo"
          style={{ width: "60px", height: "90px" }}
        />
      </button>{" "}
      <h1>Play</h1>
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          gap: "25px",
        }}
      >
        <li>
          <button
            style={{ padding: "2px 15px" }}
            onClick={() => {
              localStorage.removeItem("position");
              localStorage.removeItem("moveAmount");
              localStorage.removeItem("moveAmountArray");
              setMoveAmount(0);
              setMoveAmountArray(0);
              setPosition([
                [5, 4, 3, 9, 2, 3, 4, 5],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [0, 0, 30, 0, 0, 50, 0, 0],
                [40, 0, 0, 0, 0, 40, 0, 0],
                [0, 0, 0, 0, 30, 0, 0, 0],
                [0, 90, 50, 0, 0, 0, 20, 0],
                [0, 0, 10, 10, 0, 10, 0, 10],
                [0, 0, 0, 0, 90, 0, 0, 0],
              ]);
              setPositionArray([
                [
                  [5, 4, 3, 9, 2, 3, 4, 5],
                  [1, 1, 1, 1, 1, 1, 1, 1],
                  [0, 0, 30, 0, 0, 50, 0, 0],
                  [40, 0, 0, 0, 0, 40, 0, 0],
                  [0, 0, 0, 0, 30, 0, 0, 0],
                  [0, 90, 50, 0, 0, 0, 20, 0],
                  [0, 0, 10, 10, 0, 10, 0, 10],
                  [0, 0, 0, 0, 90, 0, 0, 0],
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
        <div>
          {chessBoard.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((tile, tileIndex) => {
                const currentPiece = position[rowIndex][tileIndex];
                return (
                  <button
                    key={tileIndex}
                    onClick={() => {
                      handleMovePlace(rowIndex, tileIndex, currentPiece);
                    }}
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
