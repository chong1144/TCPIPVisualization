import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CustomizedRadios from './CustomizedRadios';
// import LinkRouter from './LinkRouter';
// import Show from './Show'
// import Link from 'react-router'
// import Router from 'react-router'
import GenHeaders from './GenHeaders'
import zIndex from '@material-ui/core/styles/zIndex';



const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(7, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor :'#0099CC',
    zIndex:50
  },
  lowerInput:{
    position: "absolute",
    left:"400px",
    top:"300px",
  },
  header:{
    position:"absolute",
    left:"42%",
    top:"60px"
  }

  
}));

var newData = {
  sourceIp:"",
  sourcePort:"",
  sourceMac:"",
  destIp:"",
  destPort:"",
  destMac:"",
  context:"",
  senderTcpHeader:'',
  reciverTcpHeader:'',
  udpHeader:'',
  ipHeader:'',
  macHeader:'',
  context:'',
  isTcp:true,
  needAdd:false,
  timeout:100
}

export default function SignInSide(props) {

  const classes = useStyles();

  const [values,setValues] = React.useState({
      sourceIp:"192.168.20.23",
      sourcePort:"4000",
      sourceMac:"80:00:20:7A:3F:3E",
      destIp:"192.168.80.88",
      destPort:"4001",
      destMac:"80:00:20:20:3A:AE",
      context:'Hello World',
      timeout:100
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
 
  const handleClick = () =>{

    newData.context = values.context;
    
    newData.needAdd = (values.context.length<=5&&newData.isTcp) || (!newData.isTcp&&values.context.length<=17);
    newData.sourceIp = values.sourceIp;
    newData.sourcePort = values.sourcePort;
    newData.sourceMac = values.sourceMac;
    newData.destIp = values.destIp;
    newData.destPort = values.destPort;
    newData.destMac = values.destMac;
    newData.timeout = values.timeout;
  
    props.sendData(newData);
    props.next();
  }

  const getRadioData = (data) =>{
    newData.isTcp = data==="tcp";
  }

  return (
    <Grid container spacing={2} className={classes.root} direction="row">
      {/* <CssBaseline /> */}
      <Typography  variant="h5" className={classes.header}>
            Basic configuration
      </Typography>
      {/* <Grid item xs={false} sm={4} md={7} className={classes.image} /> */}
      <Grid container xs={6} component={Paper}  elevation={0} square>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              id="sourceIP"
              label="Sender IP"
              name="sourceIP"
              
              value={values.sourceIp}
              onChange={handleChange('sourceIp')}
              //autoComplete="email"
              // autoFocus
            />
            <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              name="sourcePort"
              label="Sender Port"
              // type="email"
              id="sourcePort"
              value={values.sourcePort}
              onChange={handleChange('sourcePort')}
              //autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              name="sourceMac"
              label="Sender Mac"
              // type="email"
              id="sourceMac"
              value={values.sourceMac}
              onChange={handleChange('sourceMac')}
              //autoComplete="current-password"
            />
          
            
          </form>     
        </div>
        
      </Grid>
      <Grid container xs={6} component={Paper} elevation={0} square>
        <div className={classes.paper}>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              name="destIp"
              label="Receiver IP"
              //type="password"
              id="destIp"
              value={values.destIp}
              onChange={handleChange('destIp')}
              //autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              name="destPort"
              label="Receiver Port"
              //type="password"
              id="destPort"
              value={values.destPort}
              onChange={handleChange('destPort')}
              //autoComplete="current-password"
            />
             <TextField
              variant="outlined"
              margin="dense"
              //required
              fullWidth
              name="destMac"
              label="Receiver Mac"
              //type="password"
              id="destMac"
              value={values.destMac}
              onChange={handleChange('destMac')}
              //autoComplete="current-password"
            />
          
          </form>     
        </div>
        
      </Grid>
      <Grid container xs={false} className={classes.lowerInput}  square>
        <Paper className={classes.paper} elevation={0}>
          <form className={classes.form} noValidate>
            
            <TextField
              // variant="outlined"
              variant="outlined"
              // margin="dense"
              //required
              //fullWidth
              name="context"
              label="context"
              //type="password"
              alignItems="center"
              id="context"
              value={values.context}
              onChange={handleChange('context')}
              //autoComplete="current-password"
            />

            <TextField
              // variant="outlined"
              variant="outlined"
              // margin="dense"
              //required
              //fullWidth
              name="timeout"
              label="timeout"
              //type="password"
              alignItems="center"
              id="timeout"
              value={values.timeout}
              onChange={handleChange('timeout')}
              //autoComplete="current-password"s
            />
            <br></br>
            <CustomizedRadios fn={getRadioData}></CustomizedRadios>
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
              // href='#/show'
            >
              Next
            </Button>
           
            
          </form>     
        </Paper>
        
      </Grid>
      
    </Grid>
    
  );
}
