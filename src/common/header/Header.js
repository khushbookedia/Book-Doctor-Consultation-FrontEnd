import React, { useState } from 'react';
import mySvg from '../../assets/logo.jpeg'
import './Header.css';
import Button from '@material-ui/core/Button';
import Modal from 'react-modal';
import { Card, CardContent, FormControl, Grid, InputLabel } from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core';
import Input from "@material-ui/core/Input";
import isEmail from 'validator/lib/isEmail';
//import PropTypes from 'prop-types';

import Register from "./Register";
import Login from "./Login";


//style used for modal (Login/Register)
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

const Header = function(props){

    // const [isLoggedIn, setLoggedIn] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);

    function openModal(){
        setModalOpen(true);
    }

    function closeModal(){
        setModalOpen(false);
    }

    const handleTabs=(e,val)=>{
        setTabValue(val);
    }

    function logoutHandler(){
        sessionStorage.clear();
        props.setLoggedIn(false);
    }

    //https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

    // Login.protoTypes = {
    //     setToken : PropTypes.func.isRequired
    // };

    // async function loginUser(credentials){
    //     return fetch('https://localhost:8085/auth/login',{
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/json'
    //         },
    //         body: JSON.stringify(credentials)
    //     })
    //     .then(data => data.json())
    // }

    //function Login({setToken}){
    
    

    return(
        <div>
            <Grid container spacing={3} className="header">
                <Grid item xs={12} sm={6}>
                    <img src={mySvg} alt="Logo" className="logo" />
                    <span className="appName">Doctor Finder</span>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                    <div className="headerButtons">
                        {!props.isLoggedIn && <Button variant="contained" color="primary" onClick={openModal}>Login</Button>}

                        {props.isLoggedIn && <Button variant="contained" color="secondary" onClick={logoutHandler}>Logout</Button>}
                    </div>
                </Grid>
            </Grid>
            <Card>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    contentLabel="Login/Register"
                    ariaHideApp={false}
                    style={customStyles}
                >
                    
                    <div className="modalHeader">Authentication</div>

                    <div>
                        
                        <Tabs onChange={handleTabs} value={tabValue}>
                            <Tab label="LOGIN" />
                            <Tab label="REGISTER" />
                        </Tabs>
                    </div>
                    <TabPanel value={tabValue} index={0}><Login isLoggedIn={props.isLoggedIn} setLoggedIn={props.setLoggedIn} closeModal={closeModal} /></TabPanel>
                    <TabPanel value={tabValue} index={1}><Register setLoggedIn={props.setLoggedIn} closeModal={closeModal}/></TabPanel>
                </Modal>
            </Card>

            
        </div>
    )
}

function TabPanel(props){
    const {children,value,index} = props;
    return(
        <div>
            {value === index && ( 
                <div>{children}</div>
             )}
        </div>
    )
}

export default Header;