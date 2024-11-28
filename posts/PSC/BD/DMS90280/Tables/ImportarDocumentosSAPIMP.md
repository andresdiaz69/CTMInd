# Table: ImportarDocumentosSAPIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkImportarDocumentosSAPIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| Empresa | nvarchar | NO |
| FechaAsiento | datetime | NO |
| FechaDocumento | datetime | YES |
| NumDocumento | nvarchar | YES |
| CuentaContable | nvarchar | NO |
| Importe | decimal | NO |
| DebeHaber | nvarchar | NO |
| EsCuentaIVA | nvarchar | YES |
| CodProveedorSAP | nvarchar | YES |
| CodClienteSAP | nvarchar | YES |
| NIF | nvarchar | YES |
| TipoCuenta | nvarchar | YES |
| CodImpuesto | nvarchar | YES |
| TipoDocumento | nvarchar | YES |
| ReferenciaInterna | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TipoFichero | nvarchar | YES |
| CanalDistribucion | nvarchar | YES |
| SectorActividad | nvarchar | YES |
| TipoCuentaRazon | nvarchar | YES |
