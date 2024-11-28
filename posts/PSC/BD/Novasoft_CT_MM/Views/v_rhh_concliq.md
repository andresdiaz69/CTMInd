# View: v_rhh_concliq

## Usa los objetos:
- [[rhh_concliq]]
- [[rhh_concliq]]
- [[SIS_APLICACION]]

```sql


CREATE VIEW [dbo].[v_rhh_concliq]
AS
SELECT	cod_con,mod_liq,emp_apl,tip_liq,tip_con,sub_tip,tip_pre,tip_tes
FROM	rhh_concliq
WHERE   (emp_apl = 'M') AND (NOT EXISTS
                          (SELECT     tip_liq
                            FROM          dbo.rhh_concliq AS I
                            WHERE      (COD_CON = dbo.rhh_concliq.cod_con) AND (mod_liq = dbo.rhh_concliq.mod_liq) AND (emp_apl =
                                                       (SELECT     emp_apl
                                                         FROM          dbo.SIS_APLICACION AS sis_aplicacion_1
                                                         WHERE      (cod_apl = 'NOM')))))
UNION ALL
SELECT	cod_con,mod_liq,emp_apl,tip_liq,tip_con,sub_tip,tip_pre,tip_tes
FROM	rhh_concliq
WHERE	emp_apl =	(SELECT     emp_apl
                    FROM          dbo.SIS_APLICACION AS sis_aplicacion_1
                    WHERE      (cod_apl = 'NOM'))

```
