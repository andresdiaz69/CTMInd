# View: Vw_InchcapeTallerDaiFOF

## Usa los objetos:
- [[spiga_CumplimientoPedidosCliente]]
- [[UnidadDeNegocio]]

```sql
Create view Vw_InchcapeTallerDaiFOF as

select distinct YEAR(FechaDeCorte) año,
	   month(FechaDeCorte) mes,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.CodigoCentro,
       u.NombreCentro,
	   DescripcionPedidoTipoVentas,
	   idMR,
	   sum(CONVERT(decimal(10,2),ISNULL(f.UnidadesPedidas,0))) solicitadas,
	   sum(CONVERT(decimal(10,2),ISNULL(f.UnidadesPedidas,0))- CONVERT(decimal(10,2),ISNULL(f.UnidadesPendientes,0)) ) atendidas 
  from [PSCService_DB].dbo.spiga_CumplimientoPedidosCliente    f
  left join [DBMLC_0190].dbo.UnidadDeNegocio                   u  on f.IdEmpresa  = u.CodEmpresa 
                                                                 and f.CodigoCentro   = u.CodCentro
 where u.CodUnidadNegocio = 3
 and  ano_periodo = 2023
and mes_periodo   = 1
and IdMR          ='MCS'

 group by FechaDeCorte,
	   u.CodUnidadNegocio,
	   u.NombreUnidadNegocio,
	   f.CodigoCentro,
       u.NombreCentro,
	   u.NombreSeccion, 
	   DescripcionPedidoTipoVentas,
	   idMR



```
