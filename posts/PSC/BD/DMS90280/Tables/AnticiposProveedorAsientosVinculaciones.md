# Table: AnticiposProveedorAsientosVinculaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAnticiposProveedor | int | NO |
| PkFkAnticiposProveedorAsientos | tinyint | NO |
| PkAnticiposProveedorAsientosVinculaciones_Iden | smallint | NO |
| FkAñoAsiento_Vincular | nvarchar | YES |
| FkAsientos_Vincular | int | YES |
| FkEfectosNumDet_Vincular | smallint | YES |
| FkAnticiposProveedor_Vincular | int | YES |
| UserAlta | smallint | NO |
| FechaAlta | datetime | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkAñoAsiento_Cancelacion | nvarchar | YES |
| FkAsientos_Cancelacion | int | YES |
| ImporteDifCambio | decimal | YES |
| FactorCambioMonedaContravalorDifCambio | decimal | YES |
| Reaprovechado | bit | NO |
| FkContCtas_Reaprov | nvarchar | YES |
| FkSeries_Reaprov | nvarchar | YES |
| NumReaprov | int | YES |
| AñoReaprov | nvarchar | YES |
| ImporteReaprov | decimal | YES |
