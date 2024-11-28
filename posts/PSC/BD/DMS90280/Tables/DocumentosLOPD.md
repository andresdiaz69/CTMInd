# Table: DocumentosLOPD

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkDocumentosLOPD_Iden | smallint | NO |
| Nombre | nvarchar | NO |
| MesesValidezConsentimiento | tinyint | NO |
| FkDocumentos | smallint | NO |
| FkModulos | nvarchar | NO |
| FkInformes | smallint | NO |
| Precarga | bit | NO |
| FechaBaja | datetime | YES |
| FkImportadoras | int | YES |
| FkMarcas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| Tacito | bit | YES |
| LogicaImpresion | tinyint | YES |
