# View: v_nif_datosreg_dian

## Usa los objetos:
- [[nif_cuedoc]]
- [[nif_cuentasdian2006]]
- [[nif_puc]]

```sql

--	CONSULTA RESUMEN DEL MAESTRO DIAN DATOS PARA ARCHIVO
--	JCESARS		ABRIL/2010
CREATE VIEW [dbo].[v_nif_datosreg_dian]
AS
SELECT DISTINCT cue.Cod_cta,Nom_cta,Cod_ter,bas_mov,Deb_mov,Cre_mov,Des_mov,Reg_doc,ano_doc,per_doc,sub_tip,tip_doc,num_doc 
FROM nif_cuedoc AS cue WITH (NOLOCK)  
	INNER JOIN nif_puc AS puc WITH (NOLOCK) ON cue.cod_cta= puc.cod_cta  
	INNER JOIN nif_cuentasdian2006 AS ctd WITH (NOLOCK) ON ctd.cod_cta= puc.cod_cta  

```
