// import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card } from 'react-bootstrap';
const picture = new URL("../Resources/KyleField.jpg", import.meta.url)

//Style for the Kyle Field BG
const backgroundStyle = {
  height: '100vh',
  objectFit: 'cover',
  overflow: 'hidden',
  position: 'fixed',
  left: '-18vw',
  top: '0',
  z: '-2'
}

const glassPane = {
  //Positioning
  position: 'relative',
  margin: '5vh auto',
  top: '0',
  right: '0',
  bottom: '0',
  left:'0',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden', 

  //Glass Effect
  backgroundColor: 'rgba(90, 90, 90, .8)',   
  backdropFilter: 'blur(10px)',
  
  //Grid layout
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2vw',
  // gridAutoRows: 'minmax(500px, auto)',
  padding: '2%',
}

//Containers
const menuItemsStyle = {
  width: '100%',
  height: '100%',
}
const reportStyle = {
  width: '100%',
  height: '100%',
}
const inventoryItemsStyle = {
  width: '100%',
  height: '100%',
  gridColumn: '1/3',
}

const Manager = () => {
    return (
    <div>
      <img src={picture} style={backgroundStyle} alt='Kyle Field'/>
        <div style={glassPane}>
          
          <Card style={menuItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Menu Items
              </Card.Title>
            </Card.Body>
          </Card>
          
          <Card style={reportStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Reports
              </Card.Title>
            </Card.Body>
          </Card>
          
          <Card style={inventoryItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Inventory Items
              </Card.Title>
            </Card.Body>
          </Card>

        </div>
    </div>
    )
}

export default Manager;