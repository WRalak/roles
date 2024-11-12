'use client'


import { useState } from 'react';
import axios from 'axios';

export default function EntryForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('');
  const [county, setCounty] = useState('');
  const [date, setDate] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id.length < 8) {
      setError("ID should contain at least 8 characters.");
      return;
    }

    try {
      await axios.post('/api/entry', { name, phone, time, county, date, id });
      alert('Entry request submitted');
      setName(''); setPhone(''); setTime(''); setCounty(''); setDate(''); setId(''); setError('');
    } catch (err) {
      setError("There was an issue submitting the entry.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Entry Request</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" required
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" required
          />
        </div>

        {/* County Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">County</label>
          <input
            type="text" value={county} onChange={(e) => setCounty(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" required
          />
        </div>

        {/* Date Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">Date</label>
          <input
            type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" min={today} required
          />
        </div>

        {/* Time Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">Time</label>
          <input
            type="time" value={time} onChange={(e) => setTime(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" required
          />
        </div>

        {/* ID Field */}
        <div>
          <label className="block mb-2 text-sm font-medium">ID (Min 8 Characters)</label>
          <input
            type="text" value={id} onChange={(e) => setId(e.target.value)}
            className="w-full border px-3 py-2 rounded-md" minLength="8" required
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Submit Entry Request
        </button>
      </form>
    </div>
  );
}
