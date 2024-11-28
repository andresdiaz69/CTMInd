# View: v_cnt_pucaux

## Usa los objetos:
- [[cnt_puc]]

```sql

CREATE VIEW [dbo].[v_cnt_pucaux] 
AS
SELECT	cod_cta,nom_cta,niv_cta,tip_mon, ind_adc
FROM	cnt_puc WITH(NOLOCK)
WHERE	tip_cta=2 
	AND est_cta=1 
	OR cod_cta ='0';

```
