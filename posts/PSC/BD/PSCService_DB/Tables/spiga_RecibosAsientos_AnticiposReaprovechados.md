# Table: spiga_RecibosAsientos_AnticiposReaprovechados

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | YES |
| IdRecibos | int | YES |
| IdRecibosAsientos | smallint | YES |
| IdAnticiposProveedor | int | YES |
| IdAnticiposProveedorAsientos | int | YES |
| TipoDocumento | smallint | YES |
| IdCentros | smallint | YES |
| NombreCentro | nvarchar | YES |
| IdTerceros | int | YES |
| NombreTercero | nvarchar | YES |
| Fecha | datetime | YES |
| IdMonedas | smallint | YES |
| ImporteMO | decimal | YES |
| Importe | decimal | YES |
| ImportePendienteVincularMO | decimal | YES |
| IdReciboEstados | nvarchar | YES |
| Concepto | nvarchar | YES |
| NombreUsuario | nvarchar | YES |
| FechaVinculacion | datetime | YES |
| NombreEmpleado | nvarchar | YES |
| ImportePendienteVincular | decimal | YES |
| factorCambioMoneda | decimal | YES |
| FactorCambioMonedaContravalor | decimal | YES |
| AñoAsientoSaldar | nvarchar | YES |
| IdAsientosSaldar | int | YES |
| IdContCtasSaldado | nvarchar | YES |
| RequiereTerceroCtaSaldado | bit | YES |
| NivelDesgloseCtaSaldado | smallint | YES |
| NivelDesgloseObligatorioCtaSaldado | smallint | YES |
| IdRecibosVinculaciones | smallint | YES |
| IdAnticiposProveedorAsientoVinculaciones | int | YES |
| AñoAsientoCancelacion | nvarchar | YES |
| IdAsientosCancelacion | int | YES |
| IdContCtasReaprov | nvarchar | YES |
| IdSeriesReaprov | nvarchar | YES |
| NumReaprov | int | YES |
| AñoReaprov | nvarchar | YES |
| ImporteReaprov | decimal | YES |
| VersionFila | smallint | YES |
