# Table: ContsMantenimientoVINIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkContsMantenimientoVINIMP_Iden | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| VIN | nvarchar | NO |
| TipoContrato | nvarchar | YES |
| FechaInicioContrato | datetime | YES |
| FechaFinContrato | datetime | YES |
| KmsInicioContrato | int | YES |
| KmsFinContrato | int | YES |
| FechaVentaContrato | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| IdUnicoTipoContrato | nvarchar | YES |
