import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

    async create(userData: { name: string; email: string; password: string }): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = new User();
        user.name = userData.name;
        user.email = userData.email;
        user.password = hashedPassword;

        return this.usersRepository.save(user);
    }
}
