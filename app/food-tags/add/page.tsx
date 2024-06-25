// app/food-tags/add/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddFoodTagPage = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/food-tags', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/'); // Redirect to the food tags page after submission
    } catch (error) {
      console.error('Error adding food tag:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Food Tag
      </Typography>
      <TextField
        label="Food Tag Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Add Food Tag
      </Button>
    </Box>
  );
};

export default AddFoodTagPage;
