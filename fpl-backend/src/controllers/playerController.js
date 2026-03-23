const fplService = require('../services/fplApiService');
const analyticsService = require('../services/analyticsService');

const getTopPerformers = async (req, res) => {
    try {
        const rawData = await fplService.getGeneralData();
        const players = rawData.elements;

        // Use our new analytics service
        const highValuePlayers = analyticsService.calculateValueMetrics(players);

        // Send back the top 20 high-value assets
        res.json(highValuePlayers.slice(0, 20));
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process analytics' });
    }
};

const getDifferentials = async (req, res) => {
    try {
        const rawData = await fplService.getGeneralData();
        const differentials = analyticsService.findDifferentials(rawData.elements);
        
        res.json(differentials.slice(0, 15));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch differentials' });
    }
};

module.exports = {
    getTopPerformers,
    getDifferentials
};