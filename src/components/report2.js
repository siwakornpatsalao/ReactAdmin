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


export default function Report2(){
    const initial = useRef(false);
    
    useEffect(() => {
        async function fetchReport2() {
            try {
              const res = await fetch("http://localhost:5000/report2");
              const data = await res.json();
              const formattedData = data.map(item => ({
                ...item,
                date: formatDate(item.date),
              }));
              setRows2(formattedData);
              console.log(data);
            } catch (error) {
              console.error("Error fetching report1:", error);
            }
        }
        if (!initial.current) {
            initial.current = true;
            console.log(initial.current);
            fetchReport2();
          }
    }, []);

    useEffect(() => {
        function isTimeInRange(time, range) {
          const { startTime, finishTime } = range;
          const timeToCheck = time;
          const start = formatTimeFromHours(startTime);
          const finish = formatTimeFromHours(finishTime);
          return timeToCheck >= start && timeToCheck <= finish;
        }
    
        if (year || month || day || startTime || finishTime) {
          const filteredRowsByYear = rows2.filter((row) => {
            const yearMatches = !year || row.date.endsWith(`/${year}`);
            const monthMatches = !month || row.date.startsWith(`0${month}`);
            const dayMatches = !day || parseInt(row.date.split("/")[1]) === day;
            const timeMatches =
              !startTime || !finishTime || isTimeInRange(row.time, { startTime, finishTime });
            return yearMatches && monthMatches && dayMatches && timeMatches;
          });
          setFilteredRows2(filteredRowsByYear);
        } else {
          setFilteredRows2(rows2);
        }
      }, [year, month, day, time, startTime, finishTime]);
    
      // Pagination 2
    
      useEffect(() => {
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        setPaginatedRows2(filteredRows2.slice(startIndex, endIndex));
      }, [filteredRows2, page, rowsPerPage]);

    return(
        <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์"
              ? renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
              : month === "เมษายน" ||
                month === "มิถุนายน" ||
                month === "กันยายน" ||
                month === "พฤศจิกายน"
              ? renderDropdown("รายวัน", days.slice(0, 30), day, handleChangeDay)
              : renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay)}
            {renderDropdown("เวลาเริ่มต้น", timeArray, startTime, handleChangeStartTime)}
            {renderDropdown("เวลาสิ้นสุด", timeArray, finishTime, handleChangeFinishTime)}
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> <Button onClick={() => { sortByInt(paginatedRows2, "order", sortOrder, setSortOrder); }} > ลำดับ </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByDate(paginatedRows2, "date", sortDate, setSortDate); }} > วันที่ </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByTime(paginatedRows2, "time", sortTime, setSortTime); }} > เวลา </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByString(paginatedRows2, "name", sortName, setSortName); }} > ชื่อรายการ </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByInt(paginatedRows2, "count", sortCount, setSortCount); }} > จำนวน </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByInt(paginatedRows2, "price", sortPrice, setSortPrice); }} > ราคา </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByString(paginatedRows2, "status", sortStatus, setSortStatus); }} > สถานะ </Button> </TableCell>
                  <TableCell> <Button onClick={() => { sortByString(paginatedRows2, "type", sortType, setSortType); }} > ประเภท </Button> </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRows2.map((row, index) => (
                  <>
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    {row.type == 'ตัวเลือก' ? <TableCell>
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
                      </TableCell>: null}
                  </TableRow>
                  
                  {row.type === 'ตัวเลือก' && (
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open[index]} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>ตัวเลือก</TableCell>
                                  <TableCell>ราคา</TableCell>
                                  <TableCell>จำนวน</TableCell>
                                  <TableCell>หน่วย</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.detail.map((AddonRow) => (
                                  <TableRow key={AddonRow.id}>
                                    <TableCell component="th" scope="row">
                                      {AddonRow.name}
                                    </TableCell>
                                    <TableCell>{AddonRow.price}</TableCell>
                                    <TableCell>{AddonRow.amount}</TableCell>
                                    <TableCell>{AddonRow.unit}</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>)}

                  </>
                ))}
              </TableBody>
              {pagination(filteredRows2)}
            </Table>
          </TableContainer>
    )
}