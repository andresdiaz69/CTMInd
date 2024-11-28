# Table: Copiabancarias

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkEmpresaCentroTercerosCuentasBancarias_Iden | smallint | NO |
| FkMonedas | smallint | NO |
| CuentaIBAN | nvarchar | YES |
| CuentaSwift | nvarchar | YES |
| FkPaises_Cuenta | nvarchar | YES |
| FkCuentaEntidad | nvarchar | YES |
| FkCuentaSucursal | nvarchar | YES |
| CuentaDC | nvarchar | YES |
| CuentaNumero | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkCtaBancariaTipos | int | YES |
| FkMandato | nvarchar | YES |
| FechaMandato | datetime | YES |
