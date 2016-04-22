
import "babel-polyfill";
import { FirebaseClient } from "./client";
import * as React from "react";
import { render, findDOMNode } from "react-dom";

let baseUrl = 'https://hello-async.firebaseio.com/test';

function draw(state) {
  function send_chat(obj) {
    state.client.post("", obj);
  }

  render(
    <Screen title={ state.title } chat={ state.chat } send_chat={ send_chat } />,
    document.getElementById("react-root"));
}

class Screen extends React.Component {
  componentDidMount() {
    let input = findDOMNode(this.refs.inputline);
    input.focus();
  }

  formSubmit(e) {
    e.preventDefault();
    let input = findDOMNode(this.refs.inputline);
    this.props.send_chat({chat: input.value + Date.now()});
    input.value = "";
  }

  render() {
    let chatLines = this.props.chat.map(
      (line, i) => <div key={ i }>{ line }</div>);

    return <div>
      { this.props.title }
      <div>
        { chatLines }
      </div>
      <form onSubmit={ this.formSubmit.bind(this) }>
        <input ref="inputline" />
        <button>Send</button>
      </form>
    </div>;
  }
}

class State {
  constructor(client) {
    this.title = "Room title";
    this.chat = [];
    this.client = client;
  }

  pushChat(chat) {
    this.chat.push(chat);
    draw(this);
  }

  setTitle(title) {
    this.title = title;
    draw(this);
  }
}

function main() {
  let client = new FirebaseClient(baseUrl);
  let state = new State(client);
  draw(state);
  client.on("put", (val) => {
    if (val.data) {
      if (val.path === "/") {
        for (let index in val.data) {
          let el = val.data[index];
          if (el.chat) {
            state.pushChat(el.chat);
          }
        }
      } else if (val.data.chat) {
        state.pushChat(val.data.chat);
      }
    }
    console.log("put", val);
  });
  client.on("patch", (val) => {
    console.log("patch", val);
  });
  client.on("close", (val) => {
    console.log("close", val);
  });

  client.connect(2);
}

main();
