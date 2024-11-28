# Table: SAFTInvoiceLines

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkLineNumber | int | NO |
| OriginatingON | nvarchar | YES |
| OrderDate | datetime | YES |
| ProductCode | nvarchar | NO |
| ProductDescription | nvarchar | NO |
| Quantity | decimal | NO |
| UnitOfMeasure | nvarchar | NO |
| UnitPrice | decimal | NO |
| TaxPointDate | datetime | NO |
| CreditNote | nvarchar | YES |
| LineDescription | nvarchar | NO |
| DebitAmount | decimal | YES |
| CreditAmount | decimal | YES |
| TaxType | nvarchar | YES |
| TaxCountryRegion | nvarchar | YES |
| TaxCode | nvarchar | YES |
| TaxPercentage | decimal | YES |
| TaxExemptionReason | nvarchar | YES |
| SettlementAmount | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TaxAmount | decimal | YES |
| TaxExemptionCode | nvarchar | YES |
