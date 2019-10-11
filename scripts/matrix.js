class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
		console.log("Rows:" + this.rows)
		console.log("Columns:" + this.columns)
		console.log("Rows1:"+ v.length)
		console.log("Columns1:"+v[0].length)
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows && 
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {
        var result=null;
		result = new Matrix(this.rows, rhs.columns);
        // ensure multiplication is valid
		//result.rows = this.rows;
		//result.columns= rhs.columns;
		//result.data= [];
		var numbers = new Array(this.rows);
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            // implement matrix multiplication here
			var i;
			var j;
			var k;
			var rowSum;
			for(i=0; i<this.rows ;i++)
			{
				numbers[i]= new Array(rhs.columns);
			}
			console.log("Rows2:"+ numbers.length)
			console.log("Columns2:"+numbers[0].length)
			for(k=0; k<this.rows; k++){
				
				//numbers.push([]);
				
				for(i = 0; i<rhs.columns ; i++){
					rowSum =0;
					for(j=0; j<rhs.rows; j++){

						rowSum= rowSum + (this.data[k][j]*rhs.data[j][i]);
						console.log("k: " + k + " i: "+ i + " j: " +j)						
					}
					numbers[k][i]=rowSum;
				}	
			}
			console.log("Rows3:"+ numbers.length)
			console.log("Columns3:"+numbers[0].length)
			result.values= numbers;
			
        }
        else {
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}
