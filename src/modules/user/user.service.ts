import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs'; // Import bcryptjs to hash the password
import { User } from 'src/database';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  async createUser(input: CreateUserInput): Promise<User> {
    const hashedPassword = await hash(input.password, 11);

    const user = User.create({
      ...input,
      password: hashedPassword,
      dateJoined: new Date(),
    });

    await user.save();

    return user;
  }

  findById(id: number) {
    return User.findOne({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return User.findOne({
      where: { email },
    });
  }

  findAll() {
    return User.find();
  }

  // async claim(name: string) {
  //   console.log('request start server 1 ->', new Date());

  //   return await Database.transaction(async (entityManager) => {
  //     const player = await entityManager
  //       .createQueryBuilder(ActivePlayer, 'player')
  //       .setLock('pessimistic_write') // This locks the row for update
  //       .where('player.name = :name', { name })
  //       .getOne();

  //     console.log('server 1 --> ', player, new Date());

  //     if (!player) {
  //       throw new BadRequestException('Player not found');
  //     }

  //     if (player.claimed) {
  //       // throw new BadRequestException('Already claimed');
  //       return 'Already Claimed';
  //     }

  //     entityManager
  //       .createQueryBuilder()
  //       .update(ActivePlayer)
  //       .set({
  //         stars: () => `stars + 10`,
  //         claimed: () => 'true',
  //       })
  //       .where('name = :name', {
  //         name,
  //       })
  //       .execute();

  //     return 'Claim Success';
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}