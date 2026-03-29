import { useEffect, useState } from "react";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { FaHeart, FaRegHeart, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setLoading(true);
      const propRes = await API.get("/properties");
      setProperties(propRes.data);
      if (user) {
        const favRes = await API.get("/favourites");
        setFavourites(favRes.data.map((f: any) => String(f.id)));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavourite = async (propertyId: string) => {
    if (!user) {
      toast.error("Please login first!");
      return navigate("/login");
    }
    setProcessingId(propertyId);
    try {
      if (favourites.includes(propertyId)) {
        await API.delete(`/favourites/${propertyId}`);
        setFavourites((prev) => prev.filter((id) => id !== propertyId));
        toast.success("Removed from favourites");
      } else {
        await API.post("/favourites", { propertyId });
        setFavourites((prev) => [...prev, propertyId]);
        toast.success("Saved to favourites!");
      }
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  if (loading)
    return <div className="text-center mt-20">Loading Properties...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((prop) => {
          const isFav = favourites.includes(String(prop.id));
          return (
            <div
              key={prop.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden relative"
            >
              <div className="h-52 bg-gray-200">
                <img
                  src={prop.image || "/alt-property-image.jpg"}
                  className="w-full h-full object-cover"
                  alt={prop.title}
                />
                <button
                  disabled={processingId === prop.id}
                  onClick={() => toggleFavourite(prop.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  {isFav ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{prop.title}</h3>
                <p className="text-gray-500 text-sm">
                  <FaMapMarkerAlt className="inline mr-1 text-red-400" />
                  {prop.location}
                </p>
                <p className="text-blue-600 font-bold text-lg mt-1">
                  Rs {Number(prop.price).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
