import { Flex } from "@mantine/core";
import { Navbar } from "components";
import { ChessBoard } from "./components";

interface GameProps {}

const Game = (props: GameProps) => {
  return (
    <>
      <Navbar />
      <Flex className="container" align="center" justify="center" sx={{ flex: 1 }}>
        <ChessBoard />
      </Flex>
    </>
  );
};

export default Game;
