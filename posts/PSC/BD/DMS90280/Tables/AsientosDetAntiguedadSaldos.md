# Table: AsientosDetAntiguedadSaldos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoAsiento | nvarchar | NO |
| PkFkAsientos | int | NO |
| PkFkAsientosDet | int | NO |
| PkAsientosDetAntiguedadSaldos_Iden | int | NO |
| FkAñoAsiento_Factura | nvarchar | NO |
| FkAsientos_Factura | int | NO |
| ImporteDebe | decimal | NO |
| ImporteHaber | decimal | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
