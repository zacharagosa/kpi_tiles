import React, { useEffect, useState } from 'react'
import { Paragraph, Heading } from '@mui/system';
import Grid from '@mui/material/Grid';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; 
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; 
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
// import './app.css';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';



export default function Tile (props) {
  function handleClick(e, link){
    LookerCharts.Utils.openUrl(link, event, false, {linkType: 'url'})
    //LookerCharts.Utils.openDrillMenu({event, links: [{ label: 'hi', type: 'url', url: 'https://google.com' }]})
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const isPositiveChange = props.change >= 0;


   const getColor = () => {
    switch (props.status) {
      case 'Normal':
        return 'success.main';
      case 'Unusual':
        return 'warning.main';
      case 'Alert':
        return 'error.main';
      default:
        return 'text.primary'; // Default to gray
    }
  };


  const [fieldValue, setFieldValue] = useState('success')
  const determineSeverity = (value) => {
    switch (props.status) {
      case 'Normal':
        return 'success';
      case 'Unusual':
        return 'warning';
      case 'Alert':
        return 'error';
      default:
        return 'info'; // Default to info
    }
  };

  return(

    
     <Card sx={{ 
          bgcolor: 'background.paper',
          boxShadow: "4px 5px 2px #ECECEC",
          borderLeft: "1px solid #ECECEC",
          borderTop: "5px solid ",
          borderRadius: 2,
          position: "relative",
          height: "auto",
          margin: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
          paddingTop: '5px',
          maxWidth: 345 
        }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.kpi}
        subheader={props.description}
      />
            <Alert variant="outlined" severity={determineSeverity(fieldValue)} sx={{ borderRadius: 8 }}> 
                  <AlertTitle sx={{ fontWeight: 'bold', fontSize: 16 }}>{props.status}</AlertTitle>
            </Alert>


          {props.array_of_values ? 
            (
               <Box height={100}>
                  <SparkLineChart data={props.array_of_values} showTooltip={true} />
               </Box>
            ):(
              <Box height={100}>
                      <Gauge
                        value={75}
                        startAngle={-110}
                        endAngle={110}
                        sx={{
                          [`& .${gaugeClasses.valueText}`]: {
                            fontSize: 15,
                            transform: 'translate(0px, 0px)',
                          },
                        }}
                        text={
                           ({ value, valueMax }) => `${value} / ${valueMax}`
                        }
                      />
              </Box>
              )

        }

      <CardContent>
            <Box

                  sx={{ 
                    fontWeight: 'bold',
                    display: 'grid',
                    columnGap: 0,
                    rowGap: 1,
                  }}>
          </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'right' }}>
        <Typography variant="h6" gutterBottom>
              {props.unit}
        </Typography>

        <Grid container alignItems="center" spacing={1}>
            <Grid item> 
              <Typography variant="h1" sx={{ color: getColor(), fontSize: 72 }}>
                {props.rendered_value}
              </Typography>
            </Grid>

            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Added Box for nested alignment */}
                <Typography variant="body1" color={isPositiveChange ? 'success.main' : 'error.main'}>
                  {isPositiveChange ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}  
                  {Math.abs(Math.round(props.change * 100, 0))}% 
                </Typography>
              </Box>
            </Grid>
        </Grid>
      </Box>
      </CardContent>
      <CardActions disableSpacing>
          <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}