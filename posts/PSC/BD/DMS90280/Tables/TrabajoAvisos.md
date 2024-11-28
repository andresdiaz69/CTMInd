# Table: TrabajoAvisos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTrabajoAvisos | bigint | NO |
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
| EsReportado | bit | YES |
| FkEmpresas | smallint | YES |
| FkCentros | smallint | YES |
| FkAñoOT | nvarchar | YES |
| FkSeries | nvarchar | YES |
| FkNumOT | int | YES |
| FkNumTrabajo | tinyint | YES |
| FkEmpleados | smallint | YES |
| FechaProcesado | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
