import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Grid, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import * as fetchApi from '../../util/fetch'
import Modal from "react-modal"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const styles = () => ({

    cardHeader : {
        backgroundColor: "purple",
        height: "70px",
        padding:"11px",
        color:"white",
    },
    formControl : {

    },
    selectEmpty:{

    },
    paper:{
        textAlign: "left",
        margin: "15px",
        padding: "20px",
        cursor: "pointer",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: 0,
        width: "50%",
        transform: "translate(-50%, -50%)",
        "background-color": "rgba(255, 255, 255, 1)",
      },

})

const BookAppointment = (props) => {

    const filterStyles = styles();
    const {bookAppointment, closeModel, selectedDoctorDetails, classes} = props;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);
    const [medicalHistory, setMedicalHistory] = useState("");
    const [symptoms, setSymptoms] = useState("");
    
    useEffect(() => {
        getAvailableSlots();
    },[selectedDate, selectedDoctorDetails.id]);

    const getAvailableSlots = async() => {
        if(selectedDoctorDetails.id === null || selectedDoctorDetails.id === undefined)
        return;

        const date = selectedDate.toISOString().split("T")[0];
        
        let response = await fetchApi.getData(
            "doctors/" + selectedDoctorDetails.id + "/timeSlots?date=" + date
            
        );
        if(response.status === 200){
            response = await response.json();
            setAvailableSlots(response.timeSlot);
            setSelectedTimeSlot("");
        }else{
            const error = await response.json();
            alert(error.message);
        }

    }

    useEffect(() => {
        if(selectedTimeSlot === ""){
            setIsTimeSlotSelected(false)
        }
        else{
            setIsTimeSlotSelected(true);
        }
    },[selectedTimeSlot]);

    const bookAppointmentApiCall = async () => {
        if(!isTimeSlotSelected)
        return;

        const data =  {
            doctorId : selectedDoctorDetails.id,
            doctorName : selectedDoctorDetails.firstName + " " + selectedDoctorDetails.lastName,
            userId : sessionStorage.getItem("uuid"),
            userEmailId : sessionStorage.getItem("uuid"),
            timeSlot : selectedTimeSlot,
            appointmentDate: selectedDate.toISOString().split("T")[0],
            symptoms : symptoms,
            priorMedicalHistory : medicalHistory,
        };
        let response = await fetchApi.postData("appointments", data);
        if(response.status === 200){
            closeModel();
            alert("Appointment Booked Successfully");
        }else{
            const error = await response.json();
            alert(error.message);
        }
    }

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }


    return(
        <Modal
            isOpen = {bookAppointment}
            contentLabel = "Book Appointment"
            onRequestClose = {closeModel}
            style={filterStyles.content}
        >

            <Card>
                <CardHeader
                    className = {filterStyles.cardHeader}
                    title="Book an Appointment"
                >
                </CardHeader>

                <CardContent>
                    <TextField
                        required
                        id="doctorName"
                        label="DoctorName"
                        disabled
                        defaultValue={selectedDoctorDetails.firstName + " " + selectedDoctorDetails.lastName}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container>
                            <KeyboardDatePicker
                                minDate={new Date()}
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange = {handleDateChange}
                                KeyboardButtonProps = {{
                                    "aria-label" : "change date",
                                }}
                            >
                            </KeyboardDatePicker>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    
                    <FormControl className={filterStyles.formControl}>
                        <InputLabel shrink id="demo-simple-select-label">
                                Timeslot
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedTimeSlot}
                            onChange={(e) =>  {
                                setSelectedTimeSlot(e.target.value);
                            }}
                            displayEmpty
                            className={filterStyles.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>

                            {availableSlots.map((x) => (
                                <MenuItem key={x} value={x}>{x}</MenuItem>
                            ))}
                        </Select>
                        {!isTimeSlotSelected && (
                            <FormHelperText>
                                <span className="red">Select a time slot</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                    <br/>
                    <br/>

                    <FormControl className={filterStyles.formControl}>
                        <TextField
                            id="standard-multiline"
                            label="medical history"
                            multiline
                            rows={4}
                            placeholder="ex: Diabetes, Ulcer etc."
                            onChange = {(e) => setMedicalHistory(e.target.value)}
                        >
                        </TextField>
                    </FormControl>

                    <br/>
                    <br/>

                    <FormControl className={filterStyles.formControl}>
                        <TextField
                            id="standard-multiline"
                            label="Symptoms"
                            multiline
                            rows={4}
                            placeholder="ex: Cold, Swelling etc."
                            onChange = {(e) => setSymptoms(e.target.value)}
                        >
                        </TextField>
                    </FormControl>

                    <br/>
                    <br/>

                    <Button variant="contained" color="primary" onClick={bookAppointmentApiCall}>
                        Book Appointment
                    </Button>
                </CardContent>
            </Card>

        </Modal>
    )
}

export default BookAppointment;