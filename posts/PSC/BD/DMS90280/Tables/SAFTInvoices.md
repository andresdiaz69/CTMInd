# Table: SAFTInvoices

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| FechaEnvioHashFactura | datetime | YES |
| InvoiceNo | nvarchar | NO |
| InvoiceStatus | nchar | NO |
| HashFactura | nvarchar | NO |
| HashControl | nvarchar | NO |
| Period | int | YES |
| InvoiceDate | datetime | NO |
| InvoiceType | nvarchar | NO |
| SelfBillingIndicator | bit | NO |
| SystemEntryDate | datetime | NO |
| TransactionID | nvarchar | NO |
| FkTerceros | int | NO |
| TaxPayable | decimal | NO |
| NetTotal | decimal | NO |
| GrossTotal | decimal | NO |
| CurrencyCode | nvarchar | NO |
| CurrencyCreditAmount | decimal | YES |
| CurrencyDebitAmount | decimal | YES |
| PaymentMechanism | nvarchar | YES |
| WithholdingTaxType | nvarchar | YES |
| WithholdingTaxDescription | nvarchar | YES |
| WithholdingTaxAmount | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SourceBilling | nvarchar | YES |
| NifCifContado | nvarchar | YES |
