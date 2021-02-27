import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';

const err0 = { msg: 'Survey title already in use.' };
const err1 = { msg: 'Survey title cannot be an empty field.' };
const err2 = { msg: 'Survey not found' };
const err3 = { msg: 'There are no surveys to be listed' };

class SurveyController {
	async create(req: Request, res: Response) {
		const { description, title } = req.body;
    
		if (title === '') return res.status(400).json(err1);

		const repository = getCustomRepository(SurveysRepository)

		const surveyAlreadyExists = await repository.findOne({ title });

		if (surveyAlreadyExists) return res.status(400).json(err0);
		
		const slug = title
                  .replace(/\s+/g, '-')
                  .replace(/,/g, '')
                  .toLowerCase()
                  .substring(0, 75);

		const survey = repository.create({ 
			title, 
			slug, 
			description 
		});

		await repository.save(survey);

		return res.json(survey);
	}

  async get(req: Request, res: Response) {
    const surveyId = req.params.id;

    const repository = getCustomRepository(SurveysRepository);

    const survey = await repository.findOne(surveyId);

    if (! survey) return res.status(400).json(err2);

    return res.json(survey);
  }

  async index(req: Request, res: Response) {
    const repository = getCustomRepository(SurveysRepository);

		const surveys = await repository.find();

    if (! surveys) return res.status(400).json(err3);

		return res.json(surveys);
  }

  async update(req: Request, res: Response) {
    const surveyId = req.params.id;
    const { description, title } = req.body;
    const repository = getCustomRepository(SurveysRepository);
    
    const survey = await repository.findOne(surveyId);

    if (! survey) return res.status(404).send(err2);
    
    const newDescription = (description !== survey.description) ? (description) : (survey.description)
    const newTitle = (title !== survey.title) ? (title) : (survey.title)
    
    const newInfo = {
      email: newDescription,
      title: newTitle,
    };
    
    await repository.update(surveyId, newInfo)

    return res.status(200);
  }

  async delete(req: Request, res: Response) {
    const surveyId = req.params.id;

    const repository = getCustomRepository(SurveysRepository);

    const survey = await repository.findOne(surveyId);

    if (! survey) return res.status(400).json(err2);

    await repository.delete(surveyId);

    return res.status(204).json({});
  }
}

export { SurveyController };
