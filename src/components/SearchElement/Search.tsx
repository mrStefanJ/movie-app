import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import "./style.scss";
interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  const clearSearch = () => {
    const event = {
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <Box className="search">
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">Search</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          label="Amount"
          value={value}
          endAdornment={
            <InputAdornment position="end">
              {value && (
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  onClick={clearSearch}
                >
                  <CloseIcon />
                </IconButton>
              )}
            </InputAdornment>
          }
          onChange={onChange}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
