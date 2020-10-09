import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PlayersControllers from './controllers/PlayersControllers';
import TeamsControllers from './controllers/TeamsControllers';
import MatchesControllers from './controllers/MatchesControllers';
import Confrontations from './controllers/Confrontations';

import userAuthenticate from './middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);

routes.use(userAuthenticate);

routes.post('/players', PlayersControllers.store);
routes.get('/players', PlayersControllers.index);
routes.delete('/players/:id', PlayersControllers.delete);

routes.post('/teams', TeamsControllers.store);

routes.post('/matches', MatchesControllers.store);
routes.get('/matches', MatchesControllers.index);

routes.post('/confrontations', Confrontations.store);
routes.get('/confrontations', Confrontations.index);

export default routes;
