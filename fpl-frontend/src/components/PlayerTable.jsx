import React from "react";
import { TrendingUp, DollarSign, Users } from "lucide-react";

const PlayerTable = ({ players, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <TrendingUp className="text-emerald-500" /> {title}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
              <th className="px-6 py-4">Player</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Form</th>
              <th className="px-6 py-4">VPM (Value)</th>
              <th className="px-6 py-4">Ownership</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {players.map((player) => (
              <tr
                key={player.id}
                className="hover:bg-slate-50 transition-colors"
              >
                {/* Replace the old 'Player' cell with this one */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {/* Player Photo Container */}
                    <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden border border-slate-100 flex-shrink-0">
                      <img
                        src={`https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.code}.png`}
                        alt={player.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // If FPL doesn't have a photo, show a generic placeholder
                          e.target.src =
                            "https://via.placeholder.com/110x140?text=?";
                        }}
                      />
                    </div>
                    {/* Player Name */}
                    <span className="font-medium text-slate-900">
                      {player.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">£{player.price}m</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                    {player.form}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-emerald-600">
                  {player.vpm}
                </td>
                <td className="px-6 py-4 text-slate-500">
                  {player.selected_by_percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerTable;
