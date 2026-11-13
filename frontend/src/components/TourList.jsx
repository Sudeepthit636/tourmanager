import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

// delete tour and updating UI layout

const TourList = ({ tours, setTours, setEditingTour }) => {
  const { user } = useAuth();

  const handleDelete = async (tourId) => {
    try {
      await axiosInstance.delete(`/api/tours/${tourId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTours(tours.filter((tour) => tour._id !== tourId));
    } catch (error) {
      alert('Failed to delete tour.');
    }
  };

  return (
    <div>
      {tours.map((tour) => (
        <div key={tour._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">Tour: {tour.tourName}</h2>
          <p>Maximum Group Size: {tour.maxGroupSize}</p>
          <p>Source: {tour.source}</p>
          <p>Destination: {tour.destination}</p>
          <p>From Date: {tour.dateFrom.slice(0,10)}</p>
          <p>To Date: {tour.dateTo.slice(0,10)}</p>
          <p>Price Per Person: {tour.pricePerPerson}</p>
          <div className="mt-2">
            <button
              onClick={() => setEditingTour(tour)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(tour._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TourList;
