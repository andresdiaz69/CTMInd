# Table: InformacionDIANExportacionBienes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkExportacionBienes_Iden | int | NO |
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
| TipoDocumento | nvarchar | YES |
| NumIdentificacion | nvarchar | YES |
| DV | nvarchar | YES |
| NombreCompleto | nvarchar | YES |
| MonedaISO | nvarchar | YES |
| Valor | decimal | YES |
| TipoCambio | decimal | YES |
| Numero | nvarchar | YES |
| FechaFactura | datetime | YES |
| CiudadAduana | nvarchar | YES |
| Numeral | nvarchar | YES |
| TotalGastos | decimal | YES |
| Deducciones | decimal | YES |
| FkTerceros | int | YES |
| NombreCompletoTercero | nvarchar | YES |
| NumDocumentoTercero | nvarchar | YES |
| Observaciones | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| ValorReintegrado | decimal | YES |
