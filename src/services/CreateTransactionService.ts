import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionReposository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    const balance = transactionReposository.getBalance();

    const { total } = await balance;

    if (type === 'outcome' && total < value) {
      throw new AppError('Insufficient funds', 400);
    }

    const checkExistsCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!checkExistsCategory) {
      const categoryTitle = categoriesRepository.create({
        title: category,
      });

      await categoriesRepository.save(categoryTitle);
    }

    const findCategory = await categoriesRepository.findOne({
      where: { title: category },
    });

    const category_id = findCategory?.id;

    const transaction = transactionReposository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionReposository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
