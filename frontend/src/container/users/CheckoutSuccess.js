import React from 'react'

const CheckoutSuccess = () => {
  localStorage.removeItem("id");
  return (
    <div style={{margin:"auto",textAlign:'center'}}>
      <h2>Checkout Success</h2>
    </div>
  )
}

export default CheckoutSuccess