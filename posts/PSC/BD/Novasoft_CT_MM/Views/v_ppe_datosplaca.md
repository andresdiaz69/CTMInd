# View: v_ppe_datosplaca

## Usa los objetos:
- [[gen_terceros]]
- [[ppe_activos]]
- [[ppe_ftarmas]]
- [[ppe_ftcomputo]]
- [[ppe_ftedificios]]
- [[ppe_ftequipos]]
- [[ppe_ftlibros]]
- [[ppe_ftmaquinas]]
- [[ppe_ftmedicos]]
- [[ppe_ftmuebles]]
- [[ppe_ftobrasarte]]
- [[ppe_ftsemovientes]]
- [[ppe_ftterrenos]]
- [[ppe_ftvehiculos]]
- [[ppe_marcas]]

```sql

-- 2020/01/21 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ppe_datosplaca]
AS
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftequipos.mod_eqp AS modelo, 
                      ppe_ftequipos.ser_eqp AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, 
                      ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftequipos WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftequipos.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftequipos.mar_eqp = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftvehiculos.mod_veh, 
                      ppe_ftvehiculos.num_ser, ppe_activos.cod_est, ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, 
                      ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftvehiculos WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftvehiculos.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftvehiculos.mar_veh = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftarmas.mod_arm, '', ppe_activos.cod_est, 
                      ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, 
                      ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftarmas WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftarmas.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftarmas.mod_arm = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftcomputo.mod_com, ppe_ftcomputo.ser_com, 
                      ppe_activos.cod_est, ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, 
                      ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftcomputo WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftcomputo.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftcomputo.mod_com = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftmaquinas.mod_maq, 
                      ppe_ftmaquinas.ser_maq, ppe_activos.cod_est, ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, 
                      ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftmaquinas WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftmaquinas.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftmaquinas.mod_maq = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftmedicos.mod_med, ppe_ftmedicos.ser_med,
                       ppe_activos.cod_est, ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, 
                      ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftmedicos WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftmedicos.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftmedicos.mod_med = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, ppe_marcas.nom_mar AS marca, ppe_ftmuebles.mod_mue, '', ppe_activos.cod_est, 
                      ppe_activos.cto_pes, ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, 
                      ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftmuebles WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftmuebles.cod_pla INNER JOIN
                      ppe_marcas WITH (NOLOCK) ON ppe_ftmuebles.mod_mue = ppe_marcas.cod_mar INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, 
                      ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftedificios WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftedificios.cod_pla INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, 
                      ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftlibros WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftlibros.cod_pla INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, 
                      ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftobrasarte WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftobrasarte.cod_pla INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, 
                      ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftsemovientes WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftsemovientes.cod_pla INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit
UNION ALL
SELECT     ppe_activos.cod_pla, ppe_activos.cod_clas, ppe_activos.des_cor, ppe_activos.fec_adq, ppe_activos.cod_ter, gen_terceros.ter_nombre, ppe_activos.cod_suc, 
                      ppe_activos.cod_cco, ppe_activos.cod_cl1, ppe_activos.cod_cl2, ppe_activos.cod_cl3, '' AS marca, '' AS modelo, '' AS serie, ppe_activos.cod_est, ppe_activos.cto_pes, 
                      ppe_activos.ano_ing, ppe_activos.per_ing, ppe_activos.sub_ing, ppe_activos.num_ing, ppe_activos.area_tot, ppe_activos.area_seg, ppe_activos.sal_und
FROM         ppe_activos WITH (NOLOCK) INNER JOIN
                      ppe_ftterrenos WITH (NOLOCK) ON ppe_activos.cod_pla = ppe_ftterrenos.cod_pla INNER JOIN
                      gen_terceros WITH (NOLOCK) ON ppe_activos.cod_ter = gen_terceros.ter_nit

```
