export interface Guest {
  id: number;
  name: string;
  confirmed: boolean;
}

export interface Expense {
  id: number;
  item: string;
  amount: number;
}

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export interface IWeddingManager {
  calculateTotal(expenses: Expense[]): number;
  formatPrice(amount: number): string;
  calculateProgress(guests: Guest[]): number;
}

export class WeddingManager implements IWeddingManager {
  calculateTotal(expenses: Expense[]): number {
    return expenses.reduce((sum, curr) => sum + curr.amount, 0);
  }

  formatPrice(amount: number): string {
    return amount.toLocaleString() + " €";
  }

  calculateProgress(guests: Guest[]): number {
    if (guests.length === 0) return 0;

    const confirmed = guests.filter((g) => g.confirmed).length;
    return Math.round((confirmed / guests.length) * 100);
  }
}
export default WeddingManager;