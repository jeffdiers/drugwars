export class Shark {
  balance: number;
  interest: number;

  constructor() {
    this.balance = 5500;
    this.interest = 1.08;
  }

  addInterest() {
    this.balance = Math.floor(this.balance * this.interest);
  }

  canWithdraw(amount: number) {
    if (amount > this.balance) return false;
    return true;
  }
}
