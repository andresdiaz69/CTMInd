# Table: InmovilizadoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkInmovilizadoTipos_Iden | smallint | NO |
| RequiereEmpleado | bit | NO |
| FechaBaja | datetime | YES |
| Precarga | bit | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkContCtas_Cargo | nvarchar | YES |
| FkContCtas_Abono | nvarchar | YES |
| PorcAmortizacion | decimal | YES |
| FkContCtas_Inmovilizado | nvarchar | YES |
