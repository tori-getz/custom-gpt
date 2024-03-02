import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Exclude()
  @Column()
  public passwordHash: string;

  @OneToMany(() => ChatEntity, chat => chat.user)
  public chats: Array<ChatEntity>

  @CreateDateColumn()
  public createdAt: string;
}
