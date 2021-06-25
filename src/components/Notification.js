import React from'react'

const Notification = ({ message, notificationType }) => {
  if(message===null){
    return null
  }

  return(
    <div
      className={notificationType === 1 ? 'success': 'error'}>
      {message}
    </div>
  )
}
export default Notification