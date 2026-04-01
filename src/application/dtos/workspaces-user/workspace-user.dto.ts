import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDate, IsEmpty, IsEmail } from "class-validator";
import { Role } from "src/infra/database/models/workspace-user.model";

export class CreateWorkspaceUserDto {

  @ApiProperty({ example: '1', description: 'ID of Workspaces' })
  @IsEmpty()
  id: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsString()
  @IsOptional()
  user_id: string;

  @ApiProperty({ example: 'anonymus@example.com', description: 'Person Email' })
  @IsOptional()
  workspace_id: string;

  @ApiProperty({
          enum: Role,
          example: Role.MEMBRO,
          description: 'The role of the member in the workspace',
          default: Role.MEMBRO,
      })
      @IsEnum(Role)
      @IsOptional()
      role: Role
}
