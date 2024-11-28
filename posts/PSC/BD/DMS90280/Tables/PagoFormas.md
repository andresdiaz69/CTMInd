# Table: PagoFormas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkPagoFormas | nvarchar | NO |
| Descripcion | nvarchar | NO |
| FkPagoFormaTipos | nvarchar | NO |
| NumeroGiros | smallint | YES |
| DiasGiros | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| Precarga | bit | NO |
| FechaMod | datetime | NO |
| TerceroCCC | bit | NO |
| EmpresaCCC | bit | NO |
| ImprimirInformacionPagos | bit | NO |
| VencimientoVariable | bit | NO |
