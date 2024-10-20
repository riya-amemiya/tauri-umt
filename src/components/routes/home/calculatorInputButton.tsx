import type { UseFormReturn } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import type { calculatorApiSchema } from "@/types/schema/calculatorApiSchema";

export const CalculatorInputButton = ({
  value,
  form,
}: {
  value: number | string;
  form: UseFormReturn<z.infer<typeof calculatorApiSchema>>;
}) => {
  switch (value) {
    case "=": {
      return (
        <Button
          className="col-span-3"
          data-testid="run-calculator-button"
          type="submit"
        >
          {value}
        </Button>
      );
    }
    case "ac": {
      return (
        <Button
          className="col-span-3"
          onClick={() => {
            form.setValue("expression", "");
          }}
          type="button"
        >
          {value}
        </Button>
      );
    }
    default: {
      return (
        <Button
          className="col-span-3"
          onClick={() => {
            form.setValue(
              "expression",
              `${form.getValues("expression")}${value}`,
            );
          }}
          type="button"
        >
          {value}
        </Button>
      );
    }
  }
};
