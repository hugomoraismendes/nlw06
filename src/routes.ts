import { Router } from 'express';
import * as Controllers from '@controllers';
import { ensureAdmin, ensureAuthenticated } from '@middlewares';

const routes = Router();

const createUserController = new Controllers.CreateUserController();
const createTagController = new Controllers.CreateTagController();
const authenticateUserController = new Controllers.AuthenticateUserController();
const createComplimentController = new Controllers.CreateComplimentController();
const listUserSendComplimentsController = new Controllers.ListUserSendComplimentsController();
const listUserReceiveComplimentsController = new Controllers.ListUserReceiveComplimentsController();
const listTagsController = new Controllers.ListTagsController();
const listUsersController = new Controllers.ListUsersController();

routes.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle);
routes.get('/tags', ensureAuthenticated, listTagsController.handle);

routes.post('/login', authenticateUserController.handle);

routes.post('/users', createUserController.handle);
routes.get('/users', ensureAuthenticated, listUsersController.handle);

routes.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentsController.handle);
routes.get('/users/compliments/receive', ensureAuthenticated, listUserReceiveComplimentsController.handle);

routes.post('/compliments', ensureAuthenticated, createComplimentController.handle);

export { routes };
