import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { storage } from "../../firebase";
console.log('Firebase Storage:', storage);
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};

export default function AddItem({ addItem, open, handleClose }) {
  const [itemName, setItemName] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) {
      console.error("No image selected");
      return;
    }

    setUploading(true);

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  const handleAddItem = async () => {
    if (!itemName || !imageUrl) {
      console.error("Item name or image URL is missing");
      return;
    }
    await addItem(itemName, imageUrl);
    setItemName("");
    setImage(null);
    setImageUrl("");
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Item
        </Typography>
        <Stack direction={"column"} spacing={2} width={"100%"}>
          <TextField
            id="outlined-basic"
            label="Item Name"
            variant="outlined"
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            value={itemName}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-image"
            type="file"
            capture="environment"
            onChange={handleImageChange}
          />
          <label htmlFor="upload-image">
            <Button variant="contained" component="span">
              Choose Image
            </Button>
          </label>
          {image && <Typography variant="body1">{image.name}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={uploading || !image}
          >
            {uploading ? <CircularProgress size={24} /> : "Upload Image"}
          </Button>
          {imageUrl && (
            <Typography variant="body1">
              Image uploaded successfully!
            </Typography>
          )}
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={handleAddItem}
            disabled={!itemName || !imageUrl}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
