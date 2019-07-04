export interface IBudgetSpending {
    spendingType: BudgetSpendingType;
    date: Date;
    amountOfMoney: number;
    description: string;
    spendingTypeText: string;
    index: number;
}

export enum BudgetSpendingType {
    ART,
    EDUCATION,
    GOVERNANCE,
    INTERGOVERNMENTAL_TRANSFERS,
    SOCIAL_WELFARE,
    SOCIETY_DEFENCE,
    SPORT,
    TRANSPORT_ROADS_HOUSEHOLD,
    UTILITIES
}
