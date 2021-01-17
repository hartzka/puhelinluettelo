import React from 'react'

const Person = (props) => {
    return (
        <li>{props.person.name} {props.person.number} 
        <button onClick={() => 
            props.handleDeleteClick(props.person)   }>
                delete
          </button>
        </li>
    )
}

export default Person
