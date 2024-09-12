import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import emailImage from './images/email.png'
// @ts-ignore
import passImage from  './images/lock.png'

// @ts-ignore
export default function login() {
    return (
        <div className="center-form">
            <div className="login-form">
                <div className="login-text">Log In</div>
                <div className="input-container">
                    <div className="input-group">
                        <div className="icon-container">
                            <img src={emailImage} style={{ width:"25px", height:"25px", marginTop:"7px"}} />
                        </div>
                        <input type="text" style={{ marginBottom: "1em" }} placeholder="Email" />
                    </div>
                    <div className="input-group" style={{ marginTop: ".5em", marginBottom:"1em"}}>
                        <div className="icon-container">
                            <img src={passImage} style={{ width:"25px", height:"25px", marginTop:"7px"}} />
                        </div>
                        <input type="password" placeholder="Password" style={{ marginBottom: "1em" }} />
                    </div>
                </div>
                <div className="login-button-container">
                    <div className="login-button">
                        Log in
                    </div>
                </div>
                <div className="forgot-password-text" style={{ marginTop:".5em"}}>
                    Forgot your password?
                </div>
            </div>
        </div>
    );
}
