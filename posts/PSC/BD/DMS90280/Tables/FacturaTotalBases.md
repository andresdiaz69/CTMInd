# Table: FacturaTotalBases

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFacturaTotalBases_Iden | int | NO |
| BaseImponible | decimal | NO |
| Tasas | decimal | NO |
| IVAPorc | decimal | NO |
| ImporteIVA | decimal | NO |
| Total | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Portes | decimal | NO |
| Embalajes | decimal | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
