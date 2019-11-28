import React, { Component } from 'react';
import { Navbar, Nav, Button, Dropdown, NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom"

class NavBar extends Component {

    getAll() {

    }

    render() {

        const loginButton = this.props.isloggedin ? <Navbar.Brand className="navbar-brand">{this.props.username}</Navbar.Brand>
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
})

export default connect(mapStateToProps)(NavBar)
