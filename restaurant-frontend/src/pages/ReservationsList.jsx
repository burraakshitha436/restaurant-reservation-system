import { useEffect, useState } from "react";
import API from "../api/api";

function ReservationsList() {
  const [reservations, setReservations] = useState([]);
  const [editingId, setEditingId] = useState(null);

const [editData, setEditData] = useState({
  reservationDate: "",
  reservationTime: "",
  numberOfGuests: "",
  status: "",
});

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await API.get("/reservations");
      setReservations(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch reservations");
    }
  };
  const handleEdit = (reservation) => {
  setEditingId(reservation._id);

  setEditData({
    reservationDate: reservation.reservationDate.split("T")[0],
    reservationTime: reservation.reservationTime,
    numberOfGuests: reservation.numberOfGuests,
    status: reservation.status,
  });
};
const handleUpdate = async () => {
  try {
    await API.put(`/reservations/${editingId}`, editData);

    alert("Reservation updated successfully");

    setEditingId(null);

    fetchReservations();
  } catch (error) {
    console.log(error);
    alert("Failed to update reservation");
  }
};
  const handleDelete = async (id) => {
  try {
    await API.delete(`/reservations/${id}`);

    alert("Reservation cancelled successfully");

    fetchReservations();
  } catch (error) {
    console.log(error);
    alert("Failed to cancel reservation");
  }
};

  return (
    <div>
      <h2>All Reservations</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Restaurant</th>
            <th>Table</th>
            <th>Date</th>
            <th>Time</th>
            <th>Guests</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.restaurant?.name}</td>
              <td>{reservation.table?.tableNumber}</td>
              <td>
  {editingId === reservation._id ? (
    <input
      type="date"
      value={editData.reservationDate}
      onChange={(e) =>
        setEditData({
          ...editData,
          reservationDate: e.target.value,
        })
      }
    />
  ) : (
    new Date(reservation.reservationDate).toLocaleDateString()
  )}
</td>
              
                
              
              <td>
  {editingId === reservation._id ? (
    <input
      type="time"
      value={editData.reservationTime}
      onChange={(e) =>
        setEditData({
          ...editData,
          reservationTime: e.target.value,
        })
      }
    />
  ) : (
    reservation.reservationTime
  )}
</td>
              <td>
  {editingId === reservation._id ? (
    <input
      type="number"
      value={editData.numberOfGuests}
      onChange={(e) =>
        setEditData({
          ...editData,
          numberOfGuests: e.target.value,
        })
      }
    />
  ) : (
    reservation.numberOfGuests
  )}
</td>
              <td>
  {editingId === reservation._id ? (
    <select
      value={editData.status}
      onChange={(e) =>
        setEditData({
          ...editData,
          status: e.target.value,
        })
      }
    >
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  ) : (
    reservation.status
  )}
</td>
<td>
  {editingId === reservation._id ? (
    <button
  style={{ backgroundColor: "#28a745", marginRight: "8px" }}
  onClick={handleUpdate}
>
  Save
</button>
  ) : (
    <button
  style={{ backgroundColor: "#28a745", marginRight: "8px" }}
  onClick={() => handleEdit(reservation)}
>
  Edit
</button>
    
  )}

  {" "}

  <button
  style={{ backgroundColor: "#dc3545" }}
  onClick={() => handleDelete(reservation._id)}
>
  Cancel
</button>
</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationsList;