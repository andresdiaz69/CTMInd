# View: V_SST_CopasstSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_Copasst]]

```sql
CREATE VIEW [dbo].[V_SST_CopasstSuc]
AS
SELECT C.cod_copasst,C.cod_cia, S.nom_suc
FROM   dbo.SST_Copasst AS C 
INNER JOIN
dbo.gen_sucursal AS S ON C.cod_suc = S.cod_suc

```
