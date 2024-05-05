var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  let menu = document.querySelector('.menu-icon');
  let navbar = document.querySelector('.navbar');

  menu.onclick = () => {
    menu.classList.toggle("move");
    navbar.classList.toggle("open-menu");
  }

  window.onscroll = () => {
    menu.classList.remove("move");
    navbar.classList.remove("open-menu");
  }


  const animate = ScrollReveal({
    origin: 'top',
    distance: '35px',
    duration: '1300',
    delay: '100',
  });

  animate.reveal(".nav");
  animate.reveal(".home-text", {origin: "left"});
  animate.reveal(".home-img", {origin: "bottom"});
  animate.reveal(".ser-box, .product-box, .team-box, .book-data", {interval: 3});



//Number Mask script//

  window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
          this.value = new_value;
        }
        if (event.type == "blur" && this.value.length < 5) {
          this.value = "";
        }
      }
  
      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
  
    });
  
  });



//SmartBasket Settings//

  $(function () {
    $('.smart-basket__wrapper').smbasket({
        productElement: 'product-box',
        buttonAddToBasket: 'product-info',
        productPrice: 'product__price-number',
        productSize: 'product__size-element',
        
        productQuantityWrapper: 'product__quantity',
        smartBasketMinArea: 'basket',
        countryCode: '+7',
        smartBasketCurrency: '₽',
        smartBasketMinIconPath: "./images/basket-solid-24 (1).png",

        agreement: {
            isRequired: true,
            isChecked: true,
            isLink: 'https://artstranger.ru/privacy.html',
        },
        nameIsRequired: false,
    });
});