import React from 'react';
import './Header.css';
import Input from "@material-ui/core/Input";
import { FormControl, InputLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {useForm} from "react-hook-form";
import FormHelperText from '@material-ui/core/FormHelperText';
import * as fetchApi from '../../util/fetch'
import TabContainer from '../../common/tabContainer/TabContainer';


// function Login(){
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [emailMessage, setEmailMessage] = useState("");
//     const [passwordMessage, setPasswordMessage] = useState("");
//     const [message, setMessage] = useState("");

//     const inputEmailChangeHandler = (e) => { 
//         setEmailMessage('');         
//         setEmail(e.target.value);            
//     }

//     const inputPasswordChangeHandler = (e) => {
//         setPasswordMessage('');
//         setPassword(e.target.value);             
//     }

//     const handleSubmit = () => {
//         if(email === ""){
//             setEmailMessage("Please fill out this field");
//         }
//         else if(!isEmail(email)){
//             setEmailMessage('Enter valid Email');
//         }
//         if(password === ""){
//             setPasswordMessage("Please fill out this field")
//         }
//         else{
//             let dataLogin = null;
//             let xhrLogin = new XMLHttpRequest();
//             xhrLogin.addEventListener("readystatechange",function(){
//                 if(this.readyState === xhrLogin.DONE){
//                     sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
//                     sessionStorage.setItem(
//                         "access-token",
//                         xhrLogin.getResponseHeader("access-token")
//                     );
//                     if(xhrLogin.status === 200 || xhrLogin.status === 201){
//                         props.setLoggedIn(true);
//                         closeModal();
//                     }else{
//                         setMessage("Invalid Credential. Please try again!");
//                     }
//                 }
//             })

//             xhrLogin.open("POST", 'https://localhost:8085/auth/login');
//             dataLogin = xhrLogin.setRequestHeader(
//                 "Authorization",
//                 "Basic" + window.btoa(email + ":" + password)
//             );
//             xhrLogin.setRequestHeader('Content-Type', 'application/json');
//             xhrLogin.setRequestHeader('Cache-Control', 'no-cache');
//             xhrLogin.send(dataLogin);

//         }
//     }

//     // const handleSubmit = async e => {
//     //     if(email == ""){
//     //         setEmailMessage("Please fill out this field");
//     //     }
//     //     else if(!isEmail(email)){
//     //         setEmailMessage('Enter valid Email');
//     //     }
//     //     if(password == ""){
//     //         setPasswordMessage("Please fill out this field")
//     //     }
//     //     else{
//     //         e.preventDefault();
//     //         const token = await loginUser({
//     //             email,
//     //             password
//     //         });
//     //         setToken(token);
//     //     }
//     // }

//     return(
//         <div>
//             <Card className="cardStyle">
//                 <CardContent>
//                     <FormControl required>
//                         <InputLabel htmlFor="email" >Email</InputLabel>
//                         <Input id="email" onChange={inputEmailChangeHandler}></Input>
//                         {emailMessage && <p style={{color:"red",textAlign:"left"}}>{emailMessage}</p>}
//                     </FormControl>
//                     <br/> <br/>
//                     <FormControl required>
//                         <InputLabel htmlFor="password">Password</InputLabel>
//                         <Input id="password" onChange={inputPasswordChangeHandler} type="password"></Input>
//                         {passwordMessage && <p style={{color:"red",textAlign:"left"}}>{passwordMessage}</p>}
//                     </FormControl>
//                     <br/><br/><br/>
//                     {message && <p style={{color:"red"}}>{message}</p>}
//                     <Button variant="contained" onClick={handleSubmit} color="primary">LOGIN</Button>
//                 </CardContent>
//             </Card>
//         </div>
//     )
// }

export default function Login(props){
    const LOGIN_API_PATH = "auth/login"

    const{
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    const onSubmit = async (data) => {
        const response = await fetchApi.postData(
            LOGIN_API_PATH,
            {},
            {
                Authorization: "Basic " + window.btoa(data.email + ":" + data.password),
            }
        );
        if(response.status === 200){
            props.setLoggedIn(true);
            const user = await response.json();
            sessionStorage.setItem("uuid", user.id);
            sessionStorage.setItem("access-token",user.accessToken)
            props.closeModal();
        }
        else{
            const error = await response.json();
            console.log(error);
            alert(error.message);
        }
    }

    return(
        <div>
            <TabContainer>
                <form onSubmit={handleSubmit(onSubmit)} style={{textAlign:'center'}}>
                    <br/>
                    <FormControl required>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input
                            {
                                ...register("email", {
                                    required: true,
                                    pattern:/^[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/
                                })
                            }
                        />
                        {errors.email && <FormHelperText> <span className="red">Required</span></FormHelperText>
                        } 
                    </FormControl>
                        <br/><br/>
                    <FormControl required>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input type="password"
                            {
                                ...register("password", {
                                    required: true,
                                })
                            }
                        />
                        {errors.password && <FormHelperText> <span className="red">Required</span></FormHelperText>
                        } 
                    </FormControl>
                    <br/><br/>
                    <Button variant="contained" color="primary" type="submit">LOGIN</Button>
                </form>
            </TabContainer>
        </div>
    )
}