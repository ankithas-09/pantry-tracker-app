"use client";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { firestore } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import ItemList from "./components/ItemList";
import SearchBar from "./components/SearchBar";
import AddItem from "./components/AddItem";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [filteredPantry, setFilteredPantry] = useState([]);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);

  // Toggle AddItem modal
  const handleOpenAddItem = () => setIsAddItemOpen(true);
  const handleCloseAddItem = () => setIsAddItemOpen(false);

  // Fetch pantry items from Firestore
  const fetchPantryItems = async () => {
    const snapshot = await getDocs(collection(firestore, "pantry"));
    const items = snapshot.docs.map(doc => ({ name: doc.id, ...doc.data() }));
    setPantry(items);
    setFilteredPantry(items);
  };

  // Search pantry items based on query
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = pantry.filter(item =>
      item.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPantry(filtered);
  };

  // Add a new item or update an existing one
  const addItem = async (itemName, imageUrl) => {
    const docRef = doc(collection(firestore, "pantry"), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1, imageUrl }, { merge: true });
    } else {
      await setDoc(docRef, { count: 1, imageUrl });
    }
    fetchPantryItems();
  };

  // Remove an item or decrease its count
  const removeItem = async (itemName) => {
    const docRef = doc(collection(firestore, "pantry"), itemName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    fetchPantryItems();
  };

  // Fetch pantry items on component mount
  useEffect(() => {
    fetchPantryItems();
  }, []);

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ overflowX: "hidden" }}
    >
      <AddItem
        addItem={addItem}
        open={isAddItemOpen}
        handleClose={handleCloseAddItem}
      />
      <SearchBar onSearch={handleSearch} />
      <ItemList
        pantry={filteredPantry}
        removeItem={removeItem}
        handleOpen={handleOpenAddItem}
      />
    </Box>
  );
}
