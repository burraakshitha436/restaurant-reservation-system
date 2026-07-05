import { useEffect, useState } from "react";
import API from "../api/api";

function Reservation() {
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
    restaurant: "",
    table: "",
  });

  useEffect(() => {
    fetchRestaurants();
    fetchTables();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const res = await API.get("/restaurants");
      setRestaurants(res.data.restaurants);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTables = async () => {
  try {
    const res = await API.get("/tables");
    setTables(res.data.tables);
  } catch (error) {
    console.log(error);
  }
};
  const handleSubmit = async () => {
  try {
    const res = await API.post("/reservations", {
  ...formData,
  user: "6a4a38248bab7ddabeaec9a9",
});

    alert("Reservation Booked Successfully!");

    setFormData({
      customerName: "",
      customerPhone: "",
      reservationDate: "",
      numberOfGuests: "",
      restaurant: "",
      table:"",
    });

    console.log(res.data);
  } catch (error) {
  console.log(error);
  alert(error.response?.data?.message || "Failed to Book Reservation");
}
};
  return (
  <div>
    <h2>Book a Reservation</h2>

    <input
      type="text"
      placeholder="Customer Name"
      value={formData.customerName}
      onChange={(e) =>
        setFormData({ ...formData, customerName: e.target.value })
      }
    />

    <br /><br />

    <input
      type="text"
      placeholder="Customer Phone"
      value={formData.customerPhone}
      onChange={(e) =>
        setFormData({ ...formData, customerPhone: e.target.value })
      }
    />

    <br /><br />

    <input
      type="date"
      value={formData.reservationDate}
      onChange={(e) =>
        setFormData({ ...formData, reservationDate: e.target.value })
      }
    />

    <br /><br />
    <input
  type="time"
  value={formData.reservationTime}
  onChange={(e) =>
    setFormData({ ...formData, reservationTime: e.target.value })
  }
/>

<br /><br />

    <input
      type="number"
      placeholder="Number of Guests"
      value={formData.numberOfGuests}
      onChange={(e) =>
        setFormData({ ...formData, numberOfGuests: e.target.value })
      }
    />

    <br /><br />

    <select
      value={formData.restaurant}
      onChange={(e) =>
        setFormData({ ...formData, restaurant: e.target.value })
      }
    >
      <option value="">Select Restaurant</option>

      {restaurants.map((restaurant) => (
        <option key={restaurant._id} value={restaurant._id}>
          {restaurant.name}
        </option>
      ))}
    </select>

    <br /><br />
    <select
  value={formData.table}
  onChange={(e) =>
    setFormData({ ...formData, table: e.target.value })
  }
>
  <option value="">Select Table</option>

  {tables.map((table) => (
    <option key={table._id} value={table._id}>
      Table {table.tableNumber} (Capacity: {table.capacity})
    </option>
  ))}
</select>

<br /><br />

    <button onClick={handleSubmit}>
  Book Reservation
</button>
  </div>
);

  
}

export default Reservation;