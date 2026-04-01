import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDate, IsEmpty, IsEmail } from "class-validator";

export class CreateWorkspaceDto {

  @ApiProperty({ example: '1', description: 'ID of Workspaces' })
  @IsEmpty()
  id: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'anonymus@example.com', description: 'Person Email' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '1', description: 'ID of the workspace owner' })
  @IsString()
  @IsOptional()
  owner_id: string;
}
