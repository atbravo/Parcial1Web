/* eslint-disable prettier/prettier */
import { CafeEntity } from 'src/cafe/cafe.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TiendaEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 name: string;
 
 @Column()
 address: string;
 
 @Column()
 phone: string;
 
 @ManyToMany(() => CafeEntity, cafe => cafe.tiendas)
 cafes: CafeEntity[];
}