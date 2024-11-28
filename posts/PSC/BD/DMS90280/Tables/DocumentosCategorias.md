# Table: DocumentosCategorias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkDocumentos | smallint | NO |
| PkDocumentosCategorias_Iden | smallint | NO |
| FkDocumentosCategorias_Padre | smallint | YES |
| Descripcion | nvarchar | NO |
| Precarga | bit | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaBaja | datetime | YES |
| UrlImagen | nvarchar | YES |
| CategoriaTipos | nvarchar | YES |
