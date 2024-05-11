function addHandlers(count) {
    var minus = count.querySelector(".minus");
    var number = count.querySelector(".number");
    var plus = count.querySelector(".plus");

    plus.addEventListener("click", function() {
      number.value++;
      console.log(number.value);
    });
    minus.addEventListener("click", function() {
        if(number.value == 0){
            number.value = 1;
        }
      number.value--;
      console.log(number.value);
    });
  }
  
  var counts = document.querySelectorAll(".count");
  counts.forEach(addHandlers);