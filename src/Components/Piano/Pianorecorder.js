import React from "react";
// import ReactDOM from "react-dom";
import _ from "lodash";
// Piano
import { KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";

// import DimensionsProvider from "./DimensionsProvider";
import SoundfontProvider from "./SoundfontProvider";
import PianoWithRecording from "./PianoWithRecording";

// webkitAudioContext fallback needed to support Safari
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const soundfontHostname = "https://d1pzp51pvbm36p.cloudfront.net";

const noteRange = {
  first: MidiNumbers.fromNote("c3"),
  last: MidiNumbers.fromNote("f4"),
};
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote: noteRange.first,
  lastNote: noteRange.last,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

export default class PianoMan extends React.Component {
  state = {
    recording: {
      mode: "RECORDING",
      events: [],
      currentTime: 0,
      currentEvents: [],
    },
    displayer: undefined,
  };

  constructor(props) {
    super(props);

    this.scheduledEvents = [];
  }

  getRecordingEndTime = () => {
    if (this.state.recording.events.length === 0) {
      return 0;
    }
    return Math.max(
      ...this.state.recording.events.map((event) => event.time + event.duration)
    );
  };

  getDisplayer = (events) => {
    let str = "";

    events.map((item) => {
      str += item.midiNumber + " ";
      return "";
    });

    return str;
    // return events.map((item) => {
    //   return (
    //     <div>
    //       <label>Midi {item.midiNumber} </label>
    //       {/* <label>Time {item.time}</label> */}
    //     </div>
    //   );
    // });
  };

  setRecording = (value) => {
    this.setState({
      recording: Object.assign({}, this.state.recording, value),
    });

    if (value.events) {
      this.setState({
        displayer: this.getDisplayer(value.events),
      });
    }
  };

  onClickSet = () => {
    let notesToPlay = [];
    let timesToPlay = [];
    this.state.recording.events.forEach((noteEvent) => {
      notesToPlay.push(noteEvent.midiNumber);
      timesToPlay.push(noteEvent.time);
    });
    this.props.setNotes(notesToPlay);
    return;
  };

  onClickPlay = () => {
    this.setRecording({
      mode: "PLAYING",
    });
    const startAndEndTimes = _.uniq(
      _.flatMap(this.state.recording.events, (event) => [
        event.time,
        event.time + event.duration,
      ])
    );
    startAndEndTimes.forEach((time) => {
      this.scheduledEvents.push(
        setTimeout(() => {
          const currentEvents = this.state.recording.events.filter((event) => {
            return event.time <= time && event.time + event.duration > time;
          });
          this.setRecording({
            currentEvents,
          });
        }, time * 1000)
      );
    });
    // Stop at the end
    setTimeout(() => {
      this.onClickStop();
    }, this.getRecordingEndTime() * 1000);
  };

  onClickStop = () => {
    this.scheduledEvents.forEach((scheduledEvent) => {
      clearTimeout(scheduledEvent);
    });
    this.setRecording({
      mode: "RECORDING",
      currentEvents: [],
    });
  };

  onClickClear = () => {
    this.onClickStop();
    this.setRecording({
      events: [],
      mode: "RECORDING",
      currentEvents: [],
      currentTime: 0,
    });
  };

  render() {
    return (
      <div style={{ marginLeft: "200px" }}>
        <h1 className="h3">React piano recorder</h1>
        <div className="mt-5">
          <SoundfontProvider
            instrumentName="acoustic_grand_piano"
            audioContext={audioContext}
            hostname={soundfontHostname}
            render={({ isLoading, playNote, stopNote }) => (
              <PianoWithRecording
                recording={this.state.recording}
                setRecording={this.setRecording}
                noteRange={noteRange}
                width={800}
                playNote={playNote}
                stopNote={stopNote}
                disabled={isLoading}
                keyboardShortcuts={keyboardShortcuts}
              />
            )}
          />
        </div>
        <div className="mt-5">
          <button onClick={this.onClickPlay}>Play</button>
          <button onClick={this.onClickStop}>Stop</button>
          <button onClick={this.onClickClear}>Clear</button>
          <button onClick={this.onClickSet}>Set</button>
        </div>
        <div className="mt-5">
          <strong>Recorded notes</strong>
          {"\n"}
          {/* <div>{JSON.stringify(helper)}</div> */}
          {this.state.displayer}
        </div>
      </div>
    );
  }
}
