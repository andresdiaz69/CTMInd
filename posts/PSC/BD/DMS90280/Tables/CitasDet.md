# Table: CitasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCitas | int | NO |
| PkCitasDet_Iden | smallint | NO |
| Descripcion | nvarchar | NO |
| FkSecciones | int | NO |
| FkSeccionCargos | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkTallerKits | nvarchar | YES |
| UT | int | YES |
| FkEmpleados | smallint | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries_OT | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkMarcas | smallint | YES |
| FkTallerCampañas | nvarchar | YES |
| FkCampañaVariante | nvarchar | YES |
| FkTerceros | int | YES |
| NumValoracion | nvarchar | YES |
| FkAñoPresupuesto | nvarchar | YES |
| FkSeries_Presupuesto | nvarchar | YES |
| FkNumPresupuesto | int | YES |
| FechaMod | datetime | NO |
| FkCentros_CargoInterno | smallint | YES |
| FkDepartamentos_CargoInterno | nvarchar | YES |
| FkImputacionTipos_CargoInterno | smallint | YES |
| FkSecciones_CargoInternoDestino | int | YES |
| FkManoObraAgrupamiento | int | YES |
| FkDocumentos | smallint | YES |
| FkDocumentosRespuestas | int | YES |
| FkPreguntas | int | YES |
| FkPreguntasRespuestas | int | YES |
