// // app/stores/add/page.tsx
// 'use client';

// import { useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { TextField, Button, Box, Typography } from '@mui/material';

// const AddStorePage = () => {
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [location, setLocation] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [tags, setTags] = useState('');
//   const router = useRouter();

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('description', description);
//     formData.append('location', location);
//     formData.append('tags', tags);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       await axios.post('http://localhost:5000/api/stores', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       router.push('/stores'); // Redirect to the stores page after submission
//     } catch (error) {
//       console.error('Error adding store:', error);
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
//       <Typography variant="h4" component="h2" gutterBottom>
//         Add New Store
//       </Typography>
//       <TextField
//         label="Store Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Description"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Location"
//         value={location}
//         onChange={(e) => setLocation(e.target.value)}
//         fullWidth
//         margin="normal"
//         required
//       />
//       <TextField
//         label="Tags (comma separated)"
//         value={tags}
//         onChange={(e) => setTags(e.target.value)}
//         fullWidth
//         margin="normal"
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         required
//       />
//       <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
//         Add Store
//       </Button>
//     </Box>
//   );
// };

// export default AddStorePage;
// app/stores/add/page.tsx
'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography } from '@mui/material';

const AddStorePage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState('');
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
    formData.append('description', description);
    formData.append('tags', tags);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:5000/api/stores', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push('/'); // Redirect to the stores page after submission
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 8 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Store
      </Typography>
      <TextField
        label="Store Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        margin="normal"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Add Store
      </Button>
    </Box>
  );
};

export default AddStorePage;
