import { Connection } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';

import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateSchoolBoardDto, SchoolBoardFilterDto, UpdateSchoolBoardDto } from '../dto/school-board.dto';
import { SchoolBoardRepository } from '../repositories/school-board.repository';

@Injectable()
export class SchoolBoardService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        public repository: SchoolBoardRepository,
    ) { }

    create(createSchoolBoardDto: CreateSchoolBoardDto) {
        return this.repository.create(createSchoolBoardDto)
    }

    findAll(filterDto: SchoolBoardFilterDto) {
        const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
        return this.repository.findAll({
            filter: {
                name: filter.name && { $regex: `^${filter.name}`, $options: 'i' },
                featured: filter.featured
            },
            options: {
                skip,
                limit
            }
        });
    }

    findOne(id: string) {
        return this.repository.findById(id);
    }

    update(id: string, updateSchoolBoardDto: UpdateSchoolBoardDto) {
        return this.repository.updateById(id, updateSchoolBoardDto)
    }

    remove(id: string) {
        return this.repository.deleteById(id);
    }
}
