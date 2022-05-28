'use strict';

document.addEventListener('DOMContentLoaded', function () {

	// Burger
	if (document.querySelector('.burger')) {
		let burgerWrap = document.querySelector('.burger')
		let burgerToggle = document.querySelector('.burger__toggle');
		let menu = document.querySelector('.header__nav');
		let overlay = document.querySelector('.overlay');

		burgerWrap.onclick = function () {
			burgerToggle.classList.toggle('is-active');
			menu.classList.toggle('is-active');
			overlay.classList.toggle('is-active');
		};

		overlay.onclick = function (e) {
			burgerToggle.classList.remove('is-active');
			menu.classList.remove('is-active');
			e.target.classList.remove('is-active');
		};
	}

	// Show password button
	if (document.querySelector('.password-input')) {
		let passInput = document.querySelectorAll('.password-input');
		let passShowButtons = document.querySelectorAll('.password-input__show-btn');

		passInput.forEach(i => {
			i.addEventListener('input', function () {
				if (this.value != 0) {
					this.nextElementSibling.classList.remove('is-hidden');
				} else {
					this.nextElementSibling.classList.add('is-hidden');
					this.nextElementSibling.classList.remove('is-active');
					this.setAttribute('type', 'password');
				}
			});
		});

		for (let i of passShowButtons) {
			i.addEventListener('click', function () {
				let closestInput = this.previousElementSibling;

				i.classList.toggle('is-active');

				if (closestInput.getAttribute('type') == 'password') {
					closestInput.setAttribute('type', 'text');
				} else if (closestInput.getAttribute('type') == 'text') {
					closestInput.setAttribute('type', 'password');
				}
			});
		}

	}

	// Sctoll to top button
	if (document.querySelector('.scroll-top')) {

		let mybutton = document.querySelector(".scroll-top");

		window.onscroll = function () { scrollFunction() };

		function scrollFunction() {
			if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				mybutton.classList.add('is-show');
			} else {
				mybutton.classList.remove('is-show');
			}
		}

		// New Click Function
		mybutton.addEventListener('click', function () {
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		});
	}

	// Custom range input
	if (document.querySelector('.input-range')) {
		let style = document.createElement('style');
		document.head.appendChild(style);

		let inputDiv = document.querySelector('.input-range');
		let inputWidth = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));

		let inputRange = document.querySelector(".input-range input[type='range']");
		inputRange.style.width = inputWidth + "px";
		let inputMin = inputRange.getAttribute('min');
		let inputMax = inputRange.getAttribute('max');
		let k = inputWidth / (inputMax - inputMin);

		let inputLabel = document.querySelector('.input-range__label');
		let ew = parseInt(window.getComputedStyle(inputLabel, null).getPropertyValue("width"));

		inputLabel.innerHTML = inputRange.value;
		inputLabel.style.left = ((inputRange.value * k) - (ew / 2)) + "px";
		style.textContent = "input[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, let(--range-color) " + inputRange.value + "%,let(--range-bar-color) " + inputRange.value + "%)}"
		style.textContent += "input[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, let(--range-color) " + inputRange.value + "%,let(--range-bar-color) " + inputRange.value + "%)}"

		inputRange.addEventListener('input', function () {
			inputLabel.innerHTML = inputRange.value;
			inputLabel.style.left = ((inputRange.value * k) - (ew / 2)) + "px";
			style.textContent = "input[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, let(--range-color) " + inputRange.value + "%,let(--range-bar-color) " + inputRange.value + "%)}"
			style.textContent += "input[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, let(--range-color) " + inputRange.value + "%,let(--range-bar-color) " + inputRange.value + "%)}"

		}, false);
	}

	// Main slider
	if (document.querySelector('.main-slider')) {
		let swiper = new Swiper(".main-slider__inner", {
			speed: 600,
			spaceBetween: 0,
			loop: true,
			effect: "fade",
			navigation: {
				nextEl: ".swiper-button-next.main-slider__next",
				prevEl: ".swiper-button-prev.main-slider__prev",
			},
			pagination: {
				el: ".swiper-pagination.main-slider__pag",
				clickable: true,
			},
		});
	}

	// Counts from 0 to num
	if (document.querySelector('.help-info')) {

		let swiper1 = new Swiper(".help-info__slider", {
			speed: 600,
			spaceBetween: 30,
			slidesPerView: "auto",
			freeMode: true,
			speed: 10000,
			loop: true,
			autoplay: {
				delay: 0,
				disableOnInteraction: false
			}
		});

		const counters = document.querySelectorAll('.counter')
		counters.forEach(counter => {
			counter.innerText = '0'
			const updateCounter = () => {
				const target = +counter.getAttribute('data-target')
				const c = +counter.innerText
				const increment = target / 500
				if (c < target) {
					counter.innerText = `${Math.ceil(c + increment)}`
					setTimeout(updateCounter, 1)
				} else {
					counter.innerText = target
				}
			}
			updateCounter()
		})
	}

	// Actions on page scroll
	if (document.querySelector('.scrolled-element')) {
		let listItems = document.querySelectorAll(".scrolled-element");
		let listItemsShown = document.querySelectorAll(".scrolled-element.is-shown");
		let isScrolling = false;

		for (let i of listItemsShown) {
			i.classList.add('is-active');
		}

		window.addEventListener("scroll", throttleScroll, false);

		function throttleScroll(e) {
			if (isScrolling == false) {
				window.requestAnimationFrame(function () {
					scrolling(e);
					isScrolling = false;
				});
			}
			isScrolling = true;
		}

		document.addEventListener("DOMContentLoaded", scrolling, false);

		function scrolling(e) {

			for (let i = 0; i < listItems.length; i++) {
				let listItem = listItems[i];

				if (isPartiallyVisible(listItem)) {
					listItem.classList.add("is-active");
				} else {
					listItem.classList.remove("is-active");
				}
			}
		}

		function isPartiallyVisible(el) {
			let elementBoundary = el.getBoundingClientRect();

			let top = elementBoundary.top;
			let bottom = elementBoundary.bottom;
			let height = elementBoundary.height;

			return ((top + height >= 0) && (height + window.innerHeight >= bottom));
		}
	}

	// Global sliders
	if (document.querySelector('.g-slider')) {

		let swiper2 = new Swiper(".g-slider__programs", {
			autoHeight: true,
			speed: 600,
			slidesPerView: "auto",
			freeMode: true,
			navigation: {
				nextEl: ".swiper-button-next.programs__next",
				prevEl: ".swiper-button-prev.programs__prev",
			},
			breakpoints: {
				320: {
					spaceBetween: 10,
					freeMode: false
				},
				375: {
					spaceBetween: 26,
					freeMode: false
				},
				768: {
					spaceBetween: 30
				}
			}
		});

		let swiper3 = new Swiper(".g-slider__mass-media", {
			autoHeight: true,
			speed: 600,
			spaceBetween: 30,
			slidesPerView: "auto",
			freeMode: true,
			loop: true,
			navigation: {
				nextEl: ".swiper-button-next.mass-media__next",
				prevEl: ".swiper-button-prev.mass-media__prev",
			},
			breakpoints: {
				320: {
					freeMode: false
				},
				768: {
					freeMode: true,
				}
			}
		});

		let swiper4 = new Swiper(".g-slider__homeless-help", {
			autoHeight: true,
			speed: 600,
			spaceBetween: 30,
			slidesPerView: "auto",
			freeMode: true,
			// loop: true,
			navigation: {
				nextEl: ".swiper-button-next.homeless-help__next",
				prevEl: ".swiper-button-prev.homeless-help__prev",
			},
		});

	}

}, false); // <--------------------> //

// !console.log();



