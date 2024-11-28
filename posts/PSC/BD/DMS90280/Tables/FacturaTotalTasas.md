# Table: FacturaTotalTasas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFKEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| PkFkSeries | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFacturaTotalTasas_Iden | int | NO |
| Descripcion | nvarchar | NO |
| Importe | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMonedas | smallint | YES |
| FactorCambioMoneda | decimal | YES |
