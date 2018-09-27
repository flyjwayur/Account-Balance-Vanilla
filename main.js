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
        this.incomes.push({description, income});
    }

    addExpense(){
        let description = document.querySelector('.description_input').value;
        let expense = parseInt(document.querySelector('.amount_input').value);
        this.expenses.push({description, expense});
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
    { description: "salary", income: 10000  },
    { description: "freelance", income: 5000 },
    { description: "stock", income: 3000 }
],[
    { description: "electricity", expense: 500 },
    { description: "water", expense: 100 },
    { description: "coffee", expense: 40 }
]);


//Empty the input with unmatched Regex 
 const conformInputNumValid = (input) => {
     let regex = /[^0-9]/;
     console.log(regex.test(input.value));
     if(regex.test(input.value)){
         input.value = input.value.replace(/[^0-9]/,'');
     }
 }

const conformInputLetterValid = (input) => {
     let regex = /[^A-Za-z]/;
     console.log(regex.test(input.value));
     if(regex.test(input.value)){
     input.value = input.value.replace(/[^A-Za-z]/,'');
 }
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

    for(let {description, income} of newAccount.incomes) {
        const p = document.createElement('p');
        p.textContent = `Income: ${description} ${income}`;
        income_display.appendChild(p);
    }
    
    for(let {description, expense} of newAccount.expenses) {
        const p = document.createElement('p');
        p.textContent = `Expense: ${description} ${expense}`;
        expense_display.appendChild(p);
    }

    balance_display.textContent = `Net : ${newAccount.totalBalance} \u20AC`;
    
}

// Add button and eventlistner 
const add_info_btn = document.querySelector('.add_info_btn');

add_info_btn.addEventListener("click", () => { 
    addDataAfterValidation();
    displayAccount();
});

//Default display
displayAccount();
