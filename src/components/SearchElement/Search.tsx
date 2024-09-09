import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import "./style.scss";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <Box className="search">
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          label="Amount"
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
