# Table: spiga_CategoriaClientes

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkTerceros | int | YES |
| FkClienteCategorias | smallint | YES |
| Descripcion | nvarchar | YES |
