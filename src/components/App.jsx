import { useState, useDebugValue, useMemo, useEffect } from 'react';
import shortid from 'shortid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import { Container, Heading } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localItems = JSON.parse(localStorage.getItem('contacts'));
    return localItems ? localItems : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    setContacts(prevState => [contact, ...prevState]);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const filterReset = () => {
    setFilter('');
  };

  const visibleContacts = useMemo(() => {
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  }, [filter, contacts]);

  return (
    <Container>
      <Heading>Phonebook</Heading>
      <ContactForm contacts={contacts} onSubmit={addContact} />

      <Heading>Contacts</Heading>
      <Filter
        value={filter}
        onChange={changeFilter}
        onFilterReset={filterReset}
      />

      {visibleContacts.length > 0 ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        <p>It's empty. You don't have any contacts.</p>
      )}
    </Container>
  );
};

export default App;
