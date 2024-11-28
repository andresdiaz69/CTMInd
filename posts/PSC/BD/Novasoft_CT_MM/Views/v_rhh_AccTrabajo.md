# View: v_rhh_AccTrabajo

## Usa los objetos:
- [[rhh_ausentismo]]
- [[rhh_TbTipAus]]

```sql
CREATE VIEW [dbo].[v_rhh_AccTrabajo]
AS
SELECT     dbo.rhh_ausentismo.cod_emp, dbo.rhh_ausentismo.fec_ini, dbo.rhh_ausentismo.fec_fin
FROM         dbo.rhh_ausentismo INNER JOIN
                      dbo.rhh_TbTipAus ON dbo.rhh_ausentismo.cod_aus = dbo.rhh_TbTipAus.cod_aus
WHERE     (dbo.rhh_TbTipAus.cla_aus = '02')

```
