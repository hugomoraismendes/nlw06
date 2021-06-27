import { Exclude } from 'class-transformer';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    admin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }

        if (!this.admin) {
            this.admin = false;
        }
    }
}

export { User };
