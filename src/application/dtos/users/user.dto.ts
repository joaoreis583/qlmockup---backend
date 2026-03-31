import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDate, IsEmpty, IsEmail } from "class-validator";
import { Plan } from "src/infra/database/models/user.model";

export class CreateUserDto {

  @ApiProperty({ example: '1', description: 'ID of Users' })
  @IsEmpty()
  id: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'user@example.com', description: 'Person Email' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '******', description: 'Password of account' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
        enum: Plan,
        example: Plan.FREE,
        description: 'The plan of the user',
        default: Plan.FREE,
    })
    @IsEnum(Plan)
    @IsOptional()
    plan: Plan
}
