import React from 'react'

const Notification = ({ store }) => {
  let ok = false
  if(store.getState()!==null){
    ok = store.getState().includes('SUCCESS!')
  }

  if (store.getState() === null) {
    return null
  }
  if (ok) {
    return (
      <div className="success">
        {console.log(store.getState())}
        {store.getState()}
      </div>
    )
  } else {
    return (

      <div className="error">
        {console.log(store.getState())}
        {store.getState()}
      </div>
    )
  }
}
/*
const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className="error">
      {message}
    </div>
  )
}
*/
export default Notification