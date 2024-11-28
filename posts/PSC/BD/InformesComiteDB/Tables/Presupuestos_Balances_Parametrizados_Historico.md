# Table: Presupuestos_Balances_Parametrizados_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdJerarquia | smallint | NO |
| CodigoLinea | smallint | NO |
| CodigoCentro | smallint | NO |
| IdClase | smallint | NO |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| Valor | decimal | YES |
| IdUsuario | varchar | YES |
| CedulaUsuario | bigint | YES |
| FechaModificacionUsuario | datetime | YES |
| Valor_Anterior | decimal | YES |
