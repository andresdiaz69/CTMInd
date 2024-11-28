# Table: EmpleadosFacturacion

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkEmpleados | smallint | NO |
| PkEmpleadosFacturacionAño | nvarchar | NO |
| PkEmpleadosFacturacionMes | tinyint | NO |
| PkFkEmpresas_Destino | smallint | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkContCtas_IngresoFijo | nvarchar | NO |
| FkContCtas_IngresoVariable | nvarchar | NO |
| FkContCtas_GastoFijo | nvarchar | NO |
| FkContCtas_GastoVariable | nvarchar | NO |
| FkAsientos | int | YES |
| FkAsientos_Destino | int | YES |
| PorcFacturacion | decimal | NO |
| ImporteFijo | decimal | YES |
| ImporteVariable | decimal | YES |
| PorcIva | decimal | YES |
| ImporteIva | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkImpuestos | nvarchar | YES |
| FkTextoSistema_CWS | int | YES |
| FkTextoSistema_EI | int | YES |
| PkEmpleadosFacturacion_Iden | int | NO |
| FactorCambioMonedaContravalor | decimal | YES |
