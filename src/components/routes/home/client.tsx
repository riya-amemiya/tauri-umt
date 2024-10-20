"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { range } from "umt/module/Array/range";
import type { z } from "zod";

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
import { calculatorApiSchema } from "@/types/schema/calculatorApiSchema";
import { generateAppApiInstance } from "@/utils/generateAppApiInstance";
import { isApp } from "@/utils/isApp";
import { rocketApiQueryClient } from "@/utils/rocketApiClient";

import { CalculatorInputButton } from "./calculatorInputButton";

export const HomeClientPage = () => {
  const [calculatorMessage, setCalculatorMessage] =
    useState<CalculatorResponse>([false, ""]);
  const [isAppStatus, setIsAppStatus] = useState<boolean>(false);
  const { data, error, mutate, isPending } = rocketApiQueryClient.useMutation(
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

  const calculatorInputArrayLine1 = ["(", ")", "%", "ac"];
  const calculatorInputArrayLine2 = [...range(7, 10), "÷"];
  const calculatorInputArrayLine3 = [...range(4, 7), "x"];
  const calculatorInputArrayLine4 = [...range(1, 4), "-"];
  const calculatorInputArrayLine5 = [0, ".", "=", "+"];

  const calculatorInputArray = [
    ...calculatorInputArrayLine1,
    ...calculatorInputArrayLine2,
    ...calculatorInputArrayLine3,
    ...calculatorInputArrayLine4,
    ...calculatorInputArrayLine5,
  ];

  const form = useForm<z.infer<typeof calculatorApiSchema>>({
    resolver: zodResolver(calculatorApiSchema),
    defaultValues: {
      expression: "",
    },
  });

  function onSubmit(values: z.infer<typeof calculatorApiSchema>) {
    const expression = values.expression
      .replaceAll("x", "*")
      .replaceAll("÷", "/")
      .replaceAll("%", "/100");
    calculator(expression);
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
          <div className="mt-5">
            <div className="grid grid-cols-12 gap-4">
              {calculatorInputArray.map((value) => (
                <CalculatorInputButton
                  form={form}
                  key={String(value)}
                  value={value}
                />
              ))}
            </div>
          </div>
        </form>
      </Form>

      <p>
        {isAppStatus ? (
          calculatorMessage[1]
        ) : isPending ? (
          "Loading..."
        ) : data?.success ? (
          <span data-testid="calculator-message">{data?.message ?? ""}</span>
        ) : error === null ? null : (
          error.error
        )}
      </p>
    </div>
  );
};
