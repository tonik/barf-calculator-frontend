import React, { SyntheticEvent } from "react";
import { useRecoilState } from "recoil";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import NutritionTable from "components/NutritionTable";

import { dogState } from "state/dog";

function Home() {
  const [dog, setDog] = useRecoilState(dogState);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    setDog({ ...dog, weight: parseInt(target.value) });
  };

  return (
    <Container maxWidth="md">
      <Box my={2}>
        <TextField
          id="outlined-number"
          label="Weight"
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
          required
          onChange={handleChange}
          value={dog.weight ? dog.weight : ""}
        />
      </Box>
      <NutritionTable type="meat" />
      <NutritionTable type="vegetable" />
    </Container>
  );
}

export default Home;
