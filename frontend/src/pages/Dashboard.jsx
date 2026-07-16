import React from 'react';
import { Plus, Calendar, MapPin, Smile } from 'lucide-react';

const Dashboard = () => {
  const memories = [
    { id: 1, titulo: 'Primeiro dia na universidade', data: '15/09/2025', local: 'Lubumbashi', emocao: 'Feliz' },
    { id: 2, titulo: 'Viagem em família', data: '10/01/2024', local: 'Luanda', emocao: 'Saudade' },
  ];

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Minhas Memórias</h2>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors">
          <Plus size={20} /> Nova Memória
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memories.map(memory => (
          <div key={memory.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">{memory.titulo}</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} /> <span>{memory.data}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} /> <span>{memory.local}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smile size={16} /> <span>{memory.emocao}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
