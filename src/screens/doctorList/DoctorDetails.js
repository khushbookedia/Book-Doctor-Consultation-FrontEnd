
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import Modal from "react-modal";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      "background-color": "rgba(255, 255, 255, 1)",
      padding: 0,
    },
  };
  
  const styles = (theme) => ({
    paper: {
      textAlign: "left",
      margin: "15px",
      padding: "20px",
      cursor: "pointer",
    },
    cardHeader: {
      "background-color": "purple",
      height: "70px",
      padding: "11px",
      color: "white",
    },
  });
  const DoctorDetails = (props) => {

    const filterStyles = styles();
    const { viewDoctorDetails, closeModel, selectedDoctorDetails, classes } = props;

    return (
      <Modal
        isOpen={viewDoctorDetails}
        contentLabel="Login"
        onRequestClose={closeModel}
        style={customStyles}
      >
        <Grid item xs justify key={selectedDoctorDetails.id}>
          <Card>
            <CardHeader
              className={filterStyles.cardHeader}
              title="Doctor Details"
            ></CardHeader>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Dr:{" "}
                {selectedDoctorDetails.firstName + " " + selectedDoctorDetails.lastName}
              </Typography>
              <Typography variant="h6" component="h6">
                Total Experience: {selectedDoctorDetails.totalYearsOfExp} years
              </Typography>
  
              <Typography variant="h6" component="h6">
                Speciality : {selectedDoctorDetails.speciality}
              </Typography>
              <Typography variant="h6" component="h6">
                Date of Birth : {selectedDoctorDetails.dob}
              </Typography>
  
              {selectedDoctorDetails.address && (
                <Typography variant="h6" component="h6">
                  City: {selectedDoctorDetails.address.city}
                </Typography>
              )}
              <Typography variant="h6" component="h6">
                Email: {selectedDoctorDetails.emailId}
              </Typography>
  
              <Typography variant="h6" component="h6">
                Mobile: {selectedDoctorDetails.mobile}
              </Typography>
  
              <Typography variant="h6" component="h6">
                Rating :
                {
                  <Rating
                    className="mt-1"
                    name="read-only"
                    value={selectedDoctorDetails.rating}
                    readOnly
                  />
                }
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Modal>
    );
  };
  
  
export default DoctorDetails;