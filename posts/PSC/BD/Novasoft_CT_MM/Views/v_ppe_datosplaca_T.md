# View: v_ppe_datosplaca_T

## Usa los objetos:
- [[ppe_activos]]
- [[v_ppe_datosplaca]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_datosplaca_T]
AS
SELECT     cod_pla, cod_clas, des_cor, fec_adq, cod_ter, ' ' AS ter_nombre, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, '' AS marca, '' AS modelo, '' AS serie, cod_est, cto_pes, 
                      ano_ing, per_ing, sub_ing, num_ing, area_tot, area_seg, sal_und
FROM         ppe_activos WITH (NOLOCK)
WHERE     COD_PLA NOT IN
                          (SELECT     COD_PLA
                            FROM          v_ppe_datosplaca) AND COD_PLA <> '0'
UNION ALL
SELECT     cod_pla, cod_clas, des_cor, fec_adq, cod_ter, ter_nombre, cod_suc, cod_cco, cod_cl1, cod_cl2, cod_cl3, marca, modelo, serie, cod_est, cto_pes, ano_ing, per_ing, 
                      sub_ing, num_ing, area_tot, area_seg, sal_und
FROM         v_ppe_datosplaca WITH (NOLOCK)

```
