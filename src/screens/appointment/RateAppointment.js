import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import * as fetchApi from "../../util/fetch";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Rating from "@material-ui/lab/Rating";



const styles = (theme) => ({
  paper: {
    textAlign: "left",
    margin: "15px",
    padding: "20px",
    cursor: "pointer",
  },
  cardHeader: {
    backgroundColor: "purple",
    height: "70px",
    padding: "11px",
    color: "white",
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
  formControl: {
    marginTop: "20px",
  },
});

const RateAppointment = (props) => {
  const { isRating, closeModel, selectedAppointment, classes } = props;

  const filterStyles = styles();

  const [comments, setComments] = useState("");

  const [rating, setRating] = useState(0);

  const [ratingSelectedError, setRatingSelectedError] = useState(false);

  useEffect(() => {
    if (rating < 1) {
      setRatingSelectedError(true);
    } else {
      setRatingSelectedError(false);
    }
  }, [rating]);

  const rateAppointmentApiCall = async () => {
    if (ratingSelectedError) return;

    const data = {
      appointmentId: selectedAppointment.appointmentId,
      doctorId: selectedAppointment.doctorId,
      rating: rating,
      comments: comments,
    };
    let response = await fetchApi.postData("ratings", data);
    if (response.status === 200) {
      closeModel();
      alert("Appointment rated Successfully.");
    } else {
      const error = await response.json();
      if (error.root_cause.includes("Already Rated")) {
        alert("Appointment Already rated");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <Modal
      isOpen={isRating}
      contentLabel="Login"
      onRequestClose={closeModel}
      style={filterStyles.content}
    >
      <Card>
        <CardHeader
          className={filterStyles.cardHeader}
          title="Rate an Appointment"
        ></CardHeader>
        <CardContent>
          <FormControl className={filterStyles.formControl}>
            <TextField
              id="standard-multiline-static"
              label="Comments"
              multiline
              rows={4}
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
          <br />
          <br />

          <Typography variant="h6" component="h6">
            Rating :
            {
              <Rating
                className="mt-1"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            }
            {ratingSelectedError && (
              <FormHelperText>
                <span className="red">Select a rating</span>
              </FormHelperText>
            )}
          </Typography>
          <br />
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={rateAppointmentApiCall}
          >
            Rate Appointment
          </Button>
        </CardContent>
      </Card>
    </Modal>
  );
};
export default RateAppointment;
