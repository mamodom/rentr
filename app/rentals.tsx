import React, { useEffect, useState } from "react";
import db from "./storage";
import RentalProperty from "../src/RentalProperty";

const Rentals = () => {
  const [rentals, setRentals] = useState([] as RentalProperty[]);
  useEffect(() => {
    console.log("effect triggered");
    db.collection("RentalProperty")
      .get()
      .then(querySnashot => {
        console.log("then");
        console.log(querySnashot.docs);
        const foo: RentalProperty[] = [];
        querySnashot.forEach(doc => {
          console.log(doc);
          foo.push(doc.data() as RentalProperty);
        });
        setRentals(foo);
      });
  }, []);

  return (
    <div>
      <h2>Rentals!!! </h2>
      {rentals.map(rental => (
        <div key={rental.id}>
          <h3>{rental.Id}</h3>
          <h3>{rental.numberOfBathrooms}</h3>
          <a href={rental.Url}> Url</a>
        </div>
      ))}
    </div>
  );
};

export default Rentals;
