# Table: InformacionDIANInversiones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkInversiones_Iden | int | NO |
| FkAsientos | int | YES |
| FkAñoAsiento | nvarchar | YES |
| FechaAsiento | datetime | YES |
| NumAsiento | int | YES |
| TipoOperacion | tinyint | YES |
| FkFacturaTipos | nvarchar | YES |
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
| CodigoPais | nvarchar | YES |
| CodigoCIU | nvarchar | YES |
| Numeral | nvarchar | YES |
| MonedaISO | nvarchar | YES |
| Valor | decimal | YES |
| ValorContraValor | decimal | YES |
| TipoCambio | decimal | YES |
| InversionExtranjera | nvarchar | YES |
| ValorPesos | decimal | YES |
| TipoCambioPesos | decimal | YES |
| FkTerceros | int | YES |
| NombreTerceroCompleto | nvarchar | YES |
| TipoDocumentoTercero | nvarchar | YES |
| NumDocumentoTercero | nvarchar | YES |
| DVTercero | nvarchar | YES |
| CodigoPaisTercero | nvarchar | YES |
| CodigoCIUTercero | nvarchar | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
