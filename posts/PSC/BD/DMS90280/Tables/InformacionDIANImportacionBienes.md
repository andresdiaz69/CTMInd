# Table: InformacionDIANImportacionBienes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkImportacionBienes_Iden | int | NO |
| FkEmpleados | smallint | YES |
| TipoOperacion | tinyint | YES |
| NumDeclaracion | nvarchar | YES |
| FechaDeclaracion | datetime | YES |
| CuentaCompensacion | nvarchar | YES |
| NumDeclaracionAnterior | nvarchar | YES |
| FechaDeclaracionAnterior | datetime | YES |
| CuentaCompensacionAnterior | nvarchar | YES |
| TipoDocumento | nvarchar | YES |
| NumIdentificacion | nvarchar | YES |
| DV | nvarchar | YES |
| NombreImportador | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TipoIdentificacion | nvarchar | YES |
| FkEmpleados_ImportacionesVN | smallint | YES |
