import React, { Component } from 'react';
import { Form, Message } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

import '../css/Contact.css';

class Contact extends Component {
  constructor(props){
    super(props);
    this.state = {
      sent: false,
      disabled: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event){
    event.preventDefault();
    let info = this.state;

    console.log(info);

    fetch('/enquiry', {
      method: 'POST',
      body: JSON.stringify({ info }),
      headers: { 'Content-Type': 'application/json' }
    }).then ((resp) => {
      return resp.json();
    }).then ((data) => {
      if (data.success === "Enquiry Received!"){
       this.setState({sent: true});
       this.setState({disabled: true});
      }
      console.log(data);
    }).catch ((error) => {
      console.log(error);
    });
  }

  render() {

    return (
      <div className='Contact'>
        <Form inverted onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input required name="surname" label='First name' maxLength="100" onChange={this.handleChange} placeholder='First name' />
            <Form.Input required name="given" label='Last name' maxLength="100" onChange={this.handleChange} placeholder='Last name' />
            <Form.Input required type='email' name="email" label='Email' maxLength="100" onChange={this.handleChange} placeholder='Email' />
          </Form.Group>
          <Form.TextArea required label='Enquiry' type='text' name="description" maxLength="500" onChange={this.handleChange} placeholder='please tell me more about it...' />
          <Form.Button disabled={this.state.disabled} type='submit' color='blue' inverted> Submit </Form.Button>
        </Form>
        {
          this.state.sent === true ?
            <Message
              success
              header='Enquiry has been sent!'
            />
          : null
        }
      </div>
    );
  }
}

export default Contact;
