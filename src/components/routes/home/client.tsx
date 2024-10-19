"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import type { CalculatorResponse } from "@/types/apis/calculatorTypes";
import { generateAppApiInstance } from "@/utils/generateAppApiInstance";
import { isApp } from "@/utils/isApp";
import { rocketApiQueryClient } from "@/utils/rocketApiClient";

const formSchema = z.object({
  expression: z.string().regex(/^[\d()*+./-]+$/i, "Invalid expression"),
});

export const HomeClientPage = () => {
  const [calculatorMessage, setCalculatorMessage] =
    useState<CalculatorResponse>([false, ""]);
  const [isAppStatus, setIsAppStatus] = useState<boolean>(false);
  const { data, mutate, isPending } = rocketApiQueryClient.useMutation(
    "get",
    "/calculator",
  );
  const calculatorApi = generateAppApiInstance("calculator");
  async function calculator(expression: string) {
    if (isAppStatus) {
      setCalculatorMessage(await calculatorApi({ expression }));
    } else {
      mutate({
        params: {
          query: {
            expression,
          },
        },
      });
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expression: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    calculator(values.expression);
  }

  useEffect(() => {
    setIsAppStatus(isApp());
  }, []);

  return (
    <div className="container">
      <Form {...form}>
        <form className="row" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="expression"
            render={({ field }) => (
              <FormItem>
                <FormLabel data-testid="expression-label">Expression</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    data-1p-ignore={true}
                    data-testid="expression-input"
                    placeholder="1+1"
                    {...field}
                  />
                </FormControl>
                <FormDescription data-testid="expression-description">
                  Enter a mathematical expression to calculate
                </FormDescription>
                <FormMessage data-testid="expression-error" />
              </FormItem>
            )}
          />
          <Button data-testid="run-calculator-button" type="submit">
            Run Calculator
          </Button>
        </form>
      </Form>

      <p>
        {isAppStatus ? (
          calculatorMessage[1]
        ) : isPending ? (
          "Loading..."
        ) : (
          <span data-testid="calculator-message">{data?.message ?? ""}</span>
        )}
      </p>
    </div>
  );
};
