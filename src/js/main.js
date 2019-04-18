function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline = new Date(Date.parse(new Date("May 27,2019 10:00:00")));
initializeClock('clockdiv', deadline);

import Rellax from "rellax";

var rellax = new Rellax('.rellax', {
  center: false,
});

/* Waypoint on elements */

let caseElementsTest = document.querySelectorAll('.is-hidden');
let elementsArray = [];
for ( let i = 1; i < caseElementsTest.length + 1; i++ ) {
    let caseElement = caseElementsTest[i];
    i < 10 ? elementsArray.push(`element-0${i}`) : elementsArray.push(`element-${i}`);
}

elementsArray.forEach( ( id ) => {
let element = document.getElementById( id );
let waypoint = new Waypoint({
    element: element,
    handler: function( direction ) {
    element.classList.toggle( 'is-visible' );
    },
    offset: '93%'
});
});


// Instance Unity
/* let gameInstance = UnityLoader.instantiate( 'gameContainer', 'path vers le projet' ); */