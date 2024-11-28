# Table: SAFTWorkingDocuments

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkSAFTWorkingDocuments | nvarchar | NO |
| FechaEnvioHashDocumento | datetime | YES |
| AñoDocumento | nvarchar | NO |
| DocumentNumber | nvarchar | NO |
| WorkStatus | nvarchar | NO |
| WorkStatusDate | datetime | NO |
| Reason | nvarchar | YES |
| WorkStatusSourceID | nvarchar | YES |
| HashDocumento | nvarchar | NO |
| HashControl | nvarchar | NO |
| Period | int | YES |
| WorkDate | datetime | YES |
| WorkType | nvarchar | YES |
| SourceID | nvarchar | NO |
| EACCode | nvarchar | YES |
| SystemEntryDate | datetime | NO |
| FkTerceros | int | NO |
| TaxPayable | decimal | NO |
| NetTotal | decimal | NO |
| GrossTotal | decimal | NO |
| CurrencyCode | nvarchar | YES |
| CurrencyAmount | decimal | YES |
| ExchangeRate | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdCentros | smallint | YES |
| IdSeries | nvarchar | YES |
