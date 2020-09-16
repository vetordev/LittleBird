import { Repository } from 'typeorm';
import { Interest } from './entity/interest.entity';
import { Response } from 'express';
export declare class InterestService {
    private readonly interestRespository;
    constructor(interestRespository: Repository<Interest>);
    createInterest(user_id: number, theme_id: number): Promise<void>;
    getInterestByUser(user_id: number, page: number): Promise<Interest[]>;
    deleteInterest(interest_id: number, response: Response): Promise<Response>;
}
