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
import axios from 'axios';
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

//Components (should probably be in another file, but oh well)
const InventoryTable = ({inventory}) => {
  return (
    <Card style={{height: '85%'}}>
      <Table striped bordered hover style={{display: 'block', height: '250px', maxWidth: '600px', width: '100%', overflow: 'auto'}}>
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
          {inventory.map((item, index) => <InventoryTableRow item={item} key={index}/>)}
        </tbody>
        </Table>
      </Card>
  )
}

const InventoryTableRow = ({item}) => {
  return (
    <tr>
      <td>{item.item_id}</td>
      <td>{item.itemname}</td>
      <td>{item.itemcount}</td>
      <td>{item.itemfcount}</td>
      <td>{item.itemcode}</td>
    </tr>
  )
}

const MenuTable = ({menu}) => {
  return (
    <Card style={{height: '85%'}}>
      <Table striped bordered hover style={{display: 'block', height: '250px', overflow: 'auto'}}>
        <thead>
          <tr>
            <th>Food ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody >
          {menu.map((item, index) => <MenuTableRow item={item} key={index}/>)}
        </tbody>
      </Table>
    </Card>
  )
}

const MenuTableRow = ({item}) => {
  return (
    <tr>
      <td>{item.food_id}</td>
      <td>{item.menuitem}</td>
      <td>{item.price}</td>
      <td>{item.ingredients}</td>
    </tr>
  )
}

const Manager = () => {
  const [selects, setSelects] = useState();
  const [menuTable, setMenuTable] = useState([]);
  const [inventoryTable, setInventoryTable] = useState([]);

  useEffect(() => {
    axios('http://127.0.0.1:8000/manager/menu')
      .then(res => setMenuTable(res.data))
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    axios('http://127.0.0.1:8000/manager/inventory')
      .then(res => setInventoryTable(res.data))
      .catch(err => console.log(err))
  }, []);

  return (
    <div>
      <img src={picture} style={backgroundStyle} alt='Kyle Field'/>
        <div style={glassPane}>
          <Card style={menuItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center'}}>
                Menu Items
              </Card.Title>
              <MenuTable menu={menuTable}/>
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
              <InventoryTable inventory={inventoryTable}/>
            </Card.Body>
          </Card>

        </div>
    </div>
    )
}

export default Manager;


