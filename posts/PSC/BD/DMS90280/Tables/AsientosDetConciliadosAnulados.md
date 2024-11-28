# Table: AsientosDetConciliadosAnulados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkAñoConciliacion | nvarchar | NO |
| PkFkNumConciliacion | int | NO |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| FkAsientosDet | int | YES |
| FechaAnulacion | datetime | YES |
| FkCtaBancarias | smallint | YES |
| FkCtaBancariaFicheros | int | YES |
| FkCtaBancariaFicherosDet | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
| PkAsientosDetConciliadosAnulados_Iden | smallint | NO |
