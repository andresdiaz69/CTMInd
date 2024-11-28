# Table: FicherosExportacionConfig

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkFicherosExportacion | nvarchar | NO |
| PkFicherosExportacionConfig_Iden | smallint | NO |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| Ruta | nvarchar | YES |
| RutaLocal | bit | NO |
| EliminarFichero | bit | NO |
| FkWebServices | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ComprimirFichero | bit | NO |
| GuardarCopiaFichero | bit | NO |
| Encoding | nvarchar | YES |
| DetalleConfiguracion | nvarchar | YES |
| FkTerceros | int | YES |
| FkModosEscritura | tinyint | NO |
| FkMR | nvarchar | YES |
| FkLineasDeNegocio | nvarchar | YES |
| FkMarcas | smallint | YES |
