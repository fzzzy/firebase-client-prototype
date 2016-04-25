
import "babel-polyfill";
import { FirebaseClient } from "./client";
import * as React from "react";
import { render, findDOMNode } from "react-dom";
import { createStore } from "redux";
import { List, Map } from "immutable";

let baseUrl = 'https://hello-async.firebaseio.com/test';
let _client;
let store = null;

function draw() {
  let state = store.getState();
  function send_chat(obj) {
    state.get("client").post("", obj);
  }

  render(
    <Screen
      title={ state.get("title") }
      chat={ state.get("chat") }
      send_chat={ send_chat } />,
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

function createReducer(client) {
  return function reduxStore(state, action) {
    if (typeof state === "undefined") {
      return Map({
        title: "Room title",
        chat: List(),
        client: client
      });
    }
    switch (action.type) {
      case "PUSH_CHAT":
        return state.set(
          "chat", state.get("chat").push(action.chat));
      case "SET_TITLE":
        return state.set("title", action.title);
    }
  }
}

function main() {
  let client = new FirebaseClient(baseUrl);
  store = createStore(createReducer(client));
  store.subscribe(draw);
  client.on("put", (val) => {
    if (val.data) {
      if (val.path === "/") {
        for (let index in val.data) {
          let el = val.data[index];
          if (el.chat) {
            store.dispatch(
              {type: "PUSH_CHAT", chat: el.chat});
          }
        }
      } else if (val.data.chat) {
        store.dispatch(
          {type: "PUSH_CHAT", chat: val.data.chat});
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
