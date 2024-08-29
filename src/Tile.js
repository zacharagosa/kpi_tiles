import React, {useState} from 'react'
import {Box, Stack} from '@mui/system';
import Grid from '@mui/material/Grid';
import {ThemeProvider,} from '@mui/material/styles';
import myTheme from './theme.js';

import Card from '@mui/material/Card';
import {Alert, CardContent, CardHeader, IconButton, Dialog, DialogTitle,DialogContent,
    DialogContentText, Button,
    DialogActions} from '@mui/material';
import {ArrowDownward, ArrowUpward, MoreVert} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import {SparkLineChart} from '@mui/x-charts/SparkLineChart';
import {GaugeContainer, GaugeReferenceArc, GaugeValueArc, useGaugeState} from '@mui/x-charts/Gauge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MyForm from './form.js';



export default function Tile(props) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedLink, setSelectedLink] = useState(null); // To store the clicked link

    const handleCloseDialog = () => {
        setDialogOpen(false); // Close the dialog
        console.log('Close Dialog')
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const links = props.links;

    const handleMenuItemClick = (link, event) => {
        switch (link.type) {
            case 'measure_default':
            case 'url':
                break;
            case 'action':
                setTimeout(() => {
                    setSelectedLink(link);
                    setDialogOpen(true);
                    console.log('Open Dialog')

                }, 100);
                console.log(link)
                break;
            default:
                console.log('Unsupported link type:', link.type);
        }
        handleClose(); // Close the menu
    };

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function GaugePointer() {
        const {valueAngle, outerRadius, cx, cy} = useGaugeState();

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
                <circle cx={cx} cy={cy} r={5} fill="black"/>
                <path
                    d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                    stroke="black"
                    strokeWidth={5}
                />
            </g>
        );
    }

    const isPositiveChange = props.change >= 0;
    const positiveGood = props.positive_good;

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


    return (

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

                <CardHeader
                    action={
                        <>
                            <IconButton aria-label="settings" onClick={handleClick}>
                                <MoreVertIcon />
                            </IconButton>

                            {props.links && Array.isArray(props.links) && (

                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                    {links.map((link) => (
                                        <MenuItem key={link.label} onClick={() => handleMenuItemClick(link)}>
                                            {link.type === 'measure_default' || link.type === 'url' ? (
                                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                                    {link.label_prefix ? `${link.label_prefix} ${link.label_value}` : link.label}
                                                </a>
                                            ) : (
                                                // For other types, render the text without a link
                                                link.label_prefix ? `${link.label_prefix} ${link.label_value}` : link.label
                                            )}
                                        </MenuItem>
                                    ))}
                            </Menu>
                            )}
                                <Dialog open={dialogOpen}
                                        onClose={() => {
                                            if (!selectedLink || selectedLink.type !== 'action') {
                                                handleCloseDialog();
                                            }
                                        }}
                                >
                                    <DialogTitle>Send to Slack</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                        </DialogContentText>
                                        {selectedLink && (
                                            <MyForm formData={selectedLink.form}  onClose={handleCloseDialog} />
                                        )}
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>Cancel</Button>
                                    </DialogActions>
                                </Dialog>


                        </>
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
                    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
                        {/* KPI Value */}
                        <Grid container alignItems="center" spacing={1}>
                            <Grid item>

                                <Typography variant="h1" sx={{color: getColor(), fontSize: 72}}>
                                    {props.rendered_value}
                                </Typography>
                            </Grid>
                            {/* KPI Change */}
                            <Grid item>
                                <Box
                                    sx={{display: 'flex', alignItems: 'center'}}> {/* Added Box for nested alignment */}
                                    <Typography variant="body1"
                                                color={positiveGood==isPositiveChange ? 'success.main' : 'error.main'}>
                                        {isPositiveChange ? <ArrowUpward fontSize="small"/> :
                                            <ArrowDownward fontSize="small"/>}
                                        {Math.abs(Math.round(props.change * 100)  / 100)}%
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box height={75}>
                    {/* Unit for KPI */}
                        <Typography variant="h6" gutterBottom>
                            {props.unit}
                        </Typography>
                    </Box>
                        {/* Sparkline or Guage */}
                    <Grid>
                        <Grid item>
                            {props.array_of_values ?
                                (
                                    <Box height={100}>
                                        <SparkLineChart data={props.array_of_values} showTooltip={true}/>
                                    </Box>
                                ) : (
                                    <Box height={100}>
                                        <GaugeContainer
                                            width={100}
                                            height={100}
                                            startAngle={-110}
                                            endAngle={110}
                                            value={(props.value / props.kpi_target) * 100}
                                        >
                                            <GaugeReferenceArc/>
                                            <GaugeValueArc/>
                                            <GaugePointer/>
                                        </GaugeContainer>

                                    </Box>
                                )

                            }
                        </Grid>
                    </Grid>
                    {/* Alert Box */}
                    <Stack sx={{width: '100%'}} spacing={1}>
                        <Alert variant="filled" severity={determineSeverity(fieldValue)}>
                            {props.status}
                        </Alert>
                    </Stack>
                </CardContent>
            </Card>
        </ThemeProvider>

    )
}
