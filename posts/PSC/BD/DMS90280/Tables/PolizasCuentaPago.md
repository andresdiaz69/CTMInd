# Table: PolizasCuentaPago

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCtaBancarias | smallint | NO |
| PkPolizasCuentaPago_Iden | smallint | NO |
| FkContCtas | nvarchar | NO |
| FkPolizaTipos | tinyint | NO |
| FkMarcas | smallint | YES |
| PorDefecto | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FkCtaBancarias_Haber | smallint | NO |
| FechaMod | datetime | NO |
