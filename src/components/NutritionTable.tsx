import React from "react";
import type { FC } from "react";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
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

type Data = {
  name: string;
  value: string;
  id: number;
  weight: number;
  fat: number;
  protein: number;
  type: string;
};

interface TableDataProps {
  data: Data[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 190,
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, meatName: string[], theme: Theme) {
  return {
    fontWeight:
      meatName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NutritionTable: FC<TableDataProps> = ({ data }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [meatName, setMeatName] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMeatName(event.target.value as string[]);
  };

  return (
    <Box my={4}>
      <Box my={2}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-mutiple-meat-label">Meat</InputLabel>
          <Select
            labelId="demo-mutiple-meat-label"
            id="demo-mutiple-meat"
            multiple
            value={meatName}
            onChange={handleChange}
            input={<Input />}
            MenuProps={MenuProps}
          >
            {data.map((item) => (
              <MenuItem
                key={item.id}
                value={item.value}
                style={getStyles(item.value, meatName, theme)}
              >
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
              <TableCell>Meat</TableCell>
              <TableCell align="right">Weight&nbsp;(g)</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
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
