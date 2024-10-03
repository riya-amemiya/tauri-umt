import { Effect } from "effect";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { generateApiInstance } from "@/utils/generateApiInstance";

import "@/page/home/index.scss";

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
