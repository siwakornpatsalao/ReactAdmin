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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ListItemText from '@mui/material/ListItemText';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const MenuCard = (props) => {
  const { menu, hasPromotion, promoData, hasPromotionCategory, promoCategoryData, id } = props;

  const [expanded, setExpanded] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleteDialogOpenCategory, setDeleteDialogOpenCategory] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleOpenDeleteDialog(){
    setDeleteDialogOpen(true);
  }

  function handleOpenDeleteDialogCategory(){
    setDeleteDialogOpenCategory(true);
  }

  function handleReset(){
    setDeleteDialogOpen(false);
    setDeleteDialogOpenCategory(false);
  }


  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: expanded ? 'auto' : '100%',
        maxWidth: 350,
        border: '1px solid #ccc', 
      }}
      style={{
        boxShadow: ' 2px 9px #EADDCD',/* #D8E8DC */
      }}
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
              }} src={menu.thumbnail} alt="Preview" variant="square"  height='200px'
                />
        </Box>

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
            อัพเดต: {new Date(menu.updated_at).toLocaleDateString('th-TH')}
          </Typography>

{/*           {hasPromotion && (
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
                โปรโมชั่นสำหรับเมนู: {promoData.map((promo) => (
                <MenuItem key={promo.id}>
                    <p>หัวข้อ: {promo.topic}</p>
                </MenuItem>
                 ))}
                 {hasPromotionCategory && (
                  <div>
                    <p>โปรโมชั่นสำหรับหมวดหมู่:</p>
                    {promoCategoryData.map((promo) => (
                      <MenuItem key={promo.id} sx={{ color: 'text.secondary' }}>
                        หัวข้อ: {promo.topic}
                      </MenuItem>
                    ))}
                  </div>
                )}

              </Menu>
            </div>
          )} */}

        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={1}
        >

          <Typography
            color="text.secondary"
            display="inline"
            variant="body2"
          >        
          <Link href={`/edit/editMenu?id=${menu._id}`} >
            <Button>แก้ไข</Button>
          </Link>

          </Typography>
        </Stack>
      </Stack>
      <div style={{ textAlign: 'right', marginRight: '10px' }}>
      {hasPromotion &&(
            <SvgIcon sx={{fontSize:35}} onClick={handleOpenDeleteDialog}>
              <CampaignIcon sx={{color:'orange'}}/>
            </SvgIcon>
      )}
      
      {!hasPromotion && hasPromotionCategory && (
            <SvgIcon sx={{fontSize:35}} onClick={handleOpenDeleteDialogCategory}>
              <CampaignIcon sx={{color:'orange'}}/>
            </SvgIcon>
      )}

      </div>

          <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
          maxWidth="xs"
          open={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle sx={{fontSize:25,backgroundColor:'#EDA03B',color:'white'}}>โปรโมชั่น</DialogTitle>
          <DialogContent>
            <br/>
          <Typography sx={{textAlign: 'center'}} variant="h5" component="h5">โปรโมชั่นสำหรับเมนู</Typography>
          <br/>
          {promoData.map((promo) => (
                  <MenuItem key={promo.id}>
                    <p style={{fontSize:20}}>หัวข้อ: {promo.topic}</p>
                  </MenuItem>
                ))}
                <br/>
                {hasPromotionCategory && (
                  <div>
                  <Typography sx={{textAlign: 'center'}} variant="h5" component="h5">โปรโมชั่นสำหรับหมวดหมู่</Typography>
                  <br/>
                  {promoCategoryData.map((promo) => (
                    <MenuItem key={promo.id} sx={{ color: 'text.secondary' }}>
                      <p style={{fontSize:20}}>หัวข้อ: {promo.topic}</p>
                    </MenuItem>
                  ))}
                </div>
              )}       
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReset}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>

        <Dialog
          sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 600 } }}
          maxWidth="xs"
          open={isDeleteDialogOpenCategory}
          onClose={() => setDeleteDialogOpenCategory(false)}
        >
          <DialogTitle style={{backgroundColor:'#EDA03B',color:'white'}} sx={{fontSize:25}}>โปรโมชั่น</DialogTitle>
          <DialogContent>
            <br/>
            <Typography sx={{textAlign: 'center'}} variant="h5" component="h5">โปรโมชั่นสำหรับหมวดหมู่</Typography>
            <br/>
              {promoCategoryData.map((promo) => (
                <MenuItem key={promo.id} sx={{ color: 'text.secondary' }}>
                  <p style={{fontSize:20}}>หัวข้อ: {promo.topic}</p>
                </MenuItem>
              ))}    
          </DialogContent>
          <DialogActions>
            <Button onClick={handleReset}>ยกเลิก</Button>
          </DialogActions>
        </Dialog>


    </Card>
  );
};

MenuCard.propTypes = {
  menu: PropTypes.object.isRequired,
  hasPromotion: PropTypes.bool.isRequired,
  promoData: PropTypes.func.isRequired,
  hasPromotionCategory: PropTypes.bool.isRequired,
  promoCategoryData: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};