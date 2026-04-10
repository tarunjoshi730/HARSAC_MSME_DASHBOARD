// @ts-nocheck
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { HARYANA_DISTRICTS } from '../data/haryanaData';

export default function DistrictsPage() {
  const [selected, setSelected] = useState<typeof HARYANA_DISTRICTS[0] | null>(null);
  const sorted = [...HARYANA_DISTRICTS].sort((a, b) => b.totalUdyam - a.totalUdyam);

  return (
    <div className="min-h-screen bg-gray-50 py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">📍 All 22 Districts of Haryana</h1>
        <p className="text-gray-500 mb-6 text-sm">Official Udyam registration data & industrial profiles</p>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
          {sorted.map((d) => (
            <div key={d.id} onClick={() => setSelected(d)}
              className={`bg-white rounded-xl p-4 shadow-md cursor-pointer border-2 transition-all hover:shadow-lg ${
                selected?.id === d.id ? 'border-green-500 bg-green-50' : 'border-transparent hover:border-green-300'
              }`}>
              <p className="font-bold text-gray-800 text-sm">{d.name}</p>
              <p className="text-lg font-extrabold text-green-600">{d.totalUdyam.toLocaleString('en-IN')}</p>
              <p className="text-[10px] text-gray-400">Udyam Registered</p>
            </div>
          ))}
        </div>
        {selected && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 animate-scale-in border border-green-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">📍 {selected.name} District</h2>
                <p className="text-gray-500 text-sm">Code: {selected.code} | {selected.industrialArea}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
              {[
                { label: 'Total Udyam', value: selected.totalUdyam.toLocaleString('en-IN') },
                { label: 'Micro', value: selected.micro.toLocaleString('en-IN') },
                { label: 'Small', value: selected.small.toLocaleString('en-IN') },
                { label: 'Medium', value: selected.medium.toLocaleString('en-IN') },
                { label: 'Employment', value: selected.employment.toLocaleString('en-IN') },
                { label: 'Population', value: selected.population.toLocaleString('en-IN') },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-sm font-extrabold text-gray-800">{item.value}</p>
                  <p className="text-[10px] text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 text-sm mb-2">Key Industries</h4>
                <div className="flex flex-wrap gap-1.5">{selected.keyIndustries.map((ind, i) => (<span key={i} className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium">{ind}</span>))}</div>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 text-sm mb-2">Location</h4>
                <p className="text-xs text-gray-500 mb-2">Area: {selected.area.toLocaleString()} sq km | Blocks: {selected.blocks}</p>
                <a href={`https://www.google.com/maps?q=${selected.lat},${selected.lng}`} target="_blank" rel="noopener noreferrer"
                  className="text-blue-600 text-xs hover:underline">📍 View on Google Maps →</a>
              </div>
            </div>
          </div>
        )}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Udyam Registration by District</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sorted}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar dataKey="totalUdyam" fill="#10B981" radius={[4, 4, 0, 0]} name="Registrations" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
