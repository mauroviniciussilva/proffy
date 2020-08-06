import express from 'express';
import ClassesController from './controllers/classesController';
import ConnectionsController from './controllers/connectionsController';
import UsersController from './controllers/usersController';

const routes = express.Router();
const classesController = new ClassesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();

routes.get('/classes', classesController.index);
routes.post('/classes', classesController.create);

routes.get('/connections', connectionsController.count);
routes.post('/connections', connectionsController.create);

routes.post('/users', usersController.create);

export default routes;