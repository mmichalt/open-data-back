import {BudgetSpendingType, IBudgetSpending} from "./budgetSpending";

export class FinanceData {
    public data: IBudgetSpending[];
    constructor() {
        this.data = this.fillRandomData();
    }
    private fillRandomData = (): IBudgetSpending[] => {
        const arr = [];
        for (let i = 0; i < 10000; ++i) {
            const money = Math.floor(Math.random() * Math.floor(2000) + 1);
            const type = Math.floor(Math.random() * Math.floor(9));
            const ddate = new Date((new Date().getFullYear() - 10
                + Math.floor(Math.random() * Math.floor(10))) + '-'
                + (Math.floor(Math.random() * Math.floor(11))  + 1) + '-'
                + (Math.floor(Math.random() * Math.floor(28)) + 1));
            arr.push({
                spendingType: type,
                date: ddate,
                amountOfMoney: money,
                description: "",
                index: i + 1,
                spendingTypeText: BudgetSpendingType[type]
            });
        }
        return arr;
    }
}
