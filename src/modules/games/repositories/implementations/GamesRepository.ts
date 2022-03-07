import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
}

interface GameProps {
  id: string;
  title: string;
  created_at: Date;
  updated_at: Date;
}

interface ResultProps extends GameProps {
  users: UserProps[];
}

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    return await this.repository
      .createQueryBuilder("games")
      .where(`title ILIKE '%${param}%'`)
      .getMany();
    // Complete usando query builder
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return this.repository.query("SELECT count(*) FROM games"); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const result: ResultProps = (await this.repository.findOne(id, {
      relations: ["users"],
    })) as ResultProps;

    return result.users as User[];
    // Complete usando query builder
  }
}
