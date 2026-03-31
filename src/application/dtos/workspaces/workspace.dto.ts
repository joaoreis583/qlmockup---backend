import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsOptional, IsDate, IsEmpty, IsEmail } from "class-validator";
import { Plan } from "src/infra/database/models/workspace.model";

export class CreateWorkspaceDto {

  @ApiProperty({ example: '1', description: 'ID of Workspaces' })
  @IsEmpty()
  id: string;

  @ApiProperty({ example: 'Anonymus', description: 'Person Name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1', description: 'ID of the workspace owner' })
  @IsString()
  @IsNotEmpty()
  owner_id: string;
}
