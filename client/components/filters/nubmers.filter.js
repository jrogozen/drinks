app.filter('decimalToWord', function() {
  return function(num) {
    var numArr = num.toString().split("");
    console.log(numArr[-1]);
    if (_.last(numArr) == "5") {
      numArr.pop();
      numArr.pop();
      numArr.push("and a half");
    }
    return numArr.join(" ");
    return numArr;
  };
});