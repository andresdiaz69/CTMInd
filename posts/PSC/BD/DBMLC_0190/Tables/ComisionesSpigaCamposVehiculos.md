# Table: ComisionesSpigaCamposVehiculos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| FkMarcas | smallint | NO |
| Marca | nvarchar | NO |
| FkGamas | smallint | NO |
| Gama | nvarchar | NO |
| FkCodModelo | nvarchar | NO |
| Modelo | nvarchar | NO |
| FkVersiones | nvarchar | YES |
| Version | nvarchar | NO |
| PkCentros | smallint | NO |
| Centro | nvarchar | NO |
| Matricula | nvarchar | YES |
| FkAñoModelo | nvarchar | NO |
| KMS | int | YES |
| IdTercerosPropietario | int | NO |
| UltimaEntradaTaller | datetime2 | YES |
| FechaVenta | datetime2 | NO |
| FechaFactura | date | YES |
