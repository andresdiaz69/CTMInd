# Table: EfectosIGSIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkEfectosIGSIMP | bigint | NO |
| FkModulos | nvarchar | YES |
| FkIntegracion | smallint | YES |
| FkProcesos | int | YES |
| FkFicheros | smallint | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkSeries | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FechaFactura | datetime | YES |
| FkFacturaTipos | nvarchar | YES |
| FechaVto | datetime | YES |
| ImporteEfecto | decimal | YES |
| FkPagoFormas | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| NumLineaFichero | int | YES |
| CodigoTerceros | nvarchar | YES |
| FkAsientos | int | YES |
| FkContCtas | nvarchar | YES |
