import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';

describe('TiendaService', () => {
 let service: TiendaService;
 let repository: Repository<TiendaEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TiendaService],
   }).compile();

   service = module.get<TiendaService>(TiendaService);
   repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });


 
it('create should return a new tienda', async () => {
  const tienda: TiendaEntity = {
    id: 0,
    name: faker.company.name(),
    address: faker.address.secondaryAddress(),
    phone: faker.phone.number('##########'),
    cafes: [],
  }

  const newTienda: TiendaEntity = await service.create(tienda);
  expect(newTienda).not.toBeNull();

  const storedTienda: TiendaEntity = await repository.findOne({where: {id: newTienda.id}})
  expect(storedTienda).not.toBeNull();
  expect(storedTienda.name).toEqual(newTienda.name)
  expect(storedTienda.address).toEqual(newTienda.address)
  expect(storedTienda.phone).toHaveLength(10)
});
it('should not return a new tienda', async () => {
  const tienda: TiendaEntity = {
    id: 0,
    name: faker.company.name(),
    address: faker.address.secondaryAddress(),
    phone: faker.phone.number('#########'),
    cafes: [],
  }

  await expect(() => service.create(tienda)).rejects.toHaveProperty("message", "El precio del tienda debe ser positivo")
  
});
});
