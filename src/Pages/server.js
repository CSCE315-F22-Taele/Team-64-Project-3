import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card } from 'react-bootstrap';
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
  backgroundColor: 'rgba(90, 90, 90, .8)',
  backdropFilter: 'blur(10px)',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '2vw',
  padding: '2%',
}


//Containers
const Inventory1Style = {
  width: '100%',
  height: '100%',
}
const CheckoutStyle = {
  position: 'relative',
  backgroundColor: '#6C2DC7',
  width: '100%',
  height: '100%',
}
const Inventory2Style = {
  width: '100%',
  height: '100%',
  gridColumn: '1/3',
}

const box = {
  float: 'left',
  backgroundColor: '#FF0000',
  width: '15%',
  height: '15%',
}





const Server = () => {
  return (
    <div>
      <img src={picture} style={myStyle} alt='Kyle Field' />
      <div style={glassPane}>

        <Card style={Inventory1Style}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center' }}>
              Menu Items
            </Card.Title>

            <p></p>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  1
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  2
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  3
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  4
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  5
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  6
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  7
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  8
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  9
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  10
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  11
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  12
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  13
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  14
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  15
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  16
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  17
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  18
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  19
                </Card.Title>
              </Card.Body>
            </Card>

            <Card style={box}>
              <Card.Body>
                <Card.Title style={{ textAlign: 'center' }}>
                  20
                </Card.Title>
              </Card.Body>
            </Card>

          </Card.Body>
        </Card>

        <Card style={CheckoutStyle}>
          <Card.Body>
            <Card.Title style={{ textAlign: 'center', color: 'white' }}>
              Order Total &nbsp;
              <Button style={{backgroundColor: 'maroon'}}>Checkout</Button>
            </Card.Title>
          </Card.Body>
        </Card>

      </div>
    </div>
  )
}

export default Server;


