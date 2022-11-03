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
  }
  
  
  return (
    <div>
        <img src={picture} style={myStyle} alt='Kyle Field'/>  
    </div>
  )
}
