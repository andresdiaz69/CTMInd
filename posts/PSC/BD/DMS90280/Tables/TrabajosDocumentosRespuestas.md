# Table: TrabajosDocumentosRespuestas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkDocumentos | smallint | NO |
| PkFkDocumentosRespuestas | int | NO |
| PkFkPreguntas | int | NO |
| PkFkPreguntasRespuestas | int | NO |
| Descripcion | nvarchar | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkTerceros | int | YES |
| FkActividad | smallint | YES |
| FkActividadDet | smallint | YES |
| FkMotivosRechazoTipos | smallint | YES |
| GeneraActividadRechazo | bit | YES |
| FkActividad_Rechazo | smallint | YES |
| FkActividadDet_Rechazo | smallint | YES |
| ImporteMORechazo | decimal | YES |
| ImporteMATRechazo | decimal | YES |
| FkAñoPresupuesto | nvarchar | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FkEmpleados | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
