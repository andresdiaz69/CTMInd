# Table: Liquidaciones_CoordinadoraCreditosYSeguros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| CodigoEmpleado | bigint | YES |
| Nombres | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| Ano_Periodo | smallint | YES |
| Mes_Periodo | smallint | YES |
| ValorCreditos | decimal | YES |
| ValorVentasNetas | decimal | YES |
| PorcentajeCreditos_CT | decimal | YES |
| Desde_1 | decimal | YES |
| Hasta_1 | decimal | YES |
| ComisionCreditos_CT | decimal | YES |
| UnidadesFinanciadas | int | YES |
| UnidadesEntregadas | int | YES |
| PorcentajeCreditos_MM | decimal | YES |
| Desde_2 | decimal | YES |
| Hasta_2 | decimal | YES |
| ComisionCreditos_MM | decimal | YES |
| SegCasaToro | decimal | YES |
| SegMotorysa | decimal | YES |
| ValorSegurosTotal | decimal | YES |
| Desde_3 | decimal | YES |
| Hasta_3 | decimal | YES |
| ComisionSegurosTotal | decimal | YES |
| ComisionTOTAL | decimal | YES |
| CodigoConcepto | int | YES |
| FechaLiquidacion | datetime | YES |
