import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { database } from "../firebase"; // Your Firebase setup

function App() {
  const { storeId } = useParams();
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState({});

  // Fetch data and sync with Firebase when the component mounts
  useEffect(() => {
    if (!storeId) {
      console.error("storeId is undefined");
      return;
    }

    // Retrieve order from localStorage
    const localStorageRef = localStorage.getItem(storeId);
    if (localStorageRef) {
      setOrder(JSON.parse(localStorageRef));
    }

    // Reference to the fishes data in Firebase
    const fishesRef = ref(database, `${storeId}/fishes`);

    // Listen for changes in the fishes data
    onValue(fishesRef, (snapshot) => {
      const data = snapshot.val() || {};
      console.log("Fetched data from Firebase:", data);
      setFishes(data); // Update state with data from Firebase
    });

    // Cleanup function to remove the Firebase listener when the component unmounts
    return () => {
      // No explicit cleanup needed for onValue, but you can use `off()` if necessary
    };
  }, [storeId]);

  // Save order data to localStorage whenever it changes
  useEffect(() => {
    if (storeId) {
      localStorage.setItem(storeId, JSON.stringify(order));
    }
  }, [order, storeId]);

  // Function to add a new fish
  const addFish = (fish) => {
    const newFishes = { ...fishes };
    newFishes[`fish${Date.now()}`] = fish;
    setFishes(newFishes);

    // Save the new fish data to Firebase
    const fishesRef = ref(database, `${storeId}/fishes`);
    set(fishesRef, newFishes)
      .then(() => console.log("Fish added to Firebase:", fish))
      .catch((error) => console.error("Error adding fish to Firebase:", error));
  };

  // Function to update a fish
  const updateFish = (key, updatedFish) => {
    const updatedFishes = { ...fishes };
    updatedFishes[key] = updatedFish;
    setFishes(updatedFishes);

    // Update the fish data in Firebase
    const fishesRef = ref(database, `${storeId}/fishes`);
    set(fishesRef, updatedFishes)
      .then(() => console.log("Fish updated in Firebase:", updatedFish))
      .catch((error) =>
        console.error("Error updating fish in Firebase:", error)
      );
  };

  // Function to delete a fish
  const deleteFish = (key) => {
    const delFishes = { ...fishes };
    delFishes[key] = null;
    setFishes(delFishes);

    // Remove the fish data in Firebase (setting to null)
    const fishesRef = ref(database, `${storeId}/fishes`);
    set(fishesRef, delFishes)
      .then(() => console.log("Fish deleted in Firebase"))
      .catch((error) =>
        console.error("Error deleting fish from Firebase:", error)
      );
  };

  // Function to load sample fishes
  const loadSampleFishes = () => {
    setFishes(sampleFishes);

    // Save the sample fishes to Firebase
    const fishesRef = ref(database, `${storeId}/fishes`);
    set(fishesRef, sampleFishes)
      .then(() => console.log("Sample fishes loaded to Firebase"))
      .catch((error) =>
        console.error("Error loading sample fishes to Firebase:", error)
      );
  };

  // Function to add a fish to the order
  const addToOrder = (key) => {
    const newOrder = { ...order };
    newOrder[key] = newOrder[key] + 1 || 1;
    setOrder(newOrder);
  };

  // Function to remove a fish from the order
  const removeFromOrder = (key) => {
    const remOrder = { ...order };
    delete remOrder[key];
    setOrder(remOrder);
  };

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.keys(fishes).map((key) => (
            <Fish
              key={key}
              index={key}
              details={fishes[key]}
              addToOrder={addToOrder}
            />
          ))}
        </ul>
      </div>
      <Order fishes={fishes} order={order} removeFromOrder={removeFromOrder} />
      <Inventory
        addFish={addFish}
        updateFish={updateFish}
        deleteFish={deleteFish}
        loadSampleFishes={loadSampleFishes}
        fishes={fishes}
      />
    </div>
  );
}

// Add PropTypes after the component definition
App.propTypes = {
  fishes: PropTypes.object,
  order: PropTypes.object,
  addFish: PropTypes.func,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  removeFromOrder: PropTypes.func
};

export default App;
