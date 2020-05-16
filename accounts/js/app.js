'use strict';

import accounts from './accounts.js';
import { createTableRowMarkup } from './create-row-template.js';

const refs = {
	searchForm: document.querySelector('.search-form'),
	accountTableHead: document.querySelector('thead'),
};

// Вешаем обработчик событий на submit формы, вызываем функцию сбора данных из input и фильтрация accounts по value инпутов
refs.searchForm.addEventListener('submit', e => {
	const resultOfSearchByInformation = handleFormSubmit(e, accounts);
	renderData(resultOfSearchByInformation, refs.accountTableHead);
});

// Рендер отфильтрованных данных в таблицу (желательно с очисткой предыдущих данных таблицы без нарушения структуры DOM)
function renderData(dataToRender, targetToRender) {
	const markup = createTableRows(dataToRender);

	if (!markup) {
		return;
	}

	targetToRender.insertAdjacentHTML('afterend', markup);
	targetToRender.parentNode.lastElementChild.remove();
}

// Функция сбора данных с инпутов формы "Предприятие", их фильтрация и возврат.
// Если не находит данные, возвращает пустой массив для "поддержки штанов" программы
function handleFormSubmit(e, dataArray) {
	e.preventDefault();

	const { elements } = e.currentTarget;
	const companyName = elements.companyName;
	const companyUsreou = elements.companyUsreou;
	const bankName = elements.bankName;
	const bankMfi = elements.bankMfi;
	const accountNumber = elements.accountNumber;

	const objData = {
		[companyName.name]: companyName.value,
		[companyUsreou.name]: companyUsreou.value,
		[bankName.name]: bankName.value,
		[bankMfi.name]: bankMfi.value,
		[accountNumber.name]: accountNumber.value,
	};

	if (objData.companyName !== '') {
		const resultOfSearchByCompanyName = dataArray.filter(data =>
			data.companyName.toLowerCase().includes(objData.companyName.toLowerCase()),
		);
		companyName.value = '';

		return resultOfSearchByCompanyName;
	}

	if (objData.companyUsreou !== '') {
		const resultOfSearchByCompanyUsreou = dataArray.filter(
			data => data.companyUsreou === objData.companyUsreou,
		);
		companyUsreou.value = '';

		return resultOfSearchByCompanyUsreou;
	}

	if (objData.bankName !== '') {
		const resultOfSearchByBankName = dataArray.filter(data =>
			data.bankName.toLowerCase().includes(objData.bankName.toLowerCase()),
		);
		bankName.value = '';

		return resultOfSearchByBankName;
	}

	if (objData.bankMfi !== '') {
		const resultOfSearchByBankMfi = dataArray.filter(data => data.bankMfi === objData.bankMfi);
		bankMfi.value = '';

		return resultOfSearchByBankMfi;
	}

	if (objData.accountNumber !== '') {
		const resultOfSearchByAccountNumber = dataArray.filter(data =>
			data.companyAccount.includes(objData.accountNumber),
		);
		accountNumber.value = '';

		return resultOfSearchByAccountNumber;
	}

	return [];
}

// Функция создания разметки таблицы по шаблону одной строки. Получает отфильтрованный массив данных
// моделирует по нему всю разметку таблицы
function createTableRows(dataArray) {
	return dataArray.map((data, idx) => createTableRowMarkup(data, idx)).join('');
}
