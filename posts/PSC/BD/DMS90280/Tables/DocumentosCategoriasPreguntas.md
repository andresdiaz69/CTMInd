# Table: DocumentosCategoriasPreguntas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkDocumentos | smallint | NO |
| PkFkDocumentosCategorias | smallint | NO |
| PkFkPreguntas | int | NO |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| Orden | smallint | YES |
| Obligatorio | bit | NO |
| Observaciones | nvarchar | YES |
| MesesValidez | tinyint | YES |
| FkPreguntas_Obligatoria | int | YES |
| Coordenadas | nvarchar | YES |
| FkComponenteMovilTipos | tinyint | YES |
| FkIconosMoviles | smallint | YES |
