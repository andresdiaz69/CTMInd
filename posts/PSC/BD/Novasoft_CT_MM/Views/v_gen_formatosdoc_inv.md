# View: v_gen_formatosdoc_inv

## Usa los objetos:
- [[web_formatosdoc]]

```sql

/*VISTA QUE MUESTRA LOS FORMATOS DE LA APLICACIÓN DE INVENTARIOS*/
CREATE VIEW [dbo].[v_gen_formatosdoc_inv] 
AS 
	SELECT cod_apl, cod_rep, nom_rep, sub_tip, posx_cufe, posy_cufe, posx_qr,posy_qr
	FROM web_formatosdoc WITH(NOLOCK)
	WHERE cod_apl='INV'
	UNION ALL
	SELECT '0', '0','No Aplica','0','','','','';

```
