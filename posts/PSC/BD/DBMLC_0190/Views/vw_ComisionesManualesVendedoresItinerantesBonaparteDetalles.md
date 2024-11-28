# View: vw_ComisionesManualesVendedoresItinerantesBonaparteDetalles

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[spiga_NotasCreditoRepuestos]]
- [[vw_PorcentajeRecaudoAlmacenFactura]]

```sql

CREATE VIEW [com].[vw_ComisionesManualesVendedoresItinerantesBonaparteDetalles]
AS
select praf.Ano_Periodo,		praf.Mes_Periodo,		praf.CodigoEmpresa,     a.CedulaVendedorRepuestos,  
	   a.Centro,	            praf.NumeroFactura,     praf.FechaFactura,		praf.TotalFactura, 
	   praf.ImporteEfecto,		praf.PorcentajeRecaudo, 
	   a.ValorNetoMostrador, 
	   a.ValorNetoMostrador * praf.PorcentajeRecaudo / 100 AS ValorBaseMostrador,        1 AS TipoAlmacen 
from vw_PorcentajeRecaudoAlmacenFactura praf
left  join ( select csaa.Ano_Periodo,             csaa.Mes_Periodo,                csaa.CodigoEmpresa,                csaa.Empresa, 
					csaa.CodigoCentro,            csaa.Centro,                     csaa.FechaFactura,                 csaa.NumeroFactura,     
					CASE WHEN csaa.CedulaVendedorRepuestos = 0     THEN csaa.CedulaBodeguero ELSE csaa.CedulaVendedorRepuestos END CedulaVendedorRepuestos, 
					CASE WHEN csaa.NombreVendedorRepuestos IS NULL THEN csaa.NombreBodeguero ELSE csaa.NombreVendedorRepuestos END NombreVendedorRepuestos, 	 
					csaa.CedulaBodeguero,         csaa.NombreBodeguero,            csaa.VentaCampaña,                 SUM (csaa.ValorNeto)  AS ValorNetoMostrador

					from ComisionesSpigaAlmacenAlbaran csaa
					left join PSCService_DB.dbo.spiga_NotasCreditoRepuestos sncr ON csaa.NumeroFactura = sncr.Factura

					group by csaa.Ano_Periodo, csaa.Mes_Periodo, csaa.CodigoEmpresa, csaa.Empresa, csaa.CodigoCentro,
					csaa.Centro, csaa.FechaFactura,  csaa.NumeroFactura, csaa.CedulaBodeguero, csaa.NombreBodeguero,
					csaa.VentaCampaña, csaa.CedulaVendedorRepuestos, csaa.NombreVendedorRepuestos
			)a ON  a.NumeroFactura = praf.NumeroFactura 
left join PSCService_DB.dbo.spiga_NotasCreditoRepuestos sncr ON a.NumeroFactura = sncr.Factura
where praf.Ano_Periodo > 2023  AND sncr.NumeroNotaCredito IS NULL and praf.PorcentajeRecaudo is not null 


```
