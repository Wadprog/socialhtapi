import { z, string, TypeOf, object } from 'zod';

export const Template = object({
  id: z.string(),
  name: z.string(),
  body: string(),
  subject: string(),
  requiredFields: z.any(),
});


export type TemplateInterface = TypeOf<typeof Template>;
