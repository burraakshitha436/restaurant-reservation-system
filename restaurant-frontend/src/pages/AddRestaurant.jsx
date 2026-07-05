import { useState } from "react";
import API from "../api/api";

function AddRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    location: "",
    cuisine: "",
    contact: "",
    totalTables: "",
  });

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/restaurants", restaurant);
      alert(res.data.message);

      setRestaurant({
        name: "",
        location: "",
        cuisine: "",
        contact: "",
        totalTables: "",
      });
    } catch (error) {
      alert("Failed to add restaurant");
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Add Restaurant</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          value={restaurant.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={restaurant.location}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          value={restaurant.cuisine}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={restaurant.contact}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="totalTables"
          placeholder="Total Tables"
          value={restaurant.totalTables}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
}

export default AddRestaurant;