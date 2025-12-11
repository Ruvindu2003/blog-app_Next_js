// src/posts/post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/catagory.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  excerpt: string;

  @Column({ nullable: true })
  featuredImage: string;

  @Column({ type: 'enum', enum: ['DRAFT', 'PUBLISHED'], default: 'DRAFT' })
  status: 'DRAFT' | 'PUBLISHED';

  @Column('simple-array', { nullable: true })
  tags: string[];

  @ManyToOne(() => User, u => u.posts, { eager: true })
  user: User;

  @ManyToOne(() => Category, c => c.posts, { eager: true, nullable: true })
  category: Category;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default Post;