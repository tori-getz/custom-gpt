import { CreateUser, InjectPinoLogger, PinoLogger, UserEntity } from '@app/shared';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  public constructor(
    @InjectPinoLogger(UserService.name) private readonly logger: PinoLogger,
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      }
    });
  }

  public async getUserByName(name: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        name: name,
      },
    });
  }

  public async create(dto: CreateUser): Promise<UserEntity> {
    const user = new UserEntity();
    user.name = dto.name;
    user.passwordHash = dto.passwordHash;

    return this.userRepository.save(user);
  }
}
