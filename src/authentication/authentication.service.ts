import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareAsc } from 'date-fns';
import { Repository } from 'typeorm';
import { AccountActivationEntity } from '../account-activation/account-activation.entity';
import { AuthenticationTokens } from './authentication.dto';
import { ActivateAccountInput } from './authentication.inputs';

interface AuthenticationPayload {
  userId: string;
}

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AccountActivationEntity)
    private readonly AccountActivationRepository: Repository<
      AccountActivationEntity
    >,
    private readonly jwtService: JwtService,
  ) {}

  async activateAccount(
    data: ActivateAccountInput,
  ): Promise<AuthenticationTokens> {
    const activationKey = await this.AccountActivationRepository.findOneOrFail({
      where: {
        activationKey: data.activationKey,
      },
      relations: ['account'],
    });
    // TODO: (felipe) Do this better, this kinda sucks we should not rely on server dates for this
    const isValid = compareAsc(activationKey.TTL, new Date()) === 1;
    if (!isValid) {
      throw new Error('Resource not found');
    }

    const authenticationToken = this.GenerateToken({
      userId: activationKey.account.id,
    });
    const refreshToken = this.GenerateRefreshToken({
      userId: activationKey.account.id,
    });
    // this.AccountActivationRepository.softRemove(activationKey)
    return {
      authenticationToken,
      refreshToken,
    };
  }

  GenerateToken(payload: AuthenticationPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '15m',
    });
  }
  GenerateRefreshToken(payload: AuthenticationPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
  }
  ValidateToken(token: string) {
    try {
      this.jwtService.verify(token);
      return true;
    } catch (error) {
      return error.name;
    }
  }
}
