import { Injectable } from '@nestjs/common';
// import { NewRecipeInput } from './dto/new-recipe.input';
// import { RecipesArgs } from './dto/recipes.args';
import { Author } from './author.dto';

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

  async remove(_id: string): Promise<boolean> {
    return true;
  }
}
