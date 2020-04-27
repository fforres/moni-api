import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as hyperid from 'hyperid';
import { Repository } from 'typeorm';
import { AccountActivationEntity } from '../account-activation/account-activation.entity';
import { Account } from './accounts.dto';
import { AccountsEntity } from './accounts.entity';
import {
  CreateAccountInput,
  RemoveAccountInput,
  UnremoveAccountInput,
  UpdateAccountInput,
} from './accounts.inputs';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountsEntity)
    private readonly AccountRepository: Repository<AccountsEntity>,
  ) {}

  async getById(id: Account['id']): Promise<Account> {
    return this.AccountRepository.findOne(id);
  }

  async getByEmail(email: Account['email']): Promise<Account> {
    return this.AccountRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createAccount(data: CreateAccountInput): Promise<Account> {
    const currentAccount = await this.getByEmail(data.email);
    if (currentAccount) {
      throw new Error();
      return;
    }
    const account = new AccountsEntity();
    account.email = data.email;
    account.createdBy = data.email;
    account.lastChangedBy = data.email;
    account.lastChangedBy = data.email;

    const accountActivation = new AccountActivationEntity();
    const instance = hyperid({ urlSafe: true });
    accountActivation.activationKey = instance.uuid;
    account.createdBy = data.email;

    account.accountActivation = accountActivation;

    console.log({ accountActivation });
    const savedAccount = await this.AccountRepository.save(account);
    return savedAccount;
  }

  async updateAccount(data: UpdateAccountInput): Promise<Account> {
    const account = await this.AccountRepository.findOneOrFail(data.id);
    if (data.username) {
      account.username = data.username;
    }
    if (data.email) {
      account.email = data.email;
    }
    if (data.username) {
      account.username = data.username;
    }
    account.lastChangedBy = data.id;
    const savedAccount = await this.AccountRepository.save(account);
    return savedAccount;
  }

  async removeAccount(data: RemoveAccountInput): Promise<Account> {
    const account = await this.AccountRepository.findOne(data.id);
    const softRemove = await this.AccountRepository.softRemove(account);
    console.log({ account, softRemove });
    return account;
  }

  async unremoveAccount(data: UnremoveAccountInput): Promise<Account> {
    const account = new AccountsEntity();
    account.id = data.id;
    // const account = await this.AccountRepository.(data.id);
    const recover = await this.AccountRepository.recover(account);
    console.log({ account, recover });
    return account;
  }
}
