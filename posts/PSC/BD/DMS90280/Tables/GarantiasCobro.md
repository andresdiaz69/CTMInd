# Table: GarantiasCobro

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkTerceros | int | NO |
| PkGarantiasCobro_Iden | int | NO |
| NombreTercero | nvarchar | NO |
| FkGarantiasCobroTipos | nvarchar | YES |
| Importe | decimal | NO |
| FechaEmision | datetime | NO |
| FechaVencimiento | datetime | NO |
| FechaDevolucion | datetime | YES |
| MotivoGarantia | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
