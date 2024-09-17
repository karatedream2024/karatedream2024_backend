import express from 'express';
import { createOrUpdateTournament, deleteTournament, getTournament } from '../controller/upcomingController.js'; // Adjust the path as necessary

const tourRouter = express.Router();

tourRouter.post('/tournament', createOrUpdateTournament);

tourRouter.delete('/tournament/:tournamentId', deleteTournament);
tourRouter.get('/tournament', getTournament);

export default tourRouter;
