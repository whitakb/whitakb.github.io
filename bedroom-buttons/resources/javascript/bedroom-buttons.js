//a "generic" function for a JSON call
var getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", url, true)
  xhr.responseType = "json"
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status, xhr.response)
    }
  }
  xhr.send()
}

function myClick(clickedButton) {
  //call the url and get the JSON back, using the "generic" handler built above
  //the url points to node red on the Home Assistant server
  let urlBase = "http://192.168.1.43:1880/endpoint/"
  let urlFull = urlBase + clickedButton

  // feedback to the screen
  document.getElementById("bedroomFeedback").innerHTML = clickedButton
  //document.getElementById("bedroomFeedback").value = clickedButton

  //call the url and get the JSON back, using the "generic" handler built above
  //and then provide feedback to the screen in the callback function
  getJSON(urlFull, function (err, data) {
    if (err !== null) {
      document.getElementById("bedroomFeedback").innerHTML = "ERR"
      //document.getElementById("bedroomFeedback").value = "ERR"
    } else {
      document.getElementById("bedroomFeedback").innerHTML = data.feedback
      //document.getElementById("bedroomFeedback").value = data.feedback
    }
  })
}

// =====================================================================
// To remove the hover effects on touch screens, but leave them in place
// on web browsers
// =====================================================================

function watchForHover() {
  // lastTouchTime is used for ignoring emulated mousemove events
  // that are fired after touchstart events. Since they're
  // indistinguishable from real events, we use the fact that they're
  // fired a few milliseconds after touchstart to filter them.
  let lastTouchTime = 0

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add("hasHover")
  }

  function disableHover() {
    document.body.classList.remove("hasHover")
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date()
  }

  document.addEventListener("touchstart", updateLastTouchTime, true)
  document.addEventListener("touchstart", disableHover, true)
  document.addEventListener("mousemove", enableHover, true)

  enableHover()
}

// this setups the "hover watcher" defined in the function above
watchForHover()
