import "./App.css";
import { useState } from "react";
import Reservation from "./pages/Reservation";
import ReservationsList from "./pages/ReservationsList";

function App() {
  const [page, setPage] = useState("booking");

  return (
    <div className="container">

      <div className="navbar">
        <button onClick={() => setPage("booking")}>
          Book Reservation
        </button>

        <button onClick={() => setPage("list")}>
          View Reservations
        </button>
      </div>

      <hr />

      {page === "booking" ? (
        <Reservation />
      ) : (
        <ReservationsList />
      )}
    </div>
  );
}

export default App;