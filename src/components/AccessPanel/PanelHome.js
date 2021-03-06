import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
//CSS
import "../../css/AccessPanel/PanelHome.css";
//Components
import RequestDonor from "./RequestDonor";
import ContactReceiver from "./ContactReceiver";
import ContactDonor from "./ContactDonor";

//Auth
import useAuth from "../Auth/useAuth";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      position: 'relative',
      minHeight: 200,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
    },
  }));

const PanelHome = (props) => {
    const auth = useAuth();
    let media;
    if(auth === null){
      media = "donor"
    } else{
      media = auth.type.typeUser;
    }
    const typeUser = media;
		const me = props.me;
		const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };
  
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: "",
        label: 'Add',
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <UpIcon />,
        label: 'Edit',
      },
      {
        color: 'inherit',
        className: clsx(classes.fab, classes.fabGreen),
        icon: <EditIcon />,
        label: 'Expand',
      },
    ];
  
    return (
      <div className={`panelHome arriba`}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="action tabs example"
          >
            <Tab label="Bienvenida" {...a11yProps(0)} />
            {typeUser === "donor" ? <></> : <Tab label="Solicitud" {...a11yProps(1)} />}
            {typeUser === "donor" ? <Tab label="Solicitudes" {...a11yProps(2)} /> : <Tab label="Contactos" {...a11yProps(2)} /> }
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
          	<div className="PanelHome">
        	    <div>
                <h2> Bienvenido a <br/> Blood Index</h2>
                <h3>Gracias por apoyar esta iniciativa</h3>  
      	      </div>
	  	      </div>
          </TabPanel>
          {typeUser === "donor" ? 
          <TabPanel value={value} index={1} dir={theme.direction}>
            <> </>
          </TabPanel> 
          : <RequestDonor />
          }
          <TabPanel value={value} index={2} dir={theme.direction}>
            {typeUser === "donor" ? <ContactDonor me={me}/> : <ContactReceiver me={me}/> }
          </TabPanel>
        </SwipeableViews>
        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
              {fab.icon}
            </Fab>
          </Zoom>
        ))}
      </div>
    );
}

PanelHome.prototype = {
	me: PropTypes.object.isRequired
}

export default PanelHome; 
