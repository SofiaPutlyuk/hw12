import React from "react";
import './form.css'
class Filter extends React.Component {
    handleFilter = (e) => {
        this.props.onFilter(e.target.value)
    }
    render() {
        return (
            <div>
                <h3>Filter</h3>
                <input type="text" onChange={this.handleFilter} placeholder="Filter" className="filterInput"/>
            </div>
        )
    }
}
export default Filter;