# Table: InformacionDIANImportacionBienesDet

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkImportacionBienes | int | NO |
| PkImportacionBienesDet_Iden | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAsiento | datetime | YES |
| NumAsiento | int | YES |
| Numeral | nvarchar | YES |
| FkMonedas | smallint | YES |
| ImporteMoneda | decimal | YES |
| FactorCambioMoneda | decimal | YES |
| ImporteContraValor | decimal | YES |
| FactorCambioContravalor | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceros | int | YES |
| NombreProveedor | nvarchar | YES |
| DireccionProveedor | nvarchar | YES |
