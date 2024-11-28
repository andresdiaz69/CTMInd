# Table: spiga_PedidosComprasDiversas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| IdSincronizacionSpiga | int | NO |
| IdConsecutivo | int | NO |
| Ano_Periodo | int | NO |
| Mes_Periodo | int | NO |
| FechaDeCorte | datetime | NO |
| PkFkEmpresas | smallint | YES |
| PkAñoPedido | nvarchar | YES |
| PkFkSeries | nvarchar | YES |
| PkPedidosComprasDiversas | int | YES |
| FkTerceros | int | YES |
| FkCentros | smallint | YES |
| FechaAlta | datetime | YES |
| FkPedidosEstados | tinyint | YES |
| FkWFEstados | smallint | YES |
| FKWFClasificaciones | nvarchar | YES |
| FkEmpleados | smallint | YES |
