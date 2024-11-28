# Table: ObservacionesFactura

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkObservacionesFactura_Iden | smallint | NO |
| FkSecciones | int | YES |
| FkSeccionCargos | nvarchar | YES |
| Descripcion | nvarchar | NO |
| FechaInicio | datetime | NO |
| FechaFin | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
