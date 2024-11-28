# View: v_CarteraPorVendedor

## Usa los objetos:
- [[Empresas]]
- [[spiga_Cartera]]
- [[v_VendedorPorFactura]]

```sql
CREATE view [dbo].[v_CarteraPorVendedor] as
select c.Ano_Periodo,c.Mes_Periodo,c.IdEmpresas,e.NombreEmpresa,c.NombreCentro,c.DescripcionSeccion,c.IdTerceros,c.NifCif,
c.NombreTercero,c.Factura,c.FechaFactura,c.FechaVencimiento,c.DescripcionSituacionEfectos,c.NombreDepartamento,
c.TotalFactura,c.ImporteEfecto,c.ImportePendiente,o.CedulaVendedor,o.NombreVendedor
from		[PSCService_DB].dbo.spiga_Cartera	c
left join	v_VendedorPorFactura				o	on	c.Factura =NumeroFactura
														and c.IdEmpresas = o.CodigoEmpresa	
left join   Empresas e on e.CodigoEmpresa = c.IdEmpresas
where NombreDepartamento not in ('Comunes','Financiero')
--and c.Ano_Periodo = 2022
--and c.Mes_Periodo = 1
--and factura like '%R146/100419/2021%'--'%T073/100940/2022%'

```
