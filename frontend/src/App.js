import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons'
import personService from './services/persons'
import Message from './components/Message'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNewNameFilter ] = useState('')
  const [ message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} is already added, replace the number?`)) {
        updatePerson()
      } else {
        const newMessage = {
          type: `message`,
          text: `No change`
        }
        setMessage(newMessage)
        setTimeout(() => { setMessage(null) }, 4000)
      }
    } else {
        const personObject = {
          name: newName,
          number: newNumber
        }

        personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          const newMessage = {
            type: `success`,
            text: `${personObject.name} has been added`
          }
          setMessage(newMessage)
          setTimeout(() => { setMessage(null) }, 4000)
        }).catch(error => {
          console.log(error.response.data);
          const newMessage = {
            type: `error`,
            text: `Person validation failed. Name min length 3, number min length 8.`
          }
          setMessage(newMessage)
          setTimeout(() => { setMessage(null) }, 4000)
        })
        
        setNewName('')
        setNewNumber('')
        setNewNameFilter('')
      } 
  }

  const updatePerson = () => {
    const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        personToUpdate.number = newNumber
        personService.update(personToUpdate.id, personToUpdate)
        .then(response => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response))
         }).catch(error => {
           console.log(error.response.data);
           
          const newMessage = {
            type: `error`,
            text: `Person validation failed. Name min length 3, number min length 8.`
            }
            setMessage(newMessage)
          setTimeout(() => { setMessage(null) }, 4000)
         })
         .then(e => {
          const newMessage = {
            type: `success`,
            text: `Updated the number of ${personToUpdate.name}`
          }
          setMessage(newMessage)
          setTimeout(() => { setMessage(null) }, 4000)
        }).catch(error => {
          const newMessage = {
            type: `error`,
            text: `${personToUpdate.name} has already been removed from the server!`
          }
          setMessage(newMessage)
          setTimeout(() => { setMessage(null) }, 4000)
        })
        setNewName('')
        setNewNumber('')
  }

  const handleDeleteClick = (person) => {
    console.log('deleting', person.id);
    const name = person.name
    if (window.confirm(`Delete ${name}?`)) {
    deletePerson(person)
    }
  }

  const deletePerson = (person) => {
    personService.deletePerson(person.id)
      .then(response => {
        const updatedPersons = persons.filter(p => p.id !== person.id)
        setPersons(updatedPersons)
      }).then(e => {
        const newMessage = {
          type: `success`,
          text: `Deleted ${person.name}`
        }
        setMessage(newMessage)
        setTimeout(() => { setMessage(null) }, 4000)
      }).catch(error => {
        const newMessage = {
          type: `error`,
          text: `${person.name} has already been removed from the server!`
        }
        setMessage(newMessage)
        setTimeout(() => { setMessage(null) }, 4000)
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNewNameFilter(event.target.value)
  }

  const personsToShow = persons.filter(
    (person) => {
      console.log('pe', person);
      
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
    }
    )

  return (
    <div>
      <h1>Phonebook</h1>
        <Message message={message} />
        <Filter nameFilter={nameFilter} handle={handleNameFilterChange}/>
      
      <h2>Add a new</h2>

      <PersonForm 
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>

      <Persons 
      persons={personsToShow}
      handleDeleteClick={handleDeleteClick}/>

    </div>
  )

}

export default App