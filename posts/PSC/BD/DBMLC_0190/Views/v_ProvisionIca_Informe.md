# View: v_ProvisionIca_Informe

## Usa los objetos:
- [[ProvisionIca_CuentaActividades]]
- [[ProvisionIca_Parametrizacion]]
- [[Tramite_Ciudades]]
- [[Tramite_Departamentos]]
- [[UnidadDeNegocio]]
- [[v_ProvisionIca_Ingresos]]

```sql

CREATE view [dbo].[v_ProvisionIca_Informe] as
select i.año,i.mes,i.IdEmpresas,i.NombreEmpresa,i.cuenta,i.NombreCuenta,i.centro,i.NombreCentro,i.seccion,i.NombreSeccion,
		i.Departamento,i.NombreDepartamento,i.marca,i.NombreMarca,a.CodActividadEconomica,a.NombreActividadEconomica,
		p.CodCentroProvIca,
		NombreCentroProvIca=u.NombreCentro,p.CodSeccionProvIca,NombreSeccionProvIca=u.NombreSeccion,p.CodDepartamentoProvIca,
		NombreDepartamentoProvIca=u.NombreDepartamento,CodDepartamentoMunicipal=t.departamento,NombreDeparamentoMunicipal = td.descripcion,
		p.CodCiudad,NombreCiudad=t.descripcion, p.CodMunicipio,p.SobreTasa,p.Tarifa,p.TarifaAvisosTableros,
		i.Debito,i.Credito,i.Saldo, 
		
		ValorICA = (((i.saldo*-1)*p.Tarifa)/1000),
		
		ValorAvisos=((((i.saldo*-1)*p.Tarifa)*p.TarifaAvisosTableros)/100),
		
		ValorSobretasa = (((i.saldo*-1)*p.Tarifa)*SobreTasa)/100

		 --convert(varchar,p.CodCiudad),convert(varchar,t.departamento) + convert(varchar,t.ciudad),
		 --p.CodCentro,p.CodSeccion,p.CodDepartamento,p.ActividadEconomica


		from		v_ProvisionIca_Ingresos			i
		left join	ProvisionIca_CuentaActividades	a	on	i.cuenta=a.cuenta
		left join	ProvisionIca_Parametrizacion	p	on	i.IdEmpresas = p.CodEmpresa
															and i.centro = p.CodCentro
															and i.seccion = p.CodSeccion	
															and i.Departamento = p.CodDepartamento
															and a.CodActividadEconomica = p.ActividadEconomica
		left join Tramite_Ciudades                  t  on   t.departamento = p.CodDepartamentoCiudad and t.Ciudad = p.CodCiudad
		--convert(varchar,p.CodCiudad) = convert(varchar,t.departamento) + convert(varchar,t.ciudad)
		left join UnidadDeNegocio                   u  on   p.CodCentroProvIca = u.CodCentro
															and  p.CodDepartamentoProvIca = u.CodDepartamento
															and p.CodSeccionProvIca = u.CodSeccion
        left join Tramite_Departamentos             TD on   TD.departamento = T.departamento 
--where i.año=2021 
--and i.mes=2 
--and i.IdEmpresas = 15 
--and i.cuenta = '4135021405'
----and i.centro = 76

```
