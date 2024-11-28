# Table: GIECeldas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkGIELibros | int | NO |
| PkFkGIEHojas | int | NO |
| PkGIECeldas_Columna | int | NO |
| PkGIECeldas_Fila | int | NO |
| Calculo | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| OrdenExportacion | int | YES |
| CodigoExportacion | nvarchar | YES |
| DescripcionCalculo | nvarchar | YES |
