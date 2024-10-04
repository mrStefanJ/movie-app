import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import useSortData from "../../../CustomHook/useSort";
import { useUser } from "../../../UserContext";
import { User } from "../../../type/user";
import { UserDetail } from "../../Dialog";
import "./style.scss";

type Order = "asc" | "desc";

interface HeadCell {
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "firstName",
    numeric: false,
    label: "First Name",
  },
  {
    id: "lastName",
    numeric: true,
    label: "Last Name",
  },
  {
    id: "email",
    numeric: true,
    label: "Email",
  },
  {
    id: "password",
    numeric: true,
    label: "Password",
  },
  {
    id: "role",
    numeric: true,
    label: "Role",
  },
  {
    id: "status",
    numeric: true,
    label: "Status",
  },
  {
    id: "action",
    numeric: true,
    label: "Action",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: any) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function TableUsers() {
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { userList, setUserList } = useUser();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const users = userList.filter((user) => user.role === "user");

  const { sortedItems, setOrder, setOrderBy, order, orderBy } = useSortData(
    users,
    "asc",
    "firstName"
  );

  const handleUserUpdate = (updatedUser: User) => {
    const updatedUsers = userList.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUserList(updatedUsers); // Update the userList in the context or state
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof User
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = users.map((n) => Number(n.id));
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...sortedItems].slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [sortedItems, page, rowsPerPage]
  );

  const handleClickUser = (user: User) => {
    // Update the URL with the user's id without navigating away
    window.history.pushState({}, "", `/admin/${user.id}`);

    // Set the selected user and open the dialog
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog

    // Reset the URL to /admin when the dialog is closed
    window.history.pushState({}, "", "/admin");
    setSelectedUser(null); // Reset the selected user
  };

  const handleDeleteUser = (id: string) => {
    const updatedUsers = userList.filter((user) => user.id !== id);

    setUserList(updatedUsers);

    // Update the user list in localStorage
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {visibleRows.map((user) => {
                const isItemSelected = selected.includes(Number(user.id));
                return (
                  <TableRow
                    hover
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={user.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClickUser(user)}
                  >
                    <TableCell align="right">{user.firstName}</TableCell>
                    <TableCell align="right">{user.lastName}</TableCell>
                    <TableCell align="right">{user.email}</TableCell>
                    <TableCell align="right">{user.password}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                    <TableCell align="right">
                      {user.isActive ? "Active" : "Not Active"}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="button__delete"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          e.preventDefault();
                          handleDeleteUser(user.id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <UserDetail
        open={openDialog}
        onClose={handleCloseDialog}
        user={selectedUser}
        onUserUpdate={handleUserUpdate}
      />
    </Box>
  );
}
