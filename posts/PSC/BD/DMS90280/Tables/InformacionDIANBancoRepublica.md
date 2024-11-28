# Table: InformacionDIANBancoRepublica

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkBancoRepublica_Iden | int | NO |
| TipoOperacion | tinyint | YES |
| CuentaCompensacion | nvarchar | YES |
| FechaRegistro | datetime | YES |
| FechaMovimiento | datetime | YES |
| FechaCancelacion | datetime | YES |
| TipoIdentificacionEmpresa | nvarchar | YES |
| NumIdentifiacionEmpresa | nvarchar | YES |
| DVEmpresa | nvarchar | YES |
| NombreEmpresa | nvarchar | YES |
| CodCiudadEmpresa | nvarchar | YES |
| DireccionEmpresa | nvarchar | YES |
| TelefonoEmpresa | nvarchar | YES |
| CodCIIU | nvarchar | YES |
| NombreBanco | nvarchar | YES |
| CodPaisBanco | nvarchar | YES |
| CodCiudadBanco | nvarchar | YES |
| NumCuentaBanco | nvarchar | YES |
| FkMonedas_Banco | smallint | YES |
| TipoIdentificacionTitular | nvarchar | YES |
| IdentificacionTitular | nvarchar | YES |
| NombreTitular | nvarchar | YES |
| DireccionTitular | nvarchar | YES |
| CodCiudadTitular | nvarchar | YES |
| TelefonoTitular | nvarchar | YES |
| EmailTitular | nvarchar | YES |
| SaldoAnterior | decimal | YES |
| NuevoSaldo | decimal | YES |
| AjusteInversiones | decimal | YES |
| SaldoInversiones | decimal | YES |
| OverNigthInversiones | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| SinMovimiento | bit | YES |
