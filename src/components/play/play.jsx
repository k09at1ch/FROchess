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

import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Play() {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [prevPosition, setPrevPosition] = useState([null, null]);
  const [moveAmount, setMoveAmount] = useState(() => {
    const savedMoveAmount = localStorage.getItem("moveAmount");
    return savedMoveAmount && savedMoveAmount!=="undefined" ? JSON.parse(savedMoveAmount) : 0;
  });
  const prevRowIndexRef = useRef(null);
  const prevPositionRef = useRef([null, null]);
  const selectedPieceRef = useRef(null);
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
    return savedPosition && savedPosition!=="undefined"
      ? JSON.parse(savedPosition)
      : [
          [5, 4, 3, 9, 2, 3, 4, 5],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [10, 10, 10, 10, 10, 10, 10, 10],
          [50, 40, 30, 90, 20, 30, 40, 50],
        ];
  });

  useEffect(() => {
    localStorage.setItem("position", JSON.stringify(position));
    localStorage.setItem("moveAmount", JSON.stringify(moveAmount));
  }, [position, moveAmount]);

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
    if (piece > 9) return "white";
    if (piece < 10 && piece > 0) return "black";
    return null;
  };

  const handleMovePlace = (rowIndex, tileIndex, currentPiece) => {
    setPrevPosition([rowIndex, tileIndex]);
    prevPositionRef.current = [rowIndex, tileIndex];

    console.log(
      "prevRowIndexRef.current:",
      prevPositionRef.current,
      "previous ROW:",
      prevRowIndexRef.current,
      "row",
      rowIndex,
      "tile",
      tileIndex,
      "piece",
      currentPiece,
    );
    //pawn move logic 1 up
    if (rowIndex >= 0) {
      if (
        prevRowIndexRef.current !== 6 &&
        selectedPieceRef.current === 10 &&
        prevRowIndexRef.current - rowIndex > 1
      ) {
        selectedPieceRef.current = null;
        return;
      }
      if (
        prevRowIndexRef.current !== 1 &&
        selectedPieceRef.current === 1 &&
        rowIndex - prevRowIndexRef.current > 1
      ) {
        selectedPieceRef.current = null;
        return;
      }
    }
    //first move check for pawn
    if (rowIndex >= 0) {
      if (
        prevRowIndexRef.current === 6 &&
        selectedPieceRef.current === 10 &&
        prevPositionRef.current[0] < 4
      ) {
        selectedPieceRef.current = null;
        return;
      }
      if (
        prevRowIndexRef.current === 1 &&
        selectedPieceRef.current === 1 &&
        prevPositionRef.current[0] > 3
      ) {
        selectedPieceRef.current = null;
        return;
      }
    }

    prevRowIndexRef.current = rowIndex;

    if (currentPiece > 0) {
      setSelectedPiece(currentPiece);
      selectedPieceRef.current = currentPiece;
    } else {
      setSelectedPiece(null);
      selectedPieceRef.current = null;
    }

    if (teamCheck(selectedPiece) === teamCheck(position[rowIndex][tileIndex])) {
      return;
    }
    {
      //player turn check------------------
      if (moveAmount % 2 !== 0 && teamCheck(selectedPiece) === "white") {
        return;
      }
      if (moveAmount % 2 === 0 && teamCheck(selectedPiece) === "black") {
        return;
      }
    }
    console.log(selectedPiece, selectedPieceRef.current);
    if (selectedPiece !== null) {
      const newPosition = position.map((row) => [...row]);
      newPosition[rowIndex][tileIndex] = selectedPiece;
      newPosition[prevPosition[0]][prevPosition[1]] = 0;

      switch (
        selectedPiece //queen promotion
      ) {
        case 1:
          if (rowIndex === 7) {
            newPosition[rowIndex][tileIndex] = 9;
          }
          break;
        case 10:
          if (rowIndex === 0) {
            newPosition[rowIndex][tileIndex] = 90;
          }
          break;
      }
      //position[prevPositionRef.current[0]-1][prevPositionRef.current[1]] === 0 && position[prevPositionRef.current[0]-2][prevPositionRef.current[1]] === 0 && rowIndex === 4 && tileIndex === prevPositionRef.current[1]

      // switch (selectedPiece) {
      //   case 10: //if pawn
      //     if (prevPositionRef.current[0] === 6) {
      //       console.log(rowIndex);
      //       //if pawn is on starting position
      //       if (position[rowIndex][tileIndex] - 2 < 4) {
      //         return;
      //       } //if pawn moves two squares forward
      //     }
      // }

      setPosition(newPosition);
      setSelectedPiece(null);
      setMoveAmount(moveAmount + 1);
      setPrevPosition([]);
      selectedPieceRef.current = null;
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>
        <img
          src="./public/frochess-logo.png"
          alt="Logo"
          style={{ width: "60px", height: "90px" }}
        />
      </button>{" "}
      <h1>Play</h1>
      <button onClick={() => {
        localStorage.removeItem("position");
        setPosition([
          [5, 4, 3, 9, 2, 3, 4, 5],
          [1, 1, 1, 1, 1, 1, 1, 1],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [10, 10, 10, 10, 10, 10, 10, 10],
          [50, 40, 30, 90, 20, 30, 40, 50],
        ]);
      }}>
        Reset Game
      </button>
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
