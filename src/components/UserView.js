import React, { Component } from 'react';
import { Card, Button, Badge, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { getAllItems } from '../actions/itemActions'

class UserView extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllItems()
        console.log(this.props.items)
    }

    render() {
        const cards = this.props.items.map(item => (
            <div key={item._id} className="m-2">
                <Card style={{ width: '24rem', height: '20rem' }} className="center mb-2">
                    <Card.Body>
                        <Card.Title>{item.itemName}</Card.Title>
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

export default connect(mapStateToProps, { getAllItems })(UserView)