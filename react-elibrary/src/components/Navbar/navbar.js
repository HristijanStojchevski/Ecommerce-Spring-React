import React from 'react';
import {Paper, Tabs, TextField} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import {Link} from "react-router-dom";
// import Logo from '../../Assets/images/logo.png'
import Grid from '@material-ui/core/Grid';
import "./Navbar.css"

function Navbar () {
    const [loggedIn,setLoggedIn] = React.useState(false);
    const [value, setValue] = React.useState(0);
    function checkLoggedIn(){
        // Get some pointer from spring boot security that the person is logged in
    }
    const changeTabs= (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Paper style={{backgroundColor: '#3a4aa3'}}>
            <Grid container justify="space-between">
                <Grid item xs={12} md={2} >
                    E_LIBRARY
                    {/*<img className="nav-logo" src={Logo} alt=" "/>*/}
                </Grid>
                <Grid item xs={12} md={10} className="tab-align">
                    <Tabs
                        value={value}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        onChange = { changeTabs }
                    >
                        <Tab label="Books" component={Link} to="/"/>
                        <Tab label="Categories" component={Link} to="/Categories"/>
                        <Tab label="Authors" /> {/*component = {Link} to="/About"*/}
                    </Tabs>
                </Grid>
                <Grid item xs={12} md={2}>
                    {loggedIn?<span>logout</span>:<span>login/signup</span>}
                </Grid>
            </Grid>
        </Paper>
    );
}

export default Navbar;