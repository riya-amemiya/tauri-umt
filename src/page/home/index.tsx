import { Effect } from "effect";
import { useCallback, useMemo, useState } from "react";

import reactLogo from "@/assets/react.svg";
import { Button } from "@/components/ui/button";
import { generateApiInstance } from "@/utils/generateApiInstance";

import "@/App.scss";

export function Home() {
  const [greetMessage, setGreetMessage] = useState("");
  const [name, setName] = useState("");
  const greetApi = generateApiInstance("greet");
  const [count, setCount] = useState(0);
  // Effect<void>
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const task = useMemo(
    () => Effect.sync(() => setCount((current) => current + 1)),
    [setCount],
  );
  const increment = useCallback(() => Effect.runSync(task), [task]);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMessage(await greetApi({ name }));
  }

  return (
    <div className="container">
      <h1 className="w-10">Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank" rel="noreferrer">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

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

      <Button type="button" onClick={increment}>
        count is {count}
      </Button>

      <p>{greetMessage}</p>
    </div>
  );
}
