import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserRole } from '../enum/user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: UserRole.MEMBER })
  role: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'default.jpg', nullable: true })
  image: string;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  linkenIn: string;

  @Column({ nullable: true })
  twitter: string;

  @Column({ nullable: true })
  short_bio: string;

  @Column({ nullable: true })
  portfolio_url: string;

  @OneToMany(() => UserSkill, (skill) => skill.user)
  skills: UserSkill[];
}

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.skills)
  user: User;
}
