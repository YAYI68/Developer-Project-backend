import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from "typeorm"
import { UserRole } from "../enum/user-roles.enum";



@Entity()
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column({ unique: true })
    username:string
    
    @Column({ unique: true })
    email:string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.MEMBER,
    })
    role:UserRole
     
    @Column()
    password:string; 

    @Column({default:'default.jpg'})
    image:string;

    @Column({nullable:true})
    github:string;

    @Column({nullable:true})
    linkenIn:string
    
    @Column({nullable:true})
    twitter:string;

    @Column({nullable:true})
    short_bio:string

    @Column({nullable:true})
    portfolio_url:string

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
    
    @ManyToOne(() =>User, (user) => user.skills)
    user: User
}


