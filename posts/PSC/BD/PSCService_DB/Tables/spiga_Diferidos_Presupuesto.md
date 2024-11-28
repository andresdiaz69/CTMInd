# Table: spiga_Diferidos_Presupuesto

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| AñoPeriodificacion | varchar | YES |
| MesInicio | smallint | YES |
| PkFkEmpresas | smallint | YES |
| PkPeriodificaciones_Iden | int | YES |
| FechaAlta | datetime | YES |
| Importe | decimal | YES |
| FkTerceros | int | YES |
| proveedor | nvarchar | YES |
| FkCentros_Desglose | smallint | YES |
| Centro | nvarchar | YES |
| Periodos | smallint | YES |
| FkContCtas_Contrapartida | nvarchar | YES |
| FkContCtas_Haber | nvarchar | YES |
| PkPeriodificacionesDesglose_Iden | smallint | YES |
| Porcentaje | decimal | YES |
| FechaValor | datetime | YES |
| importeDebe | decimal | YES |
| Descripcion | nvarchar | YES |
| FkMarcas | smallint | YES |
| marca | nvarchar | YES |
