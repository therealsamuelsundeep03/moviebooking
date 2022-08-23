import React from 'react'

const CheckoutFailure = () => {
  localStorage.removeItem("id");
  return (
    <div style={{margin:"auto",textAlign:'center'}}>
      <h2>Checkout Failure</h2>
      <a href="/">Try again</a>
    </div>
  )
}

export default CheckoutFailure