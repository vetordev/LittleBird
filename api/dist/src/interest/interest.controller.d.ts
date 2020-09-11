import { CreateInterestDto, DeleteInterestDto, QueryPageDto } from './interest.dto';
import { InterestService } from './interest.service';
import { Response } from 'express';
export declare class InterestController {
    private readonly interestService;
    constructor(interestService: InterestService);
    createInterest(request: any, body: CreateInterestDto): Promise<void>;
    getInterestByUser(request: any, query: QueryPageDto): Promise<import("./entity/interest.entity").Interest[]>;
    deleteInterest(response: Response, params: DeleteInterestDto): Promise<Response<any>>;
}
