import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { User } from "./user.entity";

@Entity()
export class UserProfile {
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column()
    image:string;
    
    @Column()
    github:string;

    @Column()
    linkenIn:string
    
    @Column()
    twitter:string;

    @Column()
    short_bio:string

    @Column()
    portfolio_url:string

    @OneToOne(() => User, (user) => user.profile)
    user: User

    @OneToMany(() => UserSkill, (skill) => skill.user)
    skills: UserSkill[]

    
}


@Entity()
export class UserSkill {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @Column()
    description:string;
    
    @ManyToOne(() =>UserProfile , (user) => user.skills)
    user: UserProfile
}