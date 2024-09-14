import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'ActivePlayer' })
export class ActivePlayer extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn({ type: 'text' })
  name: string;

  @Field(() => Number)
  @Column({ type: 'int' })
  stars: number;

  @Field(() => Boolean)
  @Column({ type: 'bool' })
  claimed: boolean;
}
