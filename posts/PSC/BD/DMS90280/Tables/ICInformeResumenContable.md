# Table: ICInformeResumenContable

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkICInformes | smallint | NO |
| PkFkEmpresas | smallint | NO |
| PkFkContCtas | nvarchar | NO |
| PkFkCentros | smallint | NO |
| PkFechaAsiento | datetime | NO |
| PkICInformeResumenContable | int | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkTarifas | tinyint | YES |
| FkClasificacion1 | nvarchar | YES |
| FkDepartamentos_Aux | nvarchar | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkAsientoTipos | nvarchar | YES |
| ImporteDebe | decimal | YES |
| ImporteHaber | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
