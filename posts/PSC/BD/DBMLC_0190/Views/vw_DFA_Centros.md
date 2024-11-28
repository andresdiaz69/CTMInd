# View: vw_DFA_Centros

## Usa los objetos:
- [[Centros]]
- [[DFA_Parametrizacion_Centros]]
- [[Empresas]]
- [[Secciones]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_DFA_Centros] AS
SELECT CodEmpresa, NombreEmpresa, CONVERT(SMALLINT,CodUnidadNegocio)CodUnidadNegocio, NombreUnidadNegocio, 
	CodCentro, NombreCentro, CodSeccion, NombreSeccion, CodDepartamento, NombreDepartamento, Activo
FROM 
(
	SELECT CodEmpresa, NombreEmpresa, CodCentro, NombreCentro, CodSeccion, NombreSeccion, 
		CASE WHEN CodSeccion IN (881,883,880,884,885,886,888) THEN 410
			WHEN CodSeccion IN (879,882,929,887) THEN 411
			WHEN CodSeccion IN (940,936,942) THEN 520 
			ELSE CONVERT(INT,CodUnidadNegocio) END CodUnidadNegocio, 
		
		CASE WHEN CodSeccion IN (881,883,880,884,885,886,888) THEN 'JD AGRICOLA'
			WHEN CodSeccion IN (879,882,929,887) THEN 'JD CONSTRUCCION'
			WHEN CodSeccion IN (940,936,942) THEN 'WIRTGEN'
			ELSE NombreUnidadNegocio END NombreUnidadNegocio, 

		CodDepartamento, NombreDepartamento, Activo=ISNULL(Activo, 1)
	FROM
	(
		SELECT	A.CodEmpresa,			A.NombreEmpresa,			A.CodUnidadNegocio,			A.NombreUnidadNegocio, 
				A.CodCentro, 			A.NombreCentro,				A.CodSeccion,				A.NombreSeccion, 
				A.CodDepartamento,		A.NombreDepartamento,		B.Activo
		FROM vw_UnidadDeNegocio A
		LEFT JOIN DFA_Parametrizacion_Centros b ON A.CodEmpresa = B.CodEmpresa 
			AND A.CodCentro = B.CodCentro AND A.CodSeccion = B.CodSeccion 
			AND A.CodDepartamento = B.CodDepartamento AND A.CodUnidadNegocio = B.CodUnidadNegocio
		WHERE A.CodUnidadNegocio IN (410, 411, 417, 520)

		UNION ALL 

		SELECT	C.CodEmpresa,			E.NombreEmpresa,			C.CodUnidadNegocio,			U.NombreUnidadNegocio, 
				C.CodCentro,			CE.NombreCentro,			C.CodSeccion,				NombreSeccion = S.Seccion, 
				C.CodDepartamento,		D.NombreDepartamento,		C.Activo

		FROM DFA_Parametrizacion_Centros C
		LEFT JOIN Empresas E ON E.CodigoEmpresa = C.CodEmpresa
		LEFT JOIN 
		(
			SELECT DISTINCT CodUnidadNegocio, NombreUnidadNegocio
			FROM vw_UnidadDeNegocio
			WHERE CodUnidadNegocio IN (410, 411, 520)
		) U ON U.CodUnidadNegocio = C.CodUnidadNegocio
		LEFT JOIN Centros CE ON C.CodCentro = CE.CodigoCentro
		LEFT JOIN Secciones S ON C.CodSeccion = S.CodigoSeccion
		LEFT JOIN 
		(
			SELECT DISTINCT CodDepartamento, NombreDepartamento
			FROM vw_UnidadDeNegocio
		) D ON D.CodDepartamento = C.CodDepartamento
	) A 
) AS A

```
