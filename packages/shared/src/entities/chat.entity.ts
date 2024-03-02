import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @OneToMany(() => MessageEntity, message => message.chat)
  public messages: Array<MessageEntity>;

  @CreateDateColumn()
  public createdAt: number;
}
