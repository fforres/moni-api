import { Injectable } from '@nestjs/common';
// import { NewRecipeInput } from './dto/new-recipe.input';
// import { RecipesArgs } from './dto/recipes.args';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  /**
   * MOCK
   * Put some real business logic here
   * Left for demonstration purposes
   */

  // async create(data: NewRecipeInput): Promise<Recipe> {
  //   return {} as any;
  // }

  async findOneById(id: string): Promise<Author> {
    return {
      id,
    };
  }

  // async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
  //   return [] as Recipe[];
  // }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
