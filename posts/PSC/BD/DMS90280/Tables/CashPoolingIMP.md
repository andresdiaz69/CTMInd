# Table: CashPoolingIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkCashPoolingIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegraciones | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| Referencia | nvarchar | YES |
| Fecha | datetime | YES |
| CuentaContable | nvarchar | YES |
| Sentido | nvarchar | YES |
| TextoDocumento | nvarchar | YES |
| Importe | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
