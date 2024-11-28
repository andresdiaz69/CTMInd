# View: v_cnt_puc_niv1

## Usa los objetos:
- [[cnt_puc]]

```sql
CREATE VIEW [dbo].[v_cnt_puc_niv1]
AS
	SELECT cod_cta,nom_cta,niv_cta
	FROM cnt_puc WITH(NOLOCK)
	WHERE niv_cta=1;

```
