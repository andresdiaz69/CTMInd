# Table: CtaBancariaFicheros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCtaBancarias | smallint | NO |
| PkCtaBancariaFicheros_Iden | int | NO |
| HashFichero | nvarchar | NO |
| FechaImportacion | datetime | YES |
| FkFormatoFicheroTransferencias | tinyint | YES |
| TotalDebe | decimal | YES |
| TotalHaber | decimal | YES |
| Saldo | decimal | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkEmpleados | smallint | YES |
