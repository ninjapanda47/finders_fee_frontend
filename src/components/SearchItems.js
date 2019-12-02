import React, { Component } from 'react';
import { Card, Button, Badge, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { getAllItems } from '../actions/itemActions'
import * as findersFeeAPI from '../utils/api'

class SearchItems extends Component {

    constructor(props) {
        super(props);
        this.state = {}

        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this)
    }

    componentDidMount() {
        this.props.getAllItems()
    }

    handleChange(name, e) {
        var change = {};
        change[name] = e.target.value;
        this.setState(change);
    }

    updateItem = async (id) => {
        try {
            const finderEmail = this.state[id]
            await findersFeeAPI.updateItem(id, finderEmail)
            this.setState({ [id]: '' })

        } catch (errors) {
            console.log(errors)
        }
    }

    render() {
        const cards = this.props.items.map((item) => (
            <div key={item._id} className="m-2">
                <Card style={{ width: '24rem', height: '20rem' }} className="center mb-2">
                    <Card.Body>
                        <Card.Title><h3>{item.itemName}</h3></Card.Title>
                        <Card.Subtitle><h4><Badge variant="secondary">{item.itemCategory}</Badge></h4></Card.Subtitle>
                        <Card.Text className="mt-2" style={{ height: '7em' }}>{item.itemDescription}</Card.Text>
                        <Form>
                            <Form.Group className="mb-1" controlId={item._id}>
                                <Form.Control onChange={this.handleChange.bind(this, item._id)} value={this.state[item._id]} type="email" placeholder="Enter email" />
                            </Form.Group>
                        </Form>
                        <Button variant="success" block onClick={e => this.updateItem(item._id)}>I found it!</Button>
                    </Card.Body>
                </Card>
            </div>
        ))
        return (
            <Container fluid className="m-0">
                <Row className="m-2">
                    {cards}
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.item,
    items: state.items.items
})

export default connect(mapStateToProps, { getAllItems })(SearchItems)