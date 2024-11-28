# View: v_cnt_datosreg_dian

## Usa los objetos:
- [[Cnt_cuedoc]]
- [[Cnt_cuentasdian2006]]
- [[Cnt_puc]]

```sql

/*CONSULTA RESUMEN DEL MAESTRO DIAN DATOS PARA ARCHIVO
JCESARS		ABRIL/2010*/
CREATE VIEW [dbo].[v_cnt_datosreg_dian]
AS
SELECT DISTINCT cue.Cod_cta,Nom_cta,Cod_ter,bas_mov,Deb_mov,Cre_mov,Des_mov,Reg_doc,ano_doc,per_doc,sub_tip,tip_doc,num_doc 
FROM Cnt_cuedoc AS cue WITH (NOLOCK)
	INNER JOIN Cnt_puc AS puc WITH (NOLOCK) ON cue.cod_cta= puc.cod_cta  
	INNER JOIN Cnt_cuentasdian2006 AS ctd WITH (NOLOCK) ON ctd.cod_cta= puc.cod_cta;

```
