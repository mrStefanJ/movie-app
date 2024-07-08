import { Pagination, Stack } from "@mui/material";
import React from "react";

interface CustomePaginationProps {
  setPage: (page: number) => void;
  numberOfPages: number;
}

const CustomePagination: React.FC<CustomePaginationProps> = ({
  setPage,
  numberOfPages = 10,
}) => {
  const maxPage = 20;

  const handlePageChange = (page: number) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={Math.min(numberOfPages, maxPage)}
        onChange={(e, page) => handlePageChange(page)}
        hideNextButton={numberOfPages <= maxPage}
        hidePrevButton={numberOfPages <= maxPage}
        color="primary"
      />
    </Stack>
  );
};

export default CustomePagination;
