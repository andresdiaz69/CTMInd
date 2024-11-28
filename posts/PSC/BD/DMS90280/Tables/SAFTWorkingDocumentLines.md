# Table: SAFTWorkingDocumentLines

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkSAFTWorkingDocuments | nvarchar | NO |
| PkSAFTWorkingDocumentLines | int | NO |
| OriginatingON | nvarchar | YES |
| OrderDate | datetime | YES |
| ProductCode | nvarchar | NO |
| ProductDescription | nvarchar | NO |
| Quantity | decimal | NO |
| UnitOfMeasure | nvarchar | NO |
| UnitPrice | decimal | NO |
| TaxPointDate | datetime | NO |
| LineDescription | nvarchar | NO |
| DebitAmount | decimal | YES |
| CreditAmount | decimal | YES |
| TaxType | nvarchar | YES |
| TaxCountryRegion | nvarchar | YES |
| TaxCode | nvarchar | YES |
| TaxPercentage | decimal | YES |
| TaxAmount | decimal | YES |
| TaxExemptionReason | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TaxExemptionCode | nvarchar | YES |
