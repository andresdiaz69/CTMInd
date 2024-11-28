# Table: RecibosAsientosVinculaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkRecibos | int | NO |
| PkFkRecibosAsientos | tinyint | NO |
| PkRecibosVinculaciones_Iden | smallint | NO |
| FkAñoAsiento_Vincular | nvarchar | YES |
| FkAsientos_Vincular | int | YES |
| FkEfectosNumDet_Vincular | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkRecibos_Vincular | int | YES |
| UserAlta | smallint | NO |
| FechaAlta | datetime | NO |
| FkAñoAsiento_Cancelacion | nvarchar | YES |
| FkAsientos_Cancelacion | int | YES |
| Reaprovechado | bit | NO |
| FkContCtas_Reaprov | nvarchar | YES |
| FkSeries_Reaprov | nvarchar | YES |
| NumReaprov | int | YES |
| AñoReaprov | nvarchar | YES |
| ImporteReaprov | decimal | YES |
