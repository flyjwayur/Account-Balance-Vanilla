// ID generator
function userIdGenerator() {
    let userId = "";
    const lettersNumbers =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let lengthOfnumLet = lettersNumbers.length;
    
    for (var i = 0; i < 7; i++) {
        userId += lettersNumbers[Math.floor(Math.random() * lengthOfnumLet)];
    }
    return userId;
    }


// Get the current time and display the time
function displayDateTime() {
    let now = new Date();
    let day = now.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let month = now.getMonth();
    if (month < 10) {
        month = "0" + month;
    }
    let year = now.getFullYear();
    let hours = now.getHours();
    if (hours < 10) {
        hours = "0" + month;
    }
    let minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Account Template 
class Account {
    constructor(incomes, expenses){
        this.incomes = incomes;
        this.expenses = expenses;
    }
    
    get totalIncome(){
        return this.calTotalIncome();
    }

    get totalExpense(){
        return this.calTotalExpense();
    }

    get totalBalance(){
        return this.calAccountBalance();
    }
    
    addIncome(){
        let description = document.querySelector('.description_input').value;
        let income = parseInt(document.querySelector('.amount_input').value);
        let id = userIdGenerator();
        let date = displayDateTime();
        this.incomes.push({id, description, income, date});
    }

    addExpense(){
        let description = document.querySelector('.description_input').value;
        let expense = parseInt(document.querySelector('.amount_input').value);
        let id = userIdGenerator();
        let date = displayDateTime();
        this.expenses.push({id, description, expense, date});
    }
    
    calTotalIncome(){
        return this.incomes.reduce((acc, curr)=>{
            return acc + curr.income;
        }, 0)  
    }

    calTotalExpense(){
        return this.expenses.reduce((acc, curr)=>{
            return acc + curr.expense;
        }, 0)  
    }

    calAccountBalance(){
        let balance = this.totalIncome - this.totalExpense;
        return balance;
    }
    
}

// Default values for account;
const newAccount = new Account([
    { id: "3zMiqCl", description: "salary", income: 10000, date: "01/08/2018 03:56" },
    { id: "x57C2vS", description: "freelance", income: 5000, date: "12/08/2018 15:20" },
    { id: "3ZcJbBi", description: "stock", income: 3000,  date: "28/08/2018 18:56"}
],[
    { id: "epCkk7N", description: "electricity", expense: 500, date: "03/09/2018 12:00" },
    { id: "Fc2TJzk", description: "water", expense: 100, date: "15/09/2018 13:21" },
    { id: "3tQpoxb", description: "coffee", expense: 40, date: "26/08/2018 19:17" }
]);


/***** Empty the input with unmatched Regex *****/
//It validates when the input is number
 const conformInputNumValid = (input) => {  
    input.value = input.value.replace(/[^0-9]/,'');
 }

 /* It validates when the input is letter
 It also allows the empty space between letters */
const conformInputLetterValid = (input) => {
     input.value = input.value.replace(/[^A-Za-z ]/,'');
 }


//Check validation of inputs and push the data to income & expense array
const addDataAfterValidation = () => {
    let input_type = document.querySelector('#input_type').value;
    let description = document.querySelector('.description_input').value;
    let income = parseInt(document.querySelector('.amount_input').value);
    if ((!Number.isNaN(income)) && (description !== "")) {
        (input_type == 'income') ? newAccount.addIncome() : newAccount.addExpense();
    }else{
        alert("Please type description and amount"); 
    }
}

//Clean the child element of selected DOM node
const cleanDisplayedhtml = (income_display, expense_display, balance_display) => {
    while (income_display.firstChild) {
        income_display.removeChild(income_display.firstChild);
    }

    while (expense_display.firstChild) {
        expense_display.removeChild(expense_display.firstChild);
    }

    while (balance_display.firstChild) {
        balance_display.removeChild(balance_display.firstChild);
    }
}


//Display the inforamtion of account and remove when display new account
const displayAccount = () => {
    const income_display = document.querySelector('.income_display');
    const expense_display = document.querySelector('.expense_display');
    const balance_display = document.querySelector('.balance_display');
    cleanDisplayedhtml(income_display, expense_display, balance_display);

    for(let {description, income, date} of newAccount.incomes) {

        income_display.insertAdjacentHTML('afterbegin',
        `<p>${description.toUpperCase()} <span>${income}</span> ${date}</p>`);
    }
    
    for(let {description, expense, date} of newAccount.expenses) {
        expense_display.insertAdjacentHTML('afterbegin',
        `<p>${description.toUpperCase()} <span>${expense}</span> ${date}</p>`);
    }
    balance_display.textContent = `Net : ${newAccount.totalBalance} \u20AC`;
    
}

// Add button and eventlistner 
const add_info_btn = document.querySelector('.add_info_btn');

add_info_btn.addEventListener("click", () => { 
    addDataAfterValidation();
    displayAccount();
    console.log(newAccount);
});

//Default display
displayAccount();

