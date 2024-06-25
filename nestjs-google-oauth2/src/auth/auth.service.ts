import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/common/database/entities/User';
import { UserType } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(user: UserType) {
    const userFound = await this.userRepository.findOneBy({
      email: user.email,
    });

    if (userFound) return userFound;

    const newUser = this.userRepository.create(user); // create a new entity instance
    return this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }
}
