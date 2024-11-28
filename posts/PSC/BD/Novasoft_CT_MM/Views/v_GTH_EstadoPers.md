# View: v_GTH_EstadoPers

## Usa los objetos:
- [[GTH_Evalua]]
- [[GTH_Evalua_Estado]]

```sql

CREATE VIEW [dbo].[v_GTH_EstadoPers]
AS
SELECT DISTINCT 
                         dbo.GTH_Evalua_Estado.cod_ori, dbo.GTH_Evalua_Estado.codigo, dbo.GTH_Evalua_Estado.cod_est, dbo.GTH_Evalua_Estado.fec_lim, 
                         dbo.GTH_Evalua_Estado.consec_eva, dbo.GTH_Evalua_Estado.cod_eva
FROM            dbo.GTH_Evalua INNER JOIN
                         dbo.GTH_Evalua_Estado ON dbo.GTH_Evalua.cod_eva = dbo.GTH_Evalua_Estado.cod_eva AND dbo.GTH_Evalua.cod_ori = dbo.GTH_Evalua_Estado.cod_ori
WHERE        (dbo.GTH_Evalua.cod_ori = '07')

```
