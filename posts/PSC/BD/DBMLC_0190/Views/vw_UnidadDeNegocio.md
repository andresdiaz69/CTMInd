# View: vw_UnidadDeNegocio

## Usa los objetos:
- [[UnidadDeNegocio]]
- [[vw_Empresas]]

```sql

CREATE VIEW [dbo].[vw_UnidadDeNegocio] AS
SELECT DISTINCT		ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.CodEmpresa)) AS INT),0) AS Id,
	CodEmpresa,				NombreEmpresa,					CodCentro,						NombreCentro,			
	CodSeccion,				NombreSeccion,					CodDepartamento,				NombreDepartamento,		
	CodUnidadNegocio,		NombreUnidadNegocio,			UnidadNegocio_Requisicion,		NombreUnidadNegocio_Requisicion,
	Sigla,					Division,						CodSedeAmbiental,				SedeAmbiental,
	CodSedeDistCol,			SedeDistribucionColision
FROM
(
	SELECT CodEmpresa = CONVERT(smallint, LTRIM(RTRIM(A.CodEmpresa))), 
		NombreEmpresa = REPLACE(REPLACE(REPLACE(B.NombreEmpresa,' ','<>'),'><',''),'<>',' '), 
		CodCentro = CONVERT(smallint, LTRIM(RTRIM(A.CodCentro))), 
		NombreCentro = REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' '), 
		CodSeccion = CONVERT(smallint, LTRIM(RTRIM(A.CodSeccion))),
		NombreSeccion = REPLACE(REPLACE(REPLACE(A.NombreSeccion,' ','<>'),'><',''),'<>',' '), 
		CodDepartamento = REPLACE(REPLACE(REPLACE(A.CodDepartamento,' ','<>'),'><',''),'<>',' '),
		NombreDepartamento = REPLACE(REPLACE(REPLACE(A.NombreDepartamento,' ','<>'),'><',''),'<>',' '), 
		CodUnidadNegocio = CONVERT(smallint, LTRIM(RTRIM(A.CodUnidadNegocio))),
		NombreUnidadNegocio = REPLACE(REPLACE(REPLACE(UPPER(A.NombreUnidadNegocio),' ','<>'),'><',''),'<>',' '), 
		Sigla = REPLACE(REPLACE(REPLACE(A.Sigla,' ','<>'),'><',''),'<>',' '),
		UnidadNegocio_Requisicion = CONVERT(smallint, LTRIM(RTRIM(A.UnidadNegocio_Requisicion))), 
		NombreUnidadNegocio_Requisicion = 
			CASE WHEN A.UnidadNegocio_Requisicion = 1   THEN 'DAIMLER VC (VEHICULOS COMERCIALES)'
				 WHEN A.UnidadNegocio_Requisicion = 5   THEN 'CENTRO DE COLISION'
				 WHEN A.UnidadNegocio_Requisicion = 20  THEN 'MMC - MITSUBISHI'
				 WHEN A.UnidadNegocio_Requisicion = 410 THEN 'JOHN DEERE AGRÍCOLA'
				 WHEN A.UnidadNegocio_Requisicion = 411 THEN 'JOHN DEERE CONSTRUCCION'
				 ELSE REPLACE(REPLACE(REPLACE(UPPER(A.NombreUnidadNegocio_Requisicion),' ','<>'),'><',''),'<>',' ') END,
		Division = REPLACE(REPLACE(REPLACE(A.Division,' ','<>'),'><',''),'<>',' '), 
		CodSedeAmbiental = CONVERT(smallint, LTRIM(RTRIM(A.CodSedeAmbiental))), 
		SedeAmbiental = REPLACE(REPLACE(REPLACE(A.SedeAmbiental,' ','<>'),'><',''),'<>',' '), 
		CodSedeDistCol = REPLACE(REPLACE(REPLACE(A.CodSedeDistCol,' ','<>'),'><',''),'<>',' '), 
		SedeDistribucionColision = REPLACE(REPLACE(REPLACE(A.SedeDistribucionColision,' ','<>'),'><',''),'<>',' ')
	FROM UnidadDeNegocio  AS A
	LEFT JOIN vw_Empresas AS B ON A.CodEmpresa = B.CodigoEmpresa
) A

```
