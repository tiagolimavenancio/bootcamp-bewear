import z from "zod";

export const createShippingAddressSchema = z.object({
  email: z.email("E-mail invalid"),
  fullName: z.string().min(1, "Fullname is required"),
  cpf: z.string().min(14, "CPF invalid"),
  phone: z.string().min(15, "Cellphone invalid"),
  zipCode: z.string().min(9, "CEP invalid"),
  address: z.string().min(1, "Endereço is required"),
  number: z.string().min(1, "Number is required"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Neighborhood is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
