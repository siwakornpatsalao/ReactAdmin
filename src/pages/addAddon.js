import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState, useEffect, useRef } from 'react';
import { TextField, MenuItem, Button, Radio, RadioGroup} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Swal from "sweetalert2";

const menus = [
  {
    value: 'เครื่องดื่ม',
    label: 'เครื่องดื่ม',
  },
  {
    value: 'ของทานเล่น',
    label: 'ของทานเล่น',
  },
  {
    value: 'ขนมปัง',
    label: 'ขนมปัง',
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  const [editAmount, setEditAmount] = useState(0);
  const [unit, setUnit] = useState('');
  const [options, setOptions] = useState([]);
  const initial = useRef(false);
  const [optionGroupName, setOptionGroupName] = useState('');
  const [isRequired, setIsRequired] = useState(true);
  const [isRequired2, setIsRequired2] = useState(true);

  const handleIsRequiredChange = (event) => {
    setIsRequired(event.target.value === 'necessary');
  };

  const handleIsRequiredChange2 = (event) => {
    setIsRequired2(event.target.value === 'one');
  };


  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/addons', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          thumbnail: image,
          price: price,
          amount: amount,
          editAmount: editAmount,
          unit: unit,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add new menu');
      }
      const resJson = await response.json();
      console.log(resJson);
      // Reset form fields
      setImage(null);
      setName('');
      setDescription('');
      setPrice(0);
      setCategory('');
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  function handleChangeFile(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64String = reader.result;
      setImage(base64String);
    };
  
    reader.readAsDataURL(file);
  }

  function handleAddOption(){
    Swal.fire({
      title: "เพิ่มตัวเลือก",
      html: '<input id="swal-input1" class="swal2-input" placeholder="ชื่อตัวเลือก">' +
      '<input id="swal-input2" class="swal2-input" placeholder="ราคา">',
      showDenyButton: true,
      confirmButtonText: "ยืนยัน",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const input1Value = document.getElementById('swal-input1').value;
        const input2Value = document.getElementById('swal-input2').value;

        console.log(input1Value)
        console.log(input2Value)

      if (input1Value !== "" && input2Value !== "") {
        Swal.fire(`เพิ่ม Option แล้ว`, "", "success");

        const response = await fetch("http://localhost:5000/options", {
          method: "POST",
          body: JSON.stringify({
            name: input1Value,
            price: input2Value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to add new option");
        }
        const resJson = await response.json();
        console.log(resJson);
      }
    }});
  }

  function handleEditOption(option){
    Swal.fire({
      title: "แก้ไขตัวเลือก",
      html: `<input id="swal-input1" class="swal2-input" placeholder="ชื่อตัวเลือก" value=${option.name}>` +
      `<input id="swal-input2" class="swal2-input" placeholder="ราคา" value=${option.price}>`,
      showDenyButton: true,
      confirmButtonText: "ยืนยัน",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const input1Value = document.getElementById('swal-input1').value;
        const input2Value = document.getElementById('swal-input2').value;

        console.log(input1Value)
        console.log(input2Value)

      if (input1Value !== "" && input2Value !== "") {
        Swal.fire(`เพิ่ม Option แล้ว`, "", "success");

        const response = await fetch("http://localhost:5000/options", {
          method: "PUT",
          body: JSON.stringify({
            name: input1Value,
            price: input2Value,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to edit option");
        }
        const resJson = await response.json();
        console.log(resJson);
      }
    }});
  }

  async function handleSubmitOption(e){
    e.preventDefault();
    try {
      console.log(optionGroupName)
      const response = await fetch('http://localhost:5000/optiongroups', {
        method: 'POST',
        body: JSON.stringify({
          name: optionGroupName,
          necessary: isRequired ? 'necessary' : 'not',
          amount: isRequired2 ? 'one' : 'many',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add new menu');
      }
      const resJson = await response.json();
      console.log(resJson);
      setOptionGroupName('');
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchOptions() {
      try {
        const res = await fetch("http://localhost:5000/options");
        const data = await res.json();
        setOptions(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    }

    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
      fetchOptions();
    }
  }, []);

  return (
    <DashboardLayout>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="เมนูเพิ่มเติม" {...a11yProps(0)} />
          <Tab label="ตัวเลือก" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <form onSubmit={handleSubmit}>
          <input
            id="file-input"
            type="file"
            onChange={handleChangeFile}
            accept="image/*"
          />
          <br/>
          <br/>
          {image && (
            <img
              src={image}
              style={{ maxWidth: '100%', height: '500px' }}
              alt="Preview"
            />
          )}

          <Box
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="ชื่อเมนู"
              value={name}
              color="secondary"
              focused
              onChange={(e) => setName(e.target.value)}
            />
            <br/>
            <TextField
              label="คำอธิบาย"
              value={description}
              color="secondary"
              focused
              onChange={(e) => setDescription(e.target.value)}
            />
            <br/>
            <TextField
              label="ราคา"
              value={price}
              color="secondary"
              focused
              onChange={(e) => setPrice(e.target.value)}
            />
            <br/>
            <TextField
              label="จำนวน"
              value={amount}
              color="secondary"
              focused
              onChange={(e) => setAmount(e.target.value)}
            />
            <TextField
              label="แก้ไขจำนวน"
              disabled
              value={editAmount}
              color="secondary"
              focused
              onChange={(e) => setEditAmount(e.target.value)}
            />
            <br/>
            <TextField
              label="หน่วย"
              value={unit}
              color="secondary"
              focused
              onChange={(e) => setUnit(e.target.value)}
            />
          </Box>

          <TextField
            value={category}
            select
            label="หมวดหมู่"
            defaultValue="เครื่องดื่ม"
            helperText="Please select your category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {menus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br/>

          <Button type="submit">Add New Addon</Button>
        </form>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <form onSubmit={handleSubmitOption}>
        <h1>ชื่อกลุ่มตัวเลือก</h1>
        <TextField
              label="ชื่อกลุ่มตัวเลือก"
              value={optionGroupName}
              color="secondary"
              focused
              onChange={(e) => setOptionGroupName(e.target.value)}
        />
        <br/>
        <Button onClick={handleAddOption}>เพิ่มตัวเลือก</Button>
        {options.map((option) => (
              <MenuItem onClick={() => handleEditOption(option)} key={option._id}>
                {option.name} +{option.price} บาท
              </MenuItem>
            ))}
        <h1>ลูกค้าต้องเลือกตัวเลือกนี้หรือไม่</h1>
        <RadioGroup value={isRequired ? 'necessary' : 'not'} onChange={handleIsRequiredChange}>
          <FormControlLabel value="necessary" control={<Radio />} label="จำเป็น" />
          <FormControlLabel value="not" control={<Radio />} label="ไม่บังคับ" />
        </RadioGroup>
        <h1>ลูกค้าสามารถเลือกตัวเลือกได้กี่อย่าง</h1>
        <RadioGroup value={isRequired2 ? 'one' : 'many'} onChange={handleIsRequiredChange2}>
          <FormControlLabel value="one" control={<Radio />} label="1 อย่าง" />
          <FormControlLabel value="many" control={<Radio />} label="หลายอย่าง" />
        </RadioGroup>
        <br/>

        <Button variant='contained' type="submit">สร้างตัวเลือกใหม่</Button>
        </form>
      </CustomTabPanel>
    </Box>
    </DashboardLayout>
  );
}
