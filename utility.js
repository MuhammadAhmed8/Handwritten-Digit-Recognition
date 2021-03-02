
//This function shapes a 1D array to 2D array

Array.prototype.reshape = function(rows, cols) {

    var copy = this.slice(0); 
    this.length = 0; 
  
    for (var r = 0; r < rows; r++) {
      var row = [];
      for (var c = 0; c < cols; c++) {
        var i = r * cols + c;
        if (i < copy.length) {
          row.push(copy[i]);
        }
      }
      this.push(row);
    }
};

