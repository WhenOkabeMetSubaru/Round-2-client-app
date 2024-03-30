import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import GoogleImg from "../../assets/images/google.svg";
import { userLogin } from "../../features/api/userApi";
import auth from "../../features/auth/auth";
import {useHistory} from 'react-router-dom'

function SignIn (){

    const history = useHistory()

    useEffect(()=>{
        
        

    },[])

    const handleSignInSubmit  = async (event)=>{
        event.preventDefault()
        const formData = new FormData(event.target);
        const formDetails = Object.fromEntries(formData);
        delete formDetails.confirm_password;

        let response = await userLogin(formDetails);

        if (response.status == false)
        {
            auth.authenticate(response.token,()=>{
                alert("Logged in Successfully")
                history.push("/");
            })
        }else{
            alert(response?.info || "login failed")
        }

    }
  
        return(
           
            <div className="col-lg-6 d-flex justify-content-center align-items-center border-0 rounded-lg auth-h100">
                <div className="w-100 p-3 p-md-5 card border-0 bg-dark text-light" style={{maxWidth: "32rem"}}>
                    <form onSubmit={handleSignInSubmit} className="row g-1 p-3 p-md-4">
                        <div className="col-12 text-center mb-1 mb-lg-5">
                            <h1>Sign in</h1>
                          
                            <span>Free access to our dashboard.</span>
                        </div>
                        <div className="col-12 text-center mb-4">
                            <a className="btn btn-lg btn-outline-secondary btn-block" href="#!">
                                <span className="d-flex justify-content-center align-items-center">
                                    <img className="avatar xs me-2" src={GoogleImg} alt="Imag Description" />
                                    Sign in with Google
                                </span>
                            </a>
                            <span className="dividers text-muted mt-4">OR</span>
                        </div>
                        <div className="col-12">
                            <div className="mb-2">
                                <label className="form-label">Email address</label>
                                <input name="email" type="email" className="form-control form-control-lg" placeholder="name@example.com" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-2">
                                <div className="form-label">
                                    <span className="d-flex justify-content-between align-items-center">
                                        Password
                                        <Link className="text-secondary" to="password-reset">Forgot Password?</Link>
                                    </span>
                                </div>
                                <input name="password" type="password" className="form-control form-control-lg" placeholder="***************" />
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    Remember me
                                </label>
                            </div>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <button type="submit"  className="btn btn-lg btn-block btn-light lift text-uppercase" atl="signin">SIGN IN</button>
                        </div>
                        <div className="col-12 text-center mt-4">
                            <span className="text-muted">Don't have an account yet? <Link to="sign-up" className="text-secondary">Sign up here</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        )

}

export default SignIn;