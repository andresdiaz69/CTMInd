# View: V_HDK_Ticket_Nov_Tareas

## Usa los objetos:
- [[Hdk_Estado]]
- [[Hdk_Ticket]]
- [[Hdk_ticket_Noved_Tarea]]
- [[Hdk_ticket_Novedad]]
- [[Hdk_ticket_Novedades_Adjunto]]

```sql

CREATE VIEW [dbo].[V_HDK_Ticket_Nov_Tareas]
AS SELECT Tic.Id_Ticket,
		Tnv.Id_Novedad,
		Tnv.Fecha_Novedad AS Fec_Novedad,
		Tnv.Id_Estado,
		Est.Descripcion_Estado,
		Tnv.Detalle_Novedad,
		Nvt.Id_Tarea,
		Nvt.Fecha AS Fec_Tarea,
		Nvt.Observaciones AS Obs_Tarea,
		Nva.conse_Adj AS Consec_Adjunto,
		Nva.fecha_adj AS Fec_Adjunto,
		Nva.Descripcion_Adj,
		Tnv.usu_nombre AS Usuario_Asig
   FROM Hdk_Ticket AS Tic
   INNER JOIN Hdk_ticket_Novedad AS Tnv ON Tic.Id_Ticket = Tnv.Id_Ticket
   INNER JOIN Hdk_Estado AS Est ON Est.Id_Estado = Tnv.Id_Estado
   INNER JOIN Hdk_ticket_Noved_Tarea AS Nvt ON Tnv.Id_Novedad = Nvt.Id_Novedad
   INNER JOIN Hdk_ticket_Novedades_Adjunto AS Nva ON Tnv.Id_Novedad = Nva.Id_Novedad;


```
