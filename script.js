class Stopwatch {
  constructor(display){
    this.running = false;
    this.display = display;
    this.reset();
    this.print(this.times);
    this.resArr = []
  }

  reset(){
    this.times = {
      minutes: 0,
      seconds: 0,
      miliseconds: 0
    };
  }
  // wkleja dobrze sformatowany tekst do miejsca gdzie się timer wyświetla
  print(){
    this.display.innerText = this.format(this.times);
  }

  format(times) {
    return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
}

  start() {
    if (!this.running) {
        this.running = true;
        this.watch = setInterval(() => this.step(), 10);
    }
  }

  step(){
    if (!this.running) return;
    this.calculate();
    this.print();
  }

  calculate() {
    this.times.miliseconds += 1;
    if (this.times.miliseconds >= 100) {
        this.times.seconds += 1;
        this.times.miliseconds = 0;
    }
    if (this.times.seconds >= 60) {
        this.times.minutes += 1;
        this.times.seconds = 0;
    }
  }

  stop(){
    this.running = false;
    clearInterval(this.watch);
    console.log(this.resArr)
  }

  // my features:

   clear(){
    this.reset();
    this.print();
  }
 
  lap(){
    this.resArr.push(this.format(this.times));
    let resultItem = document.createElement('li');
    resultItem.innerText = this.resArr[this.resArr.length-1];
    results.appendChild(resultItem);
  }

  cleanLaps(){
    this.resArr.length = 0;
    results.innerText = '';
  }
}

function pad0(value){
  let result = value.toString();
  if (result.length < 2){
    result = '0' + result;
  }
  return result;
}


const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

//start
let startButton = document.getElementById('start');

startButton.addEventListener('click', () => {
  stopwatch.start();
});

//stop
let stopButton = document.getElementById('stop');

stopButton.addEventListener('click', () => {
  stopwatch.stop();
});

//clear
let clearButton = document.getElementById('reset');

clearButton.addEventListener('click', () => {
  stopwatch.clear();
});

//add lap
let lapButton = document.getElementById('lap');

lapButton.addEventListener('click', () => {
  stopwatch.lap();
});

//clear laps
let cleanLapsButton = document.getElementById('clean-laps');

cleanLapsButton.addEventListener('click', () => {
  stopwatch.cleanLaps();
});

let results = document.querySelector('.results')
