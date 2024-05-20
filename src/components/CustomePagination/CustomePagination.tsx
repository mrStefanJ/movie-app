import { Box, Pagination } from "@mui/material";

interface CustomePaginationProps {
  setPage: (page: number) => void;
  numberOfPages: number;
}

const CustomePagination = ({
  setPage,
  numberOfPages,
}: CustomePaginationProps) => {
  const handleChange = (page: number) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <Box
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 18,
      }}
    >
      <Pagination
        count={numberOfPages}
        onChange={(e, page) => handleChange(page)}
        hideNextButton
        hidePrevButton
      />
    </Box>
  );
};

export default CustomePagination;
