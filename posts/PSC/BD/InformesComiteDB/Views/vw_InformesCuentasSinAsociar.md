# View: vw_InformesCuentasSinAsociar

## Usa los objetos:
- [[InformesLogEventos]]

```sql
CREATE VIEW [dbo].[vw_InformesCuentasSinAsociar] AS
SELECT Empresa, Cuenta, EventoFecha, Mensaje
FROM   dbo.InformesLogEventos
WHERE  (Mensaje LIKE 'La cuenta % no aparece asociada%') AND (EventoFecha =
		(SELECT        MAX(EventoFecha) AS Expr1
        FROM            dbo.InformesLogEventos AS InformesLogEventos_1
        WHERE        (Mensaje LIKE 'La cuenta % no aparece asociada%')))




```
