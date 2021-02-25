import { Request, Response } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveyController {
	async create(req: Request, res: Response) {
		const { description, title } = req.body;

		const surveysRepository = getCustomRepository(SurveysRepository)

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
		
		const slug = title.replace(/\s+/g, '-')
											.replace(/,/g, '')
											.toLowerCase()
											.substring(0, 75);

		const survey = surveysRepository.create({ 
			title, 
			slug, 
			description 
		});

		await surveysRepository.save(survey);

		return res.json(survey);
	}
}

export { SurveyController };
