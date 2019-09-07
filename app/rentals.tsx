import React, { useEffect, useState } from "react";
import db from "./storage";
import RentalProperty from "../src/RentalProperty";
import RentalEntry from "./rentalEntry";

const Rentals = () => {
  const [rentals, setRentals] = useState([] as RentalProperty[]);
  useEffect(() => {
    db.collection("RentalProperties")
      .orderBy("importedAt", "desc")
      .limit(3)
      .get()
      .then(querySnashot => {
        const rentals: RentalProperty[] = [];
        querySnashot.forEach(doc => {
          rentals.push(doc.data() as RentalProperty);
        });
        setRentals(rentals);
      });
  }, []);

  return (
    <div>
      <h2>Rentals!!! </h2>
      {rentals.map(rental => (
        <RentalEntry key={rental.id} {...rental} />
      ))}
    </div>
  );
};

export default Rentals;
