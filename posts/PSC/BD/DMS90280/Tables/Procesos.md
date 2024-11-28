# Table: Procesos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkProcesos | int | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkFicheros | smallint | NO |
| FkEmpresas | smallint | NO |
| FkCentros | smallint | NO |
| FechaAlta | datetime | NO |
| FechaFin | datetime | YES |
| FechaProcesado | datetime | YES |
| Procesando | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
