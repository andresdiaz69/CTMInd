# Table: RADRespuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkRADRespuestas | int | NO |
| FkSkRecepcionesActivas | int | NO |
| FechaProcesado | datetime | NO |
| FkEmpleados_Procesado | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkAñoPrespuesto | nvarchar | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| DescripcionPreguntaRespuesta | nvarchar | YES |
