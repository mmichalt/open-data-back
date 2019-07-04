"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const budgetSpending_1 = require("./budgetSpending");
class FinanceData {
    constructor() {
        this.fillRandomData = () => {
            const arr = [];
            for (let i = 0; i < 10000; ++i) {
                const money = Math.floor(Math.random() * Math.floor(2000) + 1);
                const type = Math.floor(Math.random() * Math.floor(9));
                const ddate = new Date((new Date().getFullYear() - 10
                    + Math.floor(Math.random() * Math.floor(10))) + '-'
                    + (Math.floor(Math.random() * Math.floor(11)) + 1) + '-'
                    + (Math.floor(Math.random() * Math.floor(28)) + 1));
                arr.push({
                    spendingType: type,
                    date: ddate,
                    amountOfMoney: money,
                    description: "",
                    index: i + 1,
                    spendingTypeText: budgetSpending_1.BudgetSpendingType[type]
                });
            }
            return arr;
        };
        this.data = this.fillRandomData();
    }
}
exports.FinanceData = FinanceData;
//# sourceMappingURL=financeData.js.map