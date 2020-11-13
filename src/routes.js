import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PlayersControllers from './controllers/PlayersControllers';
import TeamsControllers from './controllers/TeamsControllers';
import MatchesControllers from './controllers/MatchesControllers';
import MatchesPlayersController from './controllers/MatchesPlayersController';
import Confrontations from './controllers/Confrontations';
import GeneratePDFController from './controllers/GeneratePDFController';

import userAuthenticate from './middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', SessionController.store);
routes.post('/pdf', GeneratePDFController.create);

routes.use(userAuthenticate);
routes.post('/players', PlayersControllers.store);
routes.get('/players', PlayersControllers.index);
routes.put('/players/:idPlayer', PlayersControllers.update);

routes.post('/teams', TeamsControllers.store);

routes.post('/matches', MatchesControllers.store);
routes.get('/matches', MatchesControllers.index);

routes.post('/confrontations', Confrontations.store);
routes.get('/confrontations', Confrontations.index);

routes.post('/matches-players', MatchesPlayersController.store);
routes.get('/matches-players/:match_id', MatchesPlayersController.index);
routes.delete('/matches-players/:id', MatchesPlayersController.delete);

export default routes;
