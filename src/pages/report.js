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
  createData2(1, '06/16/2023', '10:00:00', 'วิปครีม', 100, 10, 'อัปเดต', 'เมนูเพิ่มเติม'),
  createData2(2, '06/16/2023', '13:23:25', 'ไส้', '-', '-', 'อัปเดต', 'ตัวเลือก'),
  createData2(3, '06/14/2023', '08:06:23', 'ชีส', 100, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(4, '06/14/2023', '08:31:11', 'ไข่ดาว', 30, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(5, '06/14/2023', '17:45:34', 'แป้ง', '-', '-', 'สร้าง', 'ตัวเลือก'),
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
    '','มกราคม','กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const days = [''];
for (let i = 1; i <= 31; i++) {
  days.push(i);
}

const timeArray = [];
for (let hour = 0; hour < 24; hour++) {
  const formattedHour = hour.toString().padStart(2, '0');
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
        {options.map((option,index) => (
          <MenuItem key={option} value={index}>{option}</MenuItem>
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
  const [filteredRows, setFilteredRows] = useState(rows);
  const [filteredRows2, setFilteredRows2] = useState(rows2);
  const [filteredRows3, setFilteredRows3] = useState(rows3);
  const [startTime, setStartTime] = useState('');
  const [finishTime, setFinishTime] = useState('');

  function sortByInt(row,column,sort,setSort){
    if(sort === 'asc'){
      row.sort((a, b) => b[column] - a[column]);
      setSort("desc");
    }else{
      row.sort((a, b) => a[column] - b[column]);
      setSort("asc")
    }
  }

  function sortByString(row,column,sort,setSort){
    if(sort === 'asc'){
      row.sort((a, b) => (a[column] > b[column] ? -1 : 1));
      setSort("desc");
    } else {
      row.sort((a, b) => (a[column] < b[column] ? -1 : 1));
      setSort("asc");
    }
  }

  function sortByDate(row,column,sort,setSort){
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
    if (typeof totalHours !== 'number' || isNaN(totalHours) || totalHours < 0) {
      return '00:00:00';
    }
  
    const hours = Math.floor(totalHours);
    const remainingHours = totalHours - hours;
    const minutes = Math.floor(remainingHours * 60);
    const seconds = Math.floor((remainingHours * 60 - minutes) * 60);
  
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
  
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

  function handleReset(){
    setYear('');
    setMonth('');
    setDay('');
    setTime('');
    setStartTime('');
    setFinishTime('');
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

  const handleChangeStartTime = (event) => {
    setStartTime(event.target.value);
  };
  
  const handleChangeFinishTime = (event) => {
    setFinishTime(event.target.value);
  };

  // filter Table 1

  useEffect(() => {
    if (year) {
      const filteredRowsByYear = rows.filter((row) => row.date.endsWith(`/${year}`));
      setFilteredRows(filteredRowsByYear);
    }else if(month){
      const filteredRowsByMonth = rows.filter((row) => row.date.startsWith(`0${month}`));
      setFilteredRows(filteredRowsByMonth);
    }else if(year && month){
      const filteredRowsByMonth = rows.filter((row) => row.date.startsWith(`0${month}`) && row.date.endsWith(`/${year}`));
      setFilteredRows(filteredRowsByMonth);
    }else{
      setFilteredRows(rows);
    }
    
  }, [year,month]);
  
  // filter Table 2

  useEffect(() => {
  function isTimeInRange(time, range) {
    const { startTime, finishTime } = range;
    const timeToCheck = time;
    const start = formatTimeFromHours(startTime)
    const finish = formatTimeFromHours(finishTime)
    return timeToCheck >= start && timeToCheck <= finish;
  }

    if (year || month || day || startTime || finishTime ) {
      const filteredRowsByYear = rows2.filter((row) => {
      const yearMatches = !year || row.date.endsWith(`/${year}`);
      const monthMatches = !month || row.date.startsWith(`0${month}`);
      const dayMatches = !day || parseInt(row.date.split('/')[1]) === day;
      const timeMatches = !startTime || !finishTime || isTimeInRange(row.time, { startTime, finishTime });
      return yearMatches && monthMatches && dayMatches && timeMatches;
    });
    setFilteredRows2(filteredRowsByYear);
   }else {
      setFilteredRows2(rows2);
   }
  }, [year, month, day, time, startTime, finishTime]);

  // filter Table 3

  useEffect(() => {
    if (year) {
      const filteredRowsByYear = rows3.filter((row) => row.date.endsWith(`/${year}`));
      setFilteredRows3(filteredRowsByYear);
    }else if(month){
      const filteredRowsByMonth = rows3.filter((row) => row.date.startsWith(`0${month}`));
      setFilteredRows3(filteredRowsByMonth);
    }else if(day){
      const filteredRowsByDay = rows3.filter((row) => parseInt(row.date.split('/')[1]) === day);
      setFilteredRows3(filteredRowsByDay);
    }else if(year && month){
      const filteredRowsByMonth = rows3.filter((row) => row.date.startsWith(`0${month}`) && row.date.endsWith(`/${year}`));
      setFilteredRows3(filteredRowsByMonth);
    }else{
      setFilteredRows3(rows3);
    }
    
  }, [year,month,day]);

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
        <CustomTabPanel value={value} index={0} >
          <Box>
            <TableContainer>
              {renderDropdown("รายปี", years, year, handleChangeYear)}
              {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
              <Button variant='contained' onClick={handleReset}>Reset</Button>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><Button onClick={()=>{sortByInt(filteredRows,'order',sortOrder,setSortOrder)}}>ลำดับ</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByDate(filteredRows,'date',sortDate,setSortDate)}}>วันที่</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByInt(filteredRows,'orderCount',sortOrderCount,setSortOrderCount)}}>จำนวนออเดอร์</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByInt(filteredRows,'menuCount',sortMenuCount,setSortMenuCount)}}>จำนวนสินค้า</Button></TableCell>
                    <TableCell><Button onClick={()=>{sortByInt(filteredRows,'total',sortTotal,setSortTotal)}}>จำนวนยอดขาย</Button></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
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

        <CustomTabPanel value={value} index={1} >
          <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์" ? (
              renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
            ) : month === "เมษายน" || month === "มิถุนายน" || month==='กันยายน' || month==='พฤศจิกายน'? (
              renderDropdown("รายวัน", days.slice(0, 30), day, handleChangeDay)
            ):(
               renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay))}
            {/* {renderDropdown("เวลา", times, time, handleChangeTime)} */}

            {renderDropdown("เวลาเริ่มต้น", timeArray, startTime, handleChangeStartTime)}
            {renderDropdown("เวลาสิ้นสุด", timeArray, finishTime, handleChangeFinishTime)}

            
            <Button variant='contained' onClick={handleReset}>Reset</Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows2,'order',sortOrder,setSortOrder)}}>ลำดับ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByDate(filteredRows2,'date',sortDate,setSortDate)}}>วันที่</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByTime(filteredRows2,'time',sortTime,setSortTime)}}>เวลา</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByString(filteredRows2,'name',sortName,setSortName)}}>ชื่อรายการ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows2,'count',sortCount,setSortCount)}}>จำนวน</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows2,'price',sortPrice,setSortPrice)}}>ราคา</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByString(filteredRows2,'status',sortStatus,setSortStatus)}}>สถานะ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByString(filteredRows2,'type',sortType,setSortType)}}>ประเภท</Button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows2.map((row) => (
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

        <CustomTabPanel value={value} index={2} >
          <TableContainer>
            {renderDropdown("รายปี", years, year, handleChangeYear)}
            {renderDropdown("รายเดือน", months, month, handleChangeMonth)}
            {month && month === "กุมภาพันธ์" ? (
              renderDropdown("รายวัน", days.slice(0, 29), day, handleChangeDay)
            ) : month === "เมษายน" || month === "มิถุนายน" || month==='กันยายน' || month==='พฤศจิกายน'? (
              renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay)
            ):(
               renderDropdown("รายวัน", days.slice(0, 32), day, handleChangeDay))}
            {/* {renderDropdown("เวลา", times, time, handleChangeTime)} */}
            <Button variant='contained' onClick={handleReset}>Reset</Button>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows3,'order',sortOrder,setSortOrder)}}>ลำดับ</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByDate(filteredRows3,'date',sortDate,setSortDate)}}>วันที่</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByString(filteredRows3,'name',sortName,setSortName)}}>ชื่อสินค้า</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows3,'menuCount',sortMenuCount,setSortMenuCount)}}>จำนวนสินค้า</Button></TableCell>
                  <TableCell><Button onClick={()=>{sortByInt(filteredRows3,'total',sortTotal,setSortTotal)}}>ยอดขาย</Button></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows3.map((row) => (
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
