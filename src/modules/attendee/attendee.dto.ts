import { IsEmail, IsEnum, isEnum, IsNotEmpty } from "class-validator";

export class AttendeeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsEnum({MALE: 'male', FEMALE: 'female'})
  gender: string;
}
