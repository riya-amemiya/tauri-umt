import { z } from "zod";

export const calculatorApiSchema = z.object({
  expression: z.string().regex(/^[\d%()+.x÷-]+$/i, "Invalid expression"),
});
