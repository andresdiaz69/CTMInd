# Table: EfectoIncidencias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkEfectosNumDet | smallint | NO |
| PkEfectoIncidenciasNumDet_Iden | smallint | NO |
| Descripcion | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaAlta | datetime | NO |
| FkSituacionEfectos | tinyint | YES |
| FkAñoAsiento_Incidencias | nvarchar | YES |
| FkAsientos_Incidencias | int | YES |
| Importe | decimal | YES |
| Automatica | bit | NO |
| FkEmpleados | smallint | YES |
| FkSituacionEfectos_Anterior | tinyint | YES |
| FkAñoAsiento_Saldar | nvarchar | YES |
| FkAsientos_Saldar | int | YES |
| FkAñoAsiento_Emision | nvarchar | YES |
| FkAsientos_Emision | int | YES |
| FkAñoAsiento_Remesa | nvarchar | YES |
| FkAsientos_Remesa | int | YES |
| FechaMod | datetime | NO |
| PorcProvisiones | decimal | YES |
| FkCentros | smallint | YES |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| ConceptoAsiento | nvarchar | YES |
