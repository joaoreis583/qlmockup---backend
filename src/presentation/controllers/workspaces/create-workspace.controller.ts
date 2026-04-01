import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateWorkspaceDto } from "src/application/dtos/workspaces/workspace.dto";
import { CreateWorkspaceUseCase } from "src/application/use-cases/workspaces/workspace.usecase";

@ApiTags('Workspaces')
@Controller('workspaces')
export class CreateWorkspaceController {
    constructor(
        private readonly createWorkspaceUseCase: CreateWorkspaceUseCase,
    ) {}
    
    @ApiOperation({ 
        summary: 'Create a new workspace' 
    })
    @Post()
    async createWorkspace(@Body() dto:CreateWorkspaceDto) {
        return this.createWorkspaceUseCase.execute(dto);
    }
}