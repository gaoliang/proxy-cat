import * as React from 'react';
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
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import Switch from '@mui/material/Switch';
import { Outlet } from "react-router-dom";
import Button from '@mui/material/Button';

const drawerWidth = 240;

function App() {
  const [checked, setChecked] = React.useState(['direct']);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
            <ListItem button >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary={"direct"} />
              <Switch
                edge="end"
                onChange={handleToggle('direct')}
                checked={checked.indexOf('direct') !== -1}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SettingsSuggestIcon />
              </ListItemIcon>
              <ListItemText primary={"system"} />
              <Switch
                edge="end"
                onChange={handleToggle('system')}
                checked={checked.indexOf('system') !== -1}
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Custom Profiles
              </ListSubheader>
            }
          >
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Button variant="contained" startIcon={<AddIcon />} fullWidth>
            New Profile
          </Button>

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
