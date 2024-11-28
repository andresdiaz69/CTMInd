# View: vw_Descargos_FuerosBySolicitudes

## Usa los objetos:
- [[Descargos_Fueros]]
- [[Descargos_FuerosBySolicitudes]]

```sql
CREATE VIEW [dbo].[vw_Descargos_FuerosBySolicitudes] AS
SELECT IdDescargo,										Enfermedad = CONVERT(BIT,MAX(Enfermedad)),
	PrePension = CONVERT(BIT,MAX(PrePension)),			CabezaFamilia = CONVERT(BIT,MAX(CabezaFamilia)),
	Convivencia = CONVERT(BIT,MAX(Convivencia)),		Maternidad  = CONVERT(BIT,MAX(Maternidad)),
	OtrosFueros = CONVERT(BIT,MAX(OtrosFueros)),		DescOtrosFueros = MAX(DescOtrosFueros)

FROM (
	SELECT IdDescargo,
		Enfermedad = CASE WHEN DF.IdFueros = 1 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		PrePension = CASE WHEN DF.IdFueros = 2 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		CabezaFamilia = CASE WHEN DF.IdFueros = 3 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		Convivencia = CASE WHEN DF.IdFueros = 4 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		Maternidad = CASE WHEN DF.IdFueros = 5 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		OtrosFueros = CASE WHEN DF.IdFueros = 6 THEN CONVERT(SMALLINT,DF.TieneFuero) END,
		DescOtrosFueros = CASE WHEN DF.IdFueros = 6 THEN DF.DescFuero END
	FROM Descargos_FuerosBySolicitudes DF
	LEFT JOIN Descargos_Fueros F ON DF.IdFueros = F.IdFuero
) A
GROUP BY IdDescargo

```
