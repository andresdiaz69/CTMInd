# Table: EntidadesDesgloses

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkEntidades | nvarchar | NO |
| PkFkEntidadesDesdeHasta | smallint | NO |
| PkEntidadesDesgloses_Iden | smallint | NO |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkManoObraTipos | smallint | YES |
| FkCompraCanales | nvarchar | YES |
| FkVentaCanales | nvarchar | YES |
| Porcentaje | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTarifas | tinyint | YES |
