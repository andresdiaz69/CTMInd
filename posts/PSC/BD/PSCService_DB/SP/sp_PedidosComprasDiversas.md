# Stored Procedure: sp_PedidosComprasDiversas

## Usa los objetos:
- [[PedidosComprasDiversas]]

```sql

CREATE PROCEDURE [dbo].[sp_PedidosComprasDiversas]
(@idEmpresas int,  @FechaInicial datetime, @FechaFinal datetime) as

--declare @idEmpresas int
--declare @FechaInicial datetime 
--declare @FechaFinal datetime
--set @idEmpresas = 1
--set @FechaInicial = '20220401'
--set @FechaFinal = '20220430'

SELECT PkFkEmpresas,PkAñoPedido,PkFkSeries,PkPedidosComprasDiversas,FkTerceros,
FkCentros,FechaAlta,FkPedidosEstados,FkWFEstados,FKWFClasificaciones,FkEmpleados
FROM [192.168.90.10\SPIGAPLUS].[DMS00280].[CM].[PedidosComprasDiversas]
WHERE  FechaBaja is null
and PkFkEmpresas = @idEmpresas
and FechaAlta >= @FechaInicial
and FechaAlta <= @FechaFinal

```
