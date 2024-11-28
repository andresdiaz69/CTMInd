# View: v_CF_Consulta

## Usa los objetos:
- [[CF_Consulta]]
- [[CF_Tipos]]
- [[Empresas]]
- [[v_CF_AgrupacionLinea]]

```sql
CREATE VIEW [dbo].[v_CF_Consulta] AS
SELECT	Fecha,			IdEmpresa,		Empresa,		IdLinea,		Linea,			IdCentro,		
		Centro,			N1,				N2,				N3,				Tipo,			Valor = SUM(Valor)
FROM
(
	SELECT	D.Fecha									,D.IdEmpresa						,Empresa = LTRIM(RTRIM(E.NombreEmpresa)), 
			IdLinea = LTRIM(RTRIM(D.IdLinea))		,Linea = LTRIM(RTRIM(L.Linea))		,D.IdCentro, 
			Centro = LTRIM(RTRIM(C.Centro))			,D.N1								,D.N2, 
			D.N3									,Tipo = LTRIM(RTRIM(T.Tipo))		,D.Valor
	FROM	[dbo].[CF_Consulta] D

	LEFT JOIN	[dbo].[Empresas] E ON D.IdEmpresa = E.CodigoEmpresa

	LEFT JOIN	(
		SELECT DISTINCT CodEmpresa ,Id_Linea ,Linea
		FROM (
			SELECT DISTINCT CodEmpresa, Id_Linea, Linea = CASE WHEN Id_Linea = 'DIG' THEN 'NEBULA' ELSE Linea END
			FROM [dbo].[v_CF_AgrupacionLinea] WHERE Activado = 1
			UNION ALL 
			SELECT 1 ,'JD' ,'JHON DEERE'
			UNION ALL 
			SELECT 4 ,'JD' ,'JHON DEERE'
			UNION ALL 
			SELECT 5 ,'JD' ,'JHON DEERE'
			UNION ALL 
			SELECT 6 ,'DAI' ,'DAIMLER'
		) A
	) L ON D.IdEmpresa = L.CodEmpresa AND D.IdLinea = L.Id_Linea

	LEFT JOIN (
		SELECT DISTINCT Id_Centro, Centro 
		FROM [dbo].[v_CF_AgrupacionLinea] 
		WHERE Activado = 1
	) C ON D.IdCentro = C.Id_Centro

	LEFT JOIN	[dbo].[CF_Tipos] T ON D.N1 = T.N1 AND D.N2 = T.N2 AND D.N3 = T.N3
) A
--where Fecha between '20240201' and '20240201' AND N1 = 20 AND IdCentro = 130
GROUP BY	Fecha,		IdEmpresa,		Empresa,		IdLinea,		
			Linea,		IdCentro,		Centro,			N1,				
			N2,			N3,				Tipo

```
