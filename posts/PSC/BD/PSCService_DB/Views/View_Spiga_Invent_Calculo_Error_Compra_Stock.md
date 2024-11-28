# View: View_Spiga_Invent_Calculo_Error_Compra_Stock

## Usa los objetos:
- [[Empresas]]
- [[spiga_StockRepuestos]]
- [[UnidadDeNegocio]]

```sql
CREATE view [dbo].[View_Spiga_Invent_Calculo_Error_Compra_Stock] as
select r.IdEmpresas,c.NombreEmpresa,r.IdCentros,b.NombreCentro,b.CodUnidadNegocio,b.NombreUnidadNegocio,r.Ano_Periodo,r.Mes_Periodo,
UltAñoCompra=year(case when FechaUltimaCompra IS NOT NULL then FechaUltimaCompra else FechaTraspasoTRE end),
UltMesCompra=month(case when FechaUltimaCompra IS NOT NULL then FechaUltimaCompra else FechaTraspasoTRE end),
ValorPrecioMedio=sum(r.PrecioMedio*r.Stock),
NumReferencias=case when r.stock <> 0 then COUNT(r.IdReferencias) else 0 end
from		spiga_StockRepuestos		r
LEFT JOIN	DBMLC_0190..UnidadDeNegocio b ON (	b.CodEmpresa = r.IdEmpresas AND
												b.CodCentro  = r.IdCentros  AND
												b.CodSeccion = r.IdSecciones) 
LEFT JOIN	DBMLC_0190..Empresas		c ON (c.CodigoEmpresa = r.IdEmpresas AND
												c.CodigoEmpresa = b.CodEmpresa)
--where Ano_Periodo = 2021
--and Mes_Periodo = 9
----and r.IdReferencias = '4031500Q1F'
--and r.idcentros in (2,4,5,17,20,24,47,71,159)
group by r.IdEmpresas,c.NombreEmpresa,r.IdCentros,b.NombreCentro,b.CodUnidadNegocio,b.NombreUnidadNegocio,r.Ano_Periodo,r.Mes_Periodo,
FechaUltimaCompra,FechaTraspasoTRE,r.stock --,r.IdReferencias, 

```
