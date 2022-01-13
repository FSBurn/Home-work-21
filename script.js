let userData = {
        'USD': 1000,
        'EUR': 900,
        'UAH': 15000,
        'BIF': 20000,
        'AOA': 100
    },
    bankData = {
        'USD': {
            max: 3000,
            min: 100,
            img: '💵'
        },
        'EUR': {
            max: 1000,
            min: 50,
            img: '💶'
        },
        'UAH': {
            max: 0,
            min: 0,
            img: '💴'
        },
        'GBP': {
            max: 10000,
            min: 100,
            img: '💷'
        }
    }

let getMoney = (userData, bankData) =>{
    return  new Promise(function (resolve, reject) {
        let checkBalance = confirm(`Посмотреть баланс на карте?`)
        checkBalance ? resolve(userData) :  reject({userData: userData, bankData: bankData});
    })
        .then(
            userData=>{
                let currency=Object.keys(userData);
                let checkBalance;
                do {
                    checkBalance = prompt(`Введите название валюты в формате: ${currency.join(', ')}`).toUpperCase()
                } while (!(currency.find(value => value===checkBalance)));
                console.log(`Баланс составляет ${userData[checkBalance]} ${checkBalance}`);

                return checkBalance
            }
        )
        .catch(
            (doubleObj)=>{
                let user = doubleObj.userData
                let bank = doubleObj.bankData
                let currency= [];
                for(let key in user){
                    for (let bankKey in bank){
                        if(key === bankKey && bank[bankKey].max !==0){
                            currency.push(key)
                        }
                    }
                }
                let checkValue
                do {
                    checkValue = prompt(`Введите валюту, по которой будет произведено снятие наличных: ${currency.join(', ')}`).toUpperCase()
                }while (!(currency.find(value => value===checkValue)));

                doubleObj.checkValue = checkValue;
                return Promise.reject(doubleObj)
            }
        )
        .catch(
            (doubleObj)=>{
                let user = doubleObj.userData
                let bank = doubleObj.bankData
                let currency = doubleObj.checkValue
                if(!currency){
                    return Promise.finally
                }
                let cashValue = +prompt(`Введите желаемую сумму`)
                if(!cashValue){
                    return Promise.finally
                }
                if(cashValue > bank[currency].max || cashValue > user[currency]){
                    console.log(`Введенная сумма больше допустимой. Ваш баланс составляет: ${user[currency]} ${currency}. Максимальная сумма снятия ${bank[currency].max} ${currency}`)
                }else if(cashValue < bank[currency].min) {
                    console.log(`Минимальная сумма снятия: ${bank[currency].min} ${currency}`)
                }else{

                    doubleObj.cashValue = cashValue
                }return Promise.reject(doubleObj)
            }
        )
        .catch(
            doubleObj =>{
                let bank = doubleObj.bankData
                let currency = doubleObj.checkValue
                let cash = doubleObj.cashValue
                if(!currency){
                    return Promise.finally
                }
                if(cash)console.log(`Вот Ваши денежки ${cash} ${currency} ${bank[currency].img}`)
            }
        )
        .finally(
            () => console.log(`Спасибо, хорошего дня 😊`)
        )
}
getMoney(userData,bankData)