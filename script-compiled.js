"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
  _inherits(Stopwatch, _React$Component);

  function Stopwatch(props) {
    _classCallCheck(this, Stopwatch);

    var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this, props));

    _this.state = {
      times: {
        minutes: 0,
        seconds: 0,
        miliseconds: 0
      },
      running: false,
      resArr: []
    };
    _this.start = _this.start.bind(_this);
    _this.format = _this.format.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.calculate = _this.calculate.bind(_this);
    _this.stop = _this.stop.bind(_this);
    _this.clear = _this.clear.bind(_this);
    _this.lap = _this.lap.bind(_this);
    _this.cleanLaps = _this.cleanLaps.bind(_this);
    return _this;
  }

  _createClass(Stopwatch, [{
    key: "reset",
    value: function reset() {
      this.setState({
        times: {
          minutes: 0,
          seconds: 0,
          miliseconds: 0
        }
      });
    }
  }, {
    key: "format",
    value: function format() {
      return this.pad0(this.state.times.minutes) + ":" + this.pad0(this.state.times.seconds) + ":" + this.pad0(Math.floor(this.state.times.miliseconds));
    }
  }, {
    key: "start",
    value: function start() {
      var _this2 = this;

      if (!this.state.running) {
        this.setState({
          running: true
        });
        this.watch = setInterval(function () {
          return _this2.calculate();
        }, 10);
      }
    }
  }, {
    key: "calculate",
    value: function calculate() {
      if (!this.state.running) return;
      var _state$times = this.state.times,
          minutes = _state$times.minutes,
          seconds = _state$times.seconds,
          miliseconds = _state$times.miliseconds;


      this.setState({
        times: {
          minutes: minutes,
          seconds: seconds,
          miliseconds: miliseconds + 1
        }
      });

      if (miliseconds >= 100) {
        this.setState({
          times: {
            minutes: minutes,
            seconds: seconds + 1,
            miliseconds: 0
          }
        });
      }

      if (seconds >= 60) {
        this.setState({
          times: {
            minutes: minutes + 1,
            seconds: 0,
            miliseconds: miliseconds
          }
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      this.setState({
        running: false
      });
      clearInterval(this.watch);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.stop();
      this.reset();
    }
  }, {
    key: "lap",
    value: function lap() {
      var newRecord = this.format(this.state.times);

      this.setState({
        resArr: [].concat(_toConsumableArray(this.state.resArr), [newRecord])
      });
    }
  }, {
    key: "cleanLaps",
    value: function cleanLaps() {
      this.setState({
        resArr: []
      });
    }
  }, {
    key: "pad0",
    value: function pad0(value) {
      var result = value.toString();
      if (result.length < 2) {
        result = '0' + result;
      }
      return result;
    }
  }, {
    key: "render",
    value: function render() {

      var arrItems = this.state.resArr.map(function (el, i) {
        return React.createElement(
          "li",
          { key: i },
          el
        );
      });

      return React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "nav",
          { className: "controls" },
          React.createElement(
            "a",
            { href: "#", className: "button", onClick: this.start },
            "Start"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", onClick: this.stop },
            "Stop"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", onClick: this.clear },
            "Reset timer"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", onClick: this.lap },
            "lap"
          ),
          React.createElement(
            "a",
            { href: "#", className: "button", onClick: this.cleanLaps },
            "clear laps"
          )
        ),
        React.createElement(
          "div",
          { className: "stopwatch" },
          this.format()
        ),
        React.createElement(
          "ol",
          { className: "results" },
          arrItems
        )
      );
    }
  }]);

  return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('app'));
