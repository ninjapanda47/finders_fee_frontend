import React, { Component } from 'react'
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import * as findersFeeAPI from '../utils/api'

export class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            email: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let value = event.target.value
        let name = event.target.id
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        const user = this.state
        findersFeeAPI.addUser(user).then(data => { console.log(data) })
        this.props.history.push("/login")
    }

    render() {
        return (
            <div>
                <Container fluid className="m-0">
                    <Row className="mt-5">
                        <Card style={{ width: '50%' }} className="m-auto center">
                            <Card.Body>
                                <Card.Title>Sign up for an account</Card.Title>
                                <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                    <Form.Group as={Row} controlId="userName" value={this.state.userName} onChange={this.handleChange}>
                                        <Form.Label column sm="3" className="text-left">Username</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="text" placeholder="Username" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="email" value={this.state.email} onChange={this.handleChange}>
                                        <Form.Label column sm="3" className="text-left">Email</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="email" placeholder="user@example.com" />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="password" value={this.state.password} onChange={this.handleChange}>
                                        <Form.Label column sm="3" className="text-left">Password</Form.Label>
                                        <Col sm="9">
                                            <Form.Control type="password" placeholder="password" />
                                        </Col>
                                    </Form.Group>
                                    <div className="col text-center mb-2">
                                        <Button variant="primary" type="submit" >
                                            Submit
                    </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default SignUp
