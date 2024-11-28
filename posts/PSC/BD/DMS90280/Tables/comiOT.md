# Table: comiOT

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkAñoFactura | nvarchar | NO |
| PkFkSeries | nvarchar | NO |
| PkNumFactura | nvarchar | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkTerceros | int | YES |
| FechaFactura | datetime | YES |
| FkPagoFormas | nvarchar | YES |
| NifCif | nvarchar | YES |
| ImporteMO | decimal | YES |
| ImporteMAT | decimal | YES |
| ImporteSUB | decimal | YES |
| ImporteVarios | decimal | YES |
| ImportePint | decimal | YES |
| PkFkAñoOT | nvarchar | YES |
| PkFkSeries_OT | nvarchar | YES |
| PkFkNumOT | int | YES |
| PkFkNumTrabajo | tinyint | YES |
