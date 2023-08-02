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
// component page 1 2 3

/* const dropDown = [
  createDrop(1, "เครปไส้แตก", "12:31:00", 81),
  createDrop(2, "เครป 2 ไส้, ขนมปังชีส", "13:35:00", 79),
  createDrop(3, "เครป 1 ไส้", "18:01:00", 29),
  createDrop(4, "เครปไส้แตก", "18:54:00", 71),
  createDrop(5, "เครปไส้แตก", "20:47:00", 71),
  createDrop(6, "เครป 2 ไส้", "21:46:32", 29),
];

const dropDown2 = [
  createDrop(1, "เครปไส้แตก", "12:31:00", 81),
  createDrop(2, "เครป 2 ไส้, ขนมปังชีส", "13:35:00", 79),
  createDrop(3, "เครป 1 ไส้", "18:01:00", 29),
];

function createData(order, date, orderCount, menuCount, total, dropDown) {
  return { order, date, orderCount, menuCount, total, dropDown };
}

const rows = [
  createData(1, "06/16/2023", 9, 11, 560, dropDown),
  createData(2, "06/15/2023", 10, 14, 600, dropDown2),
  createData(3, "06/14/2023", 11, 13, 780, dropDown),
  createData(4, "06/13/2023", 8, 14, 760, dropDown2),
  createData(5, "06/12/2023", 10, 12, 750, dropDown),
  createData(6, "06/11/2023", 11, 13, 800, dropDown),
]; */

/* function createData2(order, date, time, name, count, price, status, type, dropAddon) {
  return { order, date, time, name, count, price, status, type, dropAddon };
}

function createDropAddon(name,price,amount,unit){
  return {name,price,amount,unit}
}

const dropAddon = [
  createDropAddon('เล็ก', 0, 200, 'ใบ'),
  createDropAddon('กลาง', 5, 200, 'ใบ'),
  createDropAddon('ใหญ่', 10, 200, 'ใบ')
]

const dropAddon2 = [
  createDropAddon('ไม่หวาน', 0, 100, '-'),
  createDropAddon('หวานน้อย', 0, 100, '-'),
  createDropAddon('หวานปานกลาง',0, 100, '-'),
  createDropAddon('หวานมาก', 0, 100, '-'),
]

const rows2 = [
  createData2(1, "06/16/2023", "10:00:00", "วิปครีม", 100, 10, "อัปเดต", "เมนูเพิ่มเติม"),
  createData2(2, "06/16/2023", "13:23:25", "แก้ว", "-", "-", "อัปเดต", "ตัวเลือก", dropAddon),
  createData2(3, "06/14/2023", "08:06:23", "ชีส", 100, 10, "สร้าง", "เมนูเพิ่มเติม"),
  createData2(4, "06/14/2023", "08:31:11", "ไข่ดาว", 30, 10, "สร้าง", "เมนูเพิ่มเติม"),
  createData2(5, "06/14/2023", "17:45:34", "ความหวาน", "-", "-", "สร้าง", "ตัวเลือก", dropAddon2),
  createData2(6, "06/13/2023", "18:45:34", "ไข่เจียว", 50, 10, "สร้าง", "เมนูเพิ่มเติม"),
]; */
/* 
function createData3(order, date, name, menuCount, total, dropPopular) {
  return { order, date, name, menuCount, total , dropPopular};
}

function createDropPopular(order, name, count, price){
  return { order, name, count, price };
}

const dropPopular = [
  createDropPopular(1,'เครปไส้แตก',6, 560),
  createDropPopular(2,'เครป 2 ไส้',4, 120),
  createDropPopular(3,'ชาเขียว',3, 160),
  createDropPopular(4,'เบอร์เกอร์',3, 175),
]

const dropPopular2 = [
  createDropPopular(1,'มอคค่า',5, 430),
  createDropPopular(2,'เครปไส้แตก',3, 120),
  createDropPopular(3,'โกโก้',1, 50),
]

const rows3 = [
  createData3(1, "06/16/2023", "เครป 3 ไส้", 12, 650, dropPopular),
  createData3(2, "06/15/2023", "เครป 2 ไส้", 8, 530, dropPopular),
  createData3(3, "06/14/2023", "เครป 1 ไส้", 6, 400, dropPopular2),
  createData3(4, "06/13/2023", "เครปไส้แตก", 4, 250, dropPopular),
  createData3(5, "06/12/2023", "เครป 5 ไส้", 1, 60, dropPopular2),
  createData3(6, "06/11/2023", "เครป 4 ไส้", 3, 140, dropPopular2),
];
 */
/* function createDrop(order, menu, time, total) {
  return { order, menu, time, total };
} */

const years = [];
for (let i = 2023; i >= 2013; i--) {
  years.push(i.toString());
}

const months = [
  "","มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม",
];

const days = [""];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

const timeArray = [];
for (let hour = 0; hour < 24; hour++) {
  const formattedHour = hour.toString().padStart(2, "0");
  timeArray.push(`${formattedHour}:00:00`);
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <>
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <div>{children}</div>
          </Box>
        )}
      </div>
    </>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function renderDropdown(label, options, value, onChange) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={option} value={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function BasicTabs() {
  /* const {
    pagination,handleChangePage,handleChangeRowsPerPage,sortByInt,sortByString,sortByDate,sortByTime,sortOrder,setSortOrder,sortDate,setSortDate,
    sortOrderCount,setSortOrderCount,sortMenuCount,setSortMenuCount,sortTotal,setSortTotal,sortCount,setSortCount,sortPrice,setSortPrice,sortTime,
    setSortTime,sortName,setSortName,sortStatus,setSortStatus,sortType,setSortType,rows,setRows,rows2,setRows2,rows3,setRows3,filteredRows,setFilteredRows,
    filteredRows2,setFilteredRows2,filteredRows3,setFilteredRows3,startTime,setStartTime,finishTime,setFinishTime,open,setOpen,page,setPage,
    rowsPerPage,setRowsPerPage,paginatedRows,setPaginatedRows,paginatedRows2,setPaginatedRows2,paginatedRows3,setPaginatedRows3,
  } = SortAndPage(); */

  const [value, setValue] = useState(0);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortDate, setSortDate] = useState("desc");
  const [sortOrderCount, setSortOrderCount] = useState("desc");
  const [sortMenuCount, setSortMenuCount] = useState("desc");
  const [sortTotal, setSortTotal] = useState("desc");
  const [sortCount, setSortCount] = useState("desc");
  const [sortPrice, setSortPrice] = useState("desc");
  const [sortTime, setSortTime] = useState("desc");
  const [sortName, setSortName] = useState("desc");
  const [sortStatus, setSortStatus] = useState("desc");
  const [sortType, setSortType] = useState("desc");
  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);
  const [rows3, setRows3] = useState([]);
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filteredRows2, setFilteredRows2] = useState(rows2);
  const [filteredRows3, setFilteredRows3] = useState(rows3);
  const [startTime, setStartTime] = useState("");
  const [finishTime, setFinishTime] = useState("");
  const [open, setOpen] = useState(Array(rows.length).fill(false));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [paginatedRows, setPaginatedRows] = useState(rows);
  const [paginatedRows2, setPaginatedRows2] = useState(rows2);
  const [paginatedRows3, setPaginatedRows3] = useState(rows3);
  const initial = useRef(false);

  function pagination(filteredRows) {
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: 1000000 }]}
        colSpan={3}
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePage}
      />
    );
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function sortByInt(row, column, sort, setSort) {
    if (sort === "asc") {
      row.sort((a, b) => b[column] - a[column]);
      setSort("desc");
    } else {
      row.sort((a, b) => a[column] - b[column]);
      setSort("asc");
    }
  }

  function sortByString(row, column, sort, setSort) {
    if (sort === "asc") {
      row.sort((a, b) => (a[column] > b[column] ? -1 : 1));
      setSort("desc");
    } else {
      row.sort((a, b) => (a[column] < b[column] ? -1 : 1));
      setSort("asc");
    }
  }

  function sortByDate(row, column, sort, setSort) {
    if (sort === "asc") {
      row.sort((a, b) => new Date(b[column]) - new Date(a[column]));
      setSort("desc");
    } else {
      row.sort((a, b) => new Date(a[column]) - new Date(b[column]));
      setSort("asc");
    }
  }

  function convertTimeToMinutes(timeString) {
    const [hours, minutes, seconds] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes) + parseInt(seconds) / 60;
  }

  function formatTimeFromHours(totalHours) {
    if (typeof totalHours !== "number" || isNaN(totalHours) || totalHours < 0) {
      return "00:00:00";
    }

    const hours = Math.floor(totalHours);
    const remainingHours = totalHours - hours;
    const minutes = Math.floor(remainingHours * 60);
    const seconds = Math.floor((remainingHours * 60 - minutes) * 60);

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  function sortByTime(row) {
    if (sortTime === "asc") {
      row.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
      });
      setSortTime("desc");
    } else {
      row.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeB - timeA;
      });
      setSortTime("asc");
    }
  }

  function handleReset() {
    setYear("");
    setMonth("");
    setDay("");
    setTime("");
    setStartTime("");
    setFinishTime("");
    setPage(0);
    setRowsPerPage(5);
    setOpen(Array(rows.length).fill(false));
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setYear("");
    setMonth("");
    setDay("");
    setTime("");
    setPage(0);
    setRowsPerPage(5);
    setOpen(Array(rows.length).fill(false));
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleChangeMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleChangeDay = (event) => {
    setDay(event.target.value);
  };

  const handleChangeStartTime = (event) => {
    setStartTime(event.target.value);
  };

  const handleChangeFinishTime = (event) => {
    setFinishTime(event.target.value);
  };


  function handlePopUp(row, row1) {
    Swal.fire({
      title: "รายการคำสั่งซื้อ",
      html: `<p>ชื่อ: ${row.name}</p>
             <p>ราคารวม: ${row.price} บาท</p>
             <p>วันที่ ${row1.date}</p>
             <p>เวลา: ${row.time}</p>`,
      customClass: {
        title: styles['custom-title-class'],
        html: styles['customText'],
      },
    });
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${month}/${day}/${year}`;
  }

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
      fetchReport1();
      fetchReport2();
      fetchReport3();
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

  // filter Table 2

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

  // filter Table 3

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

  return (
    <DashboardLayout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered>
            <Tab label="รายงานสินค้า" {...a11yProps(0)} />
            <Tab label="รายงาน stock" {...a11yProps(1)} />
            <Tab label="รายงานสินค้าขายดี" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
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
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
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
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
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
        </CustomTabPanel>
        
      </Box>
    </DashboardLayout>
  );
}
