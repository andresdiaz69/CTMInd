# View: v_GMF_CFC_JD_General

## Usa los objetos:
- [[GMF_CFC]]
- [[GMF_SedesJD]]

```sql
CREATE VIEW [dbo].[v_GMF_CFC_JD_General] AS
SELECT Anio, Mes, UnidadDeNegocio, CodSede, Sede, MAX(IdLineaJD_A) AS IdLineaJD_A, MAX(LineaJD_A) AS LineaJD_A,
	MAX(ValorJD_A) AS ValorJD_A, MAX(IdLineaJD_C) AS IdLineaJD_C,	MAX(LineaJD_C) AS LineaJD_C,
	MAX(ValorJD_C) AS ValorJD_C, MAX(IdLineaJD_W) AS IdLineaJD_W, MAX(LineaJD_W) AS LineaJD_W, MAX(ValorJD_W) AS ValorJD_W
FROM
(
	SELECT C.Anio, C.Mes, C.UnidadDeNegocio, CodSede = S.Id, S.Sede, 
		CASE WHEN C.IdLinea = 72 THEN C.IdLinea ELSE NULL END IdLineaJD_A,
		CASE WHEN C.IdLinea = 72 THEN 'Agricola' ELSE NULL END LineaJD_A,
		CASE WHEN C.IdLinea = 72 THEN Valor ELSE NULL END ValorJD_A,
	
		CASE WHEN C.IdLinea = 73 THEN C.IdLinea ELSE NULL END IdLineaJD_C,
		CASE WHEN C.IdLinea = 73 THEN 'Construccion' ELSE NULL END LineaJD_C,
		CASE WHEN C.IdLinea = 73 THEN Valor ELSE NULL END ValorJD_C,
	
		CASE WHEN C.IdLinea = 74 THEN C.IdLinea ELSE NULL END IdLineaJD_W,
		CASE WHEN C.IdLinea = 74 THEN 'Wirtgen' ELSE NULL END LineaJD_W,
		CASE WHEN C.IdLinea = 74 THEN Valor ELSE NULL END ValorJD_W

	FROM GMF_SedesJD S
	LEFT JOIN GMF_CFC C ON S.Sede = C.Sede
) A
GROUP BY Anio, Mes, UnidadDeNegocio, CodSede, Sede

```
