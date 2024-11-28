# Table: Empleados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEmpleados_Iden | smallint | NO |
| FkProfesiones | smallint | YES |
| FkTerceros | int | NO |
| FkPagoFormaNominas | nvarchar | NO |
| NumeroSS | nvarchar | YES |
| PorcRetencion | decimal | YES |
| CuentaEntidad | nvarchar | YES |
| CuentaSucursal | nvarchar | YES |
| CuentaDC | nvarchar | YES |
| CuentaNumero | nvarchar | YES |
| FkPaises_Cuentas | nvarchar | YES |
| CuentaIBAN | nvarchar | YES |
| CuentaSwift | nvarchar | YES |
| FkUsuarios | smallint | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkEmpleadoCuentaBancoTipos | nvarchar | YES |
| FechaMod | datetime | NO |
| CosteHora | decimal | YES |
