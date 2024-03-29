import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '../ui/Button';
import Typography from '@mui/material/Typography';
import RouteIcon from '../../assets/Route.png';

export default function RouteCard({ time, distance, mode, filters, routeNo, onClick, display }) {
  return (
    <Card sx={{ width: '293px', height: '100px', bottom: '150px', left: '50px', borderRadius: '20px 75px 75px 20px', position: 'fixed', display: {display}, justifyContent: 'space-evenly', alignItems: 'center',
    '@media (max-height: 855px)': {
      marginBottom: 'calc(env(safe-area-inset-bottom) - 50px)'
    },
    }}>
        <Box sx={{ textAlign: 'center' }}>
          <img src={RouteIcon} style={{ width:"25px", height:"25px" }}/>
          <Typography variant="cardDesc" component="div" sx={{ ml: 1 }}>
            Route {routeNo}
          </Typography>
        </Box>
      <CardContent>
        <Typography variant="filterh1" component="div">
          {time}
        </Typography>
        <Typography variant="cardDesc" component="div" sx={{ mb: 1 }}>
          {distance}
        </Typography>
        <Typography variant="cardDesc2" component="div">
          {mode}
        </Typography>
        <Typography variant="cardDesc" component="div">
          {filters}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={onClick} text="GO" color="navigationGo" borderRadius="100px" width="62px" height="62px"></Button>
      </CardActions>
    </Card>
  );
}