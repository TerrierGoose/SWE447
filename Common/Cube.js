function Cube( vertexShaderId, fragmentShaderId ) {

    // Initialize the shader pipeline for this object using either shader ids
    //   declared in the application's HTML header, or use the default names.
    //
    var vertShdr = vertexShaderId || "Cube-vertex-shader";
    var fragShdr = fragmentShaderId || "Cube-fragment-shader";

    this.program = initShaders(gl, vertShdr, fragShdr);

    if ( this.program < 0 ) {
        alert( "Error: Cube shader pipeline failed to compile.\n\n" +
            "\tvertex shader id:  \t" + vertShdr + "\n" +
            "\tfragment shader id:\t" + fragShdr + "\n" );
        return; 
    }

    this.positions = { 
        values : new Float32Array([
           -0.5, -0.5, 0.5,
	   0.5, -0.5, 0.5,
	   0.5, 0.5, 0.5,
	  -0.5, 0.5, 0.5,
	   
	  -0.5, -0.5, -0.5,
	  -0.5, 0.5, -0.5,
	   0.5, 0.5, -0.5,
           0.5, -0.5, -0.5,
	  
	  -0.5, 0.5, -0.5,
	  -0.5, 0.5, 0.5,
           0.5, 0.5, 0.5,
	   0.5, 0.5, -0.5,
	
	  -0.5, -0.5, -0.5,
	   0.5, -0.5, -0.5,
	   0.5, -0.5, 0.5,
	  -0.5, -0.5, 0.5,
		
           0.5, -0.5, -0.5,
	   0.5, 0.5, -0.5,
	   0.5, 0.5, 0.5,
	   0.5, -0.5, 0.5,
		
	  -0.5, -0.5, -0.5,
	  -0.5, -0.5, 0.5,
	  -0.5, 0.5, 0.5,
	  -0.5, 0.5, -0.5
           ]),
        numComponents : 3
    };
    
    this.indices = { 
        values : new Uint16Array([
	//Front
		0,2,1,	0,3,2,
	//Back
		4,6,5,	4,7,6,
	//Top
		8,10,9  8,11,10.
	//Bottom
		12,14,13, 12,15,14,
	//Right
		16,18,17, 16, 19,18,
	//Left
		20,22,21, 20,23,22
        ])
    };
    this.indices.count = this.indices.values.length;

    
    this.positions.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
    gl.bufferData( gl.ARRAY_BUFFER, this.positions.values, gl.STATIC_DRAW );

    this.indices.buffer = gl.createBuffer();
    gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );
    gl.bufferData( gl.ELEMENT_ARRAY_BUFFER, this.indices.values, gl.STATIC_DRAW );

    this.positions.attributeLoc = gl.getAttribLocation( this.program, "vPosition" );
    gl.enableVertexAttribArray( this.positions.attributeLoc );

    MVLoc = gl.getUniformLocation( this.program, "MV" );

    this.MV = undefined;

    this.render = function () {
        gl.useProgram( this.program );

        gl.bindBuffer( gl.ARRAY_BUFFER, this.positions.buffer );
        gl.vertexAttribPointer( this.positions.attributeLoc, this.positions.numComponents,
            gl.FLOAT, gl.FALSE, 0, 0 );
 
        gl.bindBuffer( gl.ELEMENT_ARRAY_BUFFER, this.indices.buffer );

        gl.uniformMatrix4fv( MVLoc, gl.FALSE, flatten(this.MV) );

        // Draw the cube's base
        gl.drawElements( gl.TRIANGLES, this.indices.count, gl.UNSIGNED_SHORT, 0 );
    }
};
