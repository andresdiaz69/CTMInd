# View: v_act_datosplaca_T

## Usa los objetos:
- [[ACT_ACTIVOS]]
- [[V_ACT_DATOSPLACA]]

```sql

/*AFLOREZ NOVIEMBRE/2020 Se agrega el campo registro de ingreso*/
CREATE VIEW [dbo].[v_act_datosplaca_T]
AS
SELECT  cod_pla, cod_clas, des_cor, fec_adq, cod_ter, ' ' AS ter_nombre, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, '' AS marca, '' AS modelo, '' AS serie, cod_est, cto_pes, 
        ano_ing, per_ing, sub_ing, num_ing,reg_ing, area_tot, area_seg, sal_und
FROM    ACT_ACTIVOS WITH(NOLOCK)
WHERE   COD_PLA NOT IN(SELECT COD_PLA
                            FROM V_ACT_DATOSPLACA) 
		AND COD_PLA <> '0'
UNION ALL
SELECT  cod_pla, cod_clas, des_cor, fec_adq, cod_ter, ter_nombre, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, marca, modelo, serie, cod_est, cto_pes, ano_ing, per_ing, 
        sub_ing, num_ing, reg_ing,area_tot, area_seg, sal_und
FROM    V_ACT_DATOSPLACA

```
