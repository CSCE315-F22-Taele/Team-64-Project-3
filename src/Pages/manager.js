// import  Button  from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';
import React, {useState} from "react";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';
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
  gap: '1vw',
  // gridAutoRows: 'minmax(500px, auto)',
  padding: '2%',
}

//Containers
const menuItemsStyle = {
  width: '100%',
  height: '100%',
}
const reportStyle = {
  position: 'relative',
  width: '100%',
  height: '100%', 
  
}
const inventoryItemsStyle = {
  width: '100%',
  height: '100%',
  gridColumn: '1/3',
}
const formStyle = {
  
  width: '100%',
  
}


const MenuRequest = () => {
  const [posts, setPosts] = useState([]);

   useEffect(() => {
      fetch('http://127.0.0.1:8000/manager/menu')
         .then((res) => res.json())
         .then((data) => {
            //console.log(data);
            for(var i=0; i<data.length; ++i){
              console.log(data[i].food_id);
            }
            setPosts(data);
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
}

const Manager = () => {
  const [selects, setSelects] = useState();
  MenuRequest();
  return (
    <div>
      <img src={picture} style={backgroundStyle} alt='Kyle Field'/>
        <div style={glassPane}>
          
          
          <Card style={menuItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Menu Items
              </Card.Title>
              <Card style={{height: '85%'}}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Food ID</th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Ingredients</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Burger</td>
                      <td>8.99</td>
                      <td>Lettuce, Bacon</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Chicken Burger</td>
                      <td>7.99</td>
                      <td>Chicken, Buns, Lettuce</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Salad</td>
                      <td>5.99</td>
                      <td>Lettuce, Tomato, Onion</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Card.Body>
          </Card>
          
          <Card style={reportStyle}>
            <Card.Body>
            <Card.Title style={{textAlign:'center'}}>
                Reports
            </Card.Title>
            <Card style={{height:'65%'}}>
              <Card.Body>

              </Card.Body>
            </Card>
            
            <div style={formStyle}>
              <Form>
                <Row className="align-items-center">
                  <Col xs="100%">
                    <Form.Select aria-label="Default select example" style={{textAlign: 'center'}}>
                          <option>Sales Report</option>
                          <option>Restock Report</option>
                          <option>Excess Report</option>
                          <option>Combo Report</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="align-items-center" style={{justifyContent: 'center'}}>
                  <Col xs="auto" style={{width: '40%'}}>
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                      Name
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Text >Start:</InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" placeholder="MM/DD/YYY" />
                    </InputGroup>
                  </Col>
                  <Col xs="auto" style={{width: '40%'}}>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                      Username
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Text>End:</InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" placeholder="MM/DD/YYY" />
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" className="mb-2" >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
            
            </Card.Body>
          </Card>
          
          <Card style={inventoryItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Inventory Items
              </Card.Title>
              <Card style={{height: '85%'}}>
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item ID</th>
                      <th>Item Name</th>
                      <th>Item Count</th>
                      <th>Item Capacity</th>
                      <th>Item Code</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Buns</td>
                      <td>200</td>
                      <td>3000</td>
                      <td>5299</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Lettuce</td>
                      <td>34</td>
                      <td>3500</td>
                      <td>34569</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Onion</td>
                      <td>54</td>
                      <td>2500</td>
                      <td>23123</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Card.Body>
          </Card>

        </div>
    </div>
    )
}

export default Manager;


