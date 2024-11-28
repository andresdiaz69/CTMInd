# View: v_gen_subtipos

## Usa los objetos:
- [[gen_configtipo]]
- [[gen_subtipodoc]]
- [[gen_tipodoc]]

```sql

CREATE VIEW [dbo].[v_gen_subtipos]
AS
/*SE CREA VISTA DE TIPOS Y SUBTIPOS DE DOCUMENTOS PARA MAESTRO DE IMPORTACION DE DOCUMENTOS DE LAS APLICACIONES
JSARMIENTO MAYO/2010*/
SELECT a.cod_tip,a.des_tip,c.cod_sub,c.nom_sub,b.cod_apl 
FROM gen_tipodoc AS a WITH(NOLOCK)
	INNER JOIN gen_configtipo AS b WITH(NOLOCK) ON a.cod_tip=b.cod_tip
	INNER JOIN gen_subtipodoc AS c WITH(NOLOCK) ON a.cod_tip=c.cod_tip;

```
