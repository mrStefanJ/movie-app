import SearchIcon from "@mui/icons-material/Search";

interface SearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, onChange }: SearchProps) => {
  return (
    <div className="search">
      <SearchIcon />
      <input value={value} onChange={onChange} />
    </div>
  );
};

export default Search;
