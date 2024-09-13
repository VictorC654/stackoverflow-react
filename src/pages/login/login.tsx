import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import emailImage from './images/email.png'
import passImage from  './images/lock.png'

export default function login() {
    return (
        <div className="form-center">
            <div className="login-form1">
                <div className="login-text">Log Inn</div>
                <div className="input-container1">
                    <div className="input-group1">
                        <div className="icon-container1">
                            <img src={emailImage} style={{ width:"25px", height:"25px", marginTop:"7px"}} />
                        </div>
                        <input className="text" type="text" style={{ marginBottom: "1em" }} placeholder="Email" />
                    </div>
                    <div className="input-group1" style={{ marginTop: ".5em", marginBottom:"1em"}}>
                        <div className="icon-container1">
                            <img src={passImage} style={{ width:"25px", height:"25px", marginTop:"7px"}} />
                        </div>
                        <input type="password" placeholder="Password" style={{ marginBottom: "1em" }} />
                    </div>
                </div>
                <div className="login-button-container1">
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
