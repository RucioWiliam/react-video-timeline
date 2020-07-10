import React, { PureComponent } from "react";
import { CssBaseline } from "@material-ui/core";
import { styles, Header, Footer, Upload } from "./Layouts";

import Grid from "@material-ui/core/Grid";

import { Provider } from "../context";
import { Video } from "./Work";
import MultiVideo from "./Work/MultiVideo.jsx";
import TabNav from "./Work/TabNav.js";


const videoJsOptions = {
  autoplay: false,
  controls: false,
  controlBar: {
    fullscreenToggle: false
  },
  sources: [
    {
      src: "http://media.w3.org/2010/05/video/movie_300.mp4",
      type: "video/mp4"
    }
  ]
};

class App extends PureComponent {
  getContext = () => ({
    ...this.state
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <Header />
        <Grid>
          <div className="video__mode video__multi">
            <MultiVideo videoOne={videoJsOptions} videoTwo={videoJsOptions}/>
          </div>
        </Grid>
        <TabNav/>
      </Provider>
    );
  }
}

export default App;
