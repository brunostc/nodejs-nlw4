import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { User } from '../models/User';
import { UsersRepository } from '../repositories/UserRepository';

class UserController {
	async create(req: Request, res: Response) {
		const { name, email } = req.body;

		const usersRepository = getCustomRepository(UsersRepository);

		const userAlreadyExists = await usersRepository.findOne({ email });

		if(userAlreadyExists) 
			return res.status(400).json({ msg: 'User already exists' });
		
		const user = usersRepository.create({ name, email });

		await usersRepository.save(user);

		return res.json(user);
	}

	async index(req: Request, res: Response) {
		const users = await getRepository(User)
			.createQueryBuilder("users")
			.getMany();						

		return res.json(users);
	}

	async get(req: Request, res: Response) {
		const userId = req.params.id;
		const usersRepository = getRepository(User);
		const user = await usersRepository.findOne(userId);

		if (! user) return res.status(400).json({ msg: 'User not found' });

		return res.json(user);
	}
}

export { UserController };

