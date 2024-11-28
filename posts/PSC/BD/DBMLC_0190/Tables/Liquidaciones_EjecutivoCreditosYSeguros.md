# Table: Liquidaciones_EjecutivoCreditosYSeguros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| Año | smallint | YES |
| MesInicial | smallint | YES |
| MesFinal | smallint | YES |
| CodigoEmpleado | bigint | YES |
| Nombres | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaRetiro | datetime | YES |
| CodigoCentro | smallint | YES |
| NombreCentro | nvarchar | YES |
| ValorComisionCreditos | decimal | YES |
| ValorVentasNetas | decimal | YES |
| PorcentajeCreditos | decimal | YES |
| DesdeCreditos | decimal | YES |
| HastaCreditos | decimal | YES |
| ComisionCreditos | decimal | YES |
| ValorSegurosTotal | decimal | YES |
| DesdeSeguros | decimal | YES |
| HastaSeguros | decimal | YES |
| ComisionSeguros | decimal | YES |
| IdComisionModeloSub | smallint | YES |
| FechaLiquidacion | datetime | YES |
| ComisionTotal | decimal | YES |
