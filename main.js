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
        let amount = parseInt(document.querySelector('.amount_input').value);
        return this.incomes.push({description, amount});
    }

    addExpense(){
        let description = document.querySelector('.description_input').value;
        let amount = parseInt(document.querySelector('.amount_input').value);
        return this.expenses.push({description, amount});
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


const account1 = new Account([
    { description: "salary", income: 10000  },
    { description: "freelance", income: 5000 },
    { description: "stock", income: 3000 }
],[
    { description: "electricity", expense: 500 },
    { description: "water", expense: 100 },
    { description: "coffee", expense: 40 }
]);


const checkInputType = () => {
    let input_type = document.querySelector('#input_type');
    console.log(input_type.value);
    (input_type.value == 'income') ? account1.addIncome() : account1.addExpense();
}

const add_info_btn = document.querySelector('.add_info_btn');
add_info_btn.addEventListener("click", () => { 
    checkInputType();
    console.log(account1.incomes);
    console.log(account1.expenses);
});

console.log(account1.totalIncome);
console.log(account1.totalExpense);
console.log(account1.totalBalance);
