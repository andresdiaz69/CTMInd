# View: V_SST_AltaGerSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_AltaGerencia]]

```sql
CREATE VIEW [dbo].[V_SST_AltaGerSuc]
AS
SELECT A.cod_alta_gerencia, A.cod_cia, S.nom_suc
FROM   dbo.SST_AltaGerencia AS A 
INNER JOIN dbo.gen_sucursal AS S ON A.cod_suc = S.cod_suc

```
