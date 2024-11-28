# Table: spiga_Diferidos_Informe

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| AñoPeriodificacion | nvarchar | YES |
| MesInicio | smallint | YES |
| PkFkEmpresas | smallint | YES |
| PkPeriodificaciones_Iden | int | YES |
| descripcion | nvarchar | YES |
| FkMarcas | smallint | YES |
| marca | nvarchar | YES |
| FechaAlta | datetime | YES |
| Importe | decimal | YES |
| FkTerceros | int | YES |
| proveedor | nvarchar | YES |
| FkCentros_Desglose | smallint | YES |
| Centro | nvarchar | YES |
| FkDepartamentos_Desglose | nvarchar | YES |
| FkSecciones_Desglose | int | YES |
| seccion | nvarchar | YES |
| Periodos | smallint | YES |
| FkContCtas_Contrapartida | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
| PkPeriodificacionesDesglose_Iden | smallint | YES |
| Porcentaje | decimal | YES |
| Amortizacion_acumulada | decimal | YES |
| saldo_inicial | decimal | YES |
| Amortizacion_año_Actual | decimal | YES |
| saldo_diferido_hoy | decimal | YES |
| pagado | decimal | YES |
