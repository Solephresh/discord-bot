import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Guild {
  @PrimaryColumn("text")
  id: string;

  @Column("text", { nullable: true })
  channel: string;

  @Column("text", { nullable: true })
  type: string;

  set(options: { id: string }) {
    this.id = options.id;
    this.channel = null;
    this.type = 'all';
    return this;
  }
}