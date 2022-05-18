import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faKey } from '@fortawesome/free-solid-svg-icons';
import gmail from '../../Assets/gmail.png'
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import auth from '../../../firebase.init';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useSignInWithGoogle, useSendEmailVerification, useSendPasswordResetEmail } from 'react-firebase-hooks/auth';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [toggle, setToggle] = useState(false)
    const [userError, setuserError] = useState(null)
    const toastId = useRef(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    let location = useLocation();
    let from = location.state?.from?.pathname || "/todo";

    const [
        signInWithEmailAndPassword,
        signInuser,
        signInloading,
        signInerror,
    ] = useSignInWithEmailAndPassword(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [signInWithGoogle,
        Googleuser,
        Googleloading,
        Googleerror] = useSignInWithGoogle(auth);

    const [sendPasswordResetEmail, sending, ResetPassworderror] = useSendPasswordResetEmail(
        auth
    );


    if (error || signInerror || Googleerror) {
        toast.error('Wrong Credentials', {
            toastId: 'Something'
        })

    }
    else if (sending) {
        toast.info('Sending Email...', {
            toastId: 'Email'
        })
    }
    else if (loading || signInloading || Googleloading) {
        toast.info('Please Wait...', {
            toastId: 'Please'
        })
    }
    else if (user || signInuser || Googleuser) {
        console.log(user);
        setuserError(" ")
        navigate(from, { replace: true });

    }

    const toggleSignIn = () => {
        setToggle(!toggle)
    }



    const singIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(email, password)
    }

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(email, password)

    }
    const gmailLogin = (e) => {
        e.preventDefault()
        signInWithGoogle()

    }

    const resetpassword = async (e) => {
        e.preventDefault()
        if (!email) {
            setuserError("Put Email Address")
        } else {
            await sendPasswordResetEmail(email);
            toast.info('Sending Email...', {
                toastId: 'Email'
            })
        }


    }






    return (
        <>

            <div className="container">
                <div className="loginWrapper">

                    <div className="row justify-content-center align-items-center">
                        <div className="col-12 col-lg-7">
                            <div className="card loginCard">
                                <p className="loginTitle">{toggle ? 'Sign Up ' : 'Login'}</p>
                                <div className="card-body">

                                    <form action="">

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <FontAwesomeIcon icon={faEnvelopeSquare} />
                                                </span>
                                            </div>
                                            <input type="email" required class="form-control" placeholder="Give your Email" aria-label="Give your Email"
                                                onChange={(e) => {
                                                    e.preventDefault()
                                                    setEmail(e.target.value);

                                                }}

                                            />
                                        </div>

                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text" id="basic-addon1">
                                                    <FontAwesomeIcon icon={faKey} />
                                                </span>
                                            </div>
                                            <input type="password" required class="form-control" placeholder="Give your Password" aria-label="Give your Email"
                                                onChange={(e) => {
                                                    e.preventDefault()
                                                    setPassword(e.target.value);

                                                }}
                                            />
                                        </div>


                                        <div class="input-group mb-3 ">

                                            <input className='signInButton' type="submit" value={toggle ? "Sign Up" : 'Sign in'}

                                                onClick={

                                                    toggle ? signUp : singIn

                                                }

                                            />
                                            <p className="my-3 h6 text-center text-danger text-center mx-auto">{userError}</p>
                                        </div>


                                        <div className="row justify-content-center text-center">
                                            <div className="col-12">
                                                <p> {
                                                    toggle ? <>

                                                        Already Signed in? Sign in here < Link onClick={toggleSignIn} to={""}>Sing in here!</Link>
                                                    </>
                                                        :
                                                        <>
                                                            <p className="my-5">Don't remember your password? < Link onClick={resetpassword} to={""}>Reset Password now</Link> </p>
                                                            First Time in Dota 2 Coaching? Sign up here < Link onClick={toggleSignIn} to={""}>Sing up here!</Link>
                                                        </>
                                                } </p>
                                            </div>

                                            <div className="col-12">


                                                <div className="gmailLogin">
                                                    <p>Or</p>
                                                    <button className='Gmail' onClick={gmailLogin}>

                                                        <span> <img className='w-25' src={gmail} alt="" srcset="" /> Use Gmail </span>

                                                    </button>
                                                </div>


                                            </div>
                                            <ToastContainer autoClose={1000} />
                                        </div>



                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div >
        </>
    );
};

export default Login;