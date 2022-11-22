import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';
import React, {useState} from "react";
import { useEffect } from 'react';
import axios from 'axios';
import './hover.css';


const picture = new URL("../Resources/KyleField.jpg", import.meta.url);

const myStyle = {
  height: "100vh",
  objectFit: "cover",
  overflow: "hidden",
  position: "fixed",
  left: "-18vw",
  top: "0",
  z: "-2",
};

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
};


//----Invent Styles Begin----
const inventoryContainerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
}

const gridContainer = {
  //Grid layout
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 6.5vw)',
  // gridTemplateRows: 'repeat(8, 1fr)',
  gap: '1vw',
  alignItems: 'center',
  
}

//--Checkout Style Begins
const checkoutStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const checkoutBox = {
  position: "relative",
  height: "85%",
  width : "100%",
}

const payButton = {
  position: "right",
  height: '5%',
  width: '100%',
}

const orderItemStyle = {
  height: '90%',
  overflow: 'auto',
}

const InventoryGrid = ({menu, order, setOrder, setTotal}) => {
  return (
    <div style={gridContainer}>
      {menu.map((item, index) => <MenuElement name={item.menuitem} id={item.food_id} price={item.price} order={order} 
        setOrder={setOrder} setTotal={setTotal} key={index}/>)}
    </div>
  )
}

const MenuElement = ({name, id, price, setOrder, setTotal}) => {
  return <Button class="button" style={{backgroundColor: 'rgba(90, 90, 90, .8)', width: '6vw', height: '6vw'}} 
    onClick={(event) => { setOrder(current => [...current, id]);
      setTotal(current => current + parseFloat(price));
      }}>{name}</Button>;

}

const OrderDisplay = ({order, menu}) => {
  if(menu.length <= 0) return;
  return (
    <div style={orderItemStyle}>
      {order.map((id, index) => <p key={index}>{'1x ' + menu[id-1].menuitem + ' $' + menu[id-1].price}</p>)}
    </div>
  )
}

const Customer = () => {
  const [menuTable, setMenuTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    axios('http://127.0.0.1:8000/manager/menu')
      .then(res => setMenuTable(res.data))
      .catch(err => console.log(err))
  }, []);

  function createJSON(){
    var res = []
    for(var i=0; i<order.length; ++i){
      res.push(
        {
          "itemid": order[i],
          "itemname": menuTable[order[i]-1].menuitem,
          "price": menuTable[order[i]-1].price
        }
      )
    }
    return res;
  }

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
                  <InventoryGrid menu={menuTable} setOrder={setOrder} setTotal={setTotal}/>
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
              <Card.Body style={{height:'1vh'}}>
                <h2 style={{textAlign: 'center'}}>Total: ${total.toFixed(2)}</h2>
                <OrderDisplay order={order} menu={menuTable}/>
              </Card.Body>
            </Card>
            <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)', width: '100%'}} onClick={(event) => {
              axios.post('http://127.0.0.1:8000/server/placeorder', createJSON()
              ).then((res) => console.log("success")).catch(err => console.log(err));
              //createJSON();
              }}>Checkout</Button>

          </Card.Body>
        </Card>

      </div>
    </div>
  );
};

export default Customer;
