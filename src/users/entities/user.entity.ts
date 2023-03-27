import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { UserRole } from "../enum/user-roles.enum"
import { UserProfile } from "./user-profile"



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

    @OneToOne(() => UserProfile)
    @JoinColumn()
    profile: UserProfile
}


