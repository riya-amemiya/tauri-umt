import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { isApp } from "@/lib/isApp";
import { generateAppApiInstance } from "@/utils/generateAppApiInstance";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function Home() {
  const [greetMessage, setGreetMessage] = useState("");
  const greetApi = generateAppApiInstance("greet");

  async function greet(userName: string) {
    if (isApp) {
      setGreetMessage(await greetApi({ name: userName }));
    } else {
      setGreetMessage("Not running in Tauri.");
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    greet(values.userName);
  }

  return (
    <div className="container">
      <Form {...form}>
        <form className="row" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" autoComplete="off" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Greet</Button>
        </form>
      </Form>

      <p>{greetMessage}</p>
    </div>
  );
}
