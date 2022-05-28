if (document.querySelector('.burger')) {
	let burgerWrap = document.querySelector('.burger')
	let burgerToggle = document.querySelector('.burger__toggle');
	let menu = document.querySelector('.menu');

	burgerWrap.onclick = function () {
		burgerToggle.classList.toggle('is-active');
	};
}