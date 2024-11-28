# View: V_SST_ComiteCVSuc

## Usa los objetos:
- [[gen_sucursal]]
- [[SST_ComiteConv]]

```sql
CREATE VIEW [dbo].[V_SST_ComiteCVSuc]
AS
SELECT C.cod_comite, S.nom_suc, C.cod_cia
FROM   dbo.SST_ComiteConv AS C 
INNER JOIN dbo.gen_sucursal AS S ON C.cod_suc = S.cod_suc

```
