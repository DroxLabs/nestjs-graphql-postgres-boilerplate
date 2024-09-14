import { BadRequestException, Injectable } from '@nestjs/common';
import { ActivePlayer, Database } from 'src/database';

@Injectable()
export class UserService {
  constructor() {}

  create(name: string) {
    return ActivePlayer.create({
      name: name,
      stars: 0,
      claimed: false,
    }).save();
  }

  findAll() {
    return ActivePlayer.find();
  }

  async claim(name: string) {
    console.log('request start server 1 ->', new Date());

    return await Database.transaction(async (entityManager) => {
      const player = await entityManager
        .createQueryBuilder(ActivePlayer, 'player')
        .setLock('pessimistic_write') // This locks the row for update
        .where('player.name = :name', { name })
        .getOne();

      console.log('server 1 --> ', player, new Date());

      if (!player) {
        throw new BadRequestException('Player not found');
      }

      if (player.claimed) {
        // throw new BadRequestException('Already claimed');
        return 'Already Claimed';
      }

      entityManager
        .createQueryBuilder()
        .update(ActivePlayer)
        .set({
          stars: () => `stars + 10`,
          claimed: () => 'true',
        })
        .where('name = :name', {
          name,
        })
        .execute();

      return 'Claim Success';
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
