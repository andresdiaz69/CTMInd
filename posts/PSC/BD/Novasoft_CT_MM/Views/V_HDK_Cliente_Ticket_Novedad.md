# View: V_HDK_Cliente_Ticket_Novedad

## Usa los objetos:
- [[Hdk_ClienteLic]]
- [[Hdk_Ticket]]
- [[Hdk_Ticket_Novedad]]

```sql

CREATE VIEW [dbo].[V_HDK_Cliente_Ticket_Novedad]
AS SELECT cli.Id_ClienteLic AS Cod_Cliente,
		htk.Id_Ticket AS Nro_Ticket,
		ntk.Id_Novedad AS Nro_Novedad,
		ntk.Id_Estado,
		ntk.Fecha_Novedad,
		ntk.Detalle_Novedad,
		ntk.usu_nombre AS Usuario_Asig
   FROM Hdk_ClienteLic AS cli
   INNER JOIN Hdk_Ticket AS htk ON cli.Id_ClienteLic = htk.Id_ClienteLic
   INNER JOIN Hdk_Ticket_Novedad AS ntk ON htk.Id_Ticket = ntk.Id_Ticket;


```
