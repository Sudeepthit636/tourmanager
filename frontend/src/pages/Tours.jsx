import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TourForm from '../components/TourForm';
import TourList from '../components/TourList';
import { useAuth } from '../context/AuthContext';

const Tours = () => {
  const { user } = useAuth();
  const [tours, setTours] = useState([]);
  const [editingTour, setEditingTour] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axiosInstance.get('/api/tours', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setTours(response.data);
      } catch (error) {
        alert('Failed to fetch tours.');
      }
    };

    fetchTours();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <TourForm
        tours={tours}
        setTours={setTours}
        editingTour={editingTour}
        setEditingTour={setEditingTour}
      />
       <TourList tours={tours} setTours={setTours} setEditingTour={setEditingTour} />
    </div>
  );
};

export default Tours;
