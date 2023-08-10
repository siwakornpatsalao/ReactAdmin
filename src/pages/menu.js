import Head from "next/head";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { MenuSearch } from "src/sections/menu/menu-search";
import { useEffect, useState, useRef } from "react";
import { MenuCard } from "src/sections/menu/menu-card";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";

function Menu() {
  const [menus, setMenus] = useState([]);
  const initial = useRef(false);
  const [originalMenus, setOriginalMenus] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState("Original Val");

  function handleAddCategory() {
    Swal.fire({
      title: "เพิ่มหมวดหมู่",
      text: "ชื่อหมวดหมู่",
      input: "text",
      showDenyButton: true,
      confirmButtonText: "ยืนยัน",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      if (result.isConfirmed && result.value !== "") {
        Swal.fire(`เพิ่มหมวดหมู่แล้ว`, "", "success");
        console.log(result.value);

        const response = await fetch("http://localhost:5000/category", {
          method: "POST",
          body: JSON.stringify({
            name: result.value,
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
      }
    });
  }

  const handleSearchMenu = (searchValue) => {
    console.log(searchValue);
    if (searchValue !== "") {
      const filteredMenus = originalMenus.filter((menu) =>
        menu.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      setMenus(filteredMenus);
    } else {
      setMenus(originalMenus);
    }
  };

  function handleFilterCategory() {
    if (category !== "") {
      const filterCategory = originalMenus.filter((menu) => menu.category.includes(category));
      setMenus(filterCategory);
    } else {
      setMenus(originalMenus);
    }
  }

  function handleClearClick() {
    setCategory("");
  }

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("http://localhost:5000/menus");
        const data = await res.json();
        setMenus(data);
        setOriginalMenus(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    }

    async function fetchCategory() {
      try {
        const res = await fetch("http://localhost:5000/category");
        const data = await res.json();
        setCategories(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    }

    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
      fetchMenus();
      fetchCategory();
    }
  }, [menus]);

  return (
    <>
      <Head>
        <title>Menu | Devias Kit</title>
      </Head>
      <Box component="main">
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Stack spacing={1}>
                  <Typography variant="h4">Menus</Typography>
                </Stack>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Link href="./add/addMenu">
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add Menu
                  </Button>
                </Link>
                <span style={{ marginRight: "20px" }}></span>
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="outlined"
                  onClick={handleAddCategory}
                >
                  เพิ่มหมวดหมู่
                </Button>
              </div>

            </Stack>
      <br/>
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ flex: 1 }}>
          <MenuSearch onSearch={handleSearchMenu} />
        </div>

        <div style={{ justifyContent: "flex-end" }}>
          <TextField
            value={category}
            style={{ width: "280px" }}
            select
            focused
            label="หมวดหมู่"
            defaultValue="เครื่องดื่ม"
            helperText="Please select your category"
            onChange={(e) => {
              setCategory(e.target.value);
              handleFilterCategory();
            }}
            InputProps={{
              endAdornment: category && (
                <InputAdornment position="start">
                  <IconButton onClick={() => setCategory("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          >
            {categories.map((option) => (
              <MenuItem key={option._id} value={option.name}>
                {option.name}
              </MenuItem>
            ))}

          </TextField>
          <span style={{ marginRight: "20px" }}></span>
          {/* <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button> */}
        </div>
      </div>


            <Grid container spacing={3}>
              {menus.map((menu) => (
                <Grid
                  /* xs={12}
                md={6} */
                  lg={3}
                  key={menu._id}
                >
                  <MenuCard menu={menu} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Pagination count={3} size="small" />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Menu.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Menu;
