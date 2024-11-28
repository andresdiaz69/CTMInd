# View: v_cie_novedades

## Usa los objetos:
- [[cie_conceptos]]

```sql

/*VISTA PARA PRESENTAR LOS CONCEPTOS QUE SON EXTRACURRICULARES
JCESARS		AGOSTO/2010*/
CREATE VIEW [dbo].[v_cie_novedades]
AS
SELECT cod_con,nom_con,RTRIM(LTRIM(CONVERT(CHAR,val_con))) as val_con
FROM cie_conceptos WITH(NOLOCK)
WHERE ind_ecur=1;

```
