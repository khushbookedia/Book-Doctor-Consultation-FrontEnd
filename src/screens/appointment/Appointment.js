
import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import * as fetchApi from '../../util/fetch'
import RateAppointment from './RateAppointment'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: "left",
        padding : "20px",
        width: "100%",
    },
    appList: {
        width: "40%",
    },
    app : {
        width: "100%",
        margin: "20px",
    },
    rate: {

    },
});

const Appointment = (props) => {
    const {classes, isLoggedIn} = props;

    const filterStyles = styles();

    const [appointments, setAppointments] = useState([]);

    const [isRating, setIsRating] = useState(false);

    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const getAppointments = async() => {
        
        const response = await fetchApi.getData(
            `users/${sessionStorage.getItem("uuid")}/appointments`
        );      

        if(response.status === 200){
            var appList = await response.json(); 
            
            setAppointments(appList) ; 
            
        }
        else{
            const error = await response.json();
            alert(error.message);
        }
    }
    
    useEffect(()=>{
        if(isLoggedIn){
            getAppointments();
        }
    },[isLoggedIn]);

    if(!isLoggedIn){
        return(
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
                <Typography variant="h5">
                    Login to see appointments
                </Typography>
            </Grid>
        )
    }


    return(
        
        <Grid
            container
            alignItems={"center"}
            direction={"column"}
            justifyContent={"space-evenly"}
            className={filterStyles.root}
        >
            
            <RateAppointment 
                closeModel = {() => setIsRating(false)}
                isRating = {isRating}
                selectedAppointment = {selectedAppointment}
            />
            
            {appointments.map((app) => {
                return(
                    <Grid item key={app.id} className={filterStyles.app}>
                        <Paper className={filterStyles.paper}>
                            <Typography variant="h5" gutterBottom>
                                Dr. {app.doctorName}                            
                            </Typography>

                            <Typography variant="h6" component="h6">
                                Date: {app.appointmentDate}                            
                            </Typography>

                            <Typography variant="h6" component="h6">
                                Symptoms: {app.symptoms}                            
                            </Typography>

                            <Typography variant="h6" component="h6">
                                PriorMedicalHistory {app.priorMedicalHistory}                            
                            </Typography>
                            <br/>
                            <br/>
                            <Button
                                className={filterStyles.rate}
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    if(!isLoggedIn){
                                        alert("Please login to rate an appointment")
                                    }else{
                                        setSelectedAppointment(app);
                                        setIsRating(true);
                                    }
                                }}
                            >
                                Rate Appointment
                            </Button>
                        </Paper>
                    </Grid>
                )
            })}



        {/* <div>
            {!props.isLoggedIn && <p style={{textAlign:'center', fontSize:25}}>Login to see appointments</p>}
        </div> */}
        </Grid>
        
    );
}

export default Appointment;