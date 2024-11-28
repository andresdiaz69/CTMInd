# Table: spiga_Datafonos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkEmpresas | smallint | YES |
| PkFkCentros | smallint | YES |
| PkFkCajas | smallint | YES |
| PkCajas_Iden | smallint | YES |
| DescripcionCaja | nvarchar | YES |
| FkContCtas | nvarchar | YES |
| PkTpvs_Iden | smallint | YES |
| Descripcion | nvarchar | YES |
| FkCtaBancarias | smallint | YES |
| Codigo | nvarchar | YES |
