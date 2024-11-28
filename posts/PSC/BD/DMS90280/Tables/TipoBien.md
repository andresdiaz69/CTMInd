# Table: TipoBien

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTipoBien | smallint | NO |
| Descripcion | nvarchar | NO |
| FkFacturaTipos | nvarchar | YES |
| FkRegimenContable | nvarchar | YES |
| Equivalencia | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| TipoInforme | smallint | YES |
| TipoBienDet | smallint | NO |
| DescripcionDet | nvarchar | YES |
| EquivalenciaDet | nvarchar | YES |
