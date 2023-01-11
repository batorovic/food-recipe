import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  auth,
  db,
  deleteFromCollection,
  deletePostFromUser,
} from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { motion } from "framer-motion";
import moment from "moment/moment";
import { Autocomplete, TextField } from "@mui/material";

function createData(docId, title, time, addedBy, category, comment) {
  return {
    docId,
    title,
    time,
    addedBy,
    category,
    comment,
  };
}

const rows = [
  // createData("Cupcake", 305, 3.7, 67, 4.3),
  // createData("Donut", 452, 25.0, 51, 4.9),
  // createData("Eclair", 262, 16.0, 24, 6.0),
  // createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
  // createData("Honeycomb", 408, 3.2, 87, 6.5),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  // createData("Jelly Bean", 375, 0.0, 94, 0.0),
  // createData("KitKat", 518, 26.0, 65, 7.0),
  // createData("Lollipop", 392, 0.2, 98, 0.0),
  // createData("Marshmallow", 318, 0, 81, 2.0),
  // createData("Nougat", 360, 19.0, 9, 37.0),
  // createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "docId",
    numeric: false,
    disablePadding: true,
    label: "Post Document Id",
  },
  {
    id: "commentId",
    numeric: false,
    disablePadding: true,
    label: "Comment Id",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "Username",
  },
  {
    id: "time",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "comment",
    numeric: false,
    disablePadding: false,
    label: "Comment",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all documents",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const removeSelections = async (
  selectedItems,
  rows,
  setRows,
  setSelected,
  savedRows
) => {
  let selectedIndexs = [];
  console.log(selectedItems);
  for (const key in rows) {
    if (selectedItems.includes(rows[key].commentId)) {
      selectedIndexs.push(rows[key].commentId);
      console.log(rows[key].docId, rows[key].commentId);
      // await deleteFromCollection(
      //   `post/${rows[key].docId}/comment`,
      //   rows[key].commentId
      // );
      // await deletePostFromUser(rows[key].addedBy, rows[key].docId);

      // rows.splice(key, 1);
      // setRows(rows);
    }
  }

  for (const index in selectedIndexs) {
    rows.splice(selectedIndexs[index], 1);
    savedRows.splice(selectedIndexs[index], 1);
  }
  setSelected([]);
};

function EnhancedTableToolbar(props) {
  const { numSelected, selections, rows, setRows, setSelected, savedRows } =
    props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Recipes
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            onClick={() =>
              removeSelections(
                selections,
                rows,
                setRows,
                setSelected,
                savedRows
              )
            }
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : // <Tooltip title="Filter list">
      //   <IconButton>
      //     <FilterListIcon />
      //   </IconButton>
      // </Tooltip>
      null}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTableComment(props) {
  const { postSnap } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("docId");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [user, loading, error] = useAuthState(auth);
  const [rows, setRows] = React.useState([]);
  const [savedRows, setSaveRows] = React.useState([]);
  const [selectedLabel, setSelectedLabel] = React.useState([
    { title: "Document id", id: "docId" },
  ]);

  const getAllPosts = async () => {
    postSnap.forEach(async (doc) => {
      const docRef = collection(db, `post/${doc.documentId}/comment`);
      const commentSnapshot = await getDocs(query(docRef));
      commentSnapshot.forEach((commentDoc) => {
        // console.log(commentDoc.data());
        let strDate;

        let timeDate;
        timeDate =
          commentDoc.data().time.toDate().toDateString() +
          " " +
          commentDoc.data().time.toDate().toLocaleTimeString("tr-TR");
        strDate = commentDoc.data().time.toString();

        // doc.data() is never undefined for query doc snapshots
        setRows((rows) => [
          ...rows,
          {
            docId: doc.documentId,
            commentId: commentDoc.id,
            username: commentDoc.data().username,
            time: strDate,
            timeDate: timeDate,
            // time: moment(doc.timestamp, "YYYY-MM-DD").toDate().getTime(),
            comment: commentDoc.data().comment,
          },
        ]);
      });
    });
    // const q = query(collection(db, "post"));
    // await getDocs(q).then((e) =>
    //   e.forEach(async (doc) => {
    //     // const docRef = collection(db, `post/${doc.id}/comment`);
    //     // const commentSnapshot = await getDocs(query(docRef));
    //     if (doc.data().title.length !== 0) {
    //       // setRows((rows) => [...rows, doc.data().title]);
    //       setRows((rows) => [
    //         ...rows,
    //         {
    //           docId: doc.id,
    //           title: doc.data().title,
    //           time:
    //             doc.data().timestamp.toDate().toDateString() +
    //             " " +
    //             doc.data().timestamp.toDate().toLocaleTimeString("tr-TR"),
    //           addedBy: doc.data().addedBy ? doc.data().addedBy : doc.data().uid,
    //           category: doc.data().category
    //             ? doc.data().category
    //             : "user recipe",
    //           comment: doc.data().commentCount ? doc.data().commentCount : 0,
    //         },
    //       ]);
    //     }
    //   })
    // );
  };
  useEffect(() => {
    console.log("admin all posts use effect");

    getAllPosts();
  }, [user]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.commentId);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, docId) => {
    const selectedIndex = selected.indexOf(docId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, docId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (docId) => selected.indexOf(docId) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const inputOnChange = (e) => {
    if (e === "") {
      setRows(savedRows);

      return;
    }
    let filteredRows;
    selectedLabel.forEach((value) => {
      filteredRows = rows.filter((row) => {
        return row[value.id].toLowerCase().includes(e.toLowerCase());
      });
    });
    setRows(filteredRows);
  };
  const tblHeaders = [
    { title: "Post Document Id", id: "docId" },
    { title: "Comment Id", id: "commentId" },
    { title: "Username", id: "username" },
    { title: "Comment", id: "comment" },
  ];
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      <Box sx={{ width: "100%", padding: "25px 60px" }}>
        {/* {console.log(snap)} */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.2rem",
            gap: "2rem",
          }}
        >
          <TextField
            style={{ width: "30%" }}
            color="secondary"
            id="standard-basic"
            label="Standard"
            variant="standard"
            onChange={(e) => {
              if (savedRows.length === 0) {
                setSaveRows(rows);
              }
              inputOnChange(e.target.value);
            }}
          />
          <Autocomplete
            style={{ width: "70%" }}
            id="tags-standard"
            options={tblHeaders}
            getOptionLabel={(option) => option.title}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, value) =>
              value
                ? setSelectedLabel([value])
                : setSelectedLabel([{ title: "Document id", id: "docId" }])
            }
            renderInput={(params) => (
              <>
                <TextField
                  color="secondary"
                  {...params}
                  variant="standard"
                  label="Select values"
                  placeholder="Filter"
                />
              </>
            )}
          />
        </div>

        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            selections={selected}
            rows={rows}
            setRows={setRows}
            setSelected={setSelected}
            savedRows={savedRows}
          />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
                {/* {stableSort(rows, getComparator(order, orderBy)) */}
                {rows
                  .sort(getComparator(order, orderBy, setRows))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.commentId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.commentId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        // key={row.title}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.docId}
                        </TableCell>
                        <TableCell align="right">{row.commentId}</TableCell>
                        <TableCell align="right">{row.username}</TableCell>
                        <TableCell align="right">{row.timeDate}</TableCell>
                        <TableCell align="right">{row.comment}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                      // height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </motion.div>
  );
}
