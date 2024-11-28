# Table: AsientosDetImpuestosAsientosRetenciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkFkAsientosDetImpuestos | int | NO |
| PkAsientosDetImpuestosAsientosRetenciones_Iden | int | NO |
| FkAñoAsiento_Retencion | nvarchar | NO |
| FkAsientos_Retencion | int | NO |
| FkEfectosNumDet | smallint | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
