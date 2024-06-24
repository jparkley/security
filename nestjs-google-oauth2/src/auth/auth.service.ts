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

  validateUser(user: UserType) {
    console.log('==== user in authService.validateUser', user);
  }
}
