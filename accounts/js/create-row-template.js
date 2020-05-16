// Функция-шаблон для создания одной строки таблицы
export function createTableRowMarkup(data, idx) {
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
                                <td>${data.bankAdress}</td>
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
