# View: v_rhh_ces

## Usa los objetos:
- [[rhh_hisantic]]
- [[rhh_tbfondos]]

```sql
CREATE VIEW [dbo].[v_rhh_ces]
AS
SELECT     a.num_rad AS Radicacion, b.nom_fdo AS Fondo, a.fec_sol AS Fec_Solicitud, a.ind_sol, a.val_sol AS Valor, a.ces_bru - a.val_ant AS Saldo, 
                      a.cod_emp
FROM         dbo.rhh_hisantic a INNER JOIN
                      dbo.rhh_tbfondos b ON a.fdo_ces = b.cod_fdo


```
