import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // GraphQL type decorator
@Entity({ name: 'items' }) // TypeORM entity decorator
export class Item {
  @Field(() => Number) // GraphQL field for ID
  @PrimaryGeneratedColumn() // TypeORM auto-incrementing primary key
  id: number;

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
  dateUploaded: Date; // GraphQL field for created date

  @Field(() => Date)
  @Column({ type: 'date', default: () => 'CURRENT_DATE' }) // Date column with default value
  lastUpdated: Date;

  // New tsvector column for full-text search
  @Column({ type: 'tsvector', select: false, nullable: true })
  searchVector: string;
}
