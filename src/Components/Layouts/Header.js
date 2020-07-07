import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  
  flex: {
    flex: 1
  }
};

const Header = ({ classes }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.flex}>
        Editor Educast
      </Typography>
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
