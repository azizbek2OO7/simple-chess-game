import { Box, Button, Flex, SegmentedControl, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { alert } from "utils";

interface Option {
  label: string;
  value: string;
}

const Board = () => {
  const [board, setBoard] = useState<string[][]>(new Array(8).fill([]).map(() => new Array(8).fill("")));

  const [selectValue, setSelectValue] = useState("♜");

  const options: Option[] = [
    { label: "♜", value: "♜" },
    { label: "♙", value: "♙" },
    { label: "♝", value: "♝" },
    { label: "🗑️", value: "" },
  ];

  const capturesNumber = (boards: string[][]) => {
    let result = 0;

    const ry = boards.findIndex((sb) => sb.includes("♜"));
    const rx = boards[ry]?.findIndex((cell) => cell === "♜");

    let RX = "";
    let RY = "";

    for (let y = 0; y < boards.length; y++) {
      for (let x = 0; x < boards.length; x++) {
        const cell = boards[y][x];

        if (ry === y && cell !== "") RY += cell;
        if (rx === x && cell !== "") RX += cell;
      }
    }

    for (let i = 0; i < RX.length - 1; i++) {
      const sub = RX[i] + RX[i + 1];

      if (sub === "♙♜" || sub === "♜♙") result++;
    }

    for (let i = 0; i < RY.length - 1; i++) {
      const sub = RY[i] + RY[i + 1];

      if (sub === "♙♜" || sub === "♜♙") result++;
    }

    return result;
  };

  const onSelectCell = (rowIdx: number, colIdx: number) => {
    const arr: string[][] = [...board];

    if (arr[rowIdx][colIdx] && selectValue !== "") {
      alert.error("this is already on the board");
      return;
    }
    if (selectValue === "♜" && arr.some((row) => row.includes("♜"))) {
      alert.error("A ♜ is already present on the chessboard.");
      return;
    } else {
      arr[rowIdx][colIdx] = selectValue;
    }

    setBoard(arr);
  };

  const onReset = () => {
    setBoard(new Array(8).fill(null).map(() => Array(8).fill("")));
  };

  return (
    <Flex sx={{ alignItems: "center", gap: 100, marginTop: 40 }}>
      <Box sx={{ display: "grid", placeItems: "center" }}>
        <Title sx={{ fontWeight: 400, color: "#1A1A1A" }}>Captures</Title>
        <Text sx={{ color: "#67FDAF", fontSize: 70, fontWeight: 500 }}>{capturesNumber(board)}</Text>
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(8, 1fr)" }}>
        {board.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.map((value, index) => (
              <Box
                key={index}
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: 75,
                  height: 75,
                  backgroundColor: `${idx % 2 === 0 ? (index % 2 !== 0 ? "#67FDAF" : "#fff") : idx % 2 !== 0 && index % 2 !== 0 ? "#fff" : "#67FDAF"}`,
                  fontSize: 50,
                  textTransform: "uppercase",
                  border: `${idx % 2 === 0 ? (index % 2 !== 0 ? "1px solid #1A1A1A" : "") : idx % 2 !== 0 && index % 2 !== 0 ? "" : "1px solid #1A1A1A"}`,
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                children={value}
                onClick={() => onSelectCell(idx, index)}
              />
            ))}
          </React.Fragment>
        ))}
      </Box>
      <Box sx={{ display: "grid", gap: 30 }}>
        <Button sx={{ height: 55, width: 150, placeSelf: "start", color: "#1A1A1A", backgroundColor: "#67FDAF", fontWeight: 400, fontSize: 35, border: "1px solid ##1A1A1A" }} onClick={onReset}>
          Clear
        </Button>
        <SegmentedControl
          styles={{
            label: {
              fontSize: 25,
            },
          }}
          sx={{ fontSize: 20 }}
          size={"70px"}
          data={options}
          onChange={(value) => setSelectValue(value)}
        />
      </Box>
    </Flex>
  );
};

export default Board;
