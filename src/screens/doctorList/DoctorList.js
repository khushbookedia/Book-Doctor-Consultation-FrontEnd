import React, { useEffect, useState } from 'react';
import { Button, Grid, CardContent, FormControl, InputLabel, makeStyles, MenuItem, Paper, Select, Typography } from '@material-ui/core';
import * as fetchApi from '../../util/fetch'
import BookAppointment from './BookAppointment';
import DoctorDetails from './DoctorDetails';
import Rating from "@material-ui/lab/Rating";
//import Grid from '@material-ui/core/Grid';


const useFilterStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
        maxWidth: 200,
    },
    title: {
        fontSize: 14,
        color: theme.palette.primary.light
    },
    pos: {
        marginBottom: 15,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paper : {
        padding: "20px",
        margin:"15px",
        cursor:"pointer",
        textAlign: 'left',
    },
    bookAppointment : {
        width: "40%",
        margin : "10px",
    },
    viewDetails : {
        width: "48%",
        backgroundColor: "green",
        margin: "10px",
    },
    doctorList: {
        width: "40%"
    },
    container : {
        width: "50%",
        margin: "0px auto",
    }

}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
        width: 240
        }
    }
};

const DoctorList = (props) => {

    //const useFilterStyles
    const {classes, isLoggedIn} = props;

    const [specialityList, setSpecialityNames] = useState([]);

    const [speciality, setSpeciality] = useState("");

    const [doctorList, setDoctorList] = useState([]);

    const [selectedDoctorDetails, setSelectedDoctorDetails] = useState({});

    const [viewDoctorDetails, setViewDoctorDetails] = useState(false);

    const [bookAppointment, setBookAppointment] = useState(false);

    const styles = useFilterStyles();

    const DOCTOR_FETCH_API = "doctors";

    
    useEffect(() => {
        const loadSpeciality = async() => {
            try{
                const response = await fetchApi.getData(
                    DOCTOR_FETCH_API + "/speciality"
                );
    
                if(response.status === 200){
                    var specialityNames = await response.json();
                    setSpecialityNames(specialityNames)
                    console.log(specialityNames);
                    
                }else{
                    alert("Error while fetching Doctors list");
                }
    
            }catch(e){
                alert(`Error: ${e.message}`);
            }
        }

        loadSpeciality();        
        
    },[])

    
useEffect(() => {
    const getDoctorList = async() => {
        try{
            const response = await fetchApi.getData(
                DOCTOR_FETCH_API + "?speciality=" + speciality
            );

            if(response.status === 200){
                var docList = await response.json();
                setDoctorList(docList);
                console.log(doctorList);
            }else{
                alert("Error while fetching Doctor's Speciality list");
            }

        }catch(e){
            alert(`Error: ${e.message}`);
        }
    }

    getDoctorList();
},[speciality])


const docCard = (doc) => {
    return (
        <Grid item xs key={doc.id}>
          <Paper className={styles.paper}>
            <Typography variant="h5" gutterBottom>
              Doctor Name : {doc.firstName + " " + doc.lastName}
            </Typography>
  
            <br />
            <Typography variant="h6" component="h6">
              Speciality : {doc.speciality}
            </Typography>
  
            <Typography variant="h6" component="h6">
              Rating :
              {
                <Rating
                  className="mt-1"
                  name="read-only"
                  value={doc.rating}
                  readOnly
                />
              }
            </Typography>
            <div>
              <Button
                className={styles.bookAppointment}
                variant="contained"
                color="primary"
                onClick={() => {
                  if (!isLoggedIn) {
                    alert("Please login to book an appointment");
                  } else {
                    setSelectedDoctorDetails(doc);
                    setBookAppointment(true);
                  }
                }}
              >
                Book Appointment
              </Button>
              <Button
                className={styles.viewDetails}
                variant="contained"
                color="secondary"
                onClick={() => {
                    setSelectedDoctorDetails(doc);
                    setViewDoctorDetails(true);
                }}
              >
                View Details
              </Button>
            </div>
          </Paper>
        </Grid>
      );
    
}
    
//console.log(doctorList);
    return(
        
        <Grid
        container
        spacing={10}
        alignItems={"center"}
        direction={"column"}
        justifyContent={"space-evenly"}
      >
        <DoctorDetails
          closeModel={() => setViewDoctorDetails(false)}
          viewDoctorDetails={viewDoctorDetails}
          selectedDoctorDetails={selectedDoctorDetails}
        />
        <BookAppointment
          closeModel={() => setBookAppointment(false)}
          bookAppointment={bookAppointment}
          selectedDoctorDetails={selectedDoctorDetails}
        />
        {specialityList.length > 0 && (
          <div>
              <br/>
              <br/>
            <FormControl
              className="md-padding"
              variant="filled"
              className={styles.formControl}
            >
              <Typography variant="h6" component="h6">
                Select Speciality:
              </Typography>
              <span>
                <Select
                  native
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                >
                  <option aria-label="None" value="" />
                  {specialityList.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Select>
              </span>
            </FormControl>
          </div>
        )}
        <div className={styles.doctorList}>
          {doctorList.map((doc) => docCard(doc))}
        </div>
      </Grid>
    )
}

export default DoctorList;