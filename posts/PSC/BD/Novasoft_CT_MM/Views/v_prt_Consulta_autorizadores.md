# View: v_prt_Consulta_autorizadores

## Usa los objetos:
- [[prt_autorizaciones]]
- [[prt_autorizadores]]

```sql
CREATE VIEW [dbo].[v_prt_Consulta_autorizadores]
AS
SELECT DISTINCT TOP (100) PERCENT DOR.codAutorizador, DOR.nombre, DOR.correo
FROM            dbo.prt_autorizaciones AS AUT INNER JOIN
                         dbo.prt_autorizadores AS DOR ON AUT.cod_autoriza = DOR.codAutorizador 
WHERE AUT.aut_activa=1 
ORDER BY DOR.nombre

```
