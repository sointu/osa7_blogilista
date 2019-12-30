import React from 'react'

const Success = ({ store }) => {
  if(store.getState() === null){
    return null
  }
  return(
    <div className="success">
      {store.getState()}
    </div>
  )
}
export default Success
