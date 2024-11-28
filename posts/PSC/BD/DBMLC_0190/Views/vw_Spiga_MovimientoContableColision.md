# View: vw_Spiga_MovimientoContableColision

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[spiga_PUC]]

```sql
CREATE view [dbo].[vw_Spiga_MovimientoContableColision] as
select  Empresa=idEmpresas,NombreEmpresa,year(a.FechaAsiento) as año,month(a.FechaAsiento) as mes,
Cuenta,NombreCuenta = p.nombre,centro,NombreCentro,centroAux,NombreCentroAux,Seccion,NombreSeccion,
SeccionAux,NombreSeccionAux,Departamento,NombreDepartamento,DepartamentoAux, NombreDepartamentoAux,
marca,NombreMarca,Concepto,CONVERT(money, sum(debe)) AS Debe, CONVERT(money, sum(haber)) AS Haber
FROM		[PSCService_DB].dbo.spiga_ContabilidadMovimientos 	a	 with(nolock)	
left join	[PSCService_DB].dbo.spiga_PUC						p	on	a.cuenta = p.CodigoCuenta
WHERE Departamento = 'RE'
and idEmpresas in (1,5,6,22)
and NombreCentro like 'CO-%'
--and year(a.FechaAsiento) = 2020
--and month(a.FechaAsiento) = 6
group by idEmpresas,NombreEmpresa,year(a.FechaAsiento),month(a.FechaAsiento),Cuenta, p.nombre,centro,
NombreCentro,centroAux,NombreCentroAux,Seccion,NombreSeccion,SeccionAux,NombreSeccionAux,Departamento,
NombreDepartamento,DepartamentoAux, NombreDepartamentoAux,marca,NombreMarca,Concepto


```
