# View: v_nif_puc_niv1

## Usa los objetos:
- [[nif_puc]]

```sql
CREATE VIEW [dbo].[v_nif_puc_niv1]
AS
	SELECT cod_cta,nom_cta,niv_cta 
	FROM nif_puc WITH(NOLOCK) 
	WHERE niv_cta=1;

```
