import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import ForumIcon from "@mui/icons-material/Forum";

export const mainListItems = (
  <React.Fragment>
    <Link href="/users">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="さがす" />
      </ListItemButton>
    </Link>
    <Link href="/messages">
      <ListItemButton>
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="トーク" />
      </ListItemButton>
    </Link>
    <Link href="/good">
      <ListItemButton>
        <ListItemIcon>
          <ThumbUpAltIcon />
        </ListItemIcon>
        <ListItemText primary="いいね" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      My Page
    </ListSubheader>
    <Link href="/my_page/detail">
      <ListItemButton>
        <ListItemIcon>
          <InsertEmoticonIcon />
        </ListItemIcon>
        <ListItemText primary="会員情報" />
      </ListItemButton>
    </Link>
    <Link href="/my_page/footprints">
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="足跡" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
