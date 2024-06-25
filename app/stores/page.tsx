'use client';
import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, Typography, Chip, RadioGroup } from '@mui/material';
import { useRadioGroup } from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import Skeleton from '@mui/material/Skeleton';

interface Store {
  _id: string;
  name: string;
  description: string;
  location: string;
  image: string;
  tags: string[];
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': {
    fontSize: '10px', // Default font size for mobile
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px', // Font size for larger screens
    },
    ...(checked && {
      color: theme.palette.primary.main,
    }),
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

interface StoresPageProps {
  stores: Store[];
  notFound: boolean;
  loading: boolean;
}

const StoresPage: React.FC<StoresPageProps> = ({ stores, notFound, loading }) => {
  return (
    <Box sx={{ display: 'flex', backgroundColor: 'white', paddingTop: 10 }}>
      <Box sx={{ width: '200px', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', backgroundColor: '#f4f4f4', padding: 2 }}>
        <Typography variant="h6" gutterBottom>
          All Stores
        </Typography>
        <Typography variant="h6" gutterBottom>
        ({stores.length} Stores)
        </Typography>
        <Typography variant="h6" gutterBottom>
          Sort
        </Typography>
        <RadioGroup name="use-radio-group" defaultValue="">
          <MyFormControlLabel value="first" label="Most Popular" control={<Radio />} />
          <MyFormControlLabel value="second" label="Nearest" control={<Radio />} />
          <MyFormControlLabel value="third" label="Highest rated" control={<Radio />} />
          <MyFormControlLabel value="fourth" label="Newest" control={<Radio />} />
          <MyFormControlLabel value="fifth" label="Most Rated" control={<Radio />} />
        </RadioGroup>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          marginLeft: { xs: '16px', sm: '24px', md: '40px', lg: '80px', xl: '120px' },
          paddingRight: 4
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>All Restaurants</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} />
        {loading ? (
          <Grid container spacing={4}>
            {[...Array(6)].map((_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Skeleton variant="rectangular" width="100%" height={140} />
                <Skeleton width="60%" />
                <Skeleton width="80%" />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : notFound ? (
          <Typography variant="h6" color="textSecondary">
            No stores found.
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {stores.map((store: Store) => (
              <Grid item key={store._id} xs={12} sm={6} md={4} sx={{ width: '60px' }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:5000/${store.image}`}
                    alt={store.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {store.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {store.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {store.location}
                    </Typography>
                    <Box>
                      {store.tags.map((tag, index) => (
                        <Chip key={index} label={tag} sx={{ mr: 1, mt: 1 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default StoresPage;
