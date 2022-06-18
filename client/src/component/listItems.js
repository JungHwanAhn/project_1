import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from '@mui/material/Link';


export const mainListItems = (
  <React.Fragment>
    <Link href = "/Home">
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="메인" />
      </ListItemButton>
    </Link>
    
    <Link href = "/Search">
      <ListItemButton>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="드라마 검색" />
      </ListItemButton>
    </Link>
    
    <Link href = "/Write">
      <ListItemButton>
        <ListItemIcon>
          <CreateIcon />
        </ListItemIcon>
        <ListItemText primary="리뷰 작성" />
      </ListItemButton>
    </Link>
    
    <Link href="/">
      <ListItemButton>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="로그아웃" />
      </ListItemButton>
    </Link>
    
  </React.Fragment>
);