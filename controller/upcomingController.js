import TournamentModel from '../model/upcomingModel.js'; // Adjust the path as necessary

// POST and PUT handler for creating or updating a tournament
export const createOrUpdateTournament = async (req, res) => {
  
    console.log(req.body, 'little')
    try {
        const { tournamentName, startDate, location, enquiry, About, title, category } = req.body;

        const finddata = await TournamentModel.findOne({ tournamentName });
        if (finddata) { 
            const updatedTournament = await TournamentModel.findOneAndUpdate(
                { tournamentName },
                { $set: { tournamentName, startDate, location, enquiry, About, title, category } },
                { new: true }
            );
            return res.status(200).json({ message: 'Tournament updated successfully', data: updatedTournament });
        } else {
            const newTournament = new TournamentModel({ tournamentName, startDate, location, enquiry, About, title, category });
            await newTournament.save();
            return res.status(200).json({ message: 'Tournament created successfully', data: newTournament });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// DELETE handler for deleting a tournament
export const deleteTournament = async (req, res) => {
    try {
        const { tournamentId } = req.params;
        console.log(tournamentId)

        if (!tournamentId) {
            return res.status(400).json({ message: 'Tournament ID is required' });
        }

        const deletedTournament = await TournamentModel.findByIdAndDelete({ _id: tournamentId });

        if (!deletedTournament) {
            return res.status(404).json({ message: 'Tournament not found' });
        }

        return res.status(200).json({ message: 'Tournament deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

export const getTournament = async (req, res) => {
    try {
        const tournaments = await TournamentModel.find();
        res.status(200).json(tournaments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}