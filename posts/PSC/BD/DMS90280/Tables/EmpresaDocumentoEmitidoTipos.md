# Table: EmpresaDocumentoEmitidoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkDocumentoEmitidoTipos | smallint | NO |
| FkProveedoresComprobantesElectronicos | smallint | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FechaActivacion | datetime | YES |
| Emitido | bit | NO |
| Recibido | bit | NO |
| FkProveedoresComprobantesElectronicosAlternativo | smallint | YES |
