# Table: ICInformeCuentas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkICInformes | smallint | NO |
| PkICInformeCuentas | int | NO |
| FkICInformeDCI | int | YES |
| FkEmpresas | smallint | NO |
| FkContCtas | nvarchar | NO |
| FkCentros | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkClasificacion1 | nvarchar | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkDepartamentos_Aux | nvarchar | YES |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaAsignacion | datetime | YES |
