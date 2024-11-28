# View: v_ptv_cuadre_res

## Usa los objetos:
- [[ptv_detcuadre_caja]]

```sql

-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_cuadre_res]
AS
SELECT ano_doc,per_doc,tip_doc,sub_tip,num_doc,SUM(val_pag) AS val_pag,SUM(cambio) AS cambio, MAX(val_des) AS val_des,MAX(val_ant) AS val_ant,MAX(fch_doc) AS fch_doc,
usu_caj,cod_ven,cod_caj,MAX(val_fac) AS val_fac,MAX(bas_sgr) AS bas_sgr, MAX(bas_g16) AS bas_g16, MAX(bas_g35) AS bas_g35,MAX(mon_iv16) AS mon_iv16,MAX(mon_iv35) AS mon_iv35,
MAX(imp_con) AS imp_con
FROM ptv_detcuadre_caja WITH (NOLOCK) 
GROUP BY ano_doc,per_doc,tip_doc,sub_tip,num_doc,usu_caj,cod_ven,cod_caj


```
