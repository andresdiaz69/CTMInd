# Table: ReferenciasRelacionesTarifa

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkProcesos | int | NO |
| PkFkMR | nvarchar | NO |
| PkFkReferencias | nvarchar | NO |
| PkFkMR_R | nvarchar | NO |
| PkFkReferencias_R | nvarchar | NO |
| Unidades | decimal | NO |
| Unidades_R | decimal | NO |
| FkReferenciaRelacionTipos | nvarchar | YES |
| FechaAlta | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TarifaActual | bit | YES |
