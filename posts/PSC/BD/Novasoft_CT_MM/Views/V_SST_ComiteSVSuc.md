# View: V_SST_ComiteSVSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_ComiteSegVial]]

```sql
CREATE VIEW [dbo].[V_SST_ComiteSVSuc]
AS
SELECT C.cod_comite_sv, S.nom_suc, C.cod_cia
FROM   dbo.SST_ComiteSegVial AS C 
INNER JOIN dbo.gen_sucursal AS S ON C.cod_suc = S.cod_suc

```
