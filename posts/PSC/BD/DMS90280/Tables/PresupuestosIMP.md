# Table: PresupuestosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPresupuestosIMP | bigint | NO |
| FkProcesos | int | NO |
| FkMR | nvarchar | YES |
| FkReferencias | nvarchar | YES |
| DescripcionReferencia | nvarchar | YES |
| Unidades | decimal | YES |
| Precio | decimal | YES |
| DtoPorc | decimal | YES |
| Gastos | decimal | YES |
| Observaciones | nvarchar | YES |
| CodDto | nvarchar | YES |
| UnidadesEnvase | decimal | YES |
| FkClasificacion1 | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
