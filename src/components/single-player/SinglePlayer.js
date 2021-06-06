import React from "react";
import calculateWinner from "../play/tc-toe Board/calculateWinner";
import Board from "./Board";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import "./Styling.css";

class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  makeMove(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return Promise.resolve();
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    const nextState = {
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    };

    return new Promise((resolve, reject) => {
      this.setState(nextState, resolve);
    });
  }

  async handleClick(i) {
    console.log("called handleclick in singleplayer");
    await this.makeMove(i);

    const squares = this.state.history[this.state.stepNumber].squares.slice();
    const bestSquare = findBestSquare(squares, this.state.xIsNext ? "X" : "O");
    if (bestSquare !== -1) {
      await this.makeMove(bestSquare);
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else if (isBoardFilled(current.squares)) {
      status = "It's a Tie!";
    } else if (this.state.xIsNext) {
      status = "It's Your Turn";
    } else {
      status = "It's Computer's Turn";
    }

    return (
      <Box display='flex' flexDirection='column'>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <h1>You are X</h1>
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <Button
            onClick={() => {
              this.props.history.push("/new");
              // this.forceUpdate();
              // return <Redirect to='/new' />;
            }}
            variant='contained'
            color='secondary'>
            Play Again
          </Button>
        </Box>
        <Box display='flex' flexDirection='row' justifyContent='center'>
          <h1>{status}</h1>
        </Box>
      </Box>
    );
  }
}

export default SinglePlayer;

function isBoardFilled(squares) {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      return false;
    }
  }
  return true;
}

function findBestSquare(squares, player) {
  const opponent = player === "X" ? "O" : "X";

  const minimax = (squares, isMax) => {
    const winner = calculateWinner(squares);

    if (winner === player) return { square: -1, score: 1 };

    if (winner === opponent) return { square: -1, score: -1 };

    if (isBoardFilled(squares)) return { square: -1, score: 0 };

    const best = { square: -1, score: isMax ? -1000 : 1000 };

    for (let i = 0; i < squares.length; i++) {
      if (squares[i]) {
        continue;
      }

      squares[i] = isMax ? player : opponent;
      const score = minimax(squares, !isMax).score;
      squares[i] = null;

      if (isMax) {
        if (score > best.score) {
          best.score = score;
          best.square = i;
        }
      } else {
        if (score < best.score) {
          best.score = score;
          best.square = i;
        }
      }
    }

    return best;
  };

  return minimax(squares, true).square;
}
