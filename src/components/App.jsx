import { useState, useEffect } from 'react';
import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

const App = () => {
  const contactsSaved = localStorage.getItem('contacts');
  const [contacts, setContacts] = useState(
    JSON.parse(contactsSaved) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const add = ({ name, number }) => {
    const toLowerCase = name.toLowerCase();
    let itemFromList = false;
    const newContact = { id: nanoid(), name: name, number: number };

    contacts.forEach(contact => {
      if (contact.name.toLowerCase() === toLowerCase) {
        alert(`${contact.name} is already in contacts`);
        itemFromList = true;
      }
    });

    if (itemFromList) return;

    setContacts(prevState => prevState.concat(newContact));
  };

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const filterItems = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = idToDelete => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== idToDelete)
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={add} />
      <div className={css.filter_container}>
        <Filter value={filter} onChange={handleChangeFilter} />
      </div>
      <div className={css.list_container}>
        <ContactList contacts={filterItems()} toDelete={deleteContact} />
      </div>
    </div>
  );
};

export default App;
