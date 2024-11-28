# View: v_ProvisionIca_Ingresos

## Usa los objetos:
- [[spiga_ContabilidadMovimientos]]
- [[spiga_PUC]]

```sql
create view v_ProvisionIca_Ingresos as
select  Año=year(FechaAsiento),Mes=month(FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.cuenta,NombreCuenta=p.Nombre,m.centro,m.NombreCentro,m.Seccion,m.NombreSeccion,
m.Departamento,m.NombreDepartamento,Marca,NombreMarca,Debito=sum(debe),Credito=sum(Haber),Saldo=sum(debe)-sum(Haber)
from		[PSCService_DB].dbo.spiga_ContabilidadMovimientos	m
left join	[PSCService_DB].dbo.spiga_PUC						p	on	m.Cuenta = p.CodigoCuenta 
where m.cuenta like '4%'
--and m.IdEmpresas = 15
--and year(m.FechaAsiento)=2021
--and month(m.FechaAsiento)=2
group by year(FechaAsiento),month(FechaAsiento),m.IdEmpresas,m.NombreEmpresa,m.cuenta,p.Nombre,m.centro,m.NombreCentro,m.Seccion,m.NombreSeccion,
m.Departamento,m.NombreDepartamento,Marca,NombreMarca

```
