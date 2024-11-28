# Table: ProcesosFicheros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkModulos | nvarchar | NO |
| PkFkIntegracion | smallint | NO |
| PkFkFicheros | smallint | NO |
| PkProcesosFicheros_Iden | int | NO |
| FkProcesos | int | NO |
| NombreFichero | nvarchar | NO |
| FicheroProcesado | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaProcesado | datetime | YES |
