import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';

import axios from 'axios';
import { useEffect, useState } from 'react';
import './hover.css';

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
  left: '0',
  backgroundColor: 'rgba(90, 90, 90, .8)',
  backdropFilter: 'blur(10px)',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden',
  
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridAutoRows: 'minmax(500px, auto)',
  gap: '2vw',
  padding: '2%',
}


//----Inventory Styles Begin----
const inventoryContainerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
}

const gridContainer = {
  // height:'97%',

  // //Grid layout
  // display: 'grid',
  
  //padding: '2%',
  // overflow: 'scroll',
    display: 'grid',
    gap: '3vw',
    gridTemplateColumns: 'repeat(4, 6.5vw)',
    alignItems: 'center',
    //gridAutoFlow: 'row',
    //gridAutoRows: '5%', /* play with this to change height of the children, 50% will fill half */
    //gridTemplateColumns: 'unset', /* do not set template columns and rows */
    //gridTemplateRows: 'unset',
    
}

//Checkout 
const checkoutStyle = {
  
  position: 'relative',
  width: '100%',
  height: '100%',
}

// components
const MenuGrid = ({menu}) => {
  return (
    <div style={gridContainer}>
      {menu.map((item, index) => <MenuElement name={item.menuitem} key={index}/>)}
    </div>
  )
}

const MenuElement = ({name}) => {
  return <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)', width: '8vw', height: '6vw'}}>{name}</Button>;
}



const Server = () => {
  const [menuTable, setMenuTable] = useState([]);
  useEffect(() => {
    axios('http://127.0.0.1:8000/manager/menu')
      .then(res => setMenuTable(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <img src={picture} style={myStyle} alt='Kyle Field' />
      <div style={glassPane}>

        <Card style={inventoryContainerStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              Menu Items
            </Card.Title>
            <div class="container my-5">
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active p-3" id="nav-home" role="tabpanel"
                aria-labelledby='nav-home-tab'>
                <MenuGrid menu={menuTable}/>

                </div>
              </div>

              
                
              
            </div>

            
          
          </Card.Body>
        </Card>

        <Card style={checkoutStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center'}}>
              Current Order 
            </Card.Title>
            <Card style={{height: '90%'}}>

            </Card>
            <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)', width: '100%'}}>Checkout</Button>

          </Card.Body>
        </Card>

      </div>
    </div>
  )
}

export default Server;


