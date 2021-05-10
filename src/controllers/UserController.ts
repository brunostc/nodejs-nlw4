import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UserRepository';
import bcrypt from 'bcrypt';
import * as Yup from 'yup';

const err0 = { msg: 'User email already in use.' };
const err1 = { msg: 'Invalid input data' };
const err2 = { msg: 'User not found' };
const err3 = { msg: 'There are no users to be listed' };
const err4 = { msg: 'Password error.' };
const err5 = { msg: 'Invalida schema' }

class UserController {
	async create(req: Request, res: Response) {
    const { name, email, password, repeatPassword } = req.body;
    const SALT_ROUNDS = 10

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(8),
      repeatPassword: Yup.string().required().min(8),
    });

    if (password !== repeatPassword) return res.status(400).json(err4);

    if (! (await schema.isValid(req.body)) ) return res.status(400).json(err5);

    const repository = getCustomRepository(UsersRepository);

    const userExists = await repository.findOne({ where: { email: req.body.email } });

    if (userExists) return res.status(400).json(err0);

		const user = repository.create({ name, email, hPassword });

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
