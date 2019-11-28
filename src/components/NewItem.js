import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import * as findersFeeAPI from '../utils/api'

export class NewItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            itemCategory: '',
            itemDescription: '',
            itemTip: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    handleChange(event) {
        let value = event.target.value
        let name = event.target.id
        this.setState({ [name]: value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const item = this.state
            item.userId = this.props.user._id
            item.userEmail = this.props.user.email
            item.postDate = Date.now()
            const newItem = await findersFeeAPI.addItem(item)
            console.log(newItem)

        } catch (errors) {
            console.log(errors)
        }
    }

    clearForm() {
        this.setState({
            itemName: '',
            itemCategory: '',
            itemDescription: '',
            itemTip: ''
        });
    }

    render() {

        return (
            <div>
                <Container fluid className="m-0">
                    <Row className="mt-5">
                        <Card style={{ width: '75%' }} className="m-auto">
                            <Card.Body>
                                <Card.Title>Item I'm Seeking</Card.Title>
                                <Form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="itemName" >
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control value={this.state.itemName} onChange={this.handleChange} type="text" placeholder="Item Name" />
                                    </Form.Group>
                                    <Form.Group controlId="itemCategory" >
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control required as="select" value={this.state.itemCategory} onChange={this.handleChange}>
                                            <option></option>
                                            <option value="collectibles">Collectibles</option>
                                            <option value="technology">Technology</option>
                                            <option value="fashion">Fashion</option>
                                            <option value="literature">Literature</option>
                                            <option value="misc">Misc</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="itemDescription" >
                                        <Form.Label>Description of your item</Form.Label>
                                        <Form.Control as="textarea" rows="3" value={this.state.itemDescription} onChange={this.handleChange} />
                                    </Form.Group>
                                    <Form.Group controlId="itemTip" >
                                        <Form.Label>Item Tip (Optional)</Form.Label>
                                        <Form.Control type="text" value={this.state.itemTip} onChange={this.handleChange} placeholder="$5.00" />
                                    </Form.Group>
                                    <div className="col text-center mb-2">
                                        <Button variant="primary" type="submit" className="mr-2" >Submit</Button>
                                        <Button variant="danger" onClick={this.clearForm} >Cancel</Button>
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

const mapStateToProps = state => ({
    user: state.user.item,
})
export default connect(mapStateToProps)(NewItem)
