# View: vw_OrdenesAbiertas

## Usa los objetos:
- [[Empresas]]
- [[spiga_OrdenesDeTrabajoAbiertas]]
- [[spiga_OrdenesDeTrabajoCerradas]]
- [[UnidadDeNegocio]]
- [[v_EmpleadosSpiga]]

```sql
CREATE view [dbo].[vw_OrdenesAbiertas] as
--SELECT TOP (100) * FROM ( -- JCS: 2022/07/05 TEMP PARA PRUEBAS
select distinct OrdenTrabajo = convert(varchar,SerieOT) + '\' + convert(varchar,NumOT) + '\' + convert(varchar,AñoOT),
DescripcionTrabajo,ObservacionesOT,Placa=Matricula,IdEmpleadosResponsable,
AsesorResponsable = NombreEmpleadoResponsable + ' ' + Apellido1EmpleadoResponsable + ' ' + Apellido2EmpleadoResponsable,
CodigoTercero=IdTerceroCargo,NombreTercero=NombreTerceroCargo,email_corporativo,VIN,a.IdEmpresas,a.IdCentros,a.IdSecciones,a.DescripcionSeccion,
s.NombreEmpresa,u.NombreCentro
from		spiga_OrdenesDeTrabajoAbiertas		a
left join	[DBMLC_0190].dbo.v_EmpleadosSpiga	e	on	a.IdEmpleadosResponsable = e.IdEmpleados
left join	[DBMLC_0190].dbo.UnidadDeNegocio	u	on	a.IdEmpresas = u.CodEmpresa
														and a.IdCentros = u.CodCentro
														and a.IdSecciones = u.CodSeccion
left join	[DBMLC_0190].dbo.Empresas			s	on	a.IdEmpresas = s.CodigoEmpresa
where a.DescripcionSeccion like '%BOUT%'

union all

select distinct OrdenTrabajo = convert(varchar,SerieOT) + '\' + convert(varchar,NumOT) + '\' + convert(varchar,AñoOT),
DescripcionTrabajo,ObservacionesOT,Placa=Matricula,IdEmpleadosResponsable,
AsesorResponsable = NombreEmpleadoResponsable + ' ' + Apellido1EmpleadoResponsable + ' ' + Apellido2EmpleadoResponsable,
CodigoTercero=IdTerceroCargo,NombreTercero=NombreTerceroCargo,email_corporativo,vin,a.IdEmpresas,a.IdCentros,a.IdSecciones,a.DescripcionSeccion,
s.NombreEmpresa,u.NombreCentro
from spiga_OrdenesDeTrabajoCerradas				a
left join	[DBMLC_0190].dbo.v_EmpleadosSpiga	e	on	a.IdEmpleadosResponsable = e.IdEmpleados
left join	[DBMLC_0190].dbo.UnidadDeNegocio	u	on	a.IdEmpresas = u.CodEmpresa
														and a.IdCentros = u.CodCentro
														and a.IdSecciones = u.CodSeccion
left join	[DBMLC_0190].dbo.Empresas			s	on	a.IdEmpresas = s.CodigoEmpresa
where a.DescripcionSeccion like '%BOUT%'
--) AS RESULTADO

```
