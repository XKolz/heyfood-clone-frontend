'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import axios from 'axios';

interface FoodTag {
  _id: string;
  image: string;
  name: string;
}
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const FoodCategories: React.FC = () => {
  const [foodTags, setFoodTags] = useState<FoodTag[]>([]);

  useEffect(() => {
    axios.get(`${baseUrl}/api/food-tags`)
      .then(response => {
        setFoodTags(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching food tags:', error);
      });
  }, []);

  return (
    <div>
      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        gap: '100px',
        backgroundColor: 'white',
        padding: 1,
        paddingLeft: 8,
        paddingTop: 8,
        scrollbarWidth: 'none', /* Firefox */
        '&::-webkit-scrollbar': {
          display: 'none' /* Chrome, Safari and Opera */
        }
      }}>
        {foodTags.map(foodTag => (
          <Box key={foodTag._id} sx={{ textAlign: 'center' }}>
            <Box>
              <img src={`${baseUrl}/${foodTag.image}`} alt={foodTag.name}
                className='w-10 h-10' />
            </Box>
            <Typography variant="subtitle1">{foodTag.name}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default FoodCategories;
