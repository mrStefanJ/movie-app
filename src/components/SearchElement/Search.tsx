import SearchIcon from "@mui/icons-material/Search";
import "./style.scss";
import { Box, FormControl, InputLabel, OutlinedInput } from "@mui/material";

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
          startAdornment={<SearchIcon />}
          label="Amount"
          value={value}
          onChange={onChange}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
