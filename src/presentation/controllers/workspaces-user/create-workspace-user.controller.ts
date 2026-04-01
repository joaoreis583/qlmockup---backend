import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateWorkspaceUserDto } from "src/application/dtos/workspaces-user/workspace-user.dto";
import { AddUserToWorkspaceUseCase } from "src/application/use-cases/workspaces-user/workspace-user.usecase";

@ApiTags('Workspaces')
@Controller('workspaces')
export class CreateWorkspaceUserController {
    constructor(
        private readonly addUserToWorkspaceUseCase: AddUserToWorkspaceUseCase,
    ) {}

    @ApiOperation({
        summary: 'Add a user to workspace'
    })
    @Post('users')
    async addUserToWorkspace(@Body() dto:CreateWorkspaceUserDto) {
        return this.addUserToWorkspaceUseCase.execute(dto);
    }
}