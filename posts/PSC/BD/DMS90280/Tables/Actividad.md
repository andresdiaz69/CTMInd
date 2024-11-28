# Table: Actividad

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkActividad_Iden | smallint | NO |
| FkEmpleados | smallint | NO |
| FechaAlta | datetime | NO |
| FechaCierre | datetime | YES |
| FkDepartamentos | nvarchar | YES |
| Origen | nvarchar | YES |
| FkActividadesTipos | smallint | NO |
| FkActividadesCierresTipos | smallint | YES |
| Asunto | nvarchar | YES |
| Resumen | nvarchar | YES |
| Conclusiones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEquivalencias | smallint | YES |
| FkActividadEstadoTipos | smallint | YES |
| DatosExternos | nvarchar | YES |
| Contacto | nvarchar | YES |
| Importancia | nvarchar | YES |
| FechaVencimiento | datetime | YES |
