import { useState } from "react";

import { generateAppApiInstance } from "@/utils/generateAppApiInstance";

export function Home() {
  const [greetMessage, setGreetMessage] = useState("");
  const [name, setName] = useState("");
  const greetApi = generateAppApiInstance("greet");

  async function greet() {
    setGreetMessage(await greetApi({ name }));
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
      <p>{window.toString()}</p>
    </div>
  );
}
