import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

//TODO: Implement proper auth guards
@Injectable()
export class HttpAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthenticationService) {}

  canActivate(context: ExecutionContext) {
    // Get the header
    const authHeader = context.switchToHttp().getRequest().headers
      .authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }
    const validationResult = this.auth.ValidateToken(token);
    if (validationResult === true) {
      return true;
    }
    throw new UnauthorizedException(validationResult);
  }
}

@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthenticationService) {}

  canActivate(context: ExecutionContext) {
    // Get the header
    const authHeader = context.getArgs()[2].req.headers.authorization as string;

    if (!authHeader) {
      throw new BadRequestException('Authorization header not found.');
    }
    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new BadRequestException(
        `Authentication type \'Bearer\' required. Found \'${type}\'`,
      );
    }
    const validationResult = this.auth.ValidateToken(token);
    if (validationResult === true) {
      return true;
    }
    throw new UnauthorizedException(validationResult);
  }
}

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly auth: AuthenticationService) {}

  canActivate(context: ExecutionContext) {
    // Since a GraphQl subscription uses Websockets,
    //     we can't pass any headers. So we pass the token inside the query itself
    const token = context.switchToWs().getData().token;

    if (!token) {
      throw new BadRequestException('Authentication token not found.');
    }

    const validationResult = this.auth.ValidateToken(token);
    if (validationResult === true) {
      return true;
    }
    throw new UnauthorizedException(validationResult);
  }
}
