import React, { Component } from 'react'
import Block from './Block'
import SubBlock from './SubBlock';
import GenHeaders from './GenHeaders';
// inport {bounce} from "react-"

import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide'

import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import MouseOverPopover from './MouseOverPopover';
import { border } from '@material-ui/system';
import { read } from 'fs';
import { ReactDOM } from 'react-dom';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TCPModel from './TCPModel'
import TCPTable from './TCPTable';
import UDPModel from './UDPModel';
import UDPTable from './UDPTable';
import IPModel from './IPModel';
import IPTable from './IPTable';
import MACModel from './MACModel';
import MACTable from './MACTable';
import zIndex from '@material-ui/core/styles/zIndex';
import { clearInterval } from 'timers';
import Typography from '@material-ui/core/Typography';

const num = 124;


var useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,


    },
    header: {
        padding: '0px',
        margin: '0px'
    },
    blank: {
        // padding: theme.spacing(2),
        width: '900px',
        textAlign: "center",
        // borderWidth: 1,
        // borderBlockColor: 'black',
        backgroundColor: "yellow"
    },
    headerContext: {

    },
    senderAppl: {

        position: "absolute",
        left: 0,
        top: 350,
        // width:20,
        margin: 1,
        zIndex: -100
    },
    animate:{
        position:"absolute",
        left:0,
        top:420,
        //backgroundColor:"black"
    },
    myButton: {
        position: "absolute",
        left: 20,
        top: 150,
        backgroundColor: '#0099CC'
    },
    myButton1: {
        position: "absolute",
        left: 20,
        top: 200,
        backgroundColor: '#0099CC'
    },
    myButton2: {
        position: "absolute",
        left: 20,
        top: 250,
        backgroundColor: '#0099CC'
    },
    myButton3: {
        position: "absolute",
        left: 20,
        top: 300,
        backgroundColor: '#0099CC',
        zIndex:10
    },
    config: {
        position: "absolute",
        left: 1150,
        top: "50px"
    },
    introduceText:{
        position:"absolute",
        left:"150px",
        top: "100px"
    }

}));
var IntervalId ;
export default function Show_new(props) {
    const classes = useStyles();
    const [ready, setReady] = React.useState(0);
    const [tcpState,setTcpState] = React.useState(0);
    
    const timeout = props.data.timeout;
    
    const clickHandler = () => {
        // if(ready==314||ready==119||ready==205||ready==319){
        //     clearInterval(timer);
        // }
    
        setReady(ready => ready + 1);
        if(ready>=320){
            setReady(ready=>0);
            props.fn();
        }

        if(ready==1 && props.data.isTcp){
            setReady(ready => 101);
        }
        else if (ready==1){
            setReady(ready => 201)
        }

        if(ready>=119 && ready<200){
            setReady(ready=>300);
        }
        else if(ready>=205&&ready<300){
            setReady(ready=>300)
        }
        
    }

    const backHandler = () => {
        setReady(ready => ready - 1);
        if(ready==300){
            if(props.data.isTcp)
                setReady(ready => 119)
            else
                setReady(ready => 205)
        }
        if(ready == 101 || ready==201){
            setReady(ready => 1);
        }
    };

    const resetHandler = () => {
        setReady(ready => 0);
        props.backToInput();
    };

    const stopTimer = () => {
        //alert(IntervalId);
        window.clearInterval(IntervalId);
    }
    
    const skipHandler =()=>{
        var i;
        IntervalId = null;
        if(ready>=301&&ready<314){
            window.setTimeout(stopTimer,(315-ready)*timeout);
            IntervalId = window.setInterval(clickHandler,timeout);
        }
        else if(ready>=101&&ready<119){
            window.setTimeout(stopTimer,(120-ready)*timeout);
            IntervalId = window.setInterval(clickHandler,timeout);
            
        }
        else if(ready>=201&&ready<205){
            window.setTimeout(stopTimer,(206-ready)*timeout);
            IntervalId = window.setInterval(clickHandler,timeout);
        }
        else if(ready>=316&&ready<319){
            window.setTimeout(stopTimer,(320-ready)*timeout);
            IntervalId = window.setInterval(clickHandler,timeout);
        }


        
        // window.setTimeout(stopTimer,8000);
        // timer = window.setInterval(clickHandler,1000);
        
    }
  

    var width = 11;
    // alert(props.data.UrgantPointer)
    return (
        
        <div >
            <Button  className={classes.myButton} variant="contained" color="primary" onClick={clickHandler}>click</Button>
            <Button className={classes.myButton1} variant="contained" color="primary" onClick={backHandler}>back</Button>
            <Button className={classes.myButton2} variant="contained" color="primary" onClick={resetHandler}>reset</Button>
            <Fade in={(ready>=101&&ready<119)||(ready>=201&&ready<205)||(ready>=301&&ready<314)||(ready>=316&&ready<319)}>
            <Button className={classes.myButton3} variant="contained" color="primary" onClick={skipHandler}>skip</Button>
            </Fade>

            <Slide direction="up" in={ready==0} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    This is our visual interface. On the right side of the screen are the parameters you just filled out.
                    <br></br>
                    The following package is what you want to send, click [click] buttom and let's start the visual exploration journey!
                    </Typography>
            </Paper>
            </Slide>

            <Slide direction="up" in={ready>=1 && ready < 300} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    OK, let's get into the work of filling the transport layer header (TCP / UDP header)! 
                    <br></br>
                    Click [click] to show the process of filling the package one by one, 
                    <br></br>
                    If you want to fast forward, click [skip]. Start exploring!
                    </Typography>
            </Paper>
            </Slide>



            <Slide direction="up" in={ready==300} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    Congratulations, the transport layer header (TCP / UDP header) is officially filled! We will start filling the network layer! 
                    <br></br>
                    In addition, you can hover over the transport layer header (TCP / UDP header) 
                    
                    <br></br>
                    to see all the hexadecimal codes of the transport layer header (TCP / UDP header)! 
                   
                    </Typography>
            </Paper>
            </Slide>

            <Slide direction="up" in={ready>300 && ready<315} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    Now fill the network layer
                    </Typography>
            </Paper>
            </Slide>

            <Slide direction="up" in={ready==315} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                        
                    Congratulations, the network layer header (IP header) is officially populated! We will start filling in the data link layer!
                    <br></br>
                    In addition, you can hover over the network layer header (IP header)
                    <br></br>
                     to see all the hexadecimal codes of the network layer header (IP header)! 
                   
                    </Typography>
            </Paper>
            </Slide>

            <Slide direction="up" in={ready>315 && ready<320} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    Now fill the datalink layer
                    </Typography>
            </Paper>
            </Slide>


            <Slide direction="up" in={ready>=320} timeout={1000}>
            <Paper className={classes.introduceText} >
                    <Typography component="p">
                    Congratulations, the data link layer header (MAC header) is officially populated! The sender's fill task is complete!
                    <br></br>
                    In addition, mouse over the data link layer header (MAC header)
                    <br></br> 
                    to see all the hexadecimal codes of the data link layer header (MAC header)! 
                    <br></br>
                    When the length of the entire frame is less than 60 bytes, there will be padding bytes added to the total length to 60 bytes
                    <br></br>
                    Click again to go to the receiver to start unpacking
                    </Typography>
            </Paper>
            </Slide>





            {/* TCP/IP model */}
            <Grid container className={classes.animate}>
                 {props.data.isTcp?<TCPModel data={props.data} state={ready-100}></TCPModel>:<UDPModel data={props.data} state={ready-200}></UDPModel>}
                 <IPModel  data={props.data} state={ready-300}></IPModel>
                 <MACModel data={props.data} state={ready-315}></MACModel>

            </Grid>
            
            <Grid container xs={9} className={classes.senderAppl} direction="row-reverse" >
                
                <Fade in={ready >=320 && props.data.needAdd }>
                <Paper elevation="3" className={classes.header}>
                <MouseOverPopover color="#FFFFCC" data="Padding bytes" hoverData={"When the length of the frame is less than 60 bytes, we need to pad it to 60 bytes with padding bytes"}></MouseOverPopover>
                </Paper>
                {/* context */}
                </Fade>
                <Fade in={ready >= 1}>
                    
                    <Paper elevation="3" className={classes.paper}>
                        {props.data.context}
                    </Paper>
                </Fade>


               
                <Fade in={ready >= 300} timeout={1000}>
                    <Paper elevation="3" className={classes.header} >
                        <MouseOverPopover color="#FFFFCC" data={props.data.isTcp ? "Tcp Header (20 Byte)" : "Udp Header (8 Byte)"} hoverData={props.data.isTcp ? props.data.senderTcpHeader : props.data.udpHeader}></MouseOverPopover>
                    </Paper>
                </Fade>
                

               
                <Fade in={ready >= 315} timeout={1000}>
                    <Paper elevation="3" className={classes.header} >
                        <MouseOverPopover color="#FFFFCC" data={"IP Header (20 Byte)"} hoverData={props.data.ipHeader}></MouseOverPopover>
                    </Paper>
                </Fade>

               
                {ready<321?<Fade in={ready == 320} timeout={1000}>
                    <Paper elevation="3" className={classes.header} >
                        <MouseOverPopover color="#FFFFCC" data="MAC Header (14 Byte)" hoverData={props.data.macHeader}></MouseOverPopover>
                    </Paper>
                </Fade>:<div></div>}
           
           
           
            </Grid>




            {/* table */}
            <Grid container xs={width} className={classes.config}>

                <Paper>

                    <Table className={classes.table} size="small" aria-label="simple table">
                        {/* <TableHead>
                            <TableRow>
                                <TableCell>Configure</TableCell>
                                <TableCell align="right">Value</TableCell>
                            </TableRow>
                        </TableHead> */}
                        
                        {ready<315?ready<300?props.data.isTcp?<TCPTable data={props.data} state={ready-100}></TCPTable>:<UDPTable data={props.data} state={ready-200}></UDPTable>:<IPTable  data={props.data} state={ready-300}></IPTable>:<MACTable data={props.data} state={ready-315}> </MACTable>}
                        
                    </Table>
                </Paper>

            </Grid>





        </div>
    )
}


