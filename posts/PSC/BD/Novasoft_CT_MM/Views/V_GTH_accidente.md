# View: V_GTH_accidente

## Usa los objetos:
- [[GTH_Accidente]]
- [[rhh_ausentismo]]
- [[rhh_emplea]]
- [[rhh_TbTipAus]]

```sql
CREATE VIEW dbo.V_GTH_accidente
AS
SELECT     dbo.rhh_ausentismo.cod_emp, dbo.rhh_ausentismo.fec_ini AS fecha, dbo.rhh_emplea.ap1_emp, dbo.rhh_emplea.ap2_emp, 
                      dbo.rhh_emplea.nom_emp
FROM         dbo.rhh_ausentismo LEFT OUTER JOIN
                      dbo.GTH_Accidente ON dbo.rhh_ausentismo.cod_emp = dbo.GTH_Accidente.cod_emp INNER JOIN
                      dbo.rhh_TbTipAus ON dbo.rhh_ausentismo.cod_aus = dbo.rhh_TbTipAus.cod_aus INNER JOIN
                      dbo.rhh_emplea ON dbo.rhh_ausentismo.cod_emp = dbo.rhh_emplea.cod_emp
WHERE     (dbo.rhh_TbTipAus.cla_aus = '02') AND (dbo.rhh_ausentismo.ind_pro = 0)

```
