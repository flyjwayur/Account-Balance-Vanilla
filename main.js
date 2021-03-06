// ID generator -
// With execution time test, userIdGenerator fn is a little bit faster than generateUUID
console.time("fn#1");
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
console.timeEnd("fn#1");

/*
console.time("fn#2");
function generateUUID(idLength = 7) {
    let id = new Array(idLength);
        
    // Generate random number or character
    let uuidArr = [...id].map(curr => {
        let randomNum = Math.floor(Math.random() * 36);
        let randomNumToStr = randomNum.toString(36);
        let isUppercase = Math.random() > 0.5;
        
        return (curr = isUppercase ? randomNumToStr.toUpperCase() : randomNumToStr);
    });
        
    // Join the uuid array
    let uuid = uuidArr.join("");
        
    return uuid;
    }
console.timeEnd("fn#2");
*/

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
  constructor(incomes, expenses) {
    this.incomes = incomes;
    this.expenses = expenses;
  }

  get totalIncome() {
    return this.calTotalIncome();
  }

  get totalExpense() {
    return this.calTotalExpense();
  }

  get totalBalance() {
    return this.calAccountBalance();
  }

  addIncome() {
    let description = document.querySelector(".description_input").value;
    let income = parseInt(document.querySelector(".amount_input").value);
    let date = displayDateTime();
    this.incomes.push({ description, income, date });
    // Save income data to localStorage
    localStorage.setItem("incomes", JSON.stringify(this.incomes, undefined, 4));
  }

  addExpense() {
    let description = document.querySelector(".description_input").value;
    let expense = parseInt(document.querySelector(".amount_input").value);
    let date = displayDateTime();
    this.expenses.push({ description, expense, date });
    // Save expenses to localStorage
    localStorage.setItem("expenses", JSON.stringify(this.expenses, undefined, 4));
  }

  calTotalIncome() {
    const incomesObj = JSON.parse(localStorage.getItem("incomes"));
    return incomesObj.reduce((acc, curr) => {
      return acc + curr.income;
    }, 0);
  }

  calTotalExpense() {
    const expensesObj = JSON.parse(localStorage.getItem("expenses"));
    return expensesObj.reduce((acc, curr) => {
      return acc + curr.expense;
    }, 0);
  }

  calAccountBalance() {
    let balance = this.totalIncome - this.totalExpense;
    return balance;
  }
}

// Default values for account;
const newAccount = new Account(
  [
    { description: "salary", income: 10000, date: "01/08/2018 03:56" }
  ],
  [
    { description: "coffee", expense: 500, date: "03/08/2018 11:00" }
  ]
);

/***** Empty the input with unmatched Regex *****/
//It validates when the input is number
const conformInputNumValid = input => {
  input.value = input.value.replace(/[^0-9]/, "");
};

/* It validates when the input is letter
 It also allows the empty space between letters */
const conformInputLetterValid = input => {
  input.value = input.value.replace(/[^A-Za-z ]/, "");
};

//Check validation of inputs and push the data to income & expense array
const addDataAfterValidation = () => {
  let input_type = document.querySelector("#input_type").value;
  let description = document.querySelector(".description_input").value;
  let income = parseInt(document.querySelector(".amount_input").value);
  if (!Number.isNaN(income) && description !== "") {
    input_type == "income" ? newAccount.addIncome() : newAccount.addExpense();
  } else {
    alert("Please type description and amount");
  }
};

//Clean the child element of selected DOM node
const cleanDisplayedhtml = (
  income_display,
  expense_display,
  balance_display
) => {
  while (income_display.firstChild) {
    income_display.removeChild(income_display.firstChild);
  }

  while (expense_display.firstChild) {
    expense_display.removeChild(expense_display.firstChild);
  }

  while (balance_display.firstChild) {
    balance_display.removeChild(balance_display.firstChild);
  }
};


//Display the inforamtion of account and remove when display new account
const displayAccount = () => {
  const income_display = document.querySelector(".income_display");
  const expense_display = document.querySelector(".expense_display");
  const balance_display = document.querySelector(".balance_display");

  cleanDisplayedhtml(income_display, expense_display, balance_display);

  const incomesObj = JSON.parse(localStorage.getItem("incomes"));
  const expensesObj = JSON.parse(localStorage.getItem("expenses"));

  if(localStorage.getItem('incomes') == null || localStorage.getItem('expenses') == null){
    for (let { description, income, date } of newAccount.incomes) {
      income_display.insertAdjacentHTML(
        "afterbegin",
        `<li id=${userIdGenerator()}><span class="desc_span">${description.toUpperCase()}</span>
        <span class="amount_span">${income}</span> <span class="date_span">${date}</span></li>`
      );
    }
  
    for (let { description, expense, date } of newAccount.expenses) {
      expense_display.insertAdjacentHTML(
        "afterbegin",
        `<li id=${userIdGenerator()}><span class="desc_span">${description.toUpperCase()}</span>
        <span class="amount_span"> -${expense}</span> <span class="date_span">${date}</span></li>`
      );
    }
    balance_display.textContent = `Net : ${newAccount.incomes[0].income - newAccount.expenses[0].expense} \u20AC`;
  }


 if(localStorage.getItem('incomes') !== null && localStorage.getItem('expenses') !== null){
  for (let { description, income, date } of incomesObj) {
    income_display.insertAdjacentHTML(
      "afterbegin",
      `<li id=${userIdGenerator()}><span class="desc_span">${description.toUpperCase()}</span>
      <span class="amount_span">${income}</span> <span class="date_span">${date}</span></li>`
    );
  }

  for (let { description, expense, date } of expensesObj) {
    expense_display.insertAdjacentHTML(
      "afterbegin",
      `<li id=${userIdGenerator()}><span class="desc_span">${description.toUpperCase()}</span>
      <span class="amount_span"> -${expense}</span> <span class="date_span">${date}</span></li>`
    );
  }
  balance_display.textContent = `Net : ${newAccount.totalBalance} \u20AC`;
 }
};

// Add button and eventlistner
const add_info_btn = document.querySelector(".add_info_btn");

add_info_btn.addEventListener("click", () => {
  addDataAfterValidation();
  displayAccount();
  console.log(newAccount);
});

//Default display
displayAccount();

