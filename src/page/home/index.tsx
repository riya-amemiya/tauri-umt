import { useState } from "react";

import { isApp } from "@/lib/isApp";
import { generateAppApiInstance } from "@/utils/generateAppApiInstance";

export function Home() {
  const [greetMessage, setGreetMessage] = useState("");
  const [name, setName] = useState("");
  const greetApi = generateAppApiInstance("greet");

  async function greet() {
    if (isApp) {
      setGreetMessage(await greetApi({ name }));
    } else {
      setGreetMessage("Not running in Tauri.");
    }
  }

  return (
    <div className="container">
      <form
        className="row"
        onSubmit={(event) => {
          event.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(event) => setName(event.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMessage}</p>
    </div>
  );
}
