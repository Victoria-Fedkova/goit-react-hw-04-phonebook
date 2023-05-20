import React, { Component } from 'react';
import shortid from 'shortid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

import { Container, Heading } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const localItems = JSON.parse(localStorage.getItem('contacts'));
    console.log(localItems);
    if (localItems) {
      this.setState({
        contacts: localItems,
      });
    }
  }
  componentDidUpdate(_, prevState) {
    const contacts = JSON.stringify(this.state.contacts);

    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', contacts);
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterReset = e => {
    this.setState({ filter: '' });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Heading>Phonebook</Heading>
        <ContactForm contacts={contacts} onSubmit={this.addContact} />

        <Heading>Contacts</Heading>
        <Filter
          value={filter}
          onChange={this.changeFilter}
          onFilterReset={this.filterReset}
        />

        {visibleContacts.length > 0 ? (
          <ContactList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        ) : (
          <p>It's empty. You don't have any contacts.</p>
        )}
      </Container>
    );
  }
}

export default App;
