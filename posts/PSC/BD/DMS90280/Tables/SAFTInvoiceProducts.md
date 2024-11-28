# Table: SAFTInvoiceProducts

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkSAFTInvoiceProducts_Iden | int | NO |
| ProductType | nvarchar | YES |
| ProductCode | nvarchar | YES |
| ProductDescription | nvarchar | YES |
| ProductNumberCode | nvarchar | YES |
| CVProductCode | nvarchar | YES |
| UNNumber | nvarchar | YES |
| UOMBase | nvarchar | YES |
| UOMConversionFactor | decimal | YES |
| TaxType | nvarchar | YES |
| TaxCode | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
