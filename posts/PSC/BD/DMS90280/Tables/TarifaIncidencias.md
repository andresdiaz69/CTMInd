# Table: TarifaIncidencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTarifaIncidencias_Iden | tinyint | NO |
| Descripcion | nvarchar | NO |
| Procedimiento | nvarchar | NO |
| TipoProcedimiento | tinyint | NO |
| Orden | tinyint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| TipoIncidencia | tinyint | NO |
| FkColumna_Desde | nvarchar | YES |
| FkColumna_Hasta | nvarchar | YES |
| ProcedimientoAutoReparado | nvarchar | YES |
| DescripcionAutoReparado | nvarchar | YES |
| FechaMod | datetime | NO |
| ProcedimientoEliminarIncidencias | nvarchar | YES |
