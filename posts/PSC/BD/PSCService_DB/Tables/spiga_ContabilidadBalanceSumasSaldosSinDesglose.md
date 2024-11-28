# Table: spiga_ContabilidadBalanceSumasSaldosSinDesglose

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| IdEmpresas | smallint | NO |
| IdContCtas | nvarchar | YES |
| TerceroBanco | int | YES |
| NombreTerceroBanco | nvarchar | YES |
| NifCifTerceroBanco | nvarchar | YES |
| NombreCuenta | nvarchar | YES |
| TipoCalculo | nvarchar | YES |
| ImporteDebeApertura | decimal | YES |
| ImporteHaberApertura | decimal | YES |
| ImporteDebeUltimoMes | decimal | YES |
| ImporteHaberUltimoMes | decimal | YES |
| TotalDebePeriodo | decimal | YES |
| TotalHaberPeriodo | decimal | YES |
| ImporteDebeAperturaContravalor | decimal | YES |
| ImporteHaberAperturaContravalor | decimal | YES |
| ImporteDebeUltimoMesContravalor | decimal | YES |
| ImporteHaberUltimoMesContravalor | decimal | YES |
| TotalDebePeriodoContravalor | decimal | YES |
| TotalHaberPeriodoContravalor | decimal | YES |
| FkContNiveles | tinyint | YES |
