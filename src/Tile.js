import React, { useEffect, useState } from 'react'
import { Stack, Box, Paragraph, Heading } from '@mui/system';
import Grid from '@mui/material/Grid';
import {  ThemeProvider, createTheme,  } from '@mui/material/styles';
import myTheme from './theme.js';

import Card from '@mui/material/Card';
import {CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, IconButtonProps, Alert, AlertTitle} from '@mui/material';
import {ArrowUpward,ArrowDownward, Share, Favorite,  MoreVert, ExpandMore} from '@mui/icons-material'; 
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import {   GaugeContainer,GaugeValueArc,GaugeReferenceArc,useGaugeState } from '@mui/x-charts/Gauge';
import { lime, purple } from '@mui/material/colors';

export default function Tile (props) {
  function handleClick(e, link){
    LookerCharts.Utils.openUrl(link, event, false, {linkType: 'url'})
    //LookerCharts.Utils.openDrillMenu({event, links: [{ label: 'hi', type: 'url', url: 'https://google.com' }]})
  }
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function GaugePointer() {
      const { valueAngle, outerRadius, cx, cy } = useGaugeState();

      if (valueAngle === null) {
        // No value to display
        return null;
      }

      const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
      };
      return (
        <g>
          <circle cx={cx} cy={cy} r={5} fill="black" />
          <path
            d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
            stroke="black"
            strokeWidth={5}
          />
        </g>
      );
  }

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

<ThemeProvider theme={myTheme}>


     <Card sx={{ 
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

{/* KPI Title */}

      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={props.kpi}
        subheader={props.description}
      />
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
{/* KPI Value */}
        <Grid container alignItems="center" spacing={1}>
            <Grid item> 

              <Typography variant="h1" sx={{ color: getColor(), fontSize: 72 }}>
                {props.rendered_value}
              </Typography>
            </Grid>
  {/* KPI Change */}
            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center' }}> {/* Added Box for nested alignment */}
                <Typography variant="body1" color={isPositiveChange ? 'success.main' : 'error.main'}>
                  {isPositiveChange ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />}  
                  {Math.abs(Math.round(props.change * 100, 0))}% 
                </Typography>
              </Box>
            </Grid>
        </Grid>
      </Box>
{/* Unit for KPI */}
       <Typography variant="h6" gutterBottom>
              {props.unit}
        </Typography>
{/* Sparkline or Guage */}
  <Grid>
    <Grid item>
          {props.array_of_values ? 
            (
               <Box height={100}>
                  <SparkLineChart data={props.array_of_values} showTooltip={true} />
               </Box>
            ):(
              <Box height={100}>

                        <GaugeContainer
                          width={100}
                          height={100}
                          startAngle={-110}
                          endAngle={110}
                          value={(props.value / props.kpi_target) * 100}
                        >
                          <GaugeReferenceArc />
                          <GaugeValueArc />
                          <GaugePointer />
                        </GaugeContainer>
          
              </Box>
              )

        }
        </Grid>
    </Grid>

    {/* Alert Box */}
  <Stack sx={{ width: '100%' }} spacing={1}>
            <Alert variant="filled" severity={determineSeverity(fieldValue)}> 
                  {props.status}
            </Alert>
  </Stack>


      </CardContent>
    </Card>
 </ThemeProvider>

  )
}