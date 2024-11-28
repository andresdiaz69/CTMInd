# Table: tramite16185C

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSerieTipos | nvarchar | NO |
| PkFkAsientoPredefinidos | int | NO |
| PkFkGrupoPartidas | int | NO |
| PkGrupoContrapartidas_Iden | int | NO |
| FkContCtas | nvarchar | NO |
| BaseImponible | bit | NO |
| BaseExenta | bit | NO |
| BaseNoSujeta | bit | NO |
| Coste | bit | NO |
| Signo | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Consolidacion | nvarchar | YES |
