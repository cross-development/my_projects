'use strict';
//! Переписать html и скрипт, чтобы в html была одна форма со всеми инпутами, 
//! а в js на ней был один обработчик submit и общая функция обработки данных
import accounts from './accounts.js';

const refs = {
	companyForm: document.querySelector('.company-search-form'),
	bankForm: document.querySelector('.bank-search-form'),
	accountForm: document.querySelector('.account-search-form'),
	accountTable: document.querySelector('.account-table'),
	// accountTableHead: document.querySelector('thead'),
};

// Вешаем обработчик событий на submit формы, вызываем функцию сбора данных из input и фильтрация accounts по value инпутов
refs.companyForm.addEventListener('submit', e => {
	const resultOfSearchByCompanyInform = handleCompanyFormSubmit(e, accounts);
	renderData(resultOfSearchByCompanyInform, refs.accountTable);
});
refs.bankForm.addEventListener('submit', e => {
	const resultOfSearchByBankInform = handleBankFormSubmit(e, accounts);
	renderData(resultOfSearchByBankInform, refs.accountTable);
});
refs.accountForm.addEventListener('submit', e => {
	const resultOfSearchByAccountInform = handleAccountFormSubmit(e, accounts);
	renderData(resultOfSearchByAccountInform, refs.accountTable);
});

// Рендер отфильтрованных данных в таблицу (желательно с очисткой предыдущих данных таблицы без нарушения структуры DOM)
function renderData(dataToRender, targetToRender) {
	const markup = createTableRows(dataToRender);
	targetToRender.insertAdjacentHTML('beforeend', markup);
	// targetToRender.firstElementChild.nextElementSibling.remove();
}
// Функция сбора данных с инпутов формы "Предприятие", их фильтрация и возврат.
// Если не находит данные, возвращает пустой массив для "поддержки штанов" программы
function handleCompanyFormSubmit(e, dataArray) {
	e.preventDefault();

	const { elements } = e.currentTarget;
	const companyName = elements.companyName;
	const companyUsreou = elements.companyUsreou;

	const companyData = {
		[companyName.name]: companyName.value,
		[companyUsreou.name]: companyUsreou.value,
	};

	if (companyData.companyName !== '') {
		const resultOfSearchByCompanyName = dataArray.filter(data =>
			data.companyName.toLowerCase().includes(companyData.companyName.toLowerCase()),
		);
		return resultOfSearchByCompanyName;
	}

	if (companyData.companyUsreou !== '') {
		const resultOfSearchByCompanyUsreou = dataArray.filter(
			data => data.companyUsreou === companyData.companyUsreou,
		);
		return resultOfSearchByCompanyUsreou;
	}

	// return [];
}

// Функция сбора данных с инпутов формы "Банк", их фильтрация и возврат.
// Если не находит данные, возвращает пустой массив для "поддержки штанов" программы
function handleBankFormSubmit(e, dataArray) {
	e.preventDefault();

	const { elements } = e.currentTarget;
	const bankName = elements.bankName;
	const bankMfi = elements.bankMfi;

	const bankData = {
		[bankName.name]: bankName.value,
		[bankMfi.name]: bankMfi.value,
	};

	if (bankData.bankName !== '') {
		const resultOfSearchByBankName = dataArray.filter(data =>
			data.bankName.toLowerCase().includes(bankData.bankName.toLowerCase()),
		);
		return resultOfSearchByBankName;
	}

	if (bankData.bankMfi !== '') {
		const resultOfSearchByBankMfi = dataArray.filter(data => data.bankMfi === bankData.bankMfi);
		return resultOfSearchByBankMfi;
	}

	// return [];
}

// Функция сбора данных с инпутов формы "Счета", их фильтрация и возврат.
// Если не находит данные, возвращает пустой массив для "поддержки штанов" программы
function handleAccountFormSubmit(e, dataArray) {
	e.preventDefault();

	const { elements } = e.currentTarget;
	const accountNumber = elements.accountNumber;

	const accountData = {
		[accountNumber.name]: accountNumber.value,
	};

	if (accountData.accountNumber !== '') {
		const resultOfSearchByAccountNumber = dataArray.filter(data =>
			data.companyAccount.includes(accountData.accountNumber),
		);
		return resultOfSearchByAccountNumber;
	}

	// return [];
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
        <td>${1 + idx}</td>
        <td>${data.companyName}</td>
        <td>${data.companyUsreou}</td>
        <td>${data.bankName}</td>
        <td>${data.bankMfi}</td>
        <td>${data.accountCurrency}</td>
        <td>${data.companyAccount}</td>
        <td>
            <a class="modal-button" href="#popup-id">Еще...</a>
                <div id="popup-id" class="overlay">
                    <div class="popup">
                        <a class="close" href="#">&times;</a>
                    <div class="content">
                        <h3>Информация о предприятии</h3>
                        <table>
                            <tr>
                                <th>Название компании:</th>
                                <td>${data.companyName}</td>
                            </tr>
                            <tr>
                                <th>Код ОКПО:</th>
                                <td>${data.companyUsreou}</td>
                            </tr>
                            <tr>
                                <th>Адрес:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Индекс:</p>
                                </th>
                                <td>${data.companyAddress.postalCode}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Страна:</p>
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
                                    <p>Населенный пункт:</p>
                                </th>
                                <td>${data.companyAddress.city}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Улица:</p>
                                </th>
                                <td>${data.companyAddress.streetAddress}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Номер дома:</p>
                                </th>
                                <td>${data.companyAddress.numberHouse}</td>
                            </tr>
                            <tr>
                                <th>Должность руководителя:</th>
                                <td>${data.headPosition}</td>
                            </tr>
                            <tr>
                                <th>ФИО руководителя:</th>
                                <td>${data.fullName}</td>
                            </tr>
                        </table>
                        <h3>Информация об обслуживающем банке</h3>
                        <table>
                            <tr>
                                <th>Название банка:</th>
                                <td>${data.bankName}</td>
                            </tr>
                            <tr>
                                <th>Код ОКПО банка:</th>
                                <td>${data.bankUsreou}</td>
                            </tr>
                            <tr>
                                <th>Код МФО банка:</th>
                                <td>${data.bankMfi}</td>
                            </tr>
                            <tr>
                                <th>SWIFT банка:</th>
                                <td>${data.bankSwift}</td>
                            </tr>
                            <tr>
                                <th>Информация о текущем счете:</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Валюта счета:</p>
                                </th>
                                <td>${data.accountCurrency}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>Номер счета (IBAN):</p>
                                </th>
                                <td>${data.companyAccount}</td>
                            </tr>
                            <tr>
                                <th>
                                    <p>SWIFT банка-корреспондента:</p>
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
                                <th>Адрес головного банка:</th>
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
