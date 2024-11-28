# Table: ppp

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| query_text | nvarchar | YES |
| TipoConsulta | nvarchar | NO |
| Last_worker_time | bigint | NO |
| CosteAvgCPUEje | decimal | YES |
| creation_time | datetime | YES |
| last_execution_time | datetime | YES |
| plan_generation_num | bigint | YES |
| total_worker_time | bigint | NO |
| total_elapsed_time | bigint | NO |
| execution_count | bigint | NO |
| TiempoAvgTransEje | decimal | YES |
| total_logical_reads | bigint | NO |
| total_logical_writes | bigint | NO |
| total_physical_reads | bigint | NO |
| total_rows | bigint | YES |
| plan_handle | varbinary | NO |
| size_in_bytes | int | NO |
| last_used_threads | bigint | YES |
| last_dop | bigint | YES |
| set_options | varchar | YES |
| wait_time | int | YES |
| last_wait_type | nvarchar | YES |
| IsolationLevel | varchar | NO |
| contexto | varchar | YES |
