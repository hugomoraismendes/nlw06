import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, JoinColumn, ManyToOne } from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Tag, User } from '@entities';

@Entity('compliments')
class Compliment {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_sender: string;

    @JoinColumn({ name: 'user_sender' })
    @ManyToOne(() => Tag)
    userSender: User;

    @Column()
    user_receiver: string;

    @JoinColumn({ name: 'user_receiver' })
    @ManyToOne(() => Tag)
    userReceiver: User;

    @Column()
    tag_id: string;

    @JoinColumn({ name: 'tag_id' })
    @ManyToOne(() => Tag)
    tag: Tag;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Compliment };
