import { Injectable } from '@nestjs/common';

import { IUserObj } from '../user/interface';
import { CreateDeleteAccountRequestDto } from './dto/create-delete-account-request.dto';
import { DeleteAccountRequestRepository } from './delete-account-request.repository';
import { IDeleteAccountRequest } from './interface';

@Injectable()
export class DeleteAccountRequestsService {
  constructor(
    private readonly repository: DeleteAccountRequestRepository,
  ) { }

  create(user: IUserObj, createDeleteAccountRequestDto: CreateDeleteAccountRequestDto) {
    const deleteRequest: IDeleteAccountRequest = {
      userId: user._id,
      name: user.name,
      email: user.mail,
      reason: createDeleteAccountRequestDto.reason,
    }
    return this.repository.create(deleteRequest);
  }

  findAll() {
    return this.repository.findAll({});
  }

  remove(id: string) {
    return this.repository.delete({ userId: id });
  }
}
