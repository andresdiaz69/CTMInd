# View: V_GTH_DocumIncEmp

## Usa los objetos:
- [[GTH_documInc]]
- [[GTH_documIncEmp]]
- [[rhh_ausentismo]]
- [[rhh_emplea]]
- [[rhh_TbTipAus]]

```sql
CREATE VIEW dbo.V_GTH_DocumIncEmp
AS
SELECT     dbo.rhh_ausentismo.cod_emp, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, dbo.rhh_emplea.nom_emp, dbo.rhh_ausentismo.cod_aus, 
                      dbo.rhh_ausentismo.cod_enf, dbo.rhh_ausentismo.res_nro, dbo.rhh_ausentismo.cer_nro, dbo.rhh_ausentismo.cau_aus, dbo.rhh_ausentismo.fec_ini, 
                      dbo.rhh_ausentismo.fec_fin, dbo.rhh_ausentismo.ini_aus, dbo.rhh_ausentismo.fin_aus, dbo.rhh_ausentismo.int_con, dbo.rhh_ausentismo.ind_nom, 
                      dbo.rhh_ausentismo.sal_bas, dbo.rhh_ausentismo.ind_pag, dbo.rhh_ausentismo.fec_res, dbo.rhh_ausentismo.ind_int, dbo.rhh_ausentismo.res_int, 
                      dbo.rhh_ausentismo.fre_int, dbo.rhh_ausentismo.ind_hsp, dbo.rhh_ausentismo.ind_pro, dbo.GTH_documIncEmp.cod_doc, 
                      dbo.GTH_documIncEmp.img_docum, dbo.GTH_documIncEmp.fec_compromiso, dbo.GTH_documIncEmp.fec_entrega
FROM         dbo.rhh_ausentismo INNER JOIN
                      dbo.rhh_TbTipAus ON dbo.rhh_ausentismo.cod_aus = dbo.rhh_TbTipAus.cod_aus INNER JOIN
                      dbo.GTH_documInc ON dbo.rhh_TbTipAus.cla_aus = dbo.GTH_documInc.cla_aus INNER JOIN
                      dbo.rhh_emplea ON dbo.rhh_ausentismo.cod_emp = dbo.rhh_emplea.cod_emp INNER JOIN
                      dbo.GTH_documIncEmp ON dbo.rhh_ausentismo.cod_emp = dbo.GTH_documIncEmp.cod_emp AND 
                      dbo.rhh_ausentismo.cod_aus = dbo.GTH_documIncEmp.cod_aus AND dbo.rhh_ausentismo.fec_ini = dbo.GTH_documIncEmp.fec_ini

```
