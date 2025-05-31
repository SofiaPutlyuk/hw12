import React from 'react';
import { nanoid } from 'nanoid';
import List from './ContactList';
import Filter from './Filter';
import './form.css'
class Form extends React.Component {
    state = {
        contacts: JSON.parse(localStorage.getItem("contact")) || [
            { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
            { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
            { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
            { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ],
        name: '',
        number: '',
        filter: ''
    }
    handleInputContact = ({ target: { value } }) => {
        this.setState({
            name: value
        })
    }
    handleInputNumber = ({ target: { value } }) => {
        this.setState({
            number: value
        })
    }
    handleAddContact = () => {
        const { contacts, name, number } = this.state
        const updateContact = [...contacts, { id: nanoid(), name: name, number: number }]
        if (!name.trim() || !number.trim()) {
            alert("Заповніть поля")
            return;
        }
        if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
            alert("Такий користувач існує!")
            return;
        }
        this.setState({
            contacts: updateContact,
            name: "",
            number: ""
        })
    }
    handleDelete = (id) => {
        const updateContacts = this.state.contacts.filter(contact => contact.id !== id)
        this.setState({
            contacts: updateContacts
        })
    }
    handleFilterChange = (filter) => {
        this.setState({
            filter
        })
    }
    componentDidMount() {
        const storedContacts = localStorage.getItem("contact")
        if (storedContacts) {
            this.setState({
                contacts: JSON.parse(storedContacts)
            })
        }
    }
    componentDidUpdate(prevState) {
        if (prevState.contacts !== this.state.contacts) {
            localStorage.setItem("contact", JSON.stringify(this.state.contacts));
        }
    }
    render() {
        const filteredContacts = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(this.state.filter.toLowerCase()))
        return (
            <div>
                <form>
                    <h3>Name</h3>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        onChange={this.handleInputContact}
                        value={this.state.name}
                    />
                    <h3>Number</h3>
                    <input
                        type="tel"
                        name="number"
                        placeholder="Number"
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                        onChange={this.handleInputNumber}
                        value={this.state.number}
                    />

                    <button onClick={(e) => {
                        e.preventDefault();
                        this.handleAddContact()
                    }} className="addBtn">Add</button>
                </form>
                <Filter onFilter={this.handleFilterChange} />
                <List contacts={filteredContacts} handleDelete={this.handleDelete} />
            </div>
        )
    }
}
export default Form;