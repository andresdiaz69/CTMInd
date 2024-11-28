# Table: PolizasEntidadPago

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkCtaBancarias | smallint | NO |
| PkPolizasEntidadPago_Iden | smallint | NO |
| FkMarcas | smallint | YES |
| NombreFinanciera | nvarchar | NO |
| FkPaises | nvarchar | NO |
| CuentaEntidad | nvarchar | YES |
| CuentaSucursal | nvarchar | YES |
| CuentaDC | nvarchar | YES |
| CuentaNumero | nvarchar | NO |
| NumeroPoliza | nvarchar | NO |
| PorDefecto | bit | NO |
| FechaAlta | datetime | NO |
| FechaBaja | datetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
