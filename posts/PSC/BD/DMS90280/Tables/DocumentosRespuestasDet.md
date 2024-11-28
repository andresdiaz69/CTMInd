# Table: DocumentosRespuestasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkDocumentos | smallint | NO |
| PkFkDocumentosRespuestas | int | NO |
| PkFkPreguntas | int | NO |
| PkFkPreguntasRespuestas | int | NO |
| ValorBool | bit | YES |
| ValorText | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ValorFecha | datetime | YES |
| Comentario | nvarchar | YES |
| FechaModificacion | datetime | YES |
| FechaExpiracion | datetime | YES |
| FkAceptacionRespuestaTipos | smallint | YES |
| FkEmpresas_TallerKits | smallint | YES |
| FkMarcas_TallerKits | smallint | YES |
| FkTallerKits | nvarchar | YES |
| CodTallerKitExterno | nvarchar | YES |
