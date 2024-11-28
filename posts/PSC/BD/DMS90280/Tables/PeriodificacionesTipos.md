# Table: PeriodificacionesTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkPeriodificacionesTipos_Iden | smallint | NO |
| Descripcion | nvarchar | YES |
| Periodos | smallint | YES |
| MesInicio | tinyint | YES |
| UtilizaCuentaFactura | bit | YES |
| FkContCtas_Contrapartida | nvarchar | YES |
| FkContCtas_Debe | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
| ConceptoAsiento | nvarchar | YES |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEntidades | nvarchar | YES |
