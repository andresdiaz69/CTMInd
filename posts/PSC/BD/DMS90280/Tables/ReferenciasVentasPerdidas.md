# Table: ReferenciasVentasPerdidas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkReferenciasVentasPerdidas_Iden | int | NO |
| FkMR | nvarchar | NO |
| FkReferencias | nvarchar | NO |
| FkEmpleados | smallint | NO |
| Fecha | datetime | NO |
| Unidades | decimal | NO |
| Observaciones | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkMotivosVentaPerdida | nvarchar | YES |
| PrecioVenta | decimal | YES |
