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

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const initial = useRef(false);
  const [addons, setAddons] = useState([]);
  const [optionGroups, setOptionGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [selectedOptionGroups, setSelectedOptionGroups] = useState([]);

  const isNameValid = (name) => name == "";
  const isDesValid = (description) => description == "" ;
  const isPriceValid = (price) => price<=0;
  const isCategoryValid = (category) => category == "";

  async function handleSubmit(e) {
    e.preventDefault();
  
    const addonIds = selectedAddons;
    const optionGroupIds = selectedOptionGroups; 
  
    if (!image || isNameValid(name) || isDesValid(description) || isPriceValid(price) || isCategoryValid(category)) {
      Swal.fire("Error", "กรุณากรอกข้อมูลให้ถูกต้อง", "error");
      return;
    }
    console.log(addonIds);
    Swal.fire({
      title: "ต้องการเพิ่มสินค้านี้หรือไม่",
      confirmButtonText: "ยืนยัน",
      showDenyButton: true,
      denyButtonText: "ยกเลิก", 
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch("http://localhost:5000/menus", {
            method: "POST",
            body: JSON.stringify({
              name: name,
              thumbnail: image,
              description: description,
              price: price,
              category: category,
              addonId: addonIds,
              optionGroupId: optionGroupIds, 
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            Swal.fire(`ไม่สามารถเพิ่มเมนูได้`, "", "error");
            throw new Error("Failed to add new menu");
          }
          const resJson = await response.json();
          console.log(resJson);
          Swal.fire(`เพิ่มสินค้าชิ้นนี้แล้ว`, "", "success");
          setImage(null);
          setName("");
          setDescription("");
          setPrice(0);
          setCategory("");
          setSelectedAddons([]);
          setSelectedOptionGroups([]);
          document.getElementById("file-input").value = "";
        } catch (error) {
          console.log("Error:", error.message);
        }
      }
    });
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchData(url, setter) {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setter(data);
        console.log(data);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    }

    if (!categories.length) {
      fetchData("http://localhost:5000/addons", setAddons);
      fetchData("http://localhost:5000/optiongroups", setOptionGroups);
      fetchData("http://localhost:5000/category", setCategories);
    }

    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
    }
  }, [categories.length]);

  return (
    <DashboardLayout>
      <Box sx={{ width: "100%"}}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
          >
            <Tab label="เมนูหลัก" {...a11yProps(0)} />
            <Tab label="ส่วนเสริม" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex',marginLeft: '300px' }}>
            <Box sx={{ m: 1 }}>
            <input id="file-input" type="file" onChange={handleChangeFile} accept="image/*" />
            <br/>
            <br/>
            {image && (
              <img src={image} style={{ maxWidth: "100%", height: "500px" }} alt="Preview" />
            )}
            </Box>

            <Box sx={{
                "& > :not(style)": { m: 1, width: "25ch", marginLeft:'50px' },
              }} noValidate autoComplete="off">
              <TextField
                label="ชื่อเมนู"
                value={name}
                color="secondary"
                error={isNameValid(name)}
                helperText="กรุณาใส่ชื่อสินค้า"
                focused
                onChange={(e) => setName(e.target.value)}
              />
              <br/>
              <TextField
                label="คำอธิบาย"
                value={description}
                color="secondary"
                error={isDesValid(description)}
                helperText="กรุณาใส่คำอธิบาย"
                focused
                onChange={(e) => setDescription(e.target.value)}
              />
              <br/>
              <TextField
                label="ราคา"
                value={price}
                color="secondary"
                error={isPriceValid(price)}
                helperText="กรุณาใส่ราคา"
                focused
                onChange={(e) => setPrice(e.target.value)}
              />

            <TextField
              value={category}
              select
              label="หมวดหมู่"
              defaultValue="เครื่องดื่ม"
              error={isCategoryValid(category)}
              helperText="Please select your category"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((option) => (
                <MenuItem key={option._id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <br/>

            <Button variant="contained" type="submit">สร้างเมนูใหม่</Button>
            </Box>
            </Box>
          </form>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <h1>เมนูเพิ่มเติม</h1>
          <br/>
          {addons.map((addon) => (
            <FormGroup key={addon._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAddons.includes(addon._id)}
                    onChange={() =>
                      setSelectedAddons((prev) =>
                        prev.includes(addon._id)
                          ? prev.filter((id) => id !== addon._id)
                          : [...prev, addon._id]
                      )
                    }
                  />
                }
                label={addon.name}
              />
            </FormGroup>
          ))}

          <h1>ตัวเลือก</h1>
          {optionGroups.map((optionGroup) => (
            <FormGroup key={optionGroup._id}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedOptionGroups.includes(optionGroup._id)}
                    onChange={() =>
                      setSelectedOptionGroups((prev) =>
                        prev.includes(optionGroup._id)
                          ? prev.filter((id) => id !== optionGroup._id)
                          : [...prev, optionGroup._id]
                      )
                    }
                  />
                }
                label={optionGroup.name}
              />
            </FormGroup>
          ))}
        </CustomTabPanel>
      </Box>
    </DashboardLayout>
  );
}
