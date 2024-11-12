'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await axios.get('/api/admin/requests'); // Define this route in API
      setRequests(response.data);
    };
    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, status) => {
    await axios.put(`/api/admin/requests/${requestId}`, { status });
    setRequests(requests.map(req => req._id === requestId ? { ...req, status } : req));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      {requests.map((req) => (
        <div key={req._id} className="mb-4 p-4 border rounded-md">
          <p><strong>Name:</strong> {req.name}</p>
          <p><strong>ID:</strong> {req.id}</p>
          <p><strong>Status:</strong> {req.status}</p>
          <div className="space-x-4 mt-2">
            <button
              onClick={() => handleStatusChange(req._id, 'approved')}
              className="px-4 py-1 bg-green-500 text-white rounded-md"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatusChange(req._id, 'denied')}
              className="px-4 py-1 bg-red-500 text-white rounded-md"
            >
              Deny
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
