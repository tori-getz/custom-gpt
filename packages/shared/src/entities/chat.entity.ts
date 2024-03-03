import { Column, CreateDateColumn, Entity, OneToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { UserEntity } from "./user.entity";

@Entity('chat')
export class ChatEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public botArchetype: string;

  @Column()
  public telegramApiToken: string;

  @OneToMany(() => MessageEntity, message => message.chat)
  public messages: Array<MessageEntity>;

  @ManyToOne(() => UserEntity, user => user.chats)
  public user: UserEntity;

  @CreateDateColumn()
  public createdAt: number;
}
