import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [favourites, setFavourites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = async () => {
    try {
      const res = await API.get("/favourites");
      setFavourites(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFavourite = async (propertyId: string) => {
    try {
      setFavourites((prev) => prev.filter((p) => p.id !== propertyId));
      await API.delete(`/favourites/${propertyId}`);
      toast.success("Removed successfully");
    } catch (err) {
      toast.error("Failed to remove");
      fetchFavourites();
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm mb-8 flex items-center gap-6">
          <FaUserCircle className="text-gray-300 text-6xl" />
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-500 capitalize">
              {user?.role} Account: {user?.email}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold mb-6">My Saved Favourites</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {favourites.map((prop) => (
            <div
              key={prop.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border"
            >
              <img
                src={prop.image || "/alt-property-image.jpg"}
                className="h-48 w-full object-cover"
                alt=""
              />
              <div className="p-4 flex flex-col grow">
                <h3 className="font-bold truncate">{prop.title}</h3>
                <p className="text-gray-500 text-xs mb-1">📍 {prop.location}</p>
                <p className="text-blue-600 font-bold mb-4">
                  Rs {Number(prop.price).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFavourite(prop.id)}
                  className="mt-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  <FaTrashAlt /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
