// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionReposiory = getCustomRepository(TransactionsRepository);

    await transactionReposiory.delete(id);
  }
}

export default DeleteTransactionService;
