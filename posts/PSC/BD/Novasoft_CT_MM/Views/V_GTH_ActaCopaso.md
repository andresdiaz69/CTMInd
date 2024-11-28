# View: V_GTH_ActaCopaso

## Usa los objetos:
- [[GTH_Copaso]]
- [[rhh_Convenio]]

```sql


CREATE VIEW [dbo].[V_GTH_ActaCopaso]
AS
SELECT     dbo.GTH_Copaso.cod_copaso, dbo.GTH_Copaso.cod_conv, dbo.GTH_Copaso.fec_const, dbo.GTH_Copaso.Fec_fin, dbo.rhh_Convenio.nom_conv
FROM         dbo.GTH_Copaso INNER JOIN
                      dbo.rhh_Convenio ON dbo.GTH_Copaso.cod_conv = dbo.rhh_Convenio.cod_conv



```
