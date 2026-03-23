/**
 * Normalizes raw FPL player data into a clean format for the frontend.
 * @param {Object} p - Raw player object from FPL API
 */
const formatPlayerData = (p) => {
    // FPL prices are stored as integers (e.g., 85 for £8.5m)
    const price = p.now_cost / 10;
    
    return {
        id: p.id,
        name: p.web_name,
        code: p.code, // Required for the image URL: p{code}.png
        price: price,
        form: p.form,
        // Calculate Value Per Million (Total Points / Current Price)
        vpm: (p.total_points / price).toFixed(2),
        selected_by_percent: p.selected_by_percent,
        team_id: p.team
    };
};

// --- Your existing functions below ---

const calculateValueMetrics = (players) => {
    return players
        .filter(player => player.minutes > 0)
        .map(formatPlayerData) // This now calls the function above
        .sort((a, b) => b.vpm - a.vpm);
};

const findDifferentials = (players, ownershipThreshold = 10) => {
    return players
        .filter(p => parseFloat(p.selected_by_percent) < ownershipThreshold)
        .filter(p => parseFloat(p.form) > 4.0)
        .map(formatPlayerData) // This now calls the function above
        .sort((a, b) => b.form - a.form);
};

module.exports = {
    calculateValueMetrics,
    findDifferentials
};