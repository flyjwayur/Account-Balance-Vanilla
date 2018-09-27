console.log("hello");

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
    { income: 10000, description: "salary" },
    { income: 5000, description: "freelance" },
    { income: 3000, description: "stock" }
],[
    { expense: 500, description: "electricity" },
    { expense: 100, description: "water" },
    { expense: 40, description: "coffee" }
]);

console.log(account1.totalIncome);
console.log(account1.totalExpense);
console.log(account1.totalBalance);
