# View: vw_ParametrizacionBiblioteca

## Usa los objetos:
- [[BibliotecaPer_Parametrizacion]]
- [[Empresas]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[vw_ParametrizacionBiblioteca]
AS
SELECT DISTINCT P.IdParametrizacionBiblioteca, P.CodCargo, P.CodEmpresa, P.CodUnidadNegocio, P.CodCentro, P.CodCiudad, P.NombreCargo, 
P.CodDepartamento,Empresa = E.NombreEmpresa,UnidadNegocio =UN.NombreUnidadNegocio ,Centro = UNC.NombreCentro,
Departamento = TD.descripcion,Ciudad = TC.descripcion
FROM BibliotecaPer_Parametrizacion P
LEFT JOIN Empresas E ON E.CodigoEmpresa = P.CodEmpresa 
--LEFT JOIN v_Cargos C ON C.CodigoCargo = P.CodCargo
LEFT JOIN vw_UnidadDeNegocio UN ON UN.CodEmpresa = P.CodEmpresa AND UN.CodUnidadNegocio = P.CodUnidadNegocio
LEFT JOIN vw_UnidadDeNegocio UNC ON UNC.CodEmpresa = P.CodEmpresa AND UNC.CodUnidadNegocio = P.CodUnidadNegocio AND UNC.CodCentro = P.CodCentro
LEFT JOIN Tramite_Departamentos TD ON TD.departamento = P.CodDepartamento
LEFT JOIN Tramite_Ciudades TC ON TC.departamento = P.CodDepartamento AND TC.Ciudad = P.CodCiudad

```
