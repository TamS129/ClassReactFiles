import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getAuth, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { firebaseApp } from "../firebase"; // Your Firebase setup
import AddFishForm from "./AddFishForm";
import EditFishForm from "./EditFishForm";
import Login from "./Login";
import { GithubAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";


// Initialize Firebase Auth and Database
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const Inventory = ({ fishes, updateFish, deleteFish, loadSampleFishes, addFish, storeId }) => {
  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  // UseEffect for checking authentication state on page load or refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        authHandler({ user });
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  // Check for uid in local storage and authenticate
  useEffect(() => {
    const storedUid = localStorage.getItem("uid");
    if (storedUid) {
      // If there is a stored uid, check the store ownership
      authHandler({ user: { uid: storedUid } });
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        authHandler({ user });
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  const authHandler = async (authData) => {
    // 1. Look up the current store in the Firebase database
    const storeRef = ref(database, storeId);
    const storeSnapshot = await get(storeRef);
    const store = storeSnapshot.val() || {};

    // 2. Claim it if there is no owner
    if (!store.owner) {
      // Save it as our own
      await set(ref(database, `${storeId}/owner`), authData.user.uid);
    }

    // 3. Save the uid in local storage
    localStorage.setItem("uid", authData.user.uid);

    // 4. Set the state of the inventory component to reflect the current user
    setUid(authData.user.uid);
    setOwner(store.owner || authData.user.uid);
  };

  const authenticate = (providerName) => {
    let provider;
    if (providerName === "Github") {
      provider = new GithubAuthProvider();
    } else if (providerName === "Twitter") {
      provider = new TwitterAuthProvider();
    } else if (providerName === "Facebook") {
      provider = new FacebookAuthProvider();
    }
  
    signInWithPopup(auth, provider)
      .then(authHandler)
      .catch((error) => console.error("Error during authentication:", error));
  };
  

  const logout = async () => {
    console.log("Logging out!");
    await signOut(auth);
    localStorage.removeItem("uid"); // Remove the uid from local storage
    setUid(null);
  };

  // Check if the user is not logged in
  if (!uid) {
    return <Login authenticate={authenticate} />;
  }

  // Check if the user is not the owner of the store
  if (uid !== owner) {
    return (
      <div>
        <p>Sorry, you are not the owner!</p>
        <button onClick={logout}>Log Out!</button>
      </div>
    );
  }

  // The user is the owner, render the inventory
  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <button onClick={logout}>Log Out!</button>
      {Object.keys(fishes).map((key) => (
        <EditFishForm
          key={key}
          index={key}
          fish={fishes[key]}
          updateFish={updateFish}
          deleteFish={deleteFish}
        />
      ))}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
};

Inventory.propTypes = {
  fishes: PropTypes.object,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  addFish: PropTypes.func,
  storeId: PropTypes.string.isRequired
};

export default Inventory;
