# Table: Liquidaciones_JefeDeVentasVirtualMazda

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdLiquidacion | int | NO |
| CodigoEmpleado | bigint | YES |
| Empleado | nvarchar | YES |
| CodigoEmpresa | smallint | YES |
| NombreEmpresa | nvarchar | YES |
| FechaIngreso | datetime | YES |
| FechaRetiro | datetime | YES |
| Ano_Periodo | int | YES |
| Mes_Periodo | int | YES |
| IdComisionModeloSub | smallint | YES |
| VehiculosRecaudados | int | YES |
| VentasNacionales | int | YES |
| PesoComercial | numeric | YES |
| Desde_PC | decimal | YES |
| Hasta_PC | decimal | YES |
| Comision_PesoComercial | decimal | YES |
| ValorCreditos | decimal | YES |
| ValorSeguros | decimal | YES |
| ValorTotalCreYSeguros | decimal | YES |
| ValorVentasNetas | decimal | YES |
| PorcentajeCreYSeg | decimal | YES |
| Desde_CreYSeg | decimal | YES |
| Hasta_CreYSeg | decimal | YES |
| Comision_CreditosYSeguros | decimal | YES |
| EntregasCanalVirtual | int | YES |
| EntregasLinea | int | YES |
| ParticipacionVentasDigitales | decimal | YES |
| Desde_Parti | decimal | YES |
| Hasta_Parti | decimal | YES |
| Comision_ParticipacionVentasDigitales | decimal | YES |
| Comision_TOTAL | decimal | YES |
