# View: v_rhh_tipinforme_UGPP

## Usa los objetos:
- [[rhh_tipAgrup_UGPP]]

```sql

CREATE  VIEW [dbo].[v_rhh_tipinforme_UGPP]
AS
SELECT 
	   	    dbo.rhh_tipAgrup_UGPP.TipInforme,
		    dbo.rhh_tipAgrup_UGPP.NombreInforme 
FROM          dbo.rhh_tipAgrup_UGPP
GROUP BY rhh_tipAgrup_UGPP.tipinforme,NombreInforme

```
