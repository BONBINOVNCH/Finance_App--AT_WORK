import { TotalBank } from "./BanksTypes";

export default interface TotalBalance {
    totalBanks: TotalBank[];
    totalAccounts: number;
    totalCurrentBalance: number;
}
