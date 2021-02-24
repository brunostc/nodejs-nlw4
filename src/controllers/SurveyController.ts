import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Survey as survey } from '../models/Survey';

class SurveyController {
	async create(req: Request, res: Response) {
		const { description, title } = req.body;

		const surveysRepository = getRepository(survey)

		const surveyAlreadyExists = await surveysRepository.findOne({ title });

		if(surveyAlreadyExists) 
			return res.status(400).json({ msg: 'Survey title already in use.' });
	
		if (title === '') 
			return res
				.status(400)
				.json(
				{ 
					msg: 'Survey title cannot be an empty field.' 
				});
		
		const slug = title
									.replace(/\s+/g, '-')
									.replace(/,/g, '')
									.toLowerCase()
									.substring(0, 75);

		const Survey = surveysRepository.create({ title, slug, description });

		await surveysRepository.save(Survey);

		return res.json(Survey);
	}
}

export { SurveyController };
