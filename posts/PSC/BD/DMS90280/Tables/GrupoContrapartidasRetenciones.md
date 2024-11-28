# Table: GrupoContrapartidasRetenciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkSerieTipos | nvarchar | NO |
| PkFkAsientoPredefinidos | int | NO |
| PkFkGrupoPartidas | int | NO |
| PkFkGrupoContrapartidas | int | NO |
| PkFkRegimenContable | nvarchar | NO |
| PkFkTipoContibuyente | nvarchar | NO |
| PkFkTipoRetenciones | smallint | NO |
| PkFkRetenciones | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTipoRetencionesInterno | tinyint | YES |
| FkServicioTipos | smallint | YES |
