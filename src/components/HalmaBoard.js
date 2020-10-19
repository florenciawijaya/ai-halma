import React from "react";
import useHalma from "../hooks/useHalma";
import useSelection from "../hooks/useSelection";
import Pawn from "./Pawn";

const HalmaBoard = (props) => {
  const { size } = props;
  const [selected, setSelectedTile, setTargetTile] = useSelection();
  const { state, getPawnInPosition, turn, changeTurn, movePawn } = useHalma(
    size,
    3
  );

  const calculateCellWidth = () => 100 / size;

  const getPawn = (r, c) => {
    const pawn = getPawnInPosition(r, c);
    if (pawn) {
      return (
        <Pawn
          color={pawn.color}
          isSelected={selected && r === selected[0] && c === selected[1]}
          size={"60"}
        />
      );
    }
  };

  return (
    <div className="flex flex-row flex-wrap w-full m-1">
      {state.board.board.map((row, i) => {
        return (
          <React.Fragment key={`halma-row-${i}`}>
            {row.map((_, j) => {
              return (
                <div
                  key={`halma-cell-${i}-${j}`}
                  className="relative"
                  style={{
                    width: `${calculateCellWidth()}%`,
                    paddingBottom: `${calculateCellWidth()}%`,
                    // height: `${calculateCellWidth()}%`,
                  }}
                >
                  <div
                    style={{ width: "90%", height: "90%" }}
                    className={`flex absolute justify-center items-center ${
                      selected && i === selected[0] && j === selected[1]
                        ? "bg-gray-400 shadow-lg"
                        : "bg-gray-200"
                    } rounded hover:shadow-md transition duration-150 ${
                      !!state.prevPosition &&
                      !!state.currentMove &&
                      ((state.prevPosition[0] === i &&
                        state.prevPosition[1] === j) ||
                        (state.currentMove[0] === i &&
                          state.currentMove[1] === j))
                        ? "bg-yellow-300"
                        : ""
                    }`}
                    onClick={(_) => {
                      const pawn = getPawnInPosition(i, j);
                      try {
                        if (pawn && pawn.owner === turn) {
                          setSelectedTile(i, j);
                          // generateMoveset(i, j);
                        } else if (selected && !pawn) {
                          setTargetTile(i, j, movePawn);
                          changeTurn();
                          // movePawn(selected[0], selected[1], i, j);
                          // emptyMoves();
                        }
                      } catch (err) {
                        console.log(err.message);
                      }
                    }}
                  >
                    {getPawn(i, j)}
                    {!!selected ? (
                      state
                        .generateMoveset(selected[0], selected[1])
                        .filter((value) => value[0] === i && value[1] === j)
                        .length !== 0 ? (
                        <div
                          className="w-4 h-4 bg-red-400 rounded-full absolute animate-ping"
                          style={{ content: "" }}
                        />
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default HalmaBoard;
