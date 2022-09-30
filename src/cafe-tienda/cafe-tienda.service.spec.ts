import { Test, TestingModule } from '@nestjs/testing';
import { CafeEntity } from '../cafe/cafe.entity';
import { Repository } from 'typeorm';
import { TiendaEntity } from '../tienda/tienda.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeTiendaService } from './cafe-tienda.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CafeTiendaService', () => {
  let service: CafeTiendaService;
  let tiendaRepository: Repository<TiendaEntity>;
  let cafeRepository: Repository<CafeEntity>;
  let tienda: TiendaEntity;
  let cafesList : CafeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeTiendaService],
    }).compile();

    service = module.get<CafeTiendaService>(CafeTiendaService);
    tiendaRepository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    cafeRepository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    cafeRepository.clear();
    tiendaRepository.clear();

    cafesList = [];
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addCafeTienda should add an cafe to a tienda', async () => {
    const newcafe: CafeEntity = await cafeRepository.save({
      id: 0,
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: 999,
      tiendas : [],
    });

    const newTienda: TiendaEntity = await tiendaRepository.save({
      id: 0,
      name: faker.company.name(),
      address: faker.address.secondaryAddress(),
      phone: faker.phone.number('#########'),
      cafes: [],
    })

    const result: TiendaEntity = await service.addCafeTienda(newTienda.id, newcafe.id);
    
    expect(result.cafes.length).toBe(1);
    expect(result.cafes[0]).not.toBeNull();
    expect(result.cafes[0].description).toEqual(newcafe.description)
    expect(result.cafes[0].name).toEqual(newcafe.name)
    expect(result.cafes[0].price).toEqual(newcafe.price)

  });

  it('addCafeTienda should thrown exception for an invalid cafe', async () => {
    const newTienda: TiendaEntity = await tiendaRepository.save({
      id: 0,
      name: faker.company.name(),
      address: faker.address.secondaryAddress(),
      phone: faker.phone.number('#########'),
      cafes: [],
    })

    await expect(() => service.addCafeTienda(newTienda.id, 1)).rejects.toHaveProperty("message", "The cafe with the given id was not found");
  });

  it('addCafeTienda should throw an exception for an invalid tienda', async () => {
    const newcafe: CafeEntity = await cafeRepository.save({
      id: 0,
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      price: 999,
      tiendas : [],
    });

    await expect(() => service.addCafeTienda(2, newcafe.id)).rejects.toHaveProperty("message", "The tienda with the given id was not found")
  })
});
