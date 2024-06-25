'use client';
import styles from './HomePage.module.css';
import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import FoodTagsPage from './food-tags/page';
import BannerSlides from './components/bannerSlides';
import StoresPage from './stores/page';
import Navbar from '@/app/components/Navbar';
import { debounce } from '@/utils/debounce';
import { Box } from '@mui/material';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

const TabToggle: React.FC = () => {
  const [activeTab, setActiveTab] = useState('restaurants');
  const [search, setSearch] = useState('');
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const fetchStores = useCallback(debounce(async (search = '') => {
    try {
      const response = await axios.get(`${baseUrl}/api/stores`, {
        params: { search }
      });
      console.log('Stores fetched:', response.data);
      setStores(response.data);
      setLoading(false);
      setNotFound(response.data.length === 0);
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
      setNotFound(true);
    }
  }, 300), []);

  useEffect(() => {
    fetchStores(search);
  }, [search, fetchStores]);

  return (
    <div>
      <div>
        <Navbar search={search} setSearch={setSearch} />
      </div>
      <Box sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
      <div className={styles.container}>
        <button
          className={`${styles.tab} ${activeTab === 'restaurants' ? styles.active : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          <span role="img" aria-label="restaurants">🍴</span> Restaurants
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'grocery' ? styles.active : ''}`}
          onClick={() => setActiveTab('grocery')}
        >
          <span role="img" aria-label="grocery">🛒</span> Grocery
        </button>
      </div>
      </Box>
      <div>
        <FoodTagsPage />
      </div>
      <div>
        <BannerSlides />
      </div>
      <div>
        {/* <StoresPage stores={stores} search={search} setSearch={setSearch} notFound={notFound} /> */}
        <StoresPage stores={stores} notFound={notFound} loading={loading} />
      </div>
    </div>
  );
};

export default TabToggle;
