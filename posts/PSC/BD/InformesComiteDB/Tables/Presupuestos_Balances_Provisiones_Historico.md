# Table: Presupuestos_Balances_Provisiones_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| IdItemProvisiones | int | YES |
| IdJerarquia | smallint | YES |
| CodigoLinea | smallint | YES |
| CodigoCentro | smallint | YES |
| IdClase | smallint | YES |
| Nombre_Concepto | varchar | YES |
| Unidad_De_Medida | varchar | YES |
| Ano_Periodo | smallint | YES |
| Mes_Periodo | smallint | YES |
| Valor | decimal | YES |
| IdUsuario | varchar | YES |
| CedulaUsuario | bigint | YES |
| FechaModificacionUsuario | datetime | YES |
| Valor_Anterior | decimal | YES |
