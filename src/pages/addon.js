import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
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
import { AddonSearch } from 'src/sections/adds/addon-search';
import { useEffect , useState, useRef} from 'react';
import { AddonCard } from 'src/sections/adds/addon-card';
import Link from 'next/link';

function Addon(){
    const [Addons, setAddons] = useState([]);
    const initial = useRef(false);

    useEffect(() => {
        async function fetchAddons() {
          try {
            const res = await fetch("http://localhost:5000/Addons");
            const data = await res.json();
            setAddons(data);
            console.log(data);
          } catch (error) {
            console.error("Error fetching Addons:", error);
          }
        }
    
        if (!initial.current) {
          initial.current = true;
          console.log(initial.current);
          fetchAddons();
        }
      }, []);
    return (
        <>
    <Head>
      <title>
        Addon | Devias Kit
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
                Addons
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
                <Link href="./addAddon">
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add Addon
              </Button>
              </Link>
            </div>
          </Stack>
          <AddonSearch />
          <Grid
            container
            spacing={3}
          >
            {Addons.map((Addon) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={Addon._id}
              >
                <AddonCard Addon={Addon} />
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
  </>
    )
}


Addon.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Addon;
