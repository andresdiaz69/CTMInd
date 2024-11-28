# Table: AsientoDesgloses

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFKAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkAsientoDesgloses_Iden | int | NO |
| ImporteDebe | decimal | NO |
| ImporteHaber | decimal | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | YES |
| FkCentros_Aux | smallint | YES |
| FkDepartamentos_Aux | nvarchar | YES |
| FkSecciones_Aux | int | YES |
