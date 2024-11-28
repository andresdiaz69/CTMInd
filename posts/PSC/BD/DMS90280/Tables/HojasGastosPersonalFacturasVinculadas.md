# Table: HojasGastosPersonalFacturasVinculadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkHojaGastosPersonal | int | NO |
| PkFkSeriesFactura | nvarchar | NO |
| PkFkNumFactura | nvarchar | NO |
| PkFkAñoFactura | nvarchar | NO |
| PkFkTerceros | int | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Importe | decimal | YES |
| FkMonedas | smallint | YES |
