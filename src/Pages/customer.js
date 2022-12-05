import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';
import React, {useState} from "react";
import { useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';

import './hover.css';
import './customer.css';
import './scrollbar.css';





const picture = new URL("../Resources/KyleField.jpg", import.meta.url);

const myStyle = {
  height: "100vh",
  objectFit: "cover",
  
  position: "fixed",
  left: "-18vw",
  top: "0",
  z: "-2",
  backgroundAttachment: 'fixed',
};

const glassPane = {
  position: 'relative',
  margin: '5vh auto',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  backgroundColor: 'rgba(90, 90, 90, .15)',
  backdropFilter: 'blur(5px)',
  height: '90vh',
  width: '90vw',
  overflow: 'hidden',
  borderRadius: '20px',
  
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridAutoRows: 'minmax(500px, auto)',
  gap: '2vw',
  padding: '1%',
  // boxShadow: 'inset 0px 0px 40px 40px rgb(0,0,0,0)',
  // boxShadow: '0 0 10px rgb(0,0,0)',
};

const googleMaps = {
  
  margin: '40vh auto',
  
  position: 'relative',
  padding:'20px',
  
  
  backgroundColor: 'rgba(90, 90, 90, .15)',
  backdropFilter: 'blur(5px)',
  height: '40vh',
  width: '40vw',
  overflow: 'hidden',
  borderRadius: '20px',

  
  
}


//----Invent Styles Begin----
const inventoryContainerStyle = {
  
  width: '100%',
  height: '100%',
  overflow: 'auto',
  scrollbarWidth: 'thin',
}

const gridContainer = {
  //Grid layout
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 7vw)',
  // gridTemplateRows: 'repeat(8, 1fr)',
  gap: '3vw',
  justifyContent: "center",
  placeItems: 'center',
}

//--Checkout Style Begins
const checkoutStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
};



const orderItemStyle = {
  height: '90%',
  overflow: 'auto',
}

const MenuGrid = ({menu, order, setOrder, setTotal}) => {
  return (
    <div style={gridContainer}>
      {menu.map((item, index) => <MenuElement name={item.menuitem} id={item.food_id} price={item.price} order={order} 
        setOrder={setOrder} setTotal={setTotal} key={index}/>)}
    </div>
  )
}

const MenuElement = ({name, id, price, setOrder, setTotal}) => {
  return <Button id="buttonHoverEffect" style={{backgroundColor: 'rgba(80, 0, 0, .8)', color: 'white', width: '8vw', height: '6vw'}} 
    onClick={(event) => { setOrder(current => [...current, id]);
      setTotal(current => current + parseFloat(price));
      }}>{name}</Button>;

}

const OrderDisplay = ({order, menu}) => {
  if(menu.length <= 0) return;

  function findMenuItem(id){
    for(var i=0; i<menu.length; ++i){
      if(menu[i].food_id === id) return menu[i]; 
    }
  }
  
  return (
    <div style={orderItemStyle}>
      {order.map((id, index) => <OrderItem item={findMenuItem(id)} key={index}/>)}
    </div>
  )
}

const OrderItem = ({item}) => {
  return (
    <p>{item.menuitem + ' $' + item.price}</p>
  )
}

const GoogleMapcontainerStyle = {
  width: '100%',
  height: '100%',
  overflow: 'auto',
  borderRadius: '20px'

};



const Customer = () => {
  const myRef = useRef();
  const [menuTable, setMenuTable] = useState([]);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [orderText, setOrderText] = useState('');

  const translate = (inputText) => {
    let fromLang = 'en';
    let toLang = 'de'; // translate to norwegian
    const API_KEY = "AIzaSyDXQjbR4ECpwLWWOlU-9dsQdbQumj_J2S4";
    let url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    url += '&q=' + encodeURI(inputText);
    url += `&source=${fromLang}`;
    url += `&target=${toLang}`; 
    let string = '';
    
    fetch(url, { 
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
    .then(res => res.json())
    .then((response) => {
      console.log("In Function: ", response.data.translations[0].translatedText);
      setOrderText(response);
      return response;
    })
    .catch(error => {
      console.log("There was an error with the translation request: ", error);
    }
    );
    return string;
  }

  
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
    else{
      entry.target.classList.remove('show');
    }
  });
  if(myRef.current != null){
    observer.observe(myRef.current);
  }

  useEffect(() => {
    axios('http://127.0.0.1:8000/manager/menu')
    .then(res => setMenuTable(res.data))
    .catch(err => console.log(err))
  }, []);

  function findMenuItem(id){
    for(var i=0; i<menuTable.length; ++i){
      if(menuTable[i].food_id === id) return menuTable[i]; 
    }
  }

  function createJSON(){
    var res = []
    for(var i=0; i<order.length; ++i){
      var item = findMenuItem(order[i]);
      res.push(
        {
          "itemid": order[i],
          "itemname": item.menuitem,
          "price": item.price
        }
      )
    }
    return res;
  }

  const center = {
    lat: 30.612545,
    lng: -96.34074
  };
    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyBBOsZmB4HCcudFw2G4eawdpraS4FfP0-I"
    })
  
    const [map, setMap] = React.useState(null)
  
    const onLoad = React.useCallback(function callback(map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
      setMap(map)
    }, [])
  
    const onUnmount = React.useCallback(function callback(map) {
      setMap(null)
    }, [])

    
  


  return isLoaded ? (
    <div style={{height:'200vh'}}>
      <img src={picture} style={myStyle} alt='Kyle Field' />
      
      <div style={glassPane}>
        <Card style={inventoryContainerStyle} id='scroll'>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' , color: 'black'}}>
              
              Menu Items
            </Card.Title>
        
            <div class="container my-5">
              <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active p-3" id="nav-home" role="tabpanel"
                aria-labelledby='nav-home-tab'>
                  <MenuGrid menu={menuTable} setOrder={setOrder} setTotal={setTotal}/>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        <Card style={checkoutStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', color: 'black'}}>
            
            {translate("Your Order")}
            {console.log("Outside Function: ", translate("Your Order"))}
              {orderText}
            </Card.Title>
            <Card style={{height: '90%'}}>
              <Card.Body style={{height:'1vh'}}>
                <h2 style={{textAlign: 'center', color: 'black'}}>Total: ${total.toFixed(2)}</h2>
                <OrderDisplay order={order} menu={menuTable}/>
              </Card.Body>
            </Card>
            <Button id="buttonHoverEffect" style={{backgroundColor: 'rgba(80, 0, 0, .8)', color: 'white', width: '100%'}} onClick={(event) => {
              axios.post('http://127.0.0.1:8000/server/placeorder', createJSON()
              ).then((res) => {setOrder([]); setTotal(0.00);}).catch(err => console.log(err));
              }}>Checkout</Button>
          </Card.Body>
        </Card>

      </div>
      
      <div style={googleMaps} class='hidden' ref={myRef}>
        <GoogleMap 
            mapContainerStyle={GoogleMapcontainerStyle}
            center={center}
            onLoad={onLoad}
            onUnmount={onUnmount}
            zoom={19}
            >
            
          </GoogleMap>
      </div>
    </div>
  ) : <></>
};

export default Customer;