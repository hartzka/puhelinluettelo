import React from 'react'

const Message = ({ message }) => {
    if (message === null) {
      return null
    } else {
        if (message.type === 'success') {
            return (
                <div className="message success">
                  {message.text}
                </div>
              )
        } else if (message.type === 'error') {
            return (
                <div className="message error">
                  {message.text}
                </div>
              )
        } else {
            return null
        }
    }  
  }

  export default Message