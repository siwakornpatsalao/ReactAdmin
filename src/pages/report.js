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
  createData(1, '16/06/23', 9, 11, 560),
  createData(2, '15/06/23', 10, 14, 760),
  createData(3, '14/06/23', 8, 9, 410),
  createData(4, '13/06/23', 11, 13, 700),
  createData(5, '12/06/23', 7, 11, 590),
];

function createData2(order, date, time, name, amount, price, status, type) {
  return { order, date, time, name, amount, price, status, type };
}

const rows2 = [
  createData2(1, '16/06/23', '09:00:00', 'วิปครีม', 100, 10, 'อัปเดต', 'เมนูเพิ่มเติม'),
  createData2(2, '16/06/23', '09:23:25', 'ไส้', '-', '-', 'อัปเดต', 'ตัวเลือก'),
  createData2(3, '14/06/23', '08:06:23', 'ชีส', 100, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(4, '14/06/23', '08:31:11', 'ไข่ดาว', 30, 10, 'สร้าง', 'เมนูเพิ่มเติม'),
  createData2(5, '14/06/23', '08:45:34', 'แป้ง', '-', '-', 'สร้าง', 'ตัวเลือก'),
];

function createData3(order, date, name, menuCount, total) {
  return { order, date, name, menuCount, total };
}

const rows3 = [
  createData3(1, '16/06/23', 'เครป 3 ไส้', 12, 650),
  createData3(2, '15/06/23', 'เครป 2 ไส้', 8, 530),
  createData3(3, '14/06/23', 'เครป 1 ไส้', 6, 400),
  createData3(4, '13/06/23', 'เครปไส้แตก', 4, 250),
  createData3(5, '12/06/23', 'เครป 5 ไส้', 1, 60),
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
for (let i = 1; i < 31; i++) {
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
                    <TableCell>ลำดับ</TableCell>
                    <TableCell>วันที่</TableCell>
                    <TableCell>จำนวนออเดอร์</TableCell>
                    <TableCell>จำนวนสินค้า</TableCell>
                    <TableCell>ยอดขาย</TableCell>
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
              renderDropdown("รายวัน", days.slice(0, 31), day, handleChangeDay)
            ):(
               renderDropdown("รายวัน", days.slice(0, 32), day, handleChangeDay))}
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>วันที่</TableCell>
                  <TableCell>เวลา</TableCell>
                  <TableCell>ชื่อรายการ</TableCell>
                  <TableCell>จำนวน</TableCell>
                  <TableCell>ราคา</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell>ประเภท</TableCell>
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
                    <TableCell>{row.amount}</TableCell>
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
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>วันที่</TableCell>
                  <TableCell>ชื่อสินค้า</TableCell>
                  <TableCell>จำนวนสินค้า</TableCell>
                  <TableCell>ยอดขาย</TableCell>
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
