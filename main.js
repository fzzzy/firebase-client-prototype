
import "babel-polyfill";
import { FirebaseClient } from "./client";
import * as React from "react";
import { render, findDOMNode } from "react-dom";

let baseUrl = 'https://crackling-torch-1932.firebaseio.com/test';

function draw(state) {
  render(
    <Screen title={ state.title } chat={ state.chat } />,
    document.getElementById("react-root"));
}

class Screen extends React.Component {
  render() {
    let chatLines = this.props.chat.map(
      (line, i) => <div key={ i }>{ line }</div>);

    return <div>
      { this.props.title }
      <div>
        { chatLines }
      </div>
    </div>;
  }
}

class State {
  constructor() {
    this.title = "Room title";
    this.chat = [];
  }

  setChat(chat) {
    this.chat = chat;
    draw(this);
  }

  setTitle(title) {
    this.title = title;
    draw(this);
  }
}

async function main() {
  let state = new State();
  let client = new FirebaseClient(baseUrl);
  client.on("put", (val) => {
    if (val.path === "/chat") {
      state.setChat(val.data);
    }
    console.log("put", val);
  });
  client.on("patch", (val) => {
    console.log("patch", val);
  });
  client.on("close", (val) => {
    console.log("close", val);
  });

  await client.connect();
  let result = await client.get("/chat") || [];
  console.log("did get /chat", result);
  result.push("hello");
  await client.put("/chat", result);
}

main();
