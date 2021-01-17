import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        <ul>
            {props.persons.map((person) => 
                <Person 
                key={person.id}
                person={person}
                handleDeleteClick={props.handleDeleteClick} />
            )}
        </ul>
    )
}

export default Persons