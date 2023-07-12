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

const menus = [
  {
    id: 1,
    value: "เครื่องดื่ม",
    label: "เครื่องดื่ม",
  },
  {
    id: 2,
    value: "ของทานเล่น",
    label: "ของทานเล่น",
  },
  {
    id: 3,
    value: "ขนมปัง",
    label: "ขนมปัง",
  },
];

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

export default function BasicTabs(props) {
  const {menu} = props;
  const [value, setValue] = useState(0);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const initial = useRef(false);

  const [addons, setAddons] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/menus", {
        method: "PUT",
        body: JSON.stringify({
          name: name,
          thumbnail: image,
          description: description,
          price: price,
          category: category,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to add new menu");
      }
      const resJson = await response.json();
      console.log(resJson);
      // Reset form fields
      setImage(null);
      setName("");
      setDescription("");
      setPrice(0);
      setCategory("");
      // Reset file input
      document.getElementById("file-input").value = "";
    } catch (error) {
      console.log("Error:", error.message);
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchAddons() {
      try {
        const res = await fetch("http://localhost:5000/addons");
        const data = await res.json();
        setAddons(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Addons:", error);
      }
    }

    setImage(menu.thumbnail);
    setName(menu.name);
    setDescription(menu.description);
    setPrice(menu.price);
    setCategory(menu.category);

    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
      fetchAddons();
    }
  }, []);

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
            <Tab label="เมนูหลัก" {...a11yProps(0)} />
            <Tab label="ส่วนเสริม" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <form onSubmit={handleSubmit}>
            <input id="file-input" type="file" onChange={handleChangeFile} accept="image/*" />
            <br/>
            <br/>
            {image && (
              <img src={image} style={{ maxWidth: "100%", height: "500px" }} alt="Preview" />
            )}

            <Box sx={{ "& > :not(style)": { m: 1, width: "25ch" } }} noValidate autoComplete="off">
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
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <br/>

            <Button type="submit">Add New Menu</Button>
          </form>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <h1>เมนูเพิ่มเติม</h1>
          <br/>
          {addons.map((addon) => (
            <FormGroup key={addon._id}>
              <FormControlLabel control={<Checkbox defaultChecked />} label={addon.name} />
            </FormGroup>
          ))}
          <br/>
          <h1>ตัวเลือก</h1>
        </CustomTabPanel>
      </Box>
    </DashboardLayout>
  );
}
