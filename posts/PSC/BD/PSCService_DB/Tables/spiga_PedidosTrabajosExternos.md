# Table: spiga_PedidosTrabajosExternos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| FkTerceros | int | YES |
| Nombre | nvarchar | YES |
| FkCentros | smallint | YES |
| Centro | nvarchar | YES |
| PkAñoPedidosTrabajosExternos | nvarchar | YES |
| PkFkSeriesPedidosTrabajosExternos | nvarchar | YES |
| PkNumPedidosTrabajosExternos | int | YES |
| pkfkempresas | smallint | YES |
| empresa | nvarchar | YES |
| FechaAlta | datetime | YES |
| FechaValidez | datetime | YES |
