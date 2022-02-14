import React, { useState, useEffect } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Outlet } from "react-router-dom";
import ProfileService from './profiles'
import Switch from '@mui/material/Switch';
import CreateModal from './CreateModal'

const drawerWidth = 240;

function Options() {
  const [activedProfile, setActivedProfile] = useState(null);

  useEffect(() => {
    // if null, read active profile from chrome storage
    if (activedProfile === null) {
      ProfileService.getActiveProfile().then(profile => {
        console.log("chrome storage active profile is : " + profile + ", update to state now.")
        ProfileService.activeProfile(profile);
        setActivedProfile(profile);
      })
    }
  });

  const handleToggleProfile = (value) => () => {
    if (value === activedProfile) {
      return;
    }
    console.log("toggle", value);
    ProfileService.activeProfile(value);
    setActivedProfile(value);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Proxy Cat
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Builtin Profiles
              </ListSubheader>
            }
          >

            {ProfileService.getBuiltinProfiles().map((profile, index) => (
              <ListItemButton key={profile.id}
                component="a" 
                href={`#/options/${profile.id}`}
              >
                <ListItemIcon>
                  <profile.icon />
                </ListItemIcon>
                <ListItemText primary={profile.name} />
                <Switch
                  edge="end"
                  onChange={handleToggleProfile(profile.id)}
                  checked={profile.id === activedProfile}
                />
              </ListItemButton>
            ))}
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Custom Profiles
              </ListSubheader>
            }
          >
          </List>
          <CreateModal/>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Options;
