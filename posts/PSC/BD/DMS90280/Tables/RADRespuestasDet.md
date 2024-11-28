# Table: RADRespuestasDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkRADRespuestas | int | NO |
| PkRADRespuestasDet_Iden | tinyint | NO |
| FkDocumentos | smallint | NO |
| FkDocumentosRespuestas | int | NO |
| FkPreguntas | int | NO |
| FkPreguntasRespuestas | int | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
