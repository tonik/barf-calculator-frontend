import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";

import { bowlState } from "state/bowl";
import { bowlGroupedByTypeState } from "state/bowl";

interface TableDataProps {
  type: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 190,
    },
  })
);

const meat = [
  {
    name: "Chicken 🍗",
    value: "chicken",
    id: 1,
    weight: 100,
    fat: 6.0,
    protein: 20,
    type: "meat",
  },
  {
    name: "Chicken 2 🍗",
    value: "chicken-2",
    id: 2,
    weight: 100,
    fat: 4.5,
    protein: 17,
    type: "meat",
  },
  {
    name: "Chicken 3 🍗",
    value: "chicken-3",
    id: 3,
    weight: 100,
    fat: 4.5,
    protein: 17,
    type: "meat",
  },
  {
    name: "🍏",
    value: "vegetable",
    id: 4,
    weight: 100,
    fat: 0,
    protein: 10,
    type: "vegetable",
  },
];

const NutritionTable: FC<TableDataProps> = ({ type }) => {
  const classes = useStyles();
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const groupedBowl = useRecoilValue(bowlGroupedByTypeState);
  const [bowl, setBowl] = useRecoilState(bowlState);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedProducts(e.target.value as string[]);
  };

  useEffect(() => {
    const filteredFood = selectedProducts.map(
      (item) => meat.filter((meatItem) => meatItem.value === item)[0]
    );

    setBowl([...filteredFood]);
  }, [selectedProducts, setBowl]);

  return (
    <Box my={4}>
      <Box my={2}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-meat-label">{type}</InputLabel>
          <Select
            labelId="demo-mutiple-meat-label"
            id="demo-mutiple-meat"
            multiple
            value={selectedProducts}
            onChange={handleChange}
            input={<Input />}
          >
            {meat
              .filter((item) => item.type === type)
              .map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="meat table">
          <TableHead>
            <TableRow>
              <TableCell>{type}</TableCell>
              <TableCell align="right">Weight&nbsp;(g)</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedBowl[type] &&
              groupedBowl[type].map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.weight}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default NutritionTable;
