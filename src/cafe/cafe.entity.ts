/* eslint-disable prettier/prettier */
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CafeEntity {
 @PrimaryGeneratedColumn('uuid')
 id: number;

 @Column()
 name: string;
 
 @Column()
 description: string;

 @Column()
 price: number;

 @ManyToMany(() => TiendaEntity, tienda => tienda.cafes)

 tiendas: TiendaEntity[];
 
}