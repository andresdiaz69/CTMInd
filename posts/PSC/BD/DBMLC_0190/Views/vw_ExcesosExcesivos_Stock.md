# View: vw_ExcesosExcesivos_Stock

## Usa los objetos:
- [[spiga_StockRepuestos_18_SinTraspaso]]
- [[UnidadDeNegocio]]
- [[vw_ExcesosExcesivos_FechaUltimaCompra]]
- [[vw_ExcesosExcesivos_FechaUltimaVenta]]
- [[vw_ExcesosExcesivos_PrecioMedio]]

```sql
CREATE view [dbo].[vw_ExcesosExcesivos_Stock] as
select b.Ano_Periodo,b.Mes_Periodo,b.IdEmpresas,CodUnidadNegocio,NombreUnidadNegocio,b.IdMR,b.IdReferencias,b.Descripcion,b.IdClasificacion1,b.DenominacionClasificacion1,b.IdClasificacion2,
b.DenominacionClasificacion2,b.IdClasificacion3,b.DenominacionClasificacion3,b.IdClasificacion4,b.DenominacionClasificacion4,b.IdClasificacion5,
b.DenominacionClasificacion5,b.IdClasificacion6,b.DenominacionClasificacion6,VentasMesActual=sum(b.VentasMesActual),VentasMes1=sum(b.VentasMes1),
VentasMes2=sum(b.VentasMes2),VentasMes3=sum(b.VentasMes3),VentasMes4=sum(b.VentasMes4),VentasMes5=sum(b.VentasMes5),VentasMes6=sum(b.VentasMes6),
VentasMes7=sum(b.VentasMes7),VentasMes8=sum(b.VentasMes8),VentasMes9=sum(b.VentasMes9),VentasMes10=sum(b.VentasMes10),VentasMes11=sum(b.VentasMes11),
VentasMes12=sum(b.VentasMes12),VentasMes13=sum(b.VentasMes13),VentasMes14=sum(b.VentasMes14),VentasMes15=sum(b.VentasMes15),VentasMes16=sum(b.VentasMes16),
VentasMes17=sum(b.VentasMes17),VentasMes18=sum(b.VentasMes18),VentasTotal=sum(b.VentasTotal),Stock =sum(b.Stock),p.PrecioMedio,
UndPteRecibir=sum(b.UndPteRecibir),b.PrecioVenta,b.IdDescuentos,v.FechaUltimaVenta,c.FechaUltimaCompra,Total12Meses=sum(b.Total12Meses),Total6Meses=sum(b.Total6Meses)

from(
	select Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,
	IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,
	IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,
	VentasMesActual,VentasMes1,VentasMes2,VentasMes3,VentasMes4,VentasMes5,VentasMes6,VentasMes7,VentasMes8,VentasMes9,VentasMes10,
	VentasMes11,VentasMes12,VentasMes13,VentasMes14,VentasMes15,VentasMes16,VentasMes17,VentasMes18,VentasTotal,Stock,UndPteRecibir,
	PrecioMedio,PrecioVenta,IdDescuentos,FechaUltimaVenta,FechaUltimaCompra,ClasificacionABC,
	Total12Meses=case when Total12Meses < 0 then 0 else Total12Meses end,
	Total6Meses= case when Total6Meses < 0 then 0 else Total6Meses end,CodUnidadNegocio,NombreUnidadNegocio
	from(
		select Ano_Periodo,Mes_Periodo,IdEmpresas,IdMR,IdReferencias,Descripcion,
		IdClasificacion1,DenominacionClasificacion1,IdClasificacion2,DenominacionClasificacion2,IdClasificacion3,DenominacionClasificacion3,
		IdClasificacion4,DenominacionClasificacion4,IdClasificacion5,DenominacionClasificacion5,IdClasificacion6,DenominacionClasificacion6,
		VentasMesActual=isnull(VentasMesActual,0),VentasMes1=isnull(VentasMes1,0),VentasMes2=isnull(VentasMes2,0),VentasMes3=isnull(VentasMes3,0),
		VentasMes4=isnull(VentasMes4,0),VentasMes5=isnull(VentasMes5,0),VentasMes6=isnull(VentasMes6,0),VentasMes7=isnull(VentasMes7,0),VentasMes8=isnull(VentasMes8,0),
		VentasMes9=isnull(VentasMes9,0),VentasMes10=isnull(VentasMes10,0),VentasMes11=isnull(VentasMes11,0),VentasMes12=isnull(VentasMes12,0),VentasMes13=isnull(VentasMes13,0),
		VentasMes14=isnull(VentasMes14,0),VentasMes15=isnull(VentasMes15,0),VentasMes16=isnull(VentasMes16,0),VentasMes17=isnull(VentasMes17,0),VentasMes18=isnull(VentasMes18,0),
		VentasTotal = isnull(VentasMesActual,0)+isnull(VentasMes1,0)+isnull(VentasMes2,0)+isnull(VentasMes3,0)+isnull(VentasMes4,0)+
		isnull(VentasMes5,0)+isnull(VentasMes6,0)+isnull(VentasMes7,0)+isnull(VentasMes8,0)+isnull(VentasMes9,0)+
		isnull(VentasMes10,0)+isnull(VentasMes11,0)+isnull(VentasMes12,0)+isnull(VentasMes13,0)+isnull(VentasMes14,0)+
		isnull(VentasMes15,0)+isnull(VentasMes16,0)+isnull(VentasMes17,0)+isnull(VentasMes18,0),Stock=isnull(Stock,0),UndPteRecibir=isnull(UndPteRecibir,0),
		PrecioMedio,
		PrecioVenta,IdDescuentos,FechaUltimaVenta,FechaUltimaCompra,ClasificacionABC,
		Total12Meses = isnull(VentasMes1,0)+isnull(VentasMes2,0)+isnull(VentasMes3,0)+isnull(VentasMes4,0)+
		isnull(VentasMes5,0)+isnull(VentasMes6,0)+isnull(VentasMes7,0)+isnull(VentasMes8,0)+isnull(VentasMes9,0)+
		isnull(VentasMes10,0)+isnull(VentasMes11,0)+isnull(VentasMes12,0)+isnull(VentasMes13,0)+isnull(VentasMes14,0)+
		isnull(VentasMes15,0)+isnull(VentasMes16,0)+isnull(VentasMes17,0)+isnull(VentasMes18,0),
		Total6Meses = isnull(VentasMesActual,0)+isnull(VentasMes1,0)+isnull(VentasMes2,0)+isnull(VentasMes3,0)+isnull(VentasMes4,0)+
		isnull(VentasMes5,0)+isnull(VentasMes6,0),IdSecciones,u.CodUnidadNegocio,NombreUnidadNegocio
		from [PSCService_DB].dbo.spiga_StockRepuestos_18_SinTraspaso	v
		left join	UnidadDeNegocio										u	on	v.IdSecciones = u.CodSeccion
		--where Ano_Periodo = 2021
		--and Mes_Periodo = 5
		--and IdCentros in (6,50,53,56,67,72)
		--and IdReferencias = 'WHT008383'
	)a
)b	left join	vw_ExcesosExcesivos_PrecioMedio			p	on	b.Ano_Periodo = p.ano_periodo
															and b.mes_periodo = p.mes_periodo
															and b.IdEmpresas = p.idempresas
															and b.IdMR = p.IdMR
															and b.IdReferencias = p.IdReferencias
	left join	vw_ExcesosExcesivos_FechaUltimaVenta	v	on	b.Ano_Periodo = v.ano_periodo
															and b.mes_periodo = v.mes_periodo
															and b.IdEmpresas = v.idempresas
															and b.IdMR = v.IdMR
															and b.IdReferencias = v.IdReferencias
	
	left join	vw_ExcesosExcesivos_FechaUltimaCompra	c	on	b.Ano_Periodo = c.ano_periodo
															and b.mes_periodo = c.mes_periodo
															and b.IdEmpresas = c.idempresas
															and b.IdMR = c.IdMR
															and b.IdReferencias = c.IdReferencias
group by b.Ano_Periodo,b.Mes_Periodo,b.IdEmpresas,CodUnidadNegocio,NombreUnidadNegocio,b.IdMR,b.IdReferencias,b.Descripcion,b.IdClasificacion1,b.DenominacionClasificacion1,b.IdClasificacion2,
b.DenominacionClasificacion2,b.IdClasificacion3,b.DenominacionClasificacion3,b.IdClasificacion4,b.DenominacionClasificacion4,b.IdClasificacion5,
b.DenominacionClasificacion5,b.IdClasificacion6,b.DenominacionClasificacion6,b.PrecioVenta,b.IdDescuentos,v.FechaUltimaVenta,c.FechaUltimaCompra,p.PrecioMedio

```
