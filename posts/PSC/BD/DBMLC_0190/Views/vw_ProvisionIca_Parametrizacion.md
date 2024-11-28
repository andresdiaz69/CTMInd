# View: vw_ProvisionIca_Parametrizacion

## Usa los objetos:
- [[Centros]]
- [[Departamentos]]
- [[Empresas]]
- [[ProvisionIca_Parametrizacion]]
- [[Secciones]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[UnidadDeNegocio]]

```sql


create view [dbo].[vw_ProvisionIca_Parametrizacion] as
	select DISTINCT a.IdProvIca, a.CodEmpresa,NomEmpresa=e.NombreEmpresa,a.CodCentro,NomCentro=c.NombreCentro,a.CodSeccion,NomSeccion=s.Seccion,a.CodDepartamento,
	NomDepartamento=d.NombreDepartamento ,a.CodUnidadNegocio,NomUnidadNegocio=u.NombreUnidadNegocio,a.CodCentroProvIca,NomCentroProvIca=ci.NombreCentro,
	a.CodSeccionProvIca,NomSeccionProvIca=si.Seccion,a.CodDepartamentoProvIca,NomDepartamentoProvIca=d.NombreDepartamento,a.ActividadEconomica,
	a.CodDepartamentoCiudad,NomDepartamentoCiudad= TD.descripcion,a.CodCiudad,NomCiudad=tc.descripcion,a.CodMunicipio,a.SobreTasa,
	a.Tarifa,a.TarifaAvisosTableros
	from ProvisionIca_Parametrizacion a
	left join Empresas E        on a.CodEmpresa = e.CodigoEmpresa
	left join Centros C on LTRIM(RTRIM(a.CodCentro)) = c.CodigoCentro
	left join Secciones S on    LTRIM(RTRIM(a.CodSeccion)) = s.CodigoSeccion
	left join UnidadDeNegocio U on  LTRIM(RTRIM(a.CodUnidadNegocio)) = u.CodUnidadNegocio			
	left join Centros CI	ON  LTRIM((a.CodCentroProvIca)) = ci.CodigoCentro
	left join Secciones SI on    LTRIM(RTRIM(a.CodSeccionProvIca)) = SI.CodigoSeccion

	left join Departamentos D on LTRIM(RTRIM(a.CodDepartamento)) = d.CodigoDepartamento
	                             and a.CodDepartamentoProvIca = d.CodigoDepartamento
    left join Tramite_Departamentos TD on a.CodDepartamentoCiudad = TD.departamento
	left join Tramite_Ciudades TC on a.CodCiudad = tc.Ciudad and a.CodDepartamentoCiudad = tc.departamento

```
