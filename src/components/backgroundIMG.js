// This is the background image that will be displayed behind everything
import React from 'react'

export default function BackgroundIMG() {
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

  // const glassPane = {
  //   position: 'relative',
  //   margin: '5vh auto',
  //   top: '0',
  //   right: '0',
  //   bottom: '0',
  //   left:'0',
  //   backgroundColor: 'rgba(90, 90, 90, .8)',   
  //   backdropFilter: 'blur(10px)',
  //   height: '90vh',
  //   width: '90vw',
  //   overflow: 'hidden', 
  // }
  
  
  return (
    <div>
        <img src={picture} style={myStyle} alt='Kyle Field'/> 
        
    </div>
  )
}
