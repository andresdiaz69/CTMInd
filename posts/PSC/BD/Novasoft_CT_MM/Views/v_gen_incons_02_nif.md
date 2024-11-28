# View: v_gen_incons_02_nif

## Usa los objetos:
- [[gen_ccosto]]
- [[gen_clasif1]]
- [[gen_clasif2]]
- [[gen_clasif3]]
- [[gen_configtipo]]
- [[gen_sucursal]]
- [[gen_terceros]]
- [[nif_puc]]
- [[v_gen_infnif]]

```sql

CREATE VIEW [dbo].[v_gen_incons_02_nif]
AS
SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' La Cuenta no puede ser cero (0) o estar vacia ' AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK)
WHERE cod_cta ='0' 
	OR cod_cta IS NULL 
	OR RTRIM(cod_cta)=''

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Cuenta no existe'  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_cta NOT IN (SELECT cod_cta 
						FROM nif_puc WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Tercero no existe:'+ISNULL(RTRIM(cod_ter),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_ter NOT IN (SELECT  ter_nit  
						FROM gen_terceros WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Clasific 1 no existe:'+ISNULL(RTRIM(cod_cl1),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_cl1 NOT IN (SELECT codigo 
						FROM gen_clasif1 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Clasific 2 no existe:'+ISNULL(RTRIM(cod_cl2),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_cl2 NOT IN (SELECT codigo 
						FROM gen_clasif2 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Clasific 3 no existe:'+ISNULL(RTRIM(cod_cl3),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_cl3 NOT IN (SELECT codigo 
						FROM gen_clasif3 WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Ccosto  no existe:'+ISNULL(RTRIM(cod_cco),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_cco NOT IN (SELECT cod_cco 
						FROM gen_ccosto WITH(NOLOCK))

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Tipo documento  no existe o no es válido:'+ISNULL(RTRIM(tip_doc),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE tip_doc NOT IN (	SELECT cod_tip 
						FROM gen_configtipo WITH(NOLOCK)
						WHERE cod_apl='NIF')

UNION ALL

SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc, reg_doc,cod_cta,' Sucursal no existe:'+ISNULL(RTRIM(cod_suc),SPACE(1))  AS error,aplic 
FROM v_gen_infnif WITH(NOLOCK) 
WHERE cod_suc NOT IN (SELECT cod_suc 
						FROM gen_sucursal WITH(NOLOCK));

```
