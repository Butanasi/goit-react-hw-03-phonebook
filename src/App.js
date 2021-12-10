import React, { Component } from 'react';
import { Form } from './Components/Form';
import { nanoid } from 'nanoid';
import { ContactList } from './Components/ContactList';
import { Filter } from './Components/Filter';
import style from './App.module.scss';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parseContact = JSON.parse(contact);
    console.log(parseContact);
    if (parseContact) {
      this.setState({ contacts: parseContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  addContacts = ({ name, number }) => {
    const { contacts } = this.state;
    const findReturnName = contacts.find(contact => contact.name === name);

    if (findReturnName) {
      alert('This name is already in the phone book ');
    } else {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      console.log(contact);
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={style.container}>
        <h1 className={style.title}>Phonebook</h1>
        <Form onAddContacts={this.addContacts} />

        <h2 className={style.title}>Contacts</h2>
        <Filter value={filter} onChange={this.handleFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
