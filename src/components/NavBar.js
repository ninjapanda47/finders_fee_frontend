import React, { Component } from 'react';
import { Navbar, Nav, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom"
import { getItemsByCategory } from '../actions/itemActions'

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    getItemsByCategory = async (category) => {
        this.props.getItemsByCategory(category)
    }

    render() {

        const capitalize = (s) => {
            return s.charAt(0).toUpperCase() + s.slice(1)
        }

        const categories = ['collectibles', 'technology', 'fashion', 'literature', 'misc']
        const selectDropDown = categories.map(category => (<Dropdown.Item key={category} onClick={e => this.getItemsByCategory(category)}>{capitalize(category)}</Dropdown.Item>))

        const loginButton = this.props.isloggedin ? <Button variant="secondary" onClick={() => { this.props.logOut() }}>Log out</Button>
            : <NavLink to="/login"><Button variant="primary">Login</Button></NavLink>

        const links = this.props.isloggedin ? <Nav className="mr-auto">
            <NavLink className="nav-link" to="/userView">My Items</NavLink>
            <NavLink className="nav-link" to="/newItem">Post Items</NavLink>
            <NavLink className="nav-link" to="/searchItems">Search Items</NavLink>
        </Nav> : <Nav className="mr-auto">
                <NavLink className="nav-link" to="/searchItems">Search Items</NavLink>
            </Nav>
        return (
            <div>
                <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark" id="navbarColor02" expand="lg">
                    <Navbar.Brand className="navbar-brand">Finder's Fee</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {links}
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <DropdownButton id="dropdown-basic-button" title="Search by Category" variant="secondary" className="mr-2">
                            {selectDropDown}
                        </DropdownButton>
                        <Nav className="justify-content-end">
                            {loginButton}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item,
    items: state.items.items
})

export default connect(mapStateToProps, { getItemsByCategory })(NavBar)
