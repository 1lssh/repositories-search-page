let form = document.querySelector('.form');
let input = document.querySelector('.form__input');
let repositories = document.querySelector('.repositories-list');
let btn = document.querySelector('.form__btn')

form.addEventListener('submit', async function (event) {

	event.preventDefault();
	repositories.innerHTML = '';

	let response = await fetch(`https://api.github.com/search/repositories?q=${input.value}&per_page=10`);
	let result = await response.json();
	if (!result.items.length) repositories.innerHTML = 'Не найдено';

	result.items.forEach((element) => {
		let div = document.createElement('div');
		div.className = 'repostories-list__item';

		createRep(div, element.name, element.html_url, element.language, element.visibility)
		repositories.append(div)
	});
});


function validation(input) {

	function createError(input, text) {

		const parent = input.parentNode;

		const errorText = document.createElement('div');

		errorText.classList.add('error-text');

		errorText.textContent = text;

		parent.append(errorText)

		parent.classList.add('error');

	}

	function removeError(input) {

		const parent = input.parentNode;

		if (parent.classList.contains('error')) {
			parent.querySelector('.error-text').remove();
			parent.classList.remove('error');
		}
	}


	if (input.value == '') {
		createError(input, 'Поле не заполнено');
		btn.disabled = true
	} else {
		removeError(input);
		btn.disabled = false
	}
};

input.oninput = () => {
	validation(input)
}



function createRep(div, name, url, language, visibility) {
	return (
		div.innerHTML = `
		<div>
		<div class=title >
			<a href=${url} target=_blank >${name}</a>
		</div>
			<div>${language}</div>
		</div>
		<div class=visibility>
			<span>${visibility}</span>
		</div>
		
		`
	)
}