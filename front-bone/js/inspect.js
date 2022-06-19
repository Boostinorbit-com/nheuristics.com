

function makeDisableInspect(event) {

   document.addEventListener('keydown', function(event) {
    if (event.keyCode == 123) {
      alert("This function has been disabled");
      return false;
    } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {      
      alert("This function has been disabled");
      console.log(event);
      event.preventDefault();
      return false;
    } else if (event.ctrlKey && event.keyCode == 85) {
      alert("This function has been disabled");
      return false;
    }
  }, false);
  
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
      alert("This function has been disabled");
      console.log(e);
      e.preventDefault();
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function(e) {
      alert("This function has been disabled");
      window.event.returnValue = false;
    });
  }
}
document.body.onclick = makeDisableInspect()


