import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ChatEntity } from "./chat.entity";

export enum ChatSender {
  USER = 'user',
  BOT = 'bot'
}

@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public from: ChatSender;

  @Column()
  public content: string;

  @ManyToOne(() => ChatEntity, chat => chat.messages)
  public chat: ChatEntity;

  @CreateDateColumn()
  public createdAt: number;
}
