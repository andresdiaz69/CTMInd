# View: V_SST_BrigadaSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_Brigada]]

```sql
CREATE VIEW [dbo].[V_SST_BrigadaSuc]
AS
SELECT B.cod_brigada, S.nom_suc, B.cod_cia
FROM   dbo.SST_Brigada AS B 
INNER JOIN dbo.gen_sucursal AS S ON B.cod_suc = S.cod_suc

```
