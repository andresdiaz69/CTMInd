# View: v_rhh_tipAgrup_UGPP

## Usa los objetos:
- [[rhh_tipAgrup_UGPP]]

```sql

CREATE VIEW [dbo].[v_rhh_tipAgrup_UGPP]
AS
SELECT        dbo.rhh_tipAgrup_UGPP.TipoAgr,
		    dbo.rhh_tipAgrup_UGPP.Descripcion,
		   dbo.rhh_tipAgrup_UGPP.TipInforme
FROM          dbo.rhh_tipAgrup_UGPP
GROUP BY rhh_tipAgrup_UGPP.TipInforme, rhh_tipAgrup_UGPP.TipoAgr, rhh_tipAgrup_UGPP.Descripcion

```
