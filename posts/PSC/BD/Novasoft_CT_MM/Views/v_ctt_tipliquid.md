# View: v_ctt_tipliquid

## Usa los objetos:
- [[rhh_tipliquid]]
- [[SIS_APLICACION]]

```sql

CREATE VIEW [dbo].[v_ctt_tipliquid]
AS
SELECT     tip_liq, nom_liq, tip_com, fec_liq, con_net, nom_mod, emp_apl,incl_tod_emp,ind_ctt
FROM         dbo.rhh_tipliquid
WHERE     ind_ctt = 1
AND			(emp_apl = 'M') AND (NOT EXISTS
                          (SELECT     tip_liq
                            FROM          dbo.rhh_tipliquid AS I
                            WHERE      (tip_liq = dbo.rhh_tipliquid.tip_liq) AND (emp_apl =
                                                       (SELECT     emp_apl
                                                         FROM          dbo.SIS_APLICACION AS sis_aplicacion_1
                                                         WHERE      (cod_apl = 'CTT')))))
UNION ALL
SELECT     tip_liq, nom_liq, tip_com, fec_liq, con_net, nom_mod, emp_apl,incl_tod_emp,ind_ctt
FROM         dbo.rhh_tipliquid
WHERE     ind_ctt = 1
AND			         emp_apl =
                          (SELECT     emp_apl
                            FROM          dbo.SIS_APLICACION AS sis_aplicacion_1
                            WHERE      (cod_apl = 'CTT'))

```
