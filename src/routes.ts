import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveyController } from './controllers/SurveyController';

const router = Router();

const user = new UserController();
const survey = new SurveyController();

router.post('/users', user.create);
router.put('/users/edit/:id', user.update)
router.delete('/users/delete/:id', user.delete);
router.get('/users/list', user.index)
router.get('/users/:id', user.get);

export { router };
