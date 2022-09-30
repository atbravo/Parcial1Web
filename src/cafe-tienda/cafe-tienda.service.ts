import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeEntity } from 'src/cafe/cafe.entity';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CafeTiendaService {
    constructor(
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>,
    
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
    ) {}

    async addCafetoTienda(tiendaId: number, cafeId: number): Promise<TiendaEntity> {
        const cafe: CafeEntity = await this.cafeRepository.findOne({where: {id: cafeId}});
        if (!cafe)
          throw new BusinessLogicException("The cafe with the given id was not found", BusinessError.NOT_FOUND);
      
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}, relations: ["cafes", ]})
        if (!tienda)
          throw new BusinessLogicException("The tienda with the given id was not found", BusinessError.NOT_FOUND);
    
        tienda.cafes = [...tienda.cafes, cafe];
        return await this.tiendaRepository.save(tienda);
      }
}
