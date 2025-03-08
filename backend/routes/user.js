import express from 'express';
import { getChinmaySessions, getResumeReview, getSession, getUser, getUsers, getWebinars } from '../controller/userController.js';

const Router = express.Router();

Router.get('/get-users', getUsers);
Router.get('/get-user/:id', getUser);
Router.get("/get-session",getSession)
Router.get("/get-review",getResumeReview)
Router.get("/get-webinars",getWebinars)
Router.get("/get-chinmay-session",getChinmaySessions)

export default Router;