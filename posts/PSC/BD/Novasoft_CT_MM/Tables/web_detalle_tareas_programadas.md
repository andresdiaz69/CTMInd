# Table: web_detalle_tareas_programadas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| cod_tarea | smallint | NO |
| num_reg | smallint | NO |
| id_prog | uniqueidentifier | YES |
| tipo_frec | int | NO |
| intervalo_frec | int | NO |
| tipo_frec_subdia | int | NO |
| intervalo_frec_subdia | int | NO |
| intervalo_relativo_frec | int | NO |
| factor_recurrencia | int | NO |
| fec_inicio_act | date | NO |
| fec_fin_act | date | YES |
| hora_inicio_act | time | YES |
| hora_fin_act | time | YES |
