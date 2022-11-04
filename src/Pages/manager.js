// import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
const picture = new URL("../Resources/KyleField.jpg", import.meta.url)

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

const Manager = () => {
    return (
    <div>
      <img src={picture} style={myStyle} alt='Kyle Field'/>
        <div style={glassPane}>
          <Card style={{color: '#000'}}>
            <Card.Body>
              <Card.Title>
                Menu Items
              </Card.Title>
            </Card.Body>
          </Card>
          
          <Card style={{color: '#000'}}>
            <Card.Body>
              <Card.Title>
                Reports
              </Card.Title>
            </Card.Body>
          </Card>
          
          <Card style={{color: '#000'}}>
            <Card.Body>
              <Card.Title>
                Inventory Items
              </Card.Title>
            </Card.Body>
          </Card>

        </div>
    </div>
    )
}

export default Manager;