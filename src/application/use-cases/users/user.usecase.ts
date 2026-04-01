import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateUserDto } from 'src/application/dtos/users/user.dto';
import { UserEntity } from 'src/domain/entities/users/user.entity';
import type { IUserRepository } from 'src/domain/interfaces/users/user-interface.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: CreateUserDto) {
    const { id, name, email, password, plan } = dto;

    const idAlreadyExists = await this.userRepository.findById(id);

    if (idAlreadyExists) {
      throw new BadRequestException('There is already a user registered with this ID.');
    }

    const newUser = new UserEntity(
      {
        name,
        email,
        password,
        plan
      },
      randomUUID(),
    );

    const createdUser = await this.userRepository.create(newUser);

    if (createdUser === null) {
      throw new BadRequestException('Error creating user');
    }
    return createdUser;
  }
}