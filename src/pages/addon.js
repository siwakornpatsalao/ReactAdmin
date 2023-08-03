import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import PropTypes from 'prop-types';
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
import { OptionCard } from 'src/sections/adds/option-card';
import { OptionSearch } from 'src/sections/adds/option-search';
import Link from 'next/link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

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

function Addon(){
    const [Addons, setAddons] = useState([]);
    const initial = useRef(false);
    const [value, setValue] = useState(0);
    const [optionGroups, setOptionGroups] = useState([]);
    const [originalAddons, setOriginalAddons] = useState([]);
    const [originalOptions, setOriginalOptions] = useState([]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //filter search addon
    const handleSearchAddon = (searchValue) => {
      console.log(searchValue);
      if (searchValue !== '') {
        const filteredAddons = originalAddons.filter((addon) =>
          addon.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setAddons(filteredAddons);
      } else {
        setAddons(originalAddons);
      }
    };

    //filter search option
    const handleSearchOption = (searchValue) => {
      console.log(searchValue);
      if (searchValue !== '') {
        const filteredOptions = originalOptions.filter((option) =>
          option.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setOptionGroups(filteredOptions);
      } else {
        setOptionGroups(originalOptions);
      }
    };

    useEffect(() => {
      async function fetchData(url, setter, setterOrigin) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          setter(data);
          setterOrigin(data);
          console.log(data);
        } catch (error) {
          console.error(`Error fetching data from ${url}:`, error);
        }
      }
    
        if (!initial.current) {
          initial.current = true;
          console.log(initial.current);
          fetchData("http://localhost:5000/Addons",setAddons, setOriginalAddons);
          fetchData('http://localhost:5000/optiongroups',setOptionGroups, setOriginalOptions);
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      </Box>
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
          <CustomTabPanel value={value} index={0}>
          <AddonSearch onSearch={handleSearchAddon} />
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
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
          <OptionSearch  onSearch={handleSearchOption}/>
          <Grid
            container
            spacing={3}
          >
            {optionGroups.map((optionGroup) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={optionGroup._id}
              >
                <OptionCard OptionGroups={optionGroup} />
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
          </CustomTabPanel>

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
