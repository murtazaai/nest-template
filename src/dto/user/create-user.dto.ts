import { z } from 'zod';
import { IsInt, IsString } from 'class-validator';

export const createUserSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    gender: z.string(),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;

export class CreateAliceDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  gender: string;
}
