import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Button, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function MenuAppBar({ title = "Dashboard" }) {
  const [dopen, setDopen] = React.useState(false);
  const nav = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDopen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={dopen} onClose={() => setDopen(false)}>
            <List>
              <Link to={"/dashboard"}>
                <ListItem>
                  <ListItemText primary="Dashboard" />
                </ListItem>
              </Link>
              <Link to={"/rewards"}>
                <ListItem>
                  <ListItemText primary="Rewards" />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button onClick={()=>{
            localStorage.clear()
            nav("/login",{replace:true})
            
          }} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
