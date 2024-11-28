# Table: Periodificaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkPeriodificaciones_Iden | int | NO |
| Descripcion | nvarchar | YES |
| FkPeriodificacionesTipos | smallint | NO |
| FkAñoAsiento_Vinculacion | nvarchar | YES |
| FkAsientos_Vinculacion | int | YES |
| MesInicio | tinyint | YES |
| Importe | decimal | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaAlta | datetime | NO |
| AñoPeriodificacion | nvarchar | YES |
| FkTerceros | int | YES |
| FkEntidades | nvarchar | YES |
