# View: v_cie_infofam

## Usa los objetos:
- [[cie_familia]]

```sql

/*VISTA INFORMACION FAMILIAS
JCESARS		AGOSTO/2010*/
CREATE VIEW [dbo].[v_cie_infofam] 
AS
SELECT cod_fam,ISNULL(ape_nomp,'') AS ape_nomp,ISNULL(ape_nomm,'') AS ape_nomm,ISNULL(nom_ter,'') AS nom_ter,ISNULL(raz_ter,'') AS raz_ter
FROM cie_familia WITH(NOLOCK);

```
