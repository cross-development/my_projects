'use strict';

import accounts from './accounts.js';

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
		return resultOfSearchByCompanyName;
	}

	if (objData.companyUsreou !== '') {
		const resultOfSearchByCompanyUsreou = dataArray.filter(
			data => data.companyUsreou === objData.companyUsreou,
		);
		return resultOfSearchByCompanyUsreou;
	}

	if (objData.bankName !== '') {
		const resultOfSearchByBankName = dataArray.filter(data =>
			data.bankName.toLowerCase().includes(objData.bankName.toLowerCase()),
		);
		return resultOfSearchByBankName;
	}

	if (objData.bankMfi !== '') {
		const resultOfSearchByBankMfi = dataArray.filter(data => data.bankMfi === objData.bankMfi);
		return resultOfSearchByBankMfi;
	}

	if (objData.accountNumber !== '') {
		const resultOfSearchByAccountNumber = dataArray.filter(data =>
			data.companyAccount.includes(objData.accountNumber),
		);
		return resultOfSearchByAccountNumber;
	}

	return [];
}

// Функция создания разметки таблицы по шаблону одной строки. Получает отфильтрованный массив данных
// моделирует по нему всю разметку таблицы
function createTableRows(dataArray) {
	return dataArray.map((data, idx) => createTableRowMarkup(data, idx)).join('');
}

// Функция-шаблон для создания одной строки таблицы
function createTableRowMarkup(data, idx) {
	const row = `
    <tr>
        <td>${idx + 1}</td>
        <td>${data.companyName}</td>
        <td>${data.companyUsreou}</td>
        <td>${data.bankName}</td>
        <td>${data.bankMfi}</td>
        <td>${data.accountCurrency}</td>
        <td>${data.companyAccount}</td>
        <td>
            <a class="modal-button" href="#popup-id-${idx + 1}">Детально</a>
                <div id="popup-id-${idx + 1}" class="overlay">
                    <div class="popup">
                        <a class="close" href="#">&times;</a>
                    <div class="content">
                        <h3>Інформація про підприємство</h3>
                        <table>
                            <tr>
                                <th>Назва підприємства:</th>
                                <td>${data.companyName}</td>
                            </tr>
                            <tr>
                                <th>Код ЄДРПОУ:</th>
                                <td>${data.companyUsreou}</td>
                            </tr>
                            <tr>
                                <th>Адреса:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Індекс:</p>
                                </th>
                                <td>${data.companyAddress.postalCode}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Країна:</p>
                                </th>
                                <td>${data.companyAddress.country}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Область:</p>
                                </th>
                                <td>${data.companyAddress.region}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Район:</p>
                                </th>
                                <td>${data.companyAddress.district}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Населений пункт:</p>
                                </th>
                                <td>${data.companyAddress.city}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Вулиця:</p>
                                </th>
                                <td>${data.companyAddress.streetAddress}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Номер будинку:</p>
                                </th>
                                <td>${data.companyAddress.numberHouse}</td>
                            </tr>
                            <tr>
                                <th>Посада керівника:</th>
                                <td>${data.headPosition}</td>
                            </tr>
                            <tr>
                                <th>ПІБ керівника:</th>
                                <td>${data.fullName}</td>
                            </tr>
                        </table>
                        <h3>Інформація про обслуговуючий банк</h3>
                        <table>
                            <tr>
                                <th>Назва банку:</th>
                                <td>${data.bankName}</td>
                            </tr>
                            <tr>
                                <th>Код ЄДРПОУ банку:</th>
                                <td>${data.bankUsreou}</td>
                            </tr>
                            <tr>
                                <th>Код МФО банку:</th>
                                <td>${data.bankMfi}</td>
                            </tr>
                            <tr>
                                <th>SWIFT банку:</th>
                                <td>${data.bankSwift}</td>
                            </tr>
                            <tr>
                                <th>Інформація про поточні рахунки:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Валюта рахунку:</p>
                                </th>
                                <td>${data.accountCurrency}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Номер рахунку (IBAN):</p>
                                </th>
                                <td>${data.companyAccount}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>SWIFT банку-кореспондента:</p>
                                </th>
                                <td>${data.correspondentBankSwift}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Банк-кореспондент:</p>
                                </th>
                                <td>${data.correspondentBank}</td>
                            </tr>
                            <tr>
                                <th>Адреса головного банку:</th>
                                <td>${data._id}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </td>
    </tr>
    `;
	return row;
}
