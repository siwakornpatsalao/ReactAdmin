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
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { PromotionCard } from 'src/sections/promotion/promotion-card';
import { PromotionSearch } from 'src/sections/promotion/promotion-search';

export default function Promotion(){

  const [promotions, setPromotions] = useState([]);
  const initial = useRef(false);
  const [originalPromotions, setOriginalPromotions] = useState([]);

  const handleSearchPromotion = (searchValue) => {
    if (searchValue !== '') {
      const filteredPromotion = originalPromotions.filter((promotion) =>
        promotion.topic.toLowerCase().includes(searchValue.toLowerCase())
      );
      setPromotions(filteredPromotion);
    } else {
      // Reset to show all addons when search value is empty
      setPromotions(originalPromotions)
    }
  };

  useEffect(() => {
    async function fetchPromotion(){
      try{
        const res = await fetch("http://localhost:5000/promotions");
        const data = await res.json();
        setPromotions(data);
        setOriginalPromotions(data);
        console.log(data);
      }catch(error) {
        console.error("Error fetching Promotion:", error);
      }
    }

    if (!initial.current) {
      initial.current = true;
      console.log(initial.current);
      fetchPromotion();
    }
  }, [])

    return(
        <>
    <Head>
      <title>
        Promotion | Devias Kit
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
                Promotions
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
                <Link href="./add/addPromotion">
              <Button
                startIcon={(
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                )}
                variant="contained"
              >
                Add Promotion
              </Button>
              </Link>
            </div>
           </Stack>
        </Stack>
        <PromotionSearch onSearch={handleSearchPromotion} />
          <Grid
            container
            spacing={3}
          >
            {promotions.map((promotion) => (
              <Grid
                xs={12}
                md={6}
                lg={4}
                key={promotion._id}
              >
              <PromotionCard Promotion={promotion} />
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
      </Container>
    </Box>
  </>)
}

Promotion.getLayout = (page) => (
    <DashboardLayout>
      {page}
    </DashboardLayout>
);