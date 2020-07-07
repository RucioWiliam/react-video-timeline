import React, { Component } from 'react'
import videojs from 'video.js'
import moment from 'moment'
import 'video.js/src/css/video-js.scss'

import './MultiVideo.scss'
import FullScreen from 'react-full-screen'

const FAST_FORWARD_TIME = 25
const FAST_BACKWARD_TIME = 25

const convertToTimeFormat = (seconds) => {
  seconds = Math.round(seconds)
  let hours = Math.floor(seconds / (60 * 60))
  seconds -= hours * ( 60 * 60)
  let minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60;
  hours = hours < 10 ? `0${hours}` : hours
  minutes = minutes < 10 ? `0${minutes}` : minutes
  seconds = seconds < 10 ? `0${seconds}` : seconds
  return `${hours}:${minutes}:${seconds}`
}

const showPlayTime = (currentTime, totalTime) => {
  let formattedCurrentTime = convertToTimeFormat(currentTime)
  let formattedTotalTime = convertToTimeFormat(totalTime)
  return `${formattedCurrentTime}/${formattedTotalTime}`
}

class MultiVideo extends Component {
  state = {
    current_duration: 0,
    total_duration: 0,
    fullscreen_mode: false,
    muted: false
  }

  constructor (props) {
    super(props)
    this.playerOneRef = React.createRef()
    this.platerTwoRef = React.createRef()
  }

  componentDidMount () {
    const playerOneElement = this.playerOneRef.current
    const playerTwoElement = this.platerTwoRef.current
    const { videoOne, videoTwo} = this.props;
    window.playOne = this.playerOne = videojs(playerOneElement, videoOne, () => {
      console.log('ready')
      this.playerOne.on('duration', () => {
        console.log('playing')
        this.setState({
          current_duration: this.playerOne.currentTime(),
          total_duration: this.playerOne.duration()
        })
      })
      this.playerOne.on('timeupdate', () => {
        console.log('timeupdate')
        this.setState({
          current_duration: this.playerOne.currentTime(),
          total_duration: this.playerOne.duration()
        })
      })
      this.playerOne.on('playing', () => {
        console.log('playing')
      })
    })
    window.playTwo = this.playerTwo = videojs(playerTwoElement, videoTwo, () => {

    })

    document.querySelector('.progress').addEventListener('click', (event) => {
      const position = event.offsetX
      const element = event.currentTarget
      const totalWidth = element.clientWidth
      const totalDuration = this.playerOne.duration()
      const nextPlayTime = ((totalDuration * position)) / totalWidth
      this.playerOne.currentTime(nextPlayTime)
      this.playerTwo.currentTime(nextPlayTime)
    })
  }

  componentWillUnmount () {
    if (this.playerOne && this.playerTwo) {
      this.playerOne.dispose()
      this.playerTwo.dispose()
    }
  }

  getPlayTime = () => {
    try {
      return `${this.playerOne.currentTime()} / ${this.playerOne.duration()}`
    } catch (e) {
      return ''
    }
  }

  startBoth = (e) => {
    e.preventDefault()
    this.playerOne.play()
    this.playerTwo.play()
  }

  pauseBoth = (e) => {
    e.preventDefault()
    this.playerOne.pause()
    this.playerTwo.pause()
  }

  skipToTime = (e, direction) => {
    e.preventDefault()
    const currentTime = this.playerOne.currentTime()
    let nextPlayTime = currentTime
    if (direction === 'BACKWARD') {
      nextPlayTime -= FAST_BACKWARD_TIME
    } else {
      nextPlayTime += FAST_FORWARD_TIME
    }
    this.playerOne.currentTime(nextPlayTime)
    this.playerTwo.currentTime(nextPlayTime)
  }
  toggleFullScreen = (e) => {
    e.preventDefault();
    const { fullscreen_mode } = this.state;
    this.setState({fullscreen_mode: !fullscreen_mode})
  }

  toggleMute = (e) => {
    e.preventDefault();
    const { muted } = this.state;
    this.setState({muted: !muted}, () => {
      const { muted } = this.state;
      this.playerOne.muted(muted);
      this.playerTwo.muted(muted);
    })

  }
  render () {

    const { current_duration, total_duration, fullscreen_mode, muted } = this.state

    let paused = true;
    try{
      paused = this.playerOne.paused();
    }catch (e) {

    }
    return (
      <React.Fragment>
        <FullScreen enabled={fullscreen_mode}>
      <div className={`multi__player ${fullscreen_mode && 'multi__player--fullscreen'}`} data-muted={muted}>
        <div className="player__box">
          <div className="player">
            <video ref={this.playerOneRef}></video>
          </div>
          <div className="player">
            <video ref={this.platerTwoRef}></video>
          </div>
        </div>


        <div className="control__bar">
          <div className="control__bar__top">
            <div className="progress">
              <div className="progress-bar" role="progressbar"
                   style={{ width: `${((current_duration / total_duration) * 100)}%` }}
                   aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>


        <div className="control__bar__bottom">
          <div className="player__control">
            <div className="control__left">
              {
                showPlayTime(current_duration, total_duration)
              }
            </div>
            <div className="control__center">
              <div className="control__backward">
                <button className={"btn-skip-time"} onClick={(e) => this.skipToTime(e, 'BACKWARD')}><span className="icon-step-backward"></span>
                </button>
              </div>
              <div className="control__play">
                {
                  paused ? <button onClick={e => this.startBoth(e)} className={"btn-play"}>
                    <span className="icon-play"></span>
                  </button> : <button onClick={e => this.pauseBoth(e)} className={"btn-pause"}>
                    <span className="icon-pause"></span>
                  </button>
                }


              </div>
              <div className="control__forward">
                <button className={"btn-skip-time"} onClick={(e) => this.skipToTime(e, 'FORWARD')}>
                  <span className="icon-step-forward"></span>
                </button>
              </div>
            </div>
            <div className="control__right">
              <button className={"btn-mute"} onClick={(e) => this.toggleMute(e)}>
                <span className={`${muted ? 'icon-mute' : 'icon-speaker'}`}></span>
              </button>
              <button className={"btn-fullscreen"} onClick={(e) => this.toggleFullScreen(e)}>
                <span className="icon-expand"></span>
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
        </FullScreen>
      </React.Fragment>
    )
  }
}

export default MultiVideo