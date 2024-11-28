# View: vw_Descargos_HistoricoFueros

## Usa los objetos:
- [[Descargos_Fueros]]
- [[Descargos_HistoricoFueros]]
- [[Profiles]]

```sql
CREATE VIEW [dbo].[vw_Descargos_HistoricoFueros] AS
SELECT IdDescargo,										UserModifico,										Observaciones,
	NombreUsuario,										TipoUsuario,										FechaModificacion = MAX(FechaModificacion),
	Enfermedad = CONVERT(BIT,MAX(Enfermedad)),			PrePension = CONVERT(BIT,MAX(PrePension)),			CabezaFamilia = CONVERT(BIT,MAX(CabezaFamilia)),
	Convivencia = CONVERT(BIT,MAX(Convivencia)),		Maternidad  = CONVERT(BIT,MAX(Maternidad)),			OtrosFueros = CONVERT(BIT,MAX(OtrosFueros)),
	DescOtrosFueros = MAX(DescOtrosFueros)

FROM (
	SELECT HF.IdDescargo,		HF.UserModifico,					HF.FechaModificacion, 
		HF.Observaciones,		TipoUsuario = HF.Usuario,
		NombreUsuario = REPLACE(REPLACE(REPLACE(P.Nombres + ' ' + P.Apellidos,' ','<>'),'><',''),'<>',' '), 
		Enfermedad = CASE WHEN HF.IdFueros = 1 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		PrePension = CASE WHEN HF.IdFueros = 2 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		CabezaFamilia = CASE WHEN HF.IdFueros = 3 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		Convivencia = CASE WHEN HF.IdFueros = 4 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		Maternidad = CASE WHEN HF.IdFueros = 5 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		OtrosFueros = CASE WHEN HF.IdFueros = 6 THEN CONVERT(SMALLINT,HF.TieneFuero) END,
		DescOtrosFueros = CASE WHEN HF.IdFueros = 6 THEN HF.DescFuero END
	FROM Descargos_HistoricoFueros HF
	LEFT JOIN Descargos_Fueros F ON HF.IdFueros = F.IdFuero
	LEFT JOIN Profiles P ON P.UserId = HF.UserModifico
) A
GROUP BY IdDescargo, UserModifico, Observaciones, NombreUsuario, TipoUsuario

```
