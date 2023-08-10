import PropTypes, { func } from 'prop-types';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import { Avatar, Box, Button, Card, CardContent, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Link from 'next/link';

export const MenuCard = (props) => {
  const { menu} = props;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: 350,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={menu.thumbnail}
            variant="square"
            height="200px"
          />
        </Box>
        <br/>
        <Link href={`/edit/editMenu?id=${menu._id}`} >
          <Button>Edit</Button>
        </Link>
        <Typography
          sx={{
            marginLeft: '10px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          align="left"
          gutterBottom
          variant="body1"
          nowrap
        >
          {menu.name}
        </Typography>
        <Typography
          marginLeft={'10px'}
          align="left"
          variant="body1"
          color="red"
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
  menu: PropTypes.object.isRequired
};