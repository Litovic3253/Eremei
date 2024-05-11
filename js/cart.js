const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let number = document.querySelector('.number');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');


let productArray = [];
let totalQuantity = 0;
let quantityItem = 0;
let priceQuantityVar = 0;
let price = 0;



const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
const randomOrder = () => {
	return Math.floor(Math.random() * 6);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = (quantity) => {
	
	let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent =  quantity;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id, quantity) => {
	return `
		<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img">
				<div class="cart-product__text">
				
					<h3  class="cart-product__title">${title}</h3>
					<span class="cart-product__price">${normalPrice(price)}</span>
					<span class="cart-product__quantity">${quantity}<?span>
					
				</div>
				<button type= "button" class="cart-product__delete" aria-label="Удалить товар"></button>
			</article>
		</li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product-box[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	let quantity = parseInt(productParent.querySelector('.cart-product__quantity').textContent);
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	
	minusFullPrice(currentPrice * quantity);
	printFullPrice();
	
	productParent.remove();
	totalQuantity -= quantity;
	
	printQuantity(totalQuantity);
};



productsBtn.forEach(el => {
	el.closest('.product-box').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product-box');
		let id = parent.dataset.id;
		let img = parent.querySelector('.img').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.price').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.price').textContent));
		let quantity = parent.querySelector("input[name='input']").value;
		
		quantityItem = quantity;
		parent.querySelector("input[name='input']").value = 1;

		totalQuantity += parseInt(quantity);
		plusFullPrice(priceNumber * quantity);
		printFullPrice();
		
		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id, quantity));
		printQuantity(totalQuantity);
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});



let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
	if (flag == 0) {
		orderModalOpenProd.classList.add('open');
		orderModalList.style.display = 'block';
		flag = 1;
	} else {
		orderModalOpenProd.classList.remove('open');
		orderModalList.style.display = 'none';
		flag = 0;
	}
});

const generateModalProduct = (img, title, price, id, quantity) => {
	return `
		<li class="order-modal__item">
			<article class="order-modal__product order-product" data-id="${id}">
				<img src="${img}" alt="" class="order-product__img">
				<div class="order-product__text">
					<h3 class="order-product__title">${title}</h3> 
					<span class="order_quantity">${quantity}Шт.</span>
					<span class="order-product__price">${normalPrice(price)}</span>
				</div>
			</article>
		</li>
	`;
};

const modal = new GraphModal({
	isOpen: (modal) => {
		orderModalList.innerHTML = '';

		console.log('opened');

		let array = cartProductsList.querySelector('.simplebar-content').children;
		let fullprice = fullPrice.textContent;
		document.querySelector('.order-modal__quantity span').textContent = `${totalQuantity} шт`;
		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
		document.querySelector('.order-modal__number').textContent = randomOrder();
		for (item of array) {
			console.log(item)
			let img = item.querySelector('.cart-product__img').getAttribute('src');
			let title = item.querySelector('.cart-product__title').textContent;
			let quantity = parseInt(item.querySelector('.cart-product__quantity').textContent);
			let priceString = parseInt(priceWithoutSpaces(item.querySelector('.cart-product__price').textContent));
			let id = item.querySelector('.cart-product').dataset.id;

			orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString * quantity, id, quantity));

			let obj = {};
			obj.title = title;
			obj.price = priceString;
			obj.quantity = quantity;
			productArray.push(obj);
		}

		console.log(productArray)
	},
	isClose: () => {

		console.log('closed');
	}
});

document.querySelector('.order').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;

	let formData = new FormData(self);
	let orderId = document.querySelector('.order-modal__number').textContent
	let name = self.querySelector('[name="Имя"]').value;
	let tel = self.querySelector('[name="Телефон"]').value;
	let mail = self.querySelector('[name="Email"]').value;
	formData.append('Товары', JSON.stringify(productArray));
	formData.append('Имя', name);
	formData.append('Телефон', tel);
	formData.append('Email', mail);
	formData.append('Номер заказа', orderId);

	let xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log('Отправлено');
				
			}
		}
	}

	xhr.open('POST', 'mail.php', true);
	xhr.send(formData);

	self.reset();
	modal.close();
	window.location.href = 'thank-you.html';
	
	
});