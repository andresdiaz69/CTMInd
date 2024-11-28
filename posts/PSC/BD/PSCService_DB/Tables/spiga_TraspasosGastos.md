# Table: spiga_TraspasosGastos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdCentros | smallint | YES |
| AñoEntradas | nvarchar | YES |
| SerieEntradas | nvarchar | YES |
| NumEntradas | int | YES |
| IdTraspasosGastos | tinyint | YES |
| IdGastosTipos | nvarchar | YES |
| IdTerceros_Proveedor | int | YES |
| SerieAlbaran | nvarchar | YES |
| NumAlbaran | nvarchar | YES |
| AñoAlbaran | nvarchar | YES |
| FechaAlbaran | datetime | YES |
| FechaAlta | datetime | YES |
| Importe | decimal | YES |
| IdImpuestos | nvarchar | YES |
| PorcImpuesto | decimal | YES |
| ImporteImpuestos | decimal | YES |
| AñoAsiento | nvarchar | YES |
| IdAsientos | int | YES |
| Modulo | nvarchar | YES |
| UserMod | smallint | YES |
| HostMod | nvarchar | YES |
| VersionFila | tinyint | YES |
| FechaMod | datetime | YES |
| NombreCentro | nvarchar | YES |
| NombreTercero | nvarchar | YES |
| FechaFactura | datetime | YES |
| Series | nvarchar | YES |
| NumFactura | nvarchar | YES |
| AñoFactura | nvarchar | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| AfectaACoste | bit | YES |
