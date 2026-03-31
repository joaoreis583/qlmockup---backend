import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/application/dtos/users/user.dto";
import { CreateUserUseCase } from "src/application/use-cases/users/user.usecase";

@ApiTags('Users')
@Controller('users')
export class CreateUserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) {}
    
    @ApiOperation({ 
        summary: 'Create a new user' 
    })
    @Post()
    async createUser(@Body() dto:CreateUserDto) {
        return this.createUserUseCase.execute(dto);
    }
}