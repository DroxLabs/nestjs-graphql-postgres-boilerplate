import { Field, HideField, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
@Unique(['email'])
export class User extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn() // Auto-incrementing ID column
  id: number;

  @Field(() => String)
  @PrimaryColumn({ type: 'text' }) // Email as primary column
  email: string;

  @Field(() => String)
  @Column({ type: 'text' }) // Regular column for the name
  name: string;

  @HideField()
  @Column({ type: 'text' })
  password: string;

  @Field(() => Date)
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Date column with default value
  dateJoined: Date;
}
