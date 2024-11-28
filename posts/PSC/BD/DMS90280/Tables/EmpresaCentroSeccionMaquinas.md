# Table: EmpresaCentroSeccionMaquinas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSecciones | int | NO |
| PkFkMaquinas | int | NO |
| GeneraSalidasAlmacen | bit | NO |
| FkSecciones_Salidas | int | YES |
| FkUbicaciones_Salidas | nvarchar | YES |
| FkEmpleados_Recambista | smallint | YES |
| FkEmpleados_Mecanico | smallint | YES |
| FkPagoFormas_Salidas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkPedidoTipoVentas | smallint | YES |
