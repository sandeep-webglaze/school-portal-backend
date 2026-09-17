import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { ConflictException, Injectable } from '@nestjs/common';

import { SCHOOL_REQUEST_STATUS } from '@/src/lib/constants';
import { createPaginatedMongoOptions } from '@/src/lib/utils';
import { CreateSchoolRequestDto, SchoolRequestFilterDto, UpdateSchoolRequestDto } from '../dto/school-request.dto';
import { SchoolRequestRepository } from '../repositories/school-request.repository';
import { SchoolService } from './school.service';

@Injectable()
export class SchoolRequestService {
    constructor(
        @InjectConnection() private readonly connection: Connection,
        readonly repository: SchoolRequestRepository,
        readonly schoolService: SchoolService,
    ) { }

    async create(school: string, createDto: CreateSchoolRequestDto) {
        const updateRequest = await this.repository.findOne({ school: school, status: SCHOOL_REQUEST_STATUS.PENDING });

        if (updateRequest != null) throw new ConflictException("Request already exists");

        return this.repository.create(createDto);
    }

    async findAll(filterDto: SchoolRequestFilterDto) {
        const { skip, limit, ...filter } = createPaginatedMongoOptions(filterDto);
        return this.repository.findAll({
            filter,
            options: {
                skip,
                limit,
                populate: [
                    {
                        path: "school",
                        options: { projection: 'name' },
                    }
                ]
            }
        })
    }

    async findOne(id: string) {
        return this.repository.findById(id, {
            options: {
                populate: [
                    {
                        path: "school"
                    }
                ]
            }
        })
    }

    // currently only edhippo users can update request if school user also update we have to modify it accordingly 
    async updateRequest(schoolId: string, updateDto: UpdateSchoolRequestDto) {
        const transactionSession = await this.connection.startSession();
        transactionSession.startTransaction();

        try {
            const res = await this.repository.updateOne({ school: schoolId, status: SCHOOL_REQUEST_STATUS.PENDING }, updateDto);

            if (updateDto.status && updateDto.status === SCHOOL_REQUEST_STATUS.ACCEPTED) {
                await this.schoolService.updateSchoolData(schoolId, updateDto.requestedChanges, { session: transactionSession });
            }

            await transactionSession.commitTransaction();
            return res;
        } catch (error) {
            await transactionSession.abortTransaction();
            throw error;
        } finally {
            transactionSession.endSession()
        }
    }

    async remove(id: string) {
        return this.repository.deleteById(id)
    }
}
