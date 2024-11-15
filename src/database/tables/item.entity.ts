import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryColumn,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType() // GraphQL type decorator
@Entity({ name: 'items' }) // TypeORM entity decorator
export class Item extends BaseEntity {
  @Field(() => Number) // GraphQL field for ID
  @PrimaryGeneratedColumn() // TypeORM auto-incrementing primary key
  id: number;

  @Field(() => Date)
  @PrimaryColumn({ type: 'date', default: () => 'CURRENT_DATE' }) // Date column with default value, primary column for timescaleDB
  dateUploaded: Date; // GraphQL field for created date

  @Field() // GraphQL field for title
  @Column({ type: 'text' }) // TypeORM column for title
  title: string;

  @Field() // GraphQL field for description
  @Column({ type: 'text' }) // TypeORM column for description
  description: string;

  @Field(() => [String]) // GraphQL field for tags array
  @Column('text', { array: true }) // TypeORM column for text array
  tags: string[];

  @Field(() => String) // GraphQL field for tags array
  @Column({ type: 'text' }) // TypeORM column for text array
  tagsString: string;

  @Field(() => Number) // GraphQL field for quantity
  @Column({ type: 'integer' }) // TypeORM column for quantity
  price: number;

  @Field(() => Date)
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Date column with default value
  lastUpdated: Date;

  // New tsvector column for full-text search
  @Column({ type: 'tsvector', select: false, nullable: true })
  searchVector: string;

  @Field(() => Number)
  @Column({ type: 'integer', nullable: true })
  popularity: number;

  @Index() // Create a separate index for `id`
  @Column({ type: 'integer', generatedType: 'STORED', asExpression: 'id' })
  idIndex: number;

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  picture: string;
}
