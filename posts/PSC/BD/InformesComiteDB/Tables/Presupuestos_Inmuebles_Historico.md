# Table: Presupuestos_Inmuebles_Historico

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdHistorico | bigint | NO |
| CodigoLinea | smallint | NO |
| CodigoCentro | smallint | NO |
| Arriendo_Inicial | decimal | YES |
| Arriendo_Futuro | decimal | YES |
| Arriendo_Mes_Aumento | smallint | YES |
| Ano_Periodo | smallint | NO |
| Mes_Periodo | smallint | NO |
| IdUsuario | varchar | NO |
| CedulaUsuario | bigint | NO |
| Arriendo_Inicial_Anterior | decimal | YES |
| Arriendo_Futuro_Anterior | decimal | YES |
| Arriendo_Mes_Aumento_Anterior | smallint | YES |
| FechaModificacionUsuario | datetime | YES |
