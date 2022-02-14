import React, { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Divider from '@mui/material/Divider';
import ProfileService from './profiles'


export default function SwitchListSecondary() {
    const [activedProfile, setActivedProfile] = useState(null);

    useEffect(() => {
      // if null, read active profile from chrome storage
      if (activedProfile === null) {
        console.log("read active profile from chrome storage");
        ProfileService.getActiveProfile().then(profile => {
          console.log("active profile is : " + profile)
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
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, minWidth: 240, bgcolor: 'background.paper' }}
                subheader={<ListSubheader>Builtin Profiles</ListSubheader>}
            >

            {ProfileService.getBuiltinProfiles().map((profile, index) => (
              <ListItemButton key={profile.id}
                selected={profile.id === activedProfile}
                onClick={handleToggleProfile(profile.id)}
              >
                <ListItemIcon>
                  <profile.icon />
                </ListItemIcon>
                <ListItemText primary={profile.name} />
              </ListItemButton>
            ))}
            </List>
            <Divider />
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                subheader={<ListSubheader>Custom Profiles</ListSubheader>}
            >
               TODO
            </List>
        </div>
    );
}
