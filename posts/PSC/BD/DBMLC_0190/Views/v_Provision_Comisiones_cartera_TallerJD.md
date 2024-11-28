# View: v_Provision_Comisiones_cartera_TallerJD

## Usa los objetos:
- [[spiga_Cartera]]
- [[UnidadDeNegocio]]

```sql


CREATE view [dbo].[v_Provision_Comisiones_cartera_TallerJD] as -- se debe tener en cuenta que debe ser hasta el mes anterior
select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,c.DescripcionSeccion,
TipoSeccion = case	when c.DescripcionSeccion like '%Wirtgen%' then 'WIRTGEN'
					when c.DescripcionSeccion like '%constr%'  then 'JD Construccion'
					else isnull(u.NombreUnidadNegocio,'JD Agricola')
					end,
Valor = sum(c.TotalFactura)


from		[PSCService_DB].dbo.spiga_Cartera	c
left join	UnidadDeNegocio						u	on	c.IdEmpresas = u.CodEmpresa and c.NombreCentro = u.NombreCentro 
														and c.DescripcionSeccion = u.NombreSeccion
where c.Departamento in ('TA')
and c.NombreCentro like 'JD%'
--and c.Ano_Periodo = 2020
--and c.Mes_Periodo = 5
--and month(c.FechaFactura) < 5 
group by c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,c.NombreCentro,c.DescripcionSeccion,u.NombreUnidadNegocio


```
