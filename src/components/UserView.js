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
        const status = (found) => {
            if (found) { return <h4><Badge variant="success">FOUND</Badge></h4> } return <h4><Badge variant="danger">Still looking</Badge></h4>
        }
        const cards = this.props.items.map(item => (
            <div key={item._id} className="m-2">
                <Card style={{ width: '24rem', height: '20rem' }} className="center mb-2">
                    <Card.Body>
                        <Card.Title><h3>{item.itemName}</h3></Card.Title>
                        <Card.Subtitle><h4><Badge variant="secondary">{item.itemCategory}</Badge></h4></Card.Subtitle>
                        <Card.Text className="mt-2" style={{ height: '7em' }}>{item.itemDescription}</Card.Text>
                        {status(item.itemFound)}
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