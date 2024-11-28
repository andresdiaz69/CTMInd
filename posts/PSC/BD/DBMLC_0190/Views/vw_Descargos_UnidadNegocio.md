# View: vw_Descargos_UnidadNegocio

## Usa los objetos:
- [[Empresas]]
- [[UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_Descargos_UnidadNegocio] AS
SELECT DISTINCT ISNULL(CAST((ROW_NUMBER() OVER(ORDER BY A.CodEmpresa)) AS INT),0) AS Id, A.CodEmpresa,A.NombreEmpresa,A.CodCentro,A.NombreCentro,
	A.CodSeccion,A.NombreSeccion,A.CodDepartamento,A.NombreDepartamento,A.CodSedeAmbiental,A.SedeAmbiental,
	CASE WHEN CodCentro = 146 AND NombreSeccion LIKE '%FR%' THEN 'FR'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MZ%' THEN 'MZ'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%RN%' THEN 'RN'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%VW%' THEN 'VW'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MIT%' THEN 'MIT'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD C%' THEN 'JD.CONS'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD A%' THEN 'JD.AGR'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD W%' THEN 'WIR'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI CV%' THEN 'DAI.C'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI PC%' THEN 'DAI.V'
		ELSE A.Sigla END AS Sigla,

	CASE WHEN CodCentro = 146 AND NombreSeccion LIKE '%FR%' THEN 12
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MZ%' THEN 22
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%RN%' THEN 19
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%VW%' THEN 2
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MIT%' THEN 20 
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD C%' THEN 411
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD A%' THEN 410
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD W%' THEN 520
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI CV%' THEN 1
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI PC%' THEN 3
		ELSE A.CodUnidadNegocio END AS CodUnidadNegocio,

	CASE WHEN CodCentro = 146 AND NombreSeccion LIKE '%FR%' THEN 'FORD'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MZ%' THEN 'MAZDA'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%RN%' THEN 'RENAULT'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%VW%' THEN 'VOLKSWAGEN'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%MIT%' THEN 'MITSUBISHI' 
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD C%' THEN 'JD CONSTRUCCION'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD A%' THEN 'JD AGRICOLA'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%JD W%' THEN 'WIRTGEN'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI CV%' THEN 'DAIMLER VC'
		WHEN CodCentro = 146 AND NombreSeccion LIKE '%DAI PC%' THEN 'DAIMLER PC'
		ELSE A.NombreUnidadNegocio END AS NombreUnidadNegocio

FROM
(
	SELECT CodEmpresa=CONVERT(smallint,CodEmpresa),B.NombreEmpresa,CodCentro=CONVERT(smallint,CodCentro),
		NombreCentro=REPLACE(REPLACE(REPLACE(NombreCentro,' ','<>'),'><',''),'<>',' '),CodSeccion=CONVERT(smallint,CodSeccion),
		NombreSeccion=REPLACE(REPLACE(REPLACE(NombreSeccion,' ','<>'),'><',''),'<>',' '),CodDepartamento=LTRIM(RTRIM(CodDepartamento)),
		NombreDepartamento=REPLACE(REPLACE(REPLACE(NombreDepartamento,' ','<>'),'><',''),'<>',' '),
		CodUnidadNegocio=CONVERT(smallint,CodUnidadNegocio),Sigla=REPLACE(REPLACE(REPLACE(Sigla,' ','<>'),'><',''),'<>',' '),
		NombreUnidadNegocio=REPLACE(REPLACE(REPLACE(UPPER(NombreUnidadNegocio),' ','<>'),'><',''),'<>',' '), 		
		Division=REPLACE(REPLACE(REPLACE(Division,' ','<>'),'><',''),'<>',' '),CodSedeAmbiental=CONVERT(smallint,CodSedeAmbiental), 
		SedeAmbiental=REPLACE(REPLACE(REPLACE(SedeAmbiental,' ','<>'),'><',''),'<>',' ')		
	
	FROM UnidadDeNegocio U

	LEFT JOIN Empresas AS B ON U.CodEmpresa = B.CodigoEmpresa
) A

```
