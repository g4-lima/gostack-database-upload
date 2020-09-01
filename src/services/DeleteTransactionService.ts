import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionReposiory = getCustomRepository(TransactionsRepository);

    const verifyTransactionId = await transactionReposiory.findOne(id);

    if (!verifyTransactionId) {
      throw new AppError('Transaction does not exist');
    }

    await transactionReposiory.delete(id);
  }
}

export default DeleteTransactionService;
