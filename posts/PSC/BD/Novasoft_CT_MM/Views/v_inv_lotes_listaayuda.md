# View: v_inv_lotes_listaayuda

## Usa los objetos:
- [[inv_lotes]]

```sql

CREATE VIEW [dbo].[v_inv_lotes_listaayuda]
AS

SELECT cod_lote,cod_item,cod_suc,cod_bod,ano_acu,ISNULL(fec_ven,'19000101') AS fec_ven,est_lote 
FROM inv_lotes WITH(NOLOCK)
UNION ALL 
SELECT '0' AS cod_lote,'0' AS cod_item,'0' AS cod_suc,'0' AS cod_bod,'0' AS ano_acu,'19000101' AS fec_ven,'A' AS est_lote

```
