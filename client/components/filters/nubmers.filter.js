app.filter('decimalToWord', function() {
  return function(num) {
    // 0, 1, 1.5, 2
    var numArr = num.toString().split("");

    if (numArr.length > 1) {
      
      // handle 0.5
      if (numArr[0] == 0) {
        return "half a";
      }

      // handle all other .5s
      if (_.last(numArr) == "5") {
        return numArr[0] + " and a half";
      }

    } else {
      return numArr.join(" ")
    }
  };
});