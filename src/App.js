import { useNavigate } from 'react-router-dom';
import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
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

const glassPane = {
  position: 'relative',
  margin: '5vh auto',
  top: '0',
  right: '0',
  bottom: '0',
  left:'0',
  backgroundColor: 'rgba(90, 90, 90, .8)',   
  backdropFilter: 'blur(10px)',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden', 
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
  
  return (
    <div>
      <img src={picture} style={myStyle} alt='Kyle Field'/>
      <div style={glassPane}>
        <Button variant='primary' onClick={navigateToManager}>Manager</Button>
        <Button onClick={navigateToServer}>Server</Button>
        <Button onClick={navigateToCustomer}>Customer</Button>
      </div>
    </div>
    )
}
      
      
export default App;
      
      