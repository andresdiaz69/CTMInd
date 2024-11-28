# View: v_rhh_prestmENT

## Usa los objetos:
- [[RHH_EMPLEA]]
- [[rhh_prestm]]
- [[rhh_prestpagex]]

```sql
CREATE VIEW [dbo].[v_rhh_prestmENT]
AS


SELECT     E.cod_emp,RTRIM(LTRIM(AP1_EMP))+' '+ RTRIM(LTRIM(ap2_EMP))+' '+ RTRIM(LTRIM(NOM_EMP)) As Nom_emp, cod_con, sec_pre, apl_con, mon_pre, fec_ini, cuo_pre, tot_ext, val_pag, ind_pig, val_cuo, cuo_pag, ind_ref, fec_ref, tip_cuo, ind_prog, 
                      ini_prog, val_PagEx, ind_prop,
                          (SELECT     ISNULL(SUM(val_pag), 0) AS Expr1
                            FROM          dbo.rhh_prestpagex
                            WHERE      (dbo.rhh_prestm.cod_emp = cod_emp) AND (dbo.rhh_prestm.cod_con = cod_con) AND (dbo.rhh_prestm.sec_pre = sec_pre)) AS Ventanilla, 
                      mon_pre - val_pag - val_PagEx -
                          (SELECT     ISNULL(SUM(val_pag), 0) AS Expr1
                            FROM          dbo.rhh_prestpagex
                            WHERE      (dbo.rhh_prestm.cod_emp = cod_emp) AND (dbo.rhh_prestm.cod_con = cod_con) AND (dbo.rhh_prestm.sec_pre = sec_pre)) 
                      AS Saldo, observaciones, ind_liqcont
FROM         dbo.rhh_prestm 
RIGHT JOIN RHH_EMPLEA  E ON E.COD_EMP =dbo.rhh_prestm.cod_emp

```
