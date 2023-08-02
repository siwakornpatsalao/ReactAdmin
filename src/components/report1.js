import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Swal from "sweetalert2";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import TablePagination from "@mui/material/TablePagination";
import TablePage from "../components/TablePagination";
import styles from './report.module.css';

export default function Report1(){
    const [open, setOpen] = useState(Array(rows.length).fill(false));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [paginatedRows, setPaginatedRows] = useState(rows);
    const [filteredRows, setFilteredRows] = useState(rows);
    const [rows, setRows] = useState([]);
    const initial = useRef(false);

    useEffect(() => {
        async function fetchReport1() {
          try {
            const res = await fetch("http://localhost:5000/report1");
            const data = await res.json();
            const formattedData = data.map(item => ({
              ...item,
              date: formatDate(item.date),
            }));
            setRows(formattedData);
            console.log(data);
          } catch (error) {
            console.error("Error fetching report1:", error);
          }
        }
        if (!initial.current) {
            initial.current = true;
            console.log(initial.current);
            fetchReport1();
        }
      
       
    }, []);

    // filter Table 1

    useEffect(() => {
      if (year) {
        const filteredRowsByYear = rows.filter((row) => row.date.endsWith(`/${year}`));
        setFilteredRows(filteredRowsByYear);
      } else if (month) {
        const filteredRowsByMonth = rows.filter((row) => row.date.startsWith(`0${month}`));
        setFilteredRows(filteredRowsByMonth);
      } else if (year && month) {
        const filteredRowsByMonth = rows.filter(
          (row) => row.date.startsWith(`0${month}`) && row.date.endsWith(`/${year}`)
        );
        setFilteredRows(filteredRowsByMonth);
      } else {
        setFilteredRows(rows);
      }
    }, [year, month]);

    // Pagination 1

    useEffect(() => {
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setPaginatedRows(filteredRows.slice(startIndex, endIndex));
    }, [filteredRows, page, rowsPerPage]);

    return (
        <Box>
            <TableContainer>
              {renderDropdown("รายปี", years, year, handleChangeYear)}
              {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
              <Button variant="contained" onClick={handleReset}>
                Reset
              </Button>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Button onClick={() => {sortByInt(paginatedRows, "order", sortOrder, setSortOrder);}}>ลำดับ</Button></TableCell>
                    <TableCell> <Button onClick={() => {sortByDate(paginatedRows, "date", sortDate, setSortDate);}}> วันที่ </Button> </TableCell>
                    <TableCell> <Button onClick={() => {sortByInt(paginatedRows, "orderCount", sortOrderCount, setSortOrderCount);}}> จำนวนออเดอร์ </Button> </TableCell>
                    <TableCell> <Button onClick={() => {sortByInt(paginatedRows, "menuCount", sortMenuCount, setSortMenuCount);}}> จำนวนสินค้า </Button> </TableCell>
                    <TableCell> <Button onClick={() => {sortByInt(paginatedRows, "total", sortTotal, setSortTotal);}}> จำนวนยอดขาย </Button> </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {paginatedRows.map((row, index) => (
                    <>
                      <TableRow
                        key={row._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.countOrder}</TableCell>
                        <TableCell>{row.countMenu}</TableCell>
                        <TableCell>{`${row.total} บาท`}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => {
                              const newOpen = [...open];
                              newOpen[index] = !newOpen[index];
                              setOpen(newOpen);
                            }}>
                            {open[index] ? (<AiFillCaretUp style={{ color: "blue" }} />) : (<AiFillCaretDown />)}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={open[index]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ลำดับ</TableCell>
                                    <TableCell>เมนู</TableCell>
                                    <TableCell>เวลา</TableCell>
                                    <TableCell>ราคา</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {row.history.map((historyRow) => (
                                    <TableRow
                                      onClick={() => handlePopUp(historyRow, row)}
                                      key={historyRow.id}>
                                      <TableCell component="th" scope="row">
                                        {historyRow.id}
                                      </TableCell>
                                      <TableCell>{historyRow.name}</TableCell>
                                      <TableCell>{historyRow.time}</TableCell>
                                      <TableCell>{historyRow.price} บาท</TableCell>
                                    </TableRow>
                                  ))}
                                  {/* <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: 1000000 }]}
                                    colSpan={3}
                                    count={paginatedRows.length} // Update this line for each tab
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                      inputProps: {
                                        'aria-label': 'rows per page',
                                      },
                                      native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                  /> */}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                  {pagination(filteredRows)}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
    )
}