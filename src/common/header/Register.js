import React, { useState } from 'react';
import './Header.css';
import Input from "@material-ui/core/Input";
import { Card, CardContent, FormControl, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import isEmail from 'validator/lib/isEmail';
import {useForm} from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import * as fetchApi from '../../util/fetch'
import TabContainer from '../../common/tabContainer/TabContainer';

export default function Register(props){

    // const [registerForm, setRegisterForm] = useState({
    //     firstName : '',
    //     lastName : '',
    //     email : '',
    //     password : '',
    //     contactNumber : ''
    // });

    // const [fNmessage, setfNmessage] = useState('');
    // const [lNmessage, setlNmessage] = useState('');
    // const [emailMessage, setEmailMessage] = useState('');
    // const [passwordMessage, setPasswordMessage] = useState('');
    // const [contactNoMessage, setContactNoMessage] = useState('');
    // const [message, setMessage] = useState('');

   // const {firstName,lastName,email,password,contactNumber} = registerForm;
    //var status = false;
    
    //var penColor, backgroundBoxColor, paddingSpace;
    
    // const inputFNChangedHandler = (e) => {
    //     setfNmessage('');
    //     const state = registerForm;
    //     state[e.target.name] = e.target.value;
    //     setRegisterForm({...state});
    // }

    // const inputLNChangedHandler = (e) => {
    //     setlNmessage('');
    //     const state = registerForm;
    //     state[e.target.name] = e.target.value;
    //     setRegisterForm({...state});
    // }

    // const inputEmailChangedHandler = (e) => {
    //     setEmailMessage('');
    //     const state = registerForm;
    //     state[e.target.name] = e.target.value;
    //     setRegisterForm({...state});
    // }

    // const inputPasswordChangedHandler = (e) => {
    //     setPasswordMessage('');
    //     const state = registerForm;
    //     state[e.target.name] = e.target.value;
    //     setRegisterForm({...state});
    // }

    // const inputMobNoChangedHandler = (e) => {
    //     setContactNoMessage('');
    //     const state = registerForm;
    //     state[e.target.name] = e.target.value;
    //     setRegisterForm({...state});
    // }

    // var xhr = new XMLHttpRequest();

    // const saveFormData = async() => {
    //     xhr.open('POST' , "http://localhost:8085/users/register");
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify(registerForm));
    //     console.log(registerForm);
    // }

    // const handleSubmit = async (event) => {
    //     // penColor = "white"; backgroundBoxColor = "#46484a"; paddingSpace = 10;
    //     status = false;
    //     event.preventDefault();
    //     if(registerForm.firstName == ''){
    //         setfNmessage("Please fill out this field");
    //         status = true;
    //     }
    //     if(registerForm.lastName == ''){
    //         setlNmessage("Please fill out this field");
    //         status = true;
    //     }
    //     if(registerForm.email == ''){
    //      //   penColor = "white"; backgroundBoxColor = "#46484a"; paddingSpace = 10;
    //         setEmailMessage("Please fill out this field");
    //         status = true;
    //     }
    //     else if(!isEmail(registerForm.email)){
    //      //   penColor = "red"; backgroundBoxColor = "white"; paddingSpace = 0;
    //         setEmailMessage('Enter valid Email');
    //         status = true;            
    //     }
    //     if(registerForm.password == ''){
    //         setPasswordMessage("Please fill out this field");
    //         status = true;
    //     }
    //     if(registerForm.contactNumber == ''){
    //         setContactNoMessage("Please fill out this field");  
    //         status = true;
    //     }
    //     else if(registerForm.contactNumber.length != 10){
    //         setContactNoMessage("Enter valid mobile number");
    //         status = true;
    //     }
        
    //     if(status == false){
    //         try{
    //             await saveFormData();
    //             setMessage("Registration Successful!");
    //             setRegisterForm({firstName:'',lastName:'',email:'',password:'',contactNumber:''});
    //         }catch(e){
    //             setMessage(`registration Failed! ${e.message}`);
    //         }
            
    //     }

    // }

    const REGISTER_API_PATH = "users/register";

    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();
    const onSubmit = async(data) => {
        const response = await fetchApi.postData(REGISTER_API_PATH, data);
        if(response.status === 200){
            props.setLoggedIn(true);
            const user = await response.json();
            sessionStorage.setItem("uuid", user.id);
            sessionStorage.setItem("access-token", user.accessToken);
            props.closeModal();
            alert("Registration Successful");
        }else{
            const error = await response.json();
            alert(error.message);
        }
    }

    return(
        <div>

            <TabContainer>
                <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:'center'}}>
                    <br/>
                    <FormControl required>
                        <InputLabel htmlFor="firstName" >First Name</InputLabel>
                        <Input
                            {...register("firstName",{
                                required:true,
                            })}
                        />
                        {errors.firstName && 
                        (<FormHelperText> <span className="red">Required</span></FormHelperText>
                        )}                        
                    </FormControl>
                    <br/><br/>

                    <FormControl required>
                        <InputLabel htmlFor="lastName" >Last Name</InputLabel>
                        <Input
                            {...register("lastName",{
                                required:true,
                            })}
                        />
                        {errors.lastName && (
                        <FormHelperText> <span className="red">Required</span></FormHelperText>
                        )}
                    </FormControl>
                    <br/><br/>

                    <FormControl required>
                        <InputLabel htmlFor="emailId" >Email Id</InputLabel>
                        <Input
                            {...register("emailId",{
                                required:true,
                                pattern:/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/
                            })}
                        />
                        {errors.emailId && (
                        <FormHelperText> <span className="red">Enter valid Email</span></FormHelperText>
                        )}                        
                    </FormControl>
                    <br/><br/>

                    <FormControl required>
                        <InputLabel htmlFor="password" >Password</InputLabel>
                        <Input type="password"
                            {...register("password",{
                                required:true,
                            })}
                        />
                        {errors.password && 
                        (<FormHelperText> <span className="red">Required</span></FormHelperText>
                        )}                        
                    </FormControl>
                    <br/><br/>

                    <FormControl required>
                        <InputLabel htmlFor="mobile" >Mobile No.</InputLabel>
                        <Input
                            {...register("mobile",{
                                required:true,
                                pattern:/[\d+]{10,}/,
                            })}
                        />
                        {errors.mobile && 
                        (<FormHelperText> <span className="red">Enter valid mobile number</span></FormHelperText>
                        )}                        
                    </FormControl>
                    <br/><br/>
                    <Button variant="contained" color="primary" type="submit">REGISTER</Button>
                </form>
            </TabContainer>

             {/* <Card className="cardStyle">
                    <CardContent>
                        <FormControl required>
                            <InputLabel htmlFor="firstName" >First Name</InputLabel>
                            <Input id="firstName" onChange={inputFNChangedHandler} name="firstName" required></Input>
                            {fNmessage && <p style={{color:"red",textAlign:"left"}}>{fNmessage}</p>}
                        </FormControl>
                        <br/> 
                        <FormControl required>
                            <InputLabel htmlFor="lastName" >Last Name</InputLabel>
                            <Input id="lastName" onChange={inputLNChangedHandler} name="lastName"></Input>
                            {lNmessage && <p style={{color:"red",textAlign:"left"}}>{lNmessage}</p>}
                        </FormControl>
                        <br/>
                        <FormControl required>
                            <InputLabel htmlFor="email" >Email Id</InputLabel>
                            <Input id="email" onChange={inputEmailChangedHandler} name="email"></Input>
                            {emailMessage && <p style={{color:"red",textAlign:"left"}}>{emailMessage}</p>}
                        </FormControl>
                        <br/>
                        <FormControl required>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" onChange={inputPasswordChangedHandler} type="password" name="password"></Input>
                            {passwordMessage && <p style={{color:"red",textAlign:"left"}}>{passwordMessage}</p>}
                        </FormControl>
                        <br/>
                        <FormControl required>
                            <InputLabel htmlFor="contactNumber">Mobile No.</InputLabel>
                            <Input id="contactNumber" onChange={inputMobNoChangedHandler} type="number" name="contactNumber"></Input>
                            {contactNoMessage && <p style={{color:"red",textAlign:"left"}}>{contactNoMessage}</p>}
                        </FormControl>
                        <br/><br/>
                        {message && <p style={{color:"green"}}>{message}</p>}
                        <Button variant="contained" onClick={handleSubmit} color="primary">REGISTER</Button>
                    </CardContent>
                </Card> */}

               

        </div>
    )
}