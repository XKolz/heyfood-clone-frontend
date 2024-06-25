import React, { ChangeEvent } from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Button, Badge, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, ShoppingCart as ShoppingCartIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';

interface NavbarProps {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, setSearch }) => {
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isMobile = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          paddingLeft: 2,
          paddingRight: 2,
          backgroundColor: 'white',
          fontFamily: 'Arial',
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            fontFamily="Arial"
            fontWeight="bold"
          >
            <Box display="flex" alignItems="center" gap="30px">
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              {!isMobile && (
              <Typography variant="h6" noWrap sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                <img src="/logo.png" alt="HeyFood" style={{ height: '30px' }} />
              </Typography>
              )}
              {!isMobile && (
                <Box display="flex" alignItems="center">
                  <IconButton color="inherit">
                    <LocationOnIcon />
                    <Typography variant="body1" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Set Location</Typography>
                  </IconButton>
                </Box>
              )}
            </Box>

            <Box display="flex" flexGrow={1} justifyContent="center">
              <Box
                sx={{
                  position: 'relative',
                  borderRadius: '50px',
                  backgroundColor: '#f0f0f0',
                  marginLeft: 0,
                  width: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '5px',
                }}
              >
                <SearchIcon />
                <InputBase
                  placeholder="Search restaurants or food"
                  sx={{ marginLeft: '10px', flex: 1, fontFamily: 'Arial', fontWeight: 'bold' }}
                  value={search}
                  onChange={handleSearchChange}
                />
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap="10px" flexGrow={0.1}>
              {!isMobile && (
                <Button color="inherit" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Sign In</Button>
              )}
              <Button  sx={{backgroundColor:'black', paddingLeft:4, paddingRight:4, color:'white', borderRadius:'50px'}}>
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                  <Typography variant="body1" sx={{ fontFamily: 'Arial', fontWeight: 'bold' }}>Cart</Typography>
                </Badge>
              </Button>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Set Location" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Sign In" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box sx={{ marginTop: '64px' }}>
        {/* Your content goes here */}
      </Box>
    </>
  );
};

export default Navbar;
