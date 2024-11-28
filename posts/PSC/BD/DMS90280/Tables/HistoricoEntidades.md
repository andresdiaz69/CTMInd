# Table: HistoricoEntidades

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEntidad | nvarchar | NO |
| PkKeyEntidad | nvarchar | NO |
| PkHistoricoEntidades_Iden | int | NO |
| Tabla | nvarchar | NO |
| FechaOperacion | datetime | NO |
| Operacion | nvarchar | YES |
| UserModLog | nvarchar | NO |
| HostModLog | nvarchar | NO |
| EmpleadoLog | nvarchar | NO |
| CamposModificados | nvarchar | NO |
| ValoresModificados | nvarchar | NO |
| EmpleadoProgramacion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkHistoricoEntidadesClasificaciones | tinyint | NO |
| FkHistoricoEntidadesProgramaciones | int | YES |
