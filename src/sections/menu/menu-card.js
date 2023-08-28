import PropTypes, { func } from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState, useRef } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { fontWeight } from '@mui/system';

export const MenuCard = (props) => {
  const { menu, hasPromotion, promoData, hasPromotionCategory, promoCategoryData } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 350,
      }}
      /* style={{
        boxShadow: '10px rgba(0, 0, 0, 0.2)',
      }} */
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img style={{
                maxWidth: "100%",
              }} src={menu.thumbnail} alt="Preview" variant="square" width='300px' height='200px'
                />
        </Box>
        <br/>

        <Link href={`/edit/editMenu?id=${menu._id}`} >
          <Button variant="outlined">Edit</Button>
        </Link>
        <Typography
          sx={{
            marginTop: '10px',
            marginLeft: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontSize: '20px'
          }}
          align="left"
          gutterBottom
          variant="body1"
        >
          {menu.name}
        </Typography>
        <Typography
          marginLeft={'10px'}
          align="left"
          variant="body1"
          color="red"
          sx={{fontSize: '18px'}}
        >
          {menu.price}.-
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
{/*       <Divider /> */}
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ p: 1 }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ClockIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >
            Updated: {new Date(menu.updated_at).toDateString()}
          </Typography>

          {hasPromotion && (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              >
                Promotion Menu: {promoData.map((promo) => (
                <MenuItem key={promo.id}>
                    <p>Topic: {promo.topic}</p>
                </MenuItem>
                 ))}
                 {hasPromotionCategory && (
                  <div>
                    <p>Promotion Category:</p>
                    {promoCategoryData.map((promo) => (
                      <MenuItem key={promo.id} sx={{ color: 'text.secondary' }}>
                        Topic: {promo.topic}
                      </MenuItem>
                    ))}
                  </div>
                )}

              </Menu>
            </div>
          )}

          {/* {hasPromotionCategory && (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <KeyboardArrowDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{ 'aria-labelledby': 'basic-button' }}
              >
                Promotion Category: {promoCategoryData.map((promo) => (
                <MenuItem color="text.secondary">
                    <p key={promo.id}>Topic: {promo.topic}</p>
                </MenuItem>
                ))}
              </Menu>
            </div>
          )} */}

          {/* // category has promotion */}
        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <ArrowDownOnSquareIcon />
          </SvgIcon>
          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >

          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.object.isRequired,
  hasPromotion: PropTypes.bool.isRequired,
  promoData: PropTypes.func.isRequired,
};