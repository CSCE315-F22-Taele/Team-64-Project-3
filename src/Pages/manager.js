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
  borderRadius: '20px',

  //Glass Effect
  backgroundColor: 'rgba(90, 90, 90, .15)',   
  backdropFilter: 'blur(5px)',
  
  //Grid layout
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2vw',
  gridAutoRows: 'minmax(100px, auto)',
  padding: '1%',
}

//Containers
const menuItemsStyle = {
  backgroundColor: 'maroon',
  width: '100%',
  alignItems: 'center',
  gridColumn: '1',
  gridRow: '1',
}
const inventoryItemsStyle = {
  backgroundColor: 'maroon',
  width: '100%',
  alignItems: 'center',
  gridColumn: '1',
  gridRow: '2',
}
const reportStyle = {
  backgroundColor: 'maroon',
  position: 'relative',
  width: '100%',
  height: '100%',
  gridRow: '1/3',
  gridColumn: '2',
}
const formStyle = {
  width: '100%',
}
const menuTableContainer = {
  backgroundColor: 'orange',
  height: '16%',
  width: '40vw',
  overflow: 'auto',
}
const inventoryTableContainer = {
  backgroundColor: 'orange',
  height: '12%',
  width: '40vw',
  overflow: 'auto',
}
const reportItemStyle = {
  //backgroundColor: 'yellow',
  height: '100%',
  overflow: 'auto',
}

//Components (should probably be in another file, but oh well)

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
    // Delete the card
    <div style={menuTableContainer}>
      <Table striped bordered hover style={{overflow: 'hidden'}}>
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
      </div>
    
    )
}

const InventoryTable = ({inventory}) => {
  return (
    // Delete the card
    <div style={inventoryTableContainer}>
      <Table striped bordered hover style={{overflow: 'hidden'}}>
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
    </div>
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

const ReportRow = ({reportType, item}) => {
  if(reportType === "salesreport"){
    var data = item.menuItem + " sold " + item.amountSold 
    + " time(s) for $" + item.totalRevenue;
    return (
      <p>{data}</p>
    )
  }else if(reportType === "restockreport"){
    var data = item.item + " has a low level of only " + item.level + " left.";
    return (
      <p>{data}</p>
    )
  }else if(reportType === "excessreport"){
    var data = "";
    if(item.amountSold === 0){
      data = item.item + " was not sold at all.";
    }else{
      data = item.item + " was only sold " + item.amountSold + " times.";
    }
    return (
      <p>{data}</p>
    )
  }else if(reportType === "comboreport"){
    var data = item.combo + ": " + item.count;
    return (
      <p>{data}</p>
    )
  }
}

const Report = ({reportType, data, loading}) => {
  if(loading){
    return (<h1>Loading...</h1>)
  }else{
    return (
      <div style={reportItemStyle}>
        {data.map((item, index) => <ReportRow reportType={reportType} item={item} key={index}/>)}
      </div>
    )
  }
}

const Manager = () => {
  const [menuTable, setMenuTable] = useState([]);
  const [inventoryTable, setInventoryTable] = useState([]);
  const [reportType, setReportType] = useState("salesreport");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  var menuID, menuName, menuPrice, menuIngs;

  var invID, invName, invCount, invCap, invCode;

  var reportString = 'http://127.0.0.1:8000/manager/'+reportType+'?start='+'"'+startTime+'"'+'&end='+'"'+endTime+'"';

  function updateMenu(){
    axios.get('http://127.0.0.1:8000/manager/menu').then(res => setMenuTable(res.data));
  }

  function updateInventory(){
    axios.get('http://127.0.0.1:8000/manager/inventory').then(res => setInventoryTable(res.data));
  }

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
              <Card.Title style={{textAlign:'center', color: 'white'}}>
                Menu Items
              </Card.Title>
              <MenuTable menu={menuTable}/>
              
              {/* Add item row */}
              <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center', marginTop:'5px'}}>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Food ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuID} onChange={(event) => menuID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Item name:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuName} onChange={(event) => menuName=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Price:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuPrice} onChange={(event) => menuPrice=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Ingredients:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuIngs} onChange={(event) => menuIngs=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.post('http://127.0.0.1:8000/manager/menu', {
                        menuitem: menuName,
                        price: menuPrice,
                        ingredients: menuIngs
                      }).then((res) => updateMenu()).catch(err => console.log(err));
                      window.location.reload(false);
                      }}><small>Add item</small></button>
                    </InputGroup>
                  </Col>
                </Row>

                {/* Edit Item Row */}
                <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Food ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroups" value={menuID} onChange={(event) => menuID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Item name:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuName} onChange={(event) => menuName=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Price:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuPrice} onChange={(event) => menuPrice=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Ingredients:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuIngs} onChange={(event) => menuIngs=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.put('http://127.0.0.1:8000/manager/menu', {
                        food_id: menuID,
                        menuitem: menuName,
                        price: menuPrice,
                        ingredients: menuIngs
                      }).then((res) => updateMenu()).catch(err => console.log(err));
                      window.location.reload(false);
                      }}><small>Edit Item</small></button>
                    </InputGroup>
                  </Col>
                </Row>

                {/* Remove item row */}
                <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Col >
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Food ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={menuID} onChange={(event) => menuID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.delete('http://127.0.0.1:8000/manager/menu/' + menuID).then((res) => updateMenu()).catch(err => console.log(err));
                      }}><small>Remove item</small></button>
                    </InputGroup>
                  </Col>
                </Row>
              
            </Card.Body>
          </Card>
          
          <Card style={reportStyle}>
            <Card.Body>
            <Card.Title style={{textAlign:'center', color: 'white'}}>
                Reports
            </Card.Title>
            &nbsp;
            <Card style={{height:'75%'}}>
              <Card.Body style={{height:'1vh', backgroundColor:''}}>
                <Report reportType={reportType} data={data} loading={loading}/>
              </Card.Body>
            </Card>
            &nbsp;
            <div style={formStyle}>
              <Form>
                <Row className="align-items-center">
                  <Col xs="100%">
                    <Form.Select aria-label="Default select example" style={{textAlign: 'center'}} 
                      value={reportType} 
                      onChange={(event) => setReportType(event.target.value)}>
                          <option value={"salesreport"}>Sales Report</option>
                          <option value={"restockreport"}>Restock Report</option>
                          <option value={"excessreport"}>Excess Report</option>
                          <option value={"comboreport"}>Combo Report</option>
                    </Form.Select>
                  </Col>
                </Row>
                &nbsp;
                <Row className="align-items-center" style={{justifyContent: 'center'}}>
                  <Col xs="auto" style={{width: '40%'}}>
                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                      Name
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Text >Start:</InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" placeholder="MM/DD/YYY" 
                        value={startTime} onChange={(event) => setStartTime(event.target.value)}/>
                    </InputGroup>
                  </Col>
                  <Col xs="auto" style={{width: '40%'}}>
                    <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                      Username
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <InputGroup.Text>End:</InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" placeholder="MM/DD/YYY"
                        value={endTime} onChange={(event) => setEndTime(event.target.value)}/>
                    </InputGroup>
                  </Col>
                  <Col xs="auto">
                    {/* type="submit"  */}
                    <InputGroup className="mb-2">
                    <button style={{backgroundColor: 'black', color: 'white'}} className="mb-2" type="button" class="btn btn-outline-secondary"onClick={(event) => {
                      setLoading(true);
                      axios.get(reportString).then((res) => {setData(res.data); setLoading(false)});
                      }}>
                      Submit
                    </button>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </div>
            
            </Card.Body>
          </Card>

          <Card style={inventoryItemsStyle}>
            <Card.Body>
              <Card.Title style={{textAlign:'center', color: 'white'}}>
                Inventory Items
              </Card.Title>
              <InventoryTable inventory={inventoryTable}/>
              <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center', marginTop:'5px'}}>
              <Col >
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invID} onChange={(event) => invID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Name:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invName} onChange={(event) => invName=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Count:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCount} onChange={(event) => invCount=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Cap:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCap} onChange={(event) => invCap=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Code:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCode} onChange={(event) => invCode=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.post('http://127.0.0.1:8000/manager/inventory', {
                        itemname: invName,
                        itemcount: invCount,
                        itemfcount: invCap,
                        itemcode: invCode
                      }).then((res) => updateInventory()).catch(err => console.log(err));
                      window.location.reload(false);
                      }}><small>Add item</small></button>
                    </InputGroup>
                  </Col>
                </Row>

                {/* Edit Item Row */}
                <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Col >
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invID} onChange={(event) => invID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Name:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invName} onChange={(event) => invName=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Count:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCount} onChange={(event) => invCount=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Cap:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCap} onChange={(event) => invCap=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Code:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invCode} onChange={(event) => invCode=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.put('http://127.0.0.1:8000/manager/inventory', {
                        item_id: invID,
                        itemname: invName,
                        itemcount: invCount,
                        itemfcount: invCap,
                        itemcode: invCode
                      }).then((res) => updateInventory()).catch(err => console.log(err));
                      window.location.reload(false);
                      }}><small>Edit Item</small></button>
                    </InputGroup>
                  </Col>
                </Row>

                {/* Remove item row */}
                <Row className="align-items-center" style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Col >
                    <InputGroup className="mb-2">
                      <InputGroup.Text ><small>Food ID:</small></InputGroup.Text>
                      <Form.Control id="inlineFormInputGroup" value={invID} onChange={(event) => invID=event.target.value}/>
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup className="mb-2">
                      <button style={{backgroundColor: 'black', color: 'white'}}type="button" class="btn btn-outline-secondary" onClick={(event) => {
                      axios.delete('http://127.0.0.1:8000/manager/inventory/' + invID).then((res) => updateInventory()).catch(err => console.log(err));
                      }}><small>Remove item</small></button>
                    </InputGroup>
                  </Col>
                </Row>
            </Card.Body>
          </Card>
        </div>
    </div>
    )
}

export default Manager;


