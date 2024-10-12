"use client";

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
import { generateAppApiInstance } from "@/utils/generateAppApiInstance";
import { isApp } from "@/utils/isApp";

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const HomeClientPage = () => {
  const [greetMessage, setGreetMessage] = useState("");
  const greetApi = generateAppApiInstance("greet");

  async function greet(userName: string) {
    if (isApp()) {
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
                <FormLabel data-testid="username-label">Username</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    data-1p-ignore={true}
                    data-testid="username-input"
                    placeholder="shadcn"
                    {...field}
                  />
                </FormControl>
                <FormDescription data-testid="username-description">
                  This is your public display name.
                </FormDescription>
                <FormMessage data-testid="username-error" />
              </FormItem>
            )}
          />
          <Button data-testid="greet-button" type="submit">
            Greet
          </Button>
        </form>
      </Form>

      <p data-testid="greet-message">{greetMessage}</p>
    </div>
  );
};
