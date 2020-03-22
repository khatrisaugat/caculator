var data = {
  number: 0,
  temp: 0,
  operator: "",
  total: 0
};
var uiCtrl = function() {
  var DOMstrings = {
    num: "btnnum",
    operator: "btnop",
    body: "calculator"
  };
  return {
    getDOM: function() {
      return DOMstrings;
    },
    getInput: function() {
      return {};
    },
    display: function(val) {
      document.getElementById("textbox").value = val;
    }
  };
};
var calc = function() {
  var add = function(a, b) {
    return a + b;
  };
  var sub = function(a, b) {
    return a - b;
  };
  var mul = function(a, b) {
    return a * b;
  };
  var div = function(a, b) {
    return a / b;
  };
  return {
    getnum: function(num) {
      if (num == "c") {
        //CLEAR
        location.reload();
      } else if (num == "=") {
        //=press
        if (data.operator == "+") {
          data.total = add(data.number, data.temp);
          data.number = data.total;
          data.total = 0;
          data.temp = 0;
          data.operator = "";
        }
        if (data.operator == "-") {
          data.total = sub(data.number, data.temp);
          data.number = data.total;
          data.total = 0;
          data.temp = 0;
          data.operator = "";
        }
        if (data.operator == "*") {
          data.total = mul(data.number, data.temp);
          data.number = data.total;
          data.total = 0;
          data.temp = 0;
          data.operator = "";
        }
        if (data.operator == "/") {
          data.total = div(data.number, data.temp);
          data.number = data.total;
          data.total = 0;
          data.temp = 0;
          data.operator = "";
        }
        return data.number;
      }
      //equals to finish
      if (data.operator == "") {
        if (!isNaN(parseInt(num))) {
          if (data.number == 0) {
            data.number = num;
          } else {
            data.number = data.number * 10 + num;
          }
        } else {
          data.operator = num;
        }
        return data.number;
      } else {
        if (!isNaN(parseInt(num))) {
          if (data.temp == 0) {
            data.temp = num;
          } else {
            data.temp = data.temp * 10 + num;
          }
          return data.temp;
        } else {
          console.log(num + "op=" + data.operator);
          if (data.operator == "+") {
            data.total = add(data.number, data.temp);
            data.number = data.total;
            data.total = 0;
            data.temp = 0;
            data.operator = num;
            return data.number;
          }
          if (data.operator == "-") {
            data.total = sub(data.number, data.temp);
            data.number = data.total;
            data.total = 0;
            data.temp = 0;
            data.operator = num;
            return data.number;
          }
          if (data.operator == "*") {
            data.total = mul(data.number, data.temp);
            data.number = data.total;
            data.total = 0;
            data.temp = 0;
            data.operator = num;
            return data.number;
          }
          if (data.operator == "/") {
            data.total = div(data.number, data.temp);
            data.number = data.total;
            data.temp = 0;
            data.total = 0;
            data.operator = num;
            return data.number;
          }
          //     console.log(data.temp);
          // return data.number;
        }
      }
    }
  };
};
var controller = (function(uiCtrl, calc) {
  //Event Listener Function
  function setEventListeners() {
    // console.log(uiCtrl().getDOM());
    var DOM = uiCtrl().getDOM();
    // console.log(DOM);
    document.getElementById(DOM.body).addEventListener("click", Ctrlnum);
    document.getElementById(DOM.body).addEventListener("keypress", Ctrlnum);
  }
  //Number Control function
  var Ctrlnum = function(e) {
    var number, operator, val, id, value;
    if (e.type == "keypress") {
      // console.log(e);
      if (e.keyCode >= 48 && e.keyCode <= 57) {
        id = "btnnum";
        value = e.key;
      } else if (e.keyCode == 13) {
        id = "btnop";
        value = "=";
      } else {
        id = "btnop";
        value = e.key;
      }
    } else if (e.type == "click") {
      id = e.toElement.id;
      value = e.toElement.value;
    }
    // console.log(e.toElement.value);
    if (id == "btnnum") {
      number = parseInt(value);
      //   console.log(number);
      val = calc().getnum(number);
      uiCtrl().display(val);
      uiCtrl().display(val);
    } else if (id == "btnop") {
      operator = value;
      //   console.log(operator);
      val = calc().getnum(operator);
      // console.log(data);
      //display value
      uiCtrl().display(val);
    }
  };
  //returning initialization and setting Event Listener function
  return {
    init: function() {
      console.log("Welcome to my calculator app");
      setEventListeners();
    }
  };
})(uiCtrl, calc);
controller.init();
