function printOutput (num) {
  var output = (new Intl.NumberFormat({ maximumSignificantDigits: 3 }).format(num)).replace(/,/g, '');
  if (output.length > 10) {
    document.getElementById('output').innerHTML = 'Error';
  } else {
    document.getElementById('output').innerHTML = output;
  }
}

function addInput (input) {
  var current_display = document.getElementById('output').innerHTML;
  if (current_display == 0) {
    current_display = '';
    current_display += input;
    document.getElementById('output').innerHTML = current_display;
  } else if (document.getElementById('history').innerHTML == '' || current_display == 'Error') {
    resetHistory();
    resetDisplay();
    var current_display = document.getElementById('output').innerHTML = input;
  }
  else {
    current_display += input;
    //current_display = parseFloat(current_display.replace(/,/, ''));
    printOutput(current_display);
  }
}

function resetDisplay () {
  document.getElementById('output').innerHTML = 0;
}
function resetHistory() {
  document.getElementById('history').innerHTML = 0;
}

function randomNumber() {
  return Math.floor(Math.random() * 10000);
}

function addHistory(input) {
  var display = document.getElementById('output').innerHTML;
  var history = document.getElementById('history').innerHTML;
  if (history == 0) {
    document.getElementById('history').innerHTML = display + input;
    resetDisplay();
  } else {
  document.getElementById('history').innerHTML += display + input;
  resetDisplay();
  }
}

function evalAnswer () {
  var display = document.getElementById('output').innerHTML;
  document.getElementById('history').innerHTML += display;
  var eqn = (document.getElementById('history').innerHTML).toString();
  return eval(eqn);
}

const equals = document.getElementById('equals');
const ac = document.getElementById('ac');

equals.addEventListener("click", function () {
  printOutput(evalAnswer())
  document.getElementById('history').innerHTML = '';
}, false);

ac.addEventListener('click', function () {
  resetDisplay();
  resetHistory();
}, false);

document.querySelectorAll('.number').forEach(item => {
  item.addEventListener('click', function () {
    addInput(item.innerHTML);
  })
});

document.querySelectorAll('.operator').forEach(item => {
  item.addEventListener('click', function () {
    if (item.innerHTML == 'x') {
      addHistory('*')
    }
    else {addHistory(item.innerHTML);}
  })
});
