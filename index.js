class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    if(!this.isAllowed()) {
      return false;
    } else {
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
    }
  }
}
class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}
//make amount private accessible to as few classes as possible set is 'on the left side of the operator' and get will be on the right side
class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    return this.transactions.reduce((acc, cv) => acc + cv.value, 0);
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
// const myAccount = new Account('snow-patrol');
// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);
const myAccount = new Account("billybob");

// `console.log("Starting Balance:", myAccount.balance);`

const t1 = new Deposit(220.0, myAccount);
t1.commit();
console.log(t1)
console.log(myAccount)
const t2 = new Withdrawal(50.0, myAccount);
t2.commit();
console.log(t1.amount)
const t3 = new Withdrawal(300, myAccount);
t3.commit();

console.log(myAccount.balance)
// console.log(t1.value)
// console.log("Ending Balance:", myAccount.balance);
// const t3 = new Withdrawal(60, myAccount)
// t2 = new Withdrawal(9.99);
// t2.commit();
// t3 = new Deposit(120.00);
// t3.commit();
// console.log('Transaction 3:', t3)
// console.log('Transaction 2:', t2);

// console.log('Balance:', balance);


// class Plant {
//   water() {
//     console.log(`Watering the ${this.type}`);
//     this.lastWatered = Date();
//   }
// }

// class Flower extends Plant {
//   constructor() {
//     super()
//     this.type = "flower";
//   }
// }

// class Tree extends Plant {
//   constructor() {
//     super()
//     this.type = "tree";
//   }
// }

// const rose = new Flower()
// rose.water()
