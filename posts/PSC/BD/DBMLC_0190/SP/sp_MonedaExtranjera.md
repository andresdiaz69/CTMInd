# Stored Procedure: sp_MonedaExtranjera

## Usa los objetos:
- [[Empresas]]
- [[spiga_CuentasPorPagar]]
- [[vw_vehiculosFechaEntrega]]

```sql
CREATE  procedure [dbo].[sp_MonedaExtranjera] 
(
	@Fecha			datetime	null,
	@IdMonedaOrigen	smallint 	null,
	@todos	bit null
)

as
--declare @fecha datetime
--set @fecha = '20200828'
 set nocount on

select a.IdEmpresas,a.NombreEmpresa,a.IdTerceros,a.NombreTercero,a.Factura,a.FechaFactura,a.FechaVencimiento,Valor = a.TotalFactura,Saldo=a.ImportePendiente,a.IdMonedaOrigen,
a.DescripcionMoneda,a.NombreDepartamento,a.VIN, a.FechaEntrega, NombreCentro, 
FechaPago =	case when a.Departamento = 'VN' and NombreCentro like 'JD%' and a.FechaEntrega is not null 
				then a.FechaPago
				else a.FechaVencimiento
			end
from(
		select c.IdEmpresas,e.NombreEmpresa,c.IdTerceros,c.IdTerceros_Pagador,c.NombreTercero,c.factura,c.FechaFactura,c.FechaVencimiento,
			c.IdSituacionEfectos,c.DescripcionSituacionEfectos,c.Departamento,c.NombreDepartamento,c.TotalFactura,c.ImportePendiente,
			c.NombreCentro,c.NifCif,c.IdPaises,c.ciudad,c.LimiteCredito,c.vin,c.DescripcionSeccion,c.FechaSaldado,c.EstadoWF,
			c.PagoBloqueado,FechaEntrega=isnull(c.FechaEntregaVN,v.FechaEntregaCliente),
			c.Referencia,c.IdMonedaOrigen,c.FactorCambioMoneda,c.FactorCambioMonedaContravalor,
			c.DescripcionMoneda, FechaPago=dateadd(d,-(day(dateadd(m,1,@fecha))),dateadd(m,1,@fecha))+10
		from		PSCService_DB.dbo.spiga_CuentasPorPagar	c
		left join	Empresas								e	on	c.IdEmpresas = e.CodigoEmpresa
		left join	vw_vehiculosFechaEntrega				v	on	c.VIN = v.VIN 
		where YEAR(c.FechaVencimiento) = YEAR(@fecha)
		and	MONTH(c.FechaVencimiento) =	MONTH(@fecha)
		and c.IdMonedaOrigen <> 3 
		and	c.IdMonedaOrigen is not null
		and	c.IdSituacionEfectos = 1
)a
where FechaVencimiento <= @Fecha and a.IdMonedaOrigen=@IdMonedaOrigen and ImportePendiente <> 0


```
