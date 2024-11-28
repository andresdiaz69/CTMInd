# Table: PreparacionCita

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkAñoPreparacionCita | nvarchar | NO |
| PkFkSeries_Preparacion | nvarchar | NO |
| PkNumPreparacionCita | int | NO |
| FkDocumentos | smallint | YES |
| FkDocumentosRespuestas | int | YES |
| FechaAlta | datetime | NO |
| Observaciones | nvarchar | YES |
| FkEmpleados | smallint | NO |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| CodModelo | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ImprimirContestadas | bit | NO |
