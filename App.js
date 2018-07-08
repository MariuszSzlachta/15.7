class Stopwatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      },
      running: false,
      resArr: []
    }
  }

  reset = () => {
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      }
    })
  }
  
  format = () => {
    return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start = () => {
    if (!this.state.running) {
      this.setState({
        running: true,
      })
      this.watch = setInterval(() => this.step(), 10)
    }
  }

  step = () => {
    if (!this.state.running) return;
      this.calculate();
  }

  calculate = () => {
    this.setState({
      times: {
        minutes: this.state.times.minutes,
        seconds: this.state.times.seconds,
        miliseconds: this.state.times.miliseconds
      }
    })

    if (this.state.times.miliseconds >= 100){
      this.setState({
        times: {
          minutes: this.state.times.minutes,
          seconds: this.state.times.seconds + 1,
          miliseconds: 0
        }
      })
    }
    if (this.state.times.seconds >= 60){
      this.setState({
        times: {
          minutes: this.state.times.minutes + 1,
          seconds: 0,
          miliseconds: this.state.times.miliseconds
        }
      })
    }
    console.log(this.state.times)
  }

  stop = () => {
    this.setState({
      running: false
    })
    clearInterval(this.watch);
  }

  clear = () => {
    this.reset();
  }

  lap = () => {
    let newRecord = this.format(this.state.times);
    this.setState({
      resArr: [...this.state.resArr, newRecord]  
    })
  }

  cleanLaps = () => {
    this.setState({
      resArr: []
    })
  }

  pad0 = (value) => {
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  render = () => {
    const arrItems = this.state.resArr.map(el => <li>el</li>);
    return (
      <div className="container">
        <nav className="controls">
          <a href="#" className="button" onClick={this.start}>Start</a>
          <a href="#" className="button" onClick={this.stop}>Stop</a>
          <a href="#" className="button" onClick={this.reset}>Reset timer</a>
          <a href="#" className="button" onClick={this.lap}>lap</a>
          <a href="#" className="button" onClick={this.cleanLaps}>clear laps</a>
        </nav>

        <div className="stopwatch">{this.format()}</div>

        {/* <ol className="results">
          {this.props.arrItems}
        </ol> */}
      </div>
    )
  }
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));