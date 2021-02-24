import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const router = Router();

const user = new UserController();
const survey = new SurveyController();

router.post('/users', user.create);
router.get('/users/list', user.index)
router.get('/users/:id', user.get, async (req, res) => {
  res.send(req.params);
})
router.post('/surveys', survey.create);

export { router };
