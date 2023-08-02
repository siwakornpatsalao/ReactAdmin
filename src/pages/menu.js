import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { MenuSearch } from 'src/sections/menu/menu-search';
import { useEffect , useState, useRef} from 'react';
import { MenuCard } from 'src/sections/menu/menu-card';
import Link from 'next/link';

function Menu(){
    const [menus, setMenus] = useState([]);
    const initial = useRef(false);
    const [originalMenus, setOriginalMenus] = useState([]);

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
            console.log(result.value)
    
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
        if (searchValue !== '') {
          const filteredMenus = originalMenus.filter((Menu) =>
            Menu.name.toLowerCase().includes(searchValue.toLowerCase())
          );
          setMenus(filteredMenus);
        } else {
          setMenus(originalMenus);
        }
      };   

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
    
        if (!initial.current) {
          initial.current = true;
          console.log(initial.current);
          fetchMenus();
        }
      }, []);



    return (
        <>
    <Head>
      <title>
        Menu | Devias Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Stack spacing={1}>
              <Typography variant="h4">
                Menus
              </Typography>
              <Stack
                alignItems="center"
                direction="row"
                spacing={1}
              >
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  )}
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
                <Link href="./addMenu">
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add Menu
              </Button>
              </Link>
              <br/>
              <br/>
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="outlined"
                onClick={handleAddCategory}
              >
                Add category
              </Button>
            </div>
          </Stack>
          <MenuSearch onSearch={handleSearchMenu} />
          <Grid
            container
            spacing={3}
          >
            {menus.map((menu) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={menu._id}
              >
                <MenuCard menu={menu} />
              </Grid>
            ))}
          </Grid>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination
              count={3}
              size="small"
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  </>)
}


Menu.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Menu;
