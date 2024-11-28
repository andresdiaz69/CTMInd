# View: V_HDK_Cola_Ticket_Novedad

## Usa los objetos:
- [[Hdk_Ticket_Cola_Servicio]]
- [[Hdk_Ticket_Novedad]]

```sql

CREATE VIEW [dbo].[V_HDK_Cola_Ticket_Novedad]
AS SELECT col.usu_nombre AS Usuario_Asig,
		col.Id_Ticket AS Nro_Ticket,
		col.Nro_Orden,
		ntk.Fecha_Novedad,
		ntk.Id_Estado,
		ntk.Detalle_Novedad
   FROM Hdk_Ticket_Cola_Servicio AS col
   INNER JOIN Hdk_Ticket_Novedad AS ntk ON col.Id_Ticket = ntk.Id_Ticket;


```
