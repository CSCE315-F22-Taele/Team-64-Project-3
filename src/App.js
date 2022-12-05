import { useNavigate } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import { ReactDOM } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
const picture = new URL("./Resources/KyleField.jpg", import.meta.url)

// const revsLogo = new URL("./Resources/whiteLogo.png", import.meta.url)
const revsLogo = new URL("./Resources/yellowLogo.png", import.meta.url)

const googleClientId = "862219696784-jgurkbjugk2pm4k1pppsi7ah0o40q0gg.apps.googleusercontent.com"; //process.env.REACT_APP_GOOGLE_CLIENT_ID;
const drfClientId = "ND3FPGhukjq8ayy9ZS2C6Fg4qQM6E4MJNWnopvvH";  //process.env.REACT_APP_DRF_CLIENT_ID;
const drfClientSecret = "VWCCd2uiOAAE6patwl43RBoDvWAkLJ8F3ojoqLlwpHPwuXyhr9xJH3rONst84oxuX9CdEClq6Aw55RMLdpWzk3RJYtVdZt8LbSbJRsnRCheuh8xiJI8H3oeLrbpm4FA9";  //process.env.REACT_APP_DRF_CLIENT_SECRET;


const myStyle = {
  height: '100vh',
  objectFit: 'cover',
  overflow: 'hidden',
  position: 'fixed',
  left: '-18vw',
  top: '0',
  z: '-2'
}

const logoStyle = {
  height: '60vh',
  marginTop: '-2vh'
}

const whitePane = {
  filter: 'dropShadow(30px 10px 4px #4444dd)',
  margin: '5vh auto',
  top: '0',
  right: '0',
  bottom: '0',
  left:'0',
    
  backdropFilter: 'blur(10px)',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden', 
  backgroundColor: 'blue',
  
}

const App = () => {
  let navigate = useNavigate();
  
  const navigateToManager = () => {
    navigate("/manager");
  }
  const navigateToServer = () => {
    navigate("/server");
  }
  const navigateToCustomer = () => {
    navigate("/customer");
  }



  const loginClick = event => {
    //Sets the login page to be active
    const loginButton = document.getElementById("tab-login");
    loginButton.setAttribute("class", "nav-link active");
    loginButton.setAttribute("style", "background-color:rgb(80,0,0)");
    const loginForm = document.getElementById("pills-login");
    loginForm.setAttribute("class", "tab-pane fade show active");
    
    // Sets the register pill to be inactive
    const element = document.getElementById("tab-register");
    element.setAttribute("class", "nav-link");
    element.setAttribute("style", "background-color:rgb(255,255,255)");
    const registerForm = document.getElementById("pills-register");
    registerForm.setAttribute("class", "tab-pane fade");
    
  };
  const registerClick = event => {
    //Sets the login page to be inactive
    const loginButton = document.getElementById("tab-login");
    loginButton.setAttribute("style", "background-color:rgb(255,255,255)");
    loginButton.setAttribute("class", "nav-link");
    const loginForm = document.getElementById("pills-login");
    loginForm.setAttribute("class", "tab-pane fade");
    
    // Sets the register pill to be active
    const element = document.getElementById("tab-register");
    element.setAttribute("class", "nav-link active");
    element.setAttribute("style", "background-color:rgb(80,0,0)");
    const registerForm = document.getElementById("pills-register");
    registerForm.setAttribute("class", "tab-pane fade show active");
    
  }

  function googleLogin(accessToken) {
    // axios
    //   .post('http://127.0.0.1:8000/auth/convert-token', {
    //     token: accessToken,
    //     backend: "google-oauth2",
    //     grant_type: "convert_token",
    //     client_id: drfClientId,
    //     client_secret: drfClientSecret,
    //   })
    //   .then((res) => {
    //    // Save somewhere these access and refresh tokens
    //     console.log(res.data);
    //   });
    axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }).then((res) => {
      console.log(res.data)
      axios.post('http://127.0.0.1:8000/login/user', {
        email: res.data.email,
        first_name: res.data.given_name,
        last_name: res.data.family_name,
        is_auth: true,
      }).then((res) => {
        if(res.data === "Added New User Successfully!"){
          console.log("ayee")
        }else{
          console.log("oh no")
        }
      })
    })
   }

  function responseGoogle(response) {
    console.log(response);
    googleLogin(response.access_token);
  }

  

  return(
    <body>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous"></link>
      <img src={picture} style={myStyle} alt='Kyle Field'/>
      <section class="skewbox">
        <div class="leftSlanted">
          
            <img src={revsLogo} style={logoStyle} alt='Revs Logo'/>
            
          
        </div>

        <div class="rightSlanted">
          <div class="loginContainer ">

            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                  aria-controls="pills-login" aria-selected="true" onClick={loginClick} style={{backgroundColor:'rgb(80,0,0)'}}>Login</a>
              </li>
              <li class="nav-item" role="presentation" >
                <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                  aria-controls="pills-register" aria-selected="false" onClick={registerClick} style={{backgroundColor:'rgb(255,255,255)'}}>Register</a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                  <div class="text-center mt-4">
                    <p>Sign in with:</p>
                    
                    <button type="button" class="btn btn-link btn-floating mx-1" id="googleButton" onClick={useGoogleLogin({
                        onSuccess: tokenResponse => responseGoogle(tokenResponse),})}>
                      <i class="fab fa-google"></i>
                    </button>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>

                  </div>

                  <p class="text-center mt-1">or:</p>

                  <div class="form-outline mb-1 mx-5">
                    <label class="form-label" for="loginName">Username</label>
                    <input type="email" id="loginName" class="form-control" />
                  </div>

                  <div class="form-outline mb-1 mx-5">
                    <label class="form-label" for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" class="form-control"/>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block mt-2 border border-white" style={{backgroundColor: 'rgb(80, 0, 0)'}}>Sign in</button>
                </form>
              </div>
              
              <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form>
                  <div class="text-center mt-4">
                    <p>Sign up with:</p>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>
                  </div>

                  <p class="text-center mt-1">or:</p>

                  <div class="form-outline mb-1 mx-5">
                    <label class="form-label" for="registerUsername">Username</label>
                    <input type="text" id="registerUsername" class="form-control" />
                  </div>

                  <div class="form-outline mb-1 mx-5">
                    <label class="form-label" for="registerPassword">Password</label>
                    <input type="password" id="registerPassword" class="form-control" />
                  </div>

                  
                  <div class="form-outline mb-1 mx-5" >
                    <label class="form-label" for="registerRepeatPassword" >Key</label>
                    <input placeholder="Leave blank if customer" type="password" id="registerRepeatPassword" class="form-control" />
                  </div>

                  <button type="submit" class="btn btn-primary btn-block mt-1 border border-white">Sign Up</button>
                </form>
              </div>
            </div>
          </div>

        </div>
        
      </section>
    </body>
  )
  
  // return (
  //   // <div>
  //   //   <img src={picture} style={myStyle} alt='Kyle Field'/>
  //   //     <div style={whitePane}>
          
  //   //     </div>
      
      
  //   //   {/* <div style={glassPane}>
  //   //     <Button variant='primary' onClick={navigateToManager} style={{backgroundColor: 'rgba(255, 255, 255, .5)', width: '100%', height: '100%'}}>Manager</Button>
  //   //     <Button variant='primary' onClick={navigateToServer} style={{backgroundColor: 'rgba(255, 255, 255, .5)', width: '100%', height: '100%'}}>Server</Button>
  //   //     <Button variant='primary' onClick={navigateToCustomer} style={{backgroundColor: 'rgba(255, 255, 255, .5)', width: '100%', height: '100%'}}>Customer</Button>
  //   //   </div> */}
  //   // </div>
  //   )
}
      
      
export default App;
      
      