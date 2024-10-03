import { Effect } from "effect";
import { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { generateApiInstance } from "@/utils/generateApiInstance";

export function Home() {
  const [greetMessage, setGreetMessage] = useState("");
  const [name, setName] = useState("");
  const greetApi = generateApiInstance("greet");
  const [count, setCount] = useState(0);
  const task = useMemo(
    () => Effect.sync(() => setCount((current) => current + 1)),
    [],
  );
  const increment = useCallback(() => Effect.runSync(task), [task]);

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

      <Button type="button" onClick={increment}>
        count is {count}
      </Button>

      <p>{greetMessage}</p>
    </div>
  );
}
