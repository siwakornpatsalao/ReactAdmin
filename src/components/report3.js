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

export default function Report3(){
    const initial = useRef(false);

    useEffect(() => {
        async function fetchReport3() {
            try {
              const res = await fetch("http://localhost:5000/report3");
              const data = await res.json();
              const formattedData = data.map(item => ({
                ...item,
                date: formatDate(item.date),
              }));
              setRows3(formattedData);
              console.log(data);
            } catch (error) {
              console.error("Error fetching report1:", error);
            }
          }
      
        if (!initial.current) {
            initial.current = true;
            console.log(initial.current);
            fetchReport3();
        }
    }, []);


    useEffect(() => {
        if (year) {
          const filteredRowsByYear = rows3.filter((row) => row.date.endsWith(`/${year}`));
          setFilteredRows3(filteredRowsByYear);
        } else if (month) {
          const filteredRowsByMonth = rows3.filter((row) => row.date.startsWith(`0${month}`));
          setFilteredRows3(filteredRowsByMonth);
        } else if (day) {
          const filteredRowsByDay = rows3.filter((row) => parseInt(row.date.split("/")[1]) === day);
          setFilteredRows3(filteredRowsByDay);
        } else if (year && month) {
          const filteredRowsByMonth = rows3.filter(
            (row) => row.date.startsWith(`0${month}`) && row.date.endsWith(`/${year}`)
          );
          setFilteredRows3(filteredRowsByMonth);
        } else {
          setFilteredRows3(rows3);
        }
      }, [year, month, day]);
    
      // Pagination 3
    
      useEffect(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows3(filteredRows3.slice(startIndex, endIndex));
      }, [filteredRows3, page, rowsPerPage]);

    return(
        <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์"
              ? renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
              : month === "เมษายน" || month === "มิถุนายน" || month === "กันยายน" || month === "พฤศจิกายน"
              ? renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay)
              : renderDropdown("รายวัน", days.slice(0, 32), day, handleChangeDay)}
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={() => {sortByInt(paginatedRows3, "order", sortOrder, setSortOrder);}}> ลำดับ </Button> </TableCell>
                  <TableCell><Button onClick={() => {sortByDate(paginatedRows3, "date", sortDate, setSortDate);}}> วันที่ </Button> </TableCell>
                  <TableCell><Button onClick={() => {sortByString(paginatedRows3, "name", sortName, setSortName);}}> ชื่อสินค้า </Button> </TableCell>
                  <TableCell><Button onClick={() => {sortByInt(paginatedRows3, "menuCount", sortMenuCount, setSortMenuCount);}}> จำนวนสินค้า </Button> </TableCell>
                  <TableCell><Button onClick={() => {sortByInt(paginatedRows3, "total", sortTotal, setSortTotal);}}> ยอดขาย </Button> </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows3.map((row, index) => (
                  <>
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.total} บาท</TableCell>
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
                            <h1>สินค้ายอดนิยมในวันที่ {row.date}</h1>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>ลำดับ</TableCell>
                                    <TableCell>เมนู</TableCell>
                                    <TableCell>จำนวน</TableCell>
                                    <TableCell>ราคา</TableCell>
                                  </TableRow>
                                </TableHead>

                                <TableBody>
                                  {row.popular.map((rowPop) => (
                                    <TableRow
                                      key={rowPop.id}>
                                      <TableCell component="th" scope="row">
                                        {rowPop.id}
                                      </TableCell>
                                      <TableCell>{rowPop.name}</TableCell>
                                      <TableCell>{rowPop.amount}</TableCell>
                                      <TableCell>{rowPop.price} บาท</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                      </>
                ))}
              </TableBody>
              {pagination(filteredRows3)}
            </Table>
          </TableContainer>
    )
}