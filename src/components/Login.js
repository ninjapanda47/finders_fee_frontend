import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { setUserInfo } from '../actions/userActions'
import * as findersFeeAPI from '../utils/api'

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            authFailed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value
        let name = event.target.id
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const email = this.state.email
            const password = this.state.password
            const user = { email, password }
            const login = await findersFeeAPI.login(user)
            console.log(login)
            if (login.success) {
                this.props.setUserInfo(login.user)
                this.props.isloggedin({ isloggedin: true })
                this.props.history.push("/userView")
            } else {
                this.props.isloggedin({ isloggedin: false })
                this.setState({ errorMessage: login.info.errors, authFailed: true })
                console.log(this.state)
            }
        } catch (errors) {
            console.log(errors)
        }
    }

    render() {

        return (
            <div>
                <Container fluid className="m-0">
                    <Row className="mt-5">
                        <Card style={{ width: '50%' }} className="m-auto center">
                            <Card.Body>
                                <Card.Title>Login</Card.Title>
                                <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                    <Form.Group as={Row} controlId="email" value={this.state.email} onChange={this.handleChange}>
                                        <Form.Label column sm="3" className="text-left">Email</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" placeholder="user@example.com" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="password" value={this.state.password} onChange={this.handleChange}>
                                        <Form.Label column sm="3" className="text-left">Password</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="password" placeholder="password" />
                                            {this.state.authFailed ? (<Form.Text className="text-muted">
                                                {this.state.errorMessage}
                                            </Form.Text>) : null}
                                        </Col>
                                    </Form.Group>
                                    <div className="col text-center mb-2">
                                        <Button variant="primary" type="submit" >
                                            Submit
                    </Button>
                                    </div>
                                </Form>
                                <Card.Text>Don't have an account yet?  Sign up <NavLink to="/signup">here.</NavLink></Card.Text>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item,
})

export default connect(mapStateToProps, { setUserInfo })(Login)
