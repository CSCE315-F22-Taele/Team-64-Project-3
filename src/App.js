import { useNavigate } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import { ReactDOM } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
const picture = new URL("./Resources/KyleField.jpg", import.meta.url)



const myStyle = {
  height: '100vh',
  objectFit: 'cover',
  overflow: 'hidden',
  position: 'fixed',
  left: '-18vw',
  top: '0',
  z: '-2'
}

const whitePane = {
  
  margin: '5vh auto',
  top: '0',
  right: '0',
  bottom: '0',
  left:'0',
    
  backdropFilter: 'blur(10px)',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden', 
  backgroundColor: 'white'
  
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
    const loginForm = document.getElementById("pills-login");
    loginForm.setAttribute("class", "tab-pane fade show active");
    
    // Sets the register pill to be inactive
    const element = document.getElementById("tab-register");
    element.setAttribute("class", "nav-link");
    const registerForm = document.getElementById("pills-register");
    registerForm.setAttribute("class", "tab-pane fade");
    
  };
  const registerClick = event => {
    //Sets the login page to be inactive
    const loginButton = document.getElementById("tab-login");
    loginButton.setAttribute("class", "nav-link");
    const loginForm = document.getElementById("pills-login");
    loginForm.setAttribute("class", "tab-pane fade");
    
    // Sets the register pill to be active
    const element = document.getElementById("tab-register");
    element.setAttribute("class", "nav-link active");
    const registerForm = document.getElementById("pills-register");
    registerForm.setAttribute("class", "tab-pane fade show active");
    
  };
 
    

  return(
    <body>
      <section class="skewbox">
        <div class="leftSlanted">
          <div>
            {/* Logo goes here and needs to be centered */}
            </div>
          
        </div>

        <div class="rightSlanted">
          <div class="loginContainer">
            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                  aria-controls="pills-login" aria-selected="true" onClick={loginClick}>Login</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                  aria-controls="pills-register" aria-selected="false" onClick={registerClick}>Register</a>
              </li>
            </ul>

            <div class="tab-content">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                  <div class="text-center mb-3">
                    <p>Sign in with:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-facebook-f"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-twitter"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>
                  </div>

                  <p class="text-center">or:</p>

                  <div class="form-outline mb-4">
                    <input type="email" id="loginName" class="form-control" />
                    <label class="form-label" for="loginName">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="loginPassword" class="form-control" />
                    <label class="form-label" for="loginPassword">Password</label>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
                </form>
              </div>
              
              <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                <form>
                  <div class="text-center mb-3">
                    <p>Sign up with:</p>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-google"></i>
                    </button>

                    <button type="button" class="btn btn-link btn-floating mx-1">
                      <i class="fab fa-github"></i>
                    </button>
                  </div>

                  <p class="text-center">or:</p>

                  <div class="form-outline mb-4">
                    <input type="text" id="registerUsername" class="form-control" />
                    <label class="form-label" for="registerUsername">Username</label>
                  </div>

                  <div class="form-outline mb-4">
                    <input type="password" id="registerPassword" class="form-control" />
                    <label class="form-label" for="registerPassword">Password</label>
                  </div>

                  
                  <div class="form-outline mb-4">
                    <input type="password" id="registerRepeatPassword" class="form-control" />
                    <label class="form-label" for="registerRepeatPassword">Repeat password</label>
                  </div>

                  <button type="submit" class="btn btn-primary btn-block mb-3">Sign in</button>
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
      
      