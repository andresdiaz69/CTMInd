# Table: HojasGastosPersonal

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkHojasGastoPersonal_Iden | int | NO |
| FkTerceros | int | YES |
| FkGastosPersonalMotivos | nvarchar | NO |
| FechaDesde | datetime | NO |
| FechaHasta | datetime | NO |
| FkEmpleados | smallint | NO |
| Observaciones | nvarchar | YES |
| FechaBaja | datetime | YES |
| FkWFClasificaciones | nvarchar | YES |
| FkWFEntidades | smallint | YES |
| FkWFEstados | smallint | YES |
| UserMod | smallint | YES |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCentros | smallint | NO |
| FkAñoAsiento_Liquidacion | nvarchar | YES |
| FkAsientos_Liquidacion | int | YES |
| Liquidada | bit | NO |
| FkMotivosAbono | nvarchar | YES |
| FkEntidades | nvarchar | YES |
| FkMonedas | smallint | YES |
