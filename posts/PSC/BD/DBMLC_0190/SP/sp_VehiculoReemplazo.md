# Stored Procedure: sp_VehiculoReemplazo

## Usa los objetos:
- [[ComisionesSpigaVN]]
- [[ComisionesSpigaVNFechaFactura]]
- [[vw_VehiculoReemplazo]]
- [[vw_VehiculosColor]]

```sql
CREATE procedure [dbo].[sp_VehiculoReemplazo] 

@Año		int,
@MesInicial	int,
@MesFinal	int,
@Entregado	bit 
as

BEGIN	
	SET NOCOUNT ON
	--set @Entregado = 0

	if @Entregado = 1
		select  Año=year(c.FechaEntregaCliente),Mes=month(c.FechaEntregaCliente),c.empresa,c.centro,c.vin,c.marca,c.gama,c.AñoModelo,
		Color = isnull(r.color,''),MarcaReemplazo=isnull(v.MarcaReemplazo,''),GamaReemplazo=isnull(v.GamaReemplazo,''),
		AnoModeloReemplazo=isnull(v.AnoModeloReemplazo,''),ColorReemplazo=isnull(ColorReemplazo,''),c.NombreVendedor,c.nombreTercero,
		c.NumeroFactura,c.FechaFactura
		from		ComisionesSpigaVN		c
		left join	vw_VehiculoReemplazo	v	on	c.vin=v.vin	and c.Codigoempresa=v.idempresas and c.CodigoCentro = v.idcentros
		left join	vw_VehiculosColor		r	on	c.vin=r.vin
		where centro not like 'JD-%'
		and c.EntregaEfectiva = 1
		and year(c.FechaEntregaCliente) = @Año
		and month(c.FechaEntregaCliente) >= @MesInicial
		and month(c.FechaEntregaCliente) <= @MesFinal
		--where c.VIN IN ('JM7KF4WLAP0750212','9FB5SR0EGNM208710','9FB4SR0E5NM195070','93YRBB000NJ162838')
		--and  Ano_Periodo = 2022
		--and Mes_Periodo in (1,2,3)
	else 
			select  Año=year(c.FechaFactura),Mes=month(c.FechaFactura),c.empresa,c.centro,c.vin,c.marca,c.gama,c.AñoModelo,
			Color = isnull(r.color,''),MarcaReemplazo=isnull(v.MarcaReemplazo,''),GamaReemplazo=isnull(v.GamaReemplazo,''),
			AnoModeloReemplazo=isnull(v.AnoModeloReemplazo,''),ColorReemplazo=isnull(ColorReemplazo,''),c.NombreVendedor,c.nombreTercero,
			c.NumeroFactura,c.FechaFactura
			from		ComisionesSpigaVNFechaFactura		c
			left  join	vw_VehiculoReemplazo	v	on	c.vin=v.vin	and c.Codigoempresa=v.idempresas and c.CodigoCentro = v.idcentros
			left join	vw_VehiculosColor		r	on	c.vin=r.vin
			where centro not like 'JD-%'
			--where c.VIN IN ('JM7KF4WLAP0750212','9FB5SR0EGNM208710','9FB4SR0E5NM195070','93YRBB000NJ162838')
			and year(c.FechaFactura) = @Año
			and month(c.FechaFactura) >= @MesInicial
			and month(c.FechaFactura) <= @MesFinal
	end 
--end 

```
