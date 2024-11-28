# View: vw_EmpresasCentrosMunicipiosActivos

## Usa los objetos:
- [[Centros]]
- [[CentrosMunicipios]]
- [[Empresas]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[UnidadDeNegocio]]

```sql


CREATE VIEW [dbo].[vw_EmpresasCentrosMunicipiosActivos] AS
--****************************
--Autor: Manuel Suarez
-- Date: 30/09/2024
--Descr: Create VW para proyecto presupuestos con los centros activos y su correspondiente municipio por empresa.
--****************************

SELECT distinct cm.CodigoEmpresa, e.NombreEmpresa, cm.CodigoCentro, c.NombreCentro, cm.CodigoDepartamento, Departamento=td.descripcion, cm.CodigoCiudad, Ciudad=tc.descripcion,
	   CASE WHEN CONVERT(int, LTRIM(RTRIM(tc.departamento))) between 1 and 9 THEN '0' + LTRIM(RTRIM(tc.departamento)) + LTRIM(RTRIM(tc.Ciudad))
		    ELSE LTRIM(RTRIM(tc.departamento)) + LTRIM(RTRIM(tc.Ciudad)) END AS CodDeptoCiudad
  FROM CentrosMunicipios cm
  LEFT JOIN Empresas	 e ON cm.CodigoEmpresa = e.CodigoEmpresa
  LEFT JOIN Centros   	 c ON cm.CodigoCentro  = c.CodigoCentro
  LEFT JOIN Tramite_Departamentos  td ON td.departamento = cm.CodigoDepartamento
  LEFT JOIN Tramite_Ciudades       tc ON td.departamento = tc.departamento 
								     AND cm.CodigoCiudad = tc.Ciudad
 inner join Unidaddenegocio u on u.CodEmpresa = cm.CodigoEmpresa 
							 and u.CodCentro  = cm.CodigoCentro 





```
