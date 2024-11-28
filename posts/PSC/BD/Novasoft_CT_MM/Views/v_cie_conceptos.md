# View: v_cie_conceptos

## Usa los objetos:
- [[cie_conceptos]]

```sql

/*VISTA PARA PRESENTAR LOS CONCEPTOS QUE NO SON EXTRACURRICULARS
JCESARS		AGOSTO/2010*/
CREATE VIEW [dbo].[v_cie_conceptos]
AS
SELECT cod_con,nom_con,RTRIM(LTRIM(CONVERT(CHAR,val_con))) AS val_con
FROM cie_conceptos WITH(NOLOCK)
WHERE ind_ecur<>1;

```
