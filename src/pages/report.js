import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import { TextField, MenuItem, Button } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function createData(order, date, orderCount, menuCount, total) {
  return { order, date, orderCount, menuCount, total };
}

const rows = [
  createData(1, '06/16/2023', 9, 11, 560),
  createData(2, '06/15/2023', 10, 14, 760),
  createData(3, '06/14/2023', 8, 9, 410),
  createData(4, '06/13/2023', 11, 13, 700),
  createData(5, '06/12/2023', 7, 11, 590),
];

function createData2(order, date, time, name, count, price, status, type) {
  return { order, date, time, name, count, price, status, type };
}

const rows2 = [
  createData2(1, '06/16/2023', '09:00:00', 'วิปครีม', 100, 10, 'อัปเดต', 'เมนูเพิ่มเติม'),
  createData2(2, '06/16/2023', '09:23:25', 'ไส้', '-', '-', 'อัปเดต', 'ตัวเลือก'),
  createData2(3, '06/14/2023', '08:06:23', 'ชีส', 100, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(4, '06/14/2023', '08:31:11', 'ไข่ดาว', 30, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(5, '06/14/2023', '08:45:34', 'แป้ง', '-', '-', 'สร้าง', 'ตัวเลือก'),
];

function createData3(order, date, name, menuCount, total) {
  return { order, date, name, menuCount, total };
}

const rows3 = [
  createData3(1, '06/16/2023', 'เครป 3 ไส้', 12, 650),
  createData3(2, '06/15/2023', 'เครป 2 ไส้', 8, 530),
  createData3(3, '06/14/2023', 'เครป 1 ไส้', 6, 400),
  createData3(4, '06/13/2023', 'เครปไส้แตก', 4, 250),
  createData3(5, '06/12/2023', 'เครป 5 ไส้', 1, 60),
];

const years = [];
for (let i = 2023; i >= 2013; i--) {
  years.push(i.toString());
}

const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const days = [];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

const times = [
    '09:00 - 12:00', '12:01 - 15:00' , '15:01 - 18:00'
]

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
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');
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

  function sortByOrder(row) {
    if (sortOrder === "asc") {
      row.sort((a, b) => b.order - a.order);
      setSortOrder("desc");
    } else {
      row.sort((a, b) => a.order - b.order);
      setSortOrder("asc");
    }
  }

  function sortByDate(row) {
    if (sortDate === "asc") {
      row.sort((a, b) => new Date(b.date) - new Date(a.date));
      setSortDate("desc");
    } else {
      row.sort((a, b) => new Date(a.date) - new Date(b.date));
      setSortDate("asc");
    }
  }  

  function sortByOrderCount(row){
    if(sortOrderCount === 'asc'){
      row.sort((a, b) => b.orderCount - a.orderCount);
      setSortOrderCount("desc");
    } else {
      row.sort((a, b) => a.orderCount - b.orderCount);
      setSortOrderCount("asc");
    }
  }

  function sortByMenuCount(row){
    if(sortMenuCount === 'asc'){
      row.sort((a, b) => b.menuCount - a.menuCount);
      setSortMenuCount("desc");
    } else {
      row.sort((a, b) => a.menuCount - b.menuCount);
      setSortMenuCount("asc");
    }
  }

  function sortByTotal(row){
    if(sortTotal === 'asc'){
      row.sort((a, b) => b.total - a.total);
      setSortTotal("desc");
    } else {
      row.sort((a, b) => a.total - b.total);
      setSortTotal("asc");
    }
  }

  function sortByCount(row){
    if(sortCount === 'asc'){
      row.sort((a, b) => b.count - a.count);
      setSortCount("desc");
    } else {
      row.sort((a, b) => a.count - b.count);
      setSortCount("asc");
    }
  }

  function sortByPrice(row){
    if(sortPrice === 'asc'){
      row.sort((a, b) => b.price - a.price);
      setSortPrice("desc");
    } else {
      row.sort((a, b) => a.price - b.price);
      setSortPrice("asc");
    }
  }

  function sortByTime(row){
    if(sortTime === 'asc'){
      //row.sort((a, b) => );
      setSortTime("desc");
    } else {
      //row.sort((a, b) => );
      setSortTime("asc");
    }
  }

  function sortByName(row){
    if(sortName === 'asc'){
      row.sort((a, b) => (a.name > b.name ? -1 : 1));
      setSortName("desc");
    } else {
      row.sort((a, b) => (a.name < b.name ? -1 : 1));
      setSortName("asc");
    }
  }

  function sortByStatus(row){
    if(sortStatus === 'asc'){
      row.sort((a, b) => (a.status > b.status ? -1 : 1));
      setSortStatus("desc");
    } else {
      row.sort((a, b) => (a.status < b.status ? -1 : 1));
      setSortStatus("asc");
    }
  }

  function sortByType(row){
    if(sortType === 'asc'){
      row.sort((a, b) => (a.type > b.type ? -1 : 1));
      setSortType("desc");
    } else {
      row.sort((a, b) => (a.type < b.type ? -1 : 1));
      setSortType("asc");
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setYear(''); 
    setMonth(''); 
    setDay(''); 
    setTime('');
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

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

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
            centered
          >
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
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Button onClick={()=>{sortByOrder(rows)}}>ลำดับ</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByDate(rows)}}>วันที่</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByOrderCount(rows)}}>จำนวนออเดอร์</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByMenuCount(rows)}}>จำนวนสินค้า</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByTotal(rows)}}>จำนวนยอดขาย</Button></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.order}
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>{row.orderCount}</TableCell>
                      <TableCell>{row.menuCount}</TableCell>
                      <TableCell>{row.total} บาท</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์" ? (
              renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
            ) : month === "เมษายน" || month === "มิถุนายน" || month==='กันยายน' || month==='พฤศจิกายน'? (
              renderDropdown("รายวัน", days.slice(0, 30), day, handleChangeDay)
            ):(
               renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay))}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={()=>{sortByOrder(rows2)}}>ลำดับ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByDate(rows2)}}>วันที่</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByTime(rows2)}}>เวลา</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByName(rows2)}}>ชื่อรายการ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByCount(rows2)}}>จำนวน</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByPrice(rows2)}}>ราคา</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByStatus(rows2)}}>สถานะ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByType(rows2)}}>ประเภท</Button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows2.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.count}</TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์" ? (
              renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
            ) : month === "เมษายน" || month === "มิถุนายน" || month==='กันยายน' || month==='พฤศจิกายน'? (
              renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay)
            ):(
               renderDropdown("รายวัน", days.slice(0, 32), day, handleChangeDay))}
            {renderDropdown("เวลา", times, time, handleChangeTime)}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={()=>{sortByOrder(rows3)}}>ลำดับ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByDate(rows3)}}>วันที่</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByName(rows3)}}>ชื่อสินค้า</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByMenuCount(rows3)}}>จำนวนสินค้า</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByTotal(rows3)}}>ยอดขาย</Button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows3.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.order}
                    </TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.menuCount}</TableCell>
                    <TableCell>{row.total} บาท</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
    </DashboardLayout>
  );
}
