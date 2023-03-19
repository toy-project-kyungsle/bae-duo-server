import { Repository, EntityRepository } from 'typeorm';
import { funding } from './funding.entity';

@EntityRepository(funding)
export class FundingRepository extends Repository<funding> {}
