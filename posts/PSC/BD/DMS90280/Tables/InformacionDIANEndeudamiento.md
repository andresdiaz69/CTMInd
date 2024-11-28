# Table: InformacionDIANEndeudamiento

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkEndeudamiento_Iden | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAsiento | datetime | YES |
| NumAsiento | int | YES |
| TipoOperacion | tinyint | YES |
| Ciudad | nvarchar | YES |
| CuentaCompensacion | nvarchar | YES |
| FechaDeclaracion | datetime | YES |
| NumFormulario | int | YES |
| CuentaCompensacionAnterior | nvarchar | YES |
| FechaDeclaracionAnterior | datetime | YES |
| NumDeclaracionAnterior | int | YES |
| NumeroPrestamo | nvarchar | YES |
| TipoDocumento | nvarchar | YES |
| NumIdentificacion | nvarchar | YES |
| DV | nvarchar | YES |
| NombreCompleto | nvarchar | YES |
| MonedaISO | nvarchar | YES |
| ValorTotal | decimal | YES |
| ValorTotalContraValor | decimal | YES |
| TipoCambio | decimal | YES |
| BaseInteres | smallint | YES |
| FkTerceros | int | YES |
| NombreCompletoTercero | nvarchar | YES |
| Numeral | nvarchar | YES |
| Valor | decimal | YES |
| ValorContraValor | decimal | YES |
| ValorPendiente | decimal | YES |
| FechaInicio | datetime | YES |
| FechaFin | datetime | YES |
| Dias | smallint | YES |
| Tasa | decimal | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
