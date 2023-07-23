import React, { ChangeEvent, Component, FormEvent} from "react";
import "./index.css";
import { Socket } from 'socket.io-client';

interface NameFormState {
  value: string;
}

interface NameFormProps {
  socket: Socket; // Define the socket prop
}

class Username extends Component<NameFormProps, NameFormState> {
  constructor(props: NameFormProps) {
    super(props);
    this.state = { value: `Player ${Math.random().toFixed(3)}` };
    this.props.socket.emit('send_username', this.state.value)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    this.props.socket.emit('send_username', this.state.value)
    console.log(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Username