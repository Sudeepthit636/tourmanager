import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const convertDate = (reqDate) => {
  if (!reqDate) return "";
  return reqDate.split("T")[0];
};

const TourForm = ({ tours, setTours, editingTour, setEditingTour }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ tourName: '', maxGroupSize: '', source: '', destination: '', dateFrom:'', dateTo: '',inclusions: '', exclusions: '', pricePerPerson: ''});

  useEffect(() => {
    if (editingTour) {
      setFormData({
        tourName: editingTour.tourName,
        maxGroupSize: editingTour.maxGroupSize,
        source: editingTour.source,
        destination: editingTour.destination,
        dateFrom: editingTour.dateFrom.slice(0,10),
        dateTo: editingTour.dateTo.slice(0,10),
        inclusions: editingTour.inclusions,
        exclusions: editingTour.exclusions,
        pricePerPerson: editingTour.pricePerPerson,
        //completed: editingTour.completed,        
      });
    } else {
      setFormData({ tourName: '', maxGroupSize: '', source: '', destination: '', dateFrom:'', dateTo: '',inclusions: '', exclusions: '', pricePerPerson: '', });
    }
  }, [editingTour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTour) {
        const response = await axiosInstance.put(`/api/tours/${editingTour._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTours(tours.map((tour) => (tour._id === response.data._id ? response.data : tour)));
      } else {
        const response = await axiosInstance.post('/api/tours', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTours([...tours, response.data]);
      }
      setEditingTour(null);
      setFormData({ tourName: '', maxGroupSize: '', source: '', destination: '', dateFrom:'', dateTo: '',inclusions: '', exclusions: '', pricePerPerson: '', });
    } catch (error) {
      alert('Failed to save tour.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingTour ? 'Edit Tour' : 'Add Tour'}</h1>
      <label for = "tourName">Tour Name:</label>
      <input
        type="text"
        placeholder="Tour Name - 5 Days Trip"
        value={formData.tourName}
        onChange={(e) => setFormData({ ...formData, tourName: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label for = "maxGroupSize">Maximum Group Size:</label>
      <input
        type="text"
        placeholder="Maximum Group Size"
        value={formData.maxGroupSize}
        onChange={(e) => setFormData({ ...formData, maxGroupSize: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label for = "source">Origin:</label>
      <input
        type="text"
        placeholder="Origin Place"
        value={formData.source}
        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
    
    
    <label for = "destination">Destination:</label>
      <input
        type="text"
        placeholder="Destination Place"
        value={formData.destination}
        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label for = "dateFrom">From Date:</label>
      <input
        type="date"
        value={formData.dateFrom.slice(0,10)}
        onChange={(e) => setFormData({ ...formData, dateFrom: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

<label for = "dateTo">To Date:</label>
      <input
        type="date"
        value={formData.dateTo}
        onChange={(e) => setFormData({ ...formData, dateTo: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label for = "inclusions">Inclusions List:</label>

      <input
        type="text"
        placeholder="Inclusions List"
        value={formData.inclusions}
        onChange={(e) => setFormData({ ...formData, inclusions: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <label for = "exclusions">Exclusions List:</label>
      <input
        type="text"
        placeholder="Exclusions List"
        value={formData.exclusions}
        onChange={(e) => setFormData({ ...formData, exclusions: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      
      <label for = "pricePerPerson">Price Per Person:</label>
      <input
        type="Number"
        placeholder="Price Per Person in $"
        value={formData.pricePerPerson}
        onChange={(e) => setFormData({ ...formData, pricePerPerson: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingTour ? 'Update Tour' : 'Add Tour'}
      </button>
    </form>
  );
};

export default TourForm;
