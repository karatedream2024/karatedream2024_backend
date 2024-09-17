// routes/registrationRoutes.js
import express from 'express';
import { addRegistration, deleteRegistration, getAllRegistrations } from '../controller/registerController.js';

const registerRouter = express.Router();

registerRouter.post('/addregister', addRegistration);
registerRouter.get('/getregister', getAllRegistrations);
registerRouter.delete('/deleteregister/:id', deleteRegistration);

export default registerRouter;
