import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';

const err0 = { msg: 'User email already in use.' };
const err1 = { msg: 'Invalid input data' };
const err2 = { msg: 'User not found' };
const err3 = { msg: 'There are no users to be listed' };

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

    if (name === '' || email === '') return res.status(400).json(err1);

		const repository = getCustomRepository(UsersRepository);

		const userAlreadyExists = await repository.findOne({ email });

		if(userAlreadyExists) return res.status(400).json(err0);
		
		const user = repository.create({ name, email });

		await repository.save(user);

		return res.json(user);
	}

	async index(req: Request, res: Response) {
		const repository = getCustomRepository(UsersRepository);

    const users = await repository.find();

    if (! users) return res.status(400).json(err3);

		return res.json(users);
	}

	async get(req: Request, res: Response) {
		const userId = req.params.id;

		const repository = getCustomRepository(UsersRepository);

		const user = await repository.findOne(userId);

		if (! user) return res.status(400).send(err2);

		return res.json(user);
	}

  async update(req: Request, res: Response) {
    const userId = req.params.id;

    const { email, name } = req.body;

    const repository = getCustomRepository(UsersRepository);
    
    const user = await repository.findOne(userId);

    if (! user) return res.status(404).send({ msg: 'invalid user' });
    
    const newEmail = (email !== user.email) ? (email) : (user.email)
    const newName = (name !== user.name) ? (name) : (user.name)
    
    const newInfo = {
      email: newEmail,
      name: newName,
    };
    
    await repository.update(userId, newInfo)

    return res.json({ msg: 'User updated' });
  }

  async delete(req: Request, res: Response) {
    const userId = req.params.id;

    const repository = getCustomRepository(UsersRepository);

    const user = await repository.findOne(userId);

    if (! user) return res.status(400).json(err2);

    await repository.delete(userId);

    return res.status(204).json({});
  }
}

export { UserController };
