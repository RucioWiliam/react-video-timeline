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

  constructor(props) {
    super(props);
    this.state={
      currentTime: 0,
      totalTime: 0,
    }
  }

  getContext = () => ({
    ...this.state
  });

  setCurrentTime = (currentTime) => {
    this.setState({
      currentTime,
    });
  }

  setTotalTime = (totalTime) => {
    this.setState({
      totalTime,
    });
  }

  render() {

    const { currentTime, totalTime } = this.state;

    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <Header />
        <Grid>
          <div className="video__mode video__multi">
            <MultiVideo setTotalTime={this.setTotalTime} setCurrentTime={this.setCurrentTime} currentTime={currentTime} totalTime={totalTime} videoOne={videoJsOptions} videoTwo={videoJsOptions}/>
          </div>
        </Grid>
        <TabNav setCurrentTime={this.setCurrentTime} currentTime={currentTime} totalTime={totalTime} />
      </Provider>
    );
  }
}

export default App;
