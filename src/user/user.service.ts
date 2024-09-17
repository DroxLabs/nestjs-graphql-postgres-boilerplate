import { Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs'; // Import bcryptjs to hash the password
import { User } from 'src/database';
import { CreateUserInput } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor() {}

  async createUser(input: CreateUserInput): Promise<User> {
    // Hash the password
    const hashedPassword = await hash(input.password, 12);

    // Create a new user instance
    const user = User.create({
      ...input, // Spread the input object properties
      password: hashedPassword, // Overwrite the plain password with the hashed password
      dateJoined: new Date(), // Set the dateJoined to the current date
    });

    // Save the user to the database
    await user.save();

    return user;
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
