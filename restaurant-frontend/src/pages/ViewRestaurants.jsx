import { useEffect, useState } from "react";
import API from "../api/api";

function ViewRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [editingRestaurant, setEditingRestaurant] = useState(null);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");
      console.log(res.data);
      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch restaurants");
    }
  };
  const deleteRestaurant = async (id) => {
  try {
    await API.delete(`/restaurants/${id}`);
    fetchRestaurants(); // Reload the restaurant list
  } catch (error) {
    console.log(error);
    alert("Failed to delete restaurant");
  }
};
const [formData, setFormData] = useState({
  name: "",
  location: "",
  cuisine: "",
  contact: "",
  totalTables: "",
});
const updateRestaurant = async () => {
  try {
    await API.put(`/restaurants/${editingRestaurant._id}`, editingRestaurant);
    alert("Restaurant updated successfully");
    setEditingRestaurant(null);
    fetchRestaurants();
  } catch (error) {
    console.log(error);
    alert("Failed to update restaurant");
  }
};

  return (
    <div className="container">
      <h2>All Restaurants</h2>
      {editingRestaurant && (
  <div>
    <h3>Edit Restaurant</h3>

    <input
      type="text"
      placeholder="Name"
      value={editingRestaurant.name}
      onChange={(e) =>
        setEditingRestaurant({
          ...editingRestaurant,
          name: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Location"
      value={editingRestaurant.location}
      onChange={(e) =>
        setEditingRestaurant({
          ...editingRestaurant,
          location: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Cuisine"
      value={editingRestaurant.cuisine}
      onChange={(e) =>
        setEditingRestaurant({
          ...editingRestaurant,
          cuisine: e.target.value,
        })
      }
    />

    <input
      type="text"
      placeholder="Contact"
      value={editingRestaurant.contact}
      onChange={(e) =>
        setEditingRestaurant({
          ...editingRestaurant,
          contact: e.target.value,
        })
      }
    />

    <input
      type="number"
      placeholder="Total Tables"
      value={editingRestaurant.totalTables}
      onChange={(e) =>
        setEditingRestaurant({
          ...editingRestaurant,
          totalTables: e.target.value,
        })
      }
    />

    <br />
    <br />

    <button onClick={updateRestaurant}>
      Update Restaurant
    </button>
  </div>
)}

      <table border="1" cellPadding="10">
        <thead>
            <th>Edit</th>
            <th>Delete</th>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Cuisine</th>
            <th>Contact</th>
            <th>Total Tables</th>
          </tr>
        </thead>

        <tbody>
          {restaurants.map((restaurant) => (
        
            <tr key={restaurant._id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{restaurant.cuisine}</td>
              <td>{restaurant.contact}</td>
              <td>{restaurant.totalTables}</td>
              <td>
                <button onClick={() => setEditingRestaurant(restaurant)}>
  Edit
</button>
  
</td>
            
        
              <td>
  <button onClick={() => deleteRestaurant(restaurant._id)}>
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewRestaurants;