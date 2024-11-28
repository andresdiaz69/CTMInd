# Table: TrabajoAvisosIMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTrabajoAvisosIMP | bigint | NO |
| FkModulos | nvarchar | NO |
| FkIntegracion | smallint | NO |
| FkProcesos | int | NO |
| FkFicheros | smallint | NO |
| NumAviso | nvarchar | YES |
| FechaAviso | datetime | YES |
| PosicionAviso | nvarchar | YES |
| EquipoAsociado | nvarchar | YES |
| OT | nvarchar | YES |
| VIN | nvarchar | YES |
| Lote | nvarchar | YES |
| Material | nvarchar | YES |
| DescripcionMaterial | nvarchar | YES |
| ElementoDaño | nvarchar | YES |
| EstadoDaño | nvarchar | YES |
| Cantidad | int | YES |
| Valor | decimal | YES |
| Causa | nvarchar | YES |
| Moneda | nvarchar | YES |
| Sociedad | nvarchar | YES |
| EsReportado | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
