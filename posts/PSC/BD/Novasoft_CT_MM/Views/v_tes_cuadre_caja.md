# View: v_tes_cuadre_caja

## Usa los objetos:
- [[tes_detcuadre_caja]]

```sql

/*---	REGISTRO RESUMEN DE LAS FORMAS DE PAGO DE UN DOCUMENTO
---	JCESARS		ENERO/2010
--	AGREGAMOS LA MONEDA
--	JCESARS		FEBRERO/2010
-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
SE AGREGA CAMPO REG_PAG PARA CORREGIR INCONSISTENCIA EN MAESTRO
JSARMIENTO ENERO/2022 SRS2021-1654*/
CREATE VIEW [dbo].[v_tes_cuadre_caja] 
AS

SELECT ano_doc,per_doc,sub_tip,num_doc,fch_doc,usu_caj,cod_caj,SUM(val_fac) AS val_fac,ind_mp
FROM tes_detcuadre_caja WITH (NOLOCK)
GROUP BY ano_doc,per_doc,sub_tip,num_doc,fch_doc,usu_caj,cod_caj,ind_mp

```
