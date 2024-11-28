# View: vw_EmpresasCentrosMunicipios

## Usa los objetos:
- [[Centros]]
- [[CentrosMunicipios]]
- [[Empresas]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]

```sql

CREATE VIEW [dbo].[vw_EmpresasCentrosMunicipios] AS
SELECT cm.CodigoEmpresa, e.NombreEmpresa, cm.CodigoCentro, c.NombreCentro, cm.CodigoDepartamento, Departamento=td.descripcion, cm.CodigoCiudad, Ciudad=tc.descripcion,
	CASE WHEN CONVERT(int, LTRIM(RTRIM(tc.departamento))) between 1 and 9 THEN '0' + LTRIM(RTRIM(tc.departamento)) + LTRIM(RTRIM(tc.Ciudad))
		ELSE LTRIM(RTRIM(tc.departamento)) + LTRIM(RTRIM(tc.Ciudad)) END AS CodDeptoCiudad
FROM CentrosMunicipios cm
LEFT JOIN Empresas	e ON cm.CodigoEmpresa = e.CodigoEmpresa
LEFT JOIN Centros	c ON cm.CodigoCentro  = c.CodigoCentro
LEFT JOIN Tramite_Departamentos AS td ON td.departamento = cm.CodigoDepartamento
LEFT JOIN Tramite_Ciudades AS tc ON td.departamento = tc.departamento AND cm.CodigoCiudad = tc.Ciudad

```
