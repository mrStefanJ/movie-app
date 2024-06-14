import { Box, Pagination } from "@mui/material";

interface CustomePaginationProps {
  setPage: (page: number) => void;
  numberOfPages: number;
}

const CustomePagination = ({
  setPage,
  numberOfPages,
}: CustomePaginationProps) => {
  const maxPage = 20;

  const handleChange = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
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
        count={Math.min(numberOfPages, maxPage)}
        onChange={(e, page) => handleChange(page)}
        hideNextButton={numberOfPages <= maxPage}
        hidePrevButton={numberOfPages <= maxPage}
      />
    </Box>
  );
};

export default CustomePagination;
