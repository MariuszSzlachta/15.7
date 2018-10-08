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
    this.start = this.start.bind(this);
    this.format = this.format.bind(this);
    this.reset = this.reset.bind(this);
    this.calculate = this.calculate.bind(this);
    this.stop = this.stop.bind(this);
    this.clear = this.clear.bind(this);
    this.lap = this.lap.bind(this);
    this.cleanLaps = this.cleanLaps.bind(this);
  }

  reset(){
    this.setState({
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0,
      }
    })
  }
  
  format(){
    return `${this.pad0(this.state.times.minutes)}:${this.pad0(this.state.times.seconds)}:${this.pad0(Math.floor(this.state.times.miliseconds))}`;
  }

  start(){
    if (!this.state.running) {
      this.setState({
        running: true,
      })
      this.watch = setInterval(() => this.calculate(), 10)
    }
  }
  
  calculate(){
    if (!this.state.running) return;
    let {minutes, seconds, miliseconds} = this.state.times;
    miliseconds += 1;
    if (miliseconds >= 100){
      seconds += 1;
      miliseconds = 0;
    }

    if (seconds >= 60){
      minutes += 1;
      seconds = 0;
    }
    this.setState({
      times: {
        minutes,
        seconds,
        miliseconds
      }
    })
  }

  stop(){
    this.setState({
      running: false
    })
    clearInterval(this.watch);
  }

  clear(){
    this.stop();
    this.reset();
    
  }

  lap(){
    let newRecord = this.format(this.state.times);
    
    this.setState({
      resArr: [...this.state.resArr, newRecord]
    })
  }

  cleanLaps(){
    this.setState({
      resArr: []
    })
  }

  pad0(value){
    let result = value.toString();
    if (result.length < 2) {
      result = '0' + result;
    }
    return result;
  }

  render(){

    let arrItems = this.state.resArr.map((el, i) => {
      return <li key={i}>{el}</li>
    })

    return (
      <div className="container">
        <nav className="controls">
          <a href="#" className="button" onClick={this.start}>Start</a>
          <a href="#" className="button" onClick={this.stop}>Stop</a>
          <a href="#" className="button" onClick={this.clear}>Reset timer</a>
          <a href="#" className="button" onClick={this.lap}>lap</a>
          <a href="#" className="button" onClick={this.cleanLaps}>clear laps</a>
        </nav>

        <div className="stopwatch">{this.format()}</div>

        <ol className="results">
          {arrItems}
        </ol>
      </div>
    )
  }
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));