import React from "react";
class List extends React.Component {
    render() {
        return (
            <ul>
                {this.props.contacts.map((elem) => (
                    <li key={elem.id}>
                        <p> {elem.name} </p>
                        <p>{elem.number}</p>
                        <button onClick={() => { this.props.handleDelete(elem.id) }} className="btnDelete">Delete</button>
                    </li>
                ))}
            </ul>
        )
    }
}
export default List;