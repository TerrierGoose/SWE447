var cube = undefined;
var gl = undefined;
var angle = 0;

function init() {
  var canvas = document.getElementById( "webgl-canvas" );

  gl = WebGLUtils.setupWebGL( canvas );

   document.getElementById("xButton").onclick = function() {
      //rotationAxis = xAxis;
      console.log("Button Pressed!!!!");
  }
   document.getElementById("slider").onchange = function() {
    //speed = 100 - event.srcElement.value;
           console.log("sliderSlid!!!!");

  }

  if ( !gl ) {
    alert("Unable to setup WebGL");
    return;
  }

  gl.clearColor( 0.1, 0.1, 0.1, 1.0 );
  gl.enable( gl.DEPTH_TEST );

  cube = new Cube();

  render();
  
}

function render() {
  gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

  angle += 3.0; // degrees

  cube.MV = rotate( angle, [1, 1, 0] );
  //mat4.rotate(modelViewMatrix, modelViewMatrix, cubeRotation * .2, [1, 0, 0]);
  cube.render();

  requestAnimationFrame( render ); // schedule another call to render()
}

window.onload = init;
