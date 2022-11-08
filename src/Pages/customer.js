import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card } from "react-bootstrap";

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
  position: "relative",
  margin: "5vh auto",
  top: "0",
  right: "0",
  bottom: "0",
  left: "0",
  backgroundColor: "rgba(90, 90, 90, .8)",
  backdropFilter: "blur(10px)",
  height: "90vh",
  width: "90vw",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "2vw",
  padding: "2%",
};


//----Invent Styles Begin----
const inventoryContainerStyle = {
  width: '100%',
  height: '100%',
}

const gridContainer = {
  height:'97%',

  //Grid layout
  display: 'grid',
  gridTemplateColumns: 'repeat(8, 1fr)',
  gridTemplateRows: 'repeat(8, 1fr)',
  gap: '2vw',
  padding: '2%',
}


//--Inventory Styles End----

//--Checkout Style Begins
const checkoutStyle = {
  position: "relative",
  width: "100%",
  height: "100%",
  
};

const checkoutBox ={
  position: "relative",
  height: "85%",
  width : "100%",
}
const payButton = {
  position: "right",
  height: '5%',
  width: '100%',
}

const Customer = () => {
  return (
    <div>
      <img src={picture} style={myStyle} alt="Kyle Field" />
      <div style={glassPane}>
      <Card style={inventoryContainerStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              Menu Items
            </Card.Title>

            <div style={gridContainer}>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>1</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>2</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>3</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>4</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>5</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>6</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>7</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>8</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>9</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>10</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>11</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>12</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>13</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>14</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>15</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>16</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>17</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>18</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>19</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>20</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>21</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>22</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>23</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>24</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>25</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>26</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>27</Button>
              <Button style={{backgroundColor: 'rgba(90, 90, 90, .8)'}}>28</Button>
            </div>
          
          </Card.Body>
        </Card>

        <Card style={checkoutStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center"}}>
              Your Total &nbsp;
            </Card.Title>
            <Card style = {checkoutBox}>

            </Card>

            <Card style = {payButton}>
              Total:
            </Card>
              <Button style={{ backgroundColor: 'rgba(90, 90, 90, .8)', width: '100%' }}>Checkout</Button>
            
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Customer;
