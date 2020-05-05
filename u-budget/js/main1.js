'use strict';
//Объявляем глобальные переменные
let money, time;

//Функция с вызовом двух диалоговых окон для получения данных от пользователя
function start() {
    money = +prompt("Ваш бюджет на месяц?",'');
    time = prompt("Введите дату в формате YYYY-MM-DD",'');

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?",'');
    }
}
start(); //Вызов функции start

//Создаем объект appData со своими свойствами
let appData = {
    budget: money,
    timeData: time,
    expenses : {},
    optionalExpenses : {},
    income: [],
    savings: true,
};

// Функция с использованием цикла for для получения обязательных расходов:
function chooseExpenses(){
    for (let i = 0; i < 2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце",''),
            b = +prompt("Во сколько обойдется?",'');

        if ((typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null
            && a != '' && b != '' && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
        } else {
            console.log("not done");
            i--;
        }
    }
}
chooseExpenses();

//Функция для получения необязательных расходов:
function chooseOptExpenses() {
    for (let i = 1; i <= 3; i++) {
        let opt = prompt("Статья необязательных доходов?", "");
        appData.optionalExpenses[i] = opt;
    }
}
chooseOptExpenses();

function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(); //Создаем новое свойство appData и записываем в него результат (через Fixed получим строковое значение)
    alert("Ежедневный бюджет: " + appData.moneyPerDay);
}
detectDayBudget();

//Функция вывода уровня достатка
function detectLevel(){
    if(appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
        console.log("Средний уровень достатка");
    } else if (appData.moneyPerDay > 2000) {
        console.log("Высокий уровень достатка");
    } else {
        console.log("Что-то пошло не так...");
    }
}
detectLevel();

//Функция получения данных о доходах с депозитов (если saving == true)
function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма накоплений?"),
            percent = +prompt("Под какой процент?");

        appData.monthIncom = save / 100 / 12 * percent;
        alert("Доход в месяц с вашего депозита: " + appData.monthIncom);
    }
}
checkSavings();