$database = 'OpenData'
$server = 'COLT'
$table = 'dbo.FinanceData'
Import-CSV .\financeData.csv | ForEach-Object {
    Write-Output "set identity_insert $table on insert into $table values (
		$($_.index),$($_.spendingType),$($_.amountOfMoney),'',$($_.spendingTypeText), $($_.date)
	) set identity_insert $table off"
    Invoke-Sqlcmd -Database $database -ServerInstance $server -Query "set identity_insert $table on insert into $table ([index], [spendingType],[amountOfMoney],[description],[spendingTypeText], [date]) values ($($_.index),$($_.spendingType),$($_.amountOfMoney),'','$($_.spendingTypeText)', '$($_.date)') set identity_insert $table off" -Verbose
}
