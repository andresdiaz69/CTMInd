# View: vw_ExcesosExcesivos_ExcesosExcesivos12

## Usa los objetos:
- [[ExcesosExcesivos_LeadTime]]
- [[vw_ExcesosExcesivos_Stock]]

```sql
CREATE view [dbo].[vw_ExcesosExcesivos_ExcesosExcesivos12] as
select Ano_Periodo, Mes_Periodo, IdEmpresas, Marca,IdMR, IdReferencias, Descripcion, IdClasificacion1, DenominacionClasificacion1, IdClasificacion2, DenominacionClasificacion2, IdClasificacion3, 
DenominacionClasificacion3, IdClasificacion4, DenominacionClasificacion4, IdClasificacion5, DenominacionClasificacion5, IdClasificacion6, DenominacionClasificacion6, VentasMesActual, VentasMes1, 
VentasMes2, VentasMes3, VentasMes4, VentasMes5, VentasMes6, VentasMes7, VentasMes8, VentasMes9, VentasMes10, VentasMes11, VentasMes12, VentasTotal, Stock, PrecioMedio, UndPteRecibir, PrecioVenta, 
IdDescuentos, FechaUltimaVenta, FechaUltimaCompra, Total12Meses, Total6Meses,Q,Exceso,ExcesoExcesivo,ValorExceso,ValorExcesoExcesivo,ValorTotal,ExcesoNeto,ExcesoExcesivoNeto,
ValorExcesoNeto = (PrecioMedio*ExcesoNeto),ValorExcesoExcesivoNeto=(PrecioMedio*ExcesoExcesivoNeto)
from(
	select Ano_Periodo, Mes_Periodo, IdEmpresas, Marca,IdMR, IdReferencias, Descripcion, IdClasificacion1, DenominacionClasificacion1, IdClasificacion2, DenominacionClasificacion2, IdClasificacion3, 
	DenominacionClasificacion3, IdClasificacion4, DenominacionClasificacion4, IdClasificacion5, DenominacionClasificacion5, IdClasificacion6, DenominacionClasificacion6, VentasMesActual, VentasMes1, 
	VentasMes2, VentasMes3, VentasMes4, VentasMes5, VentasMes6, VentasMes7, VentasMes8, VentasMes9, VentasMes10, VentasMes11, VentasMes12, VentasTotal, Stock, PrecioMedio, UndPteRecibir, PrecioVenta, 
	IdDescuentos, FechaUltimaVenta, FechaUltimaCompra, Total12Meses, Total6Meses,Q,Exceso,
	ExcesoExcesivo,ValorExceso,ValorExcesoExcesivo =  (ExcesoExcesivo*PrecioMedio),ValorTotal = (Stock * PrecioMedio), 
	ExcesoNeto = case when  (IdClasificacion2 is null or IdClasificacion2 = convert(varchar,0)) then Exceso else 0 end,
	ExcesoExcesivoNeto = case when  (IdClasificacion2 is null or IdClasificacion2 = convert(varchar,0)) then ExcesoExcesivo else 0 end
	from(
		SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, Marca,IdMR, IdReferencias, Descripcion, IdClasificacion1, DenominacionClasificacion1, IdClasificacion2, DenominacionClasificacion2, IdClasificacion3, 
		DenominacionClasificacion3, IdClasificacion4, DenominacionClasificacion4, IdClasificacion5, DenominacionClasificacion5, IdClasificacion6, DenominacionClasificacion6, VentasMesActual, VentasMes1, 
		VentasMes2, VentasMes3, VentasMes4, VentasMes5, VentasMes6, VentasMes7, VentasMes8, VentasMes9, VentasMes10, VentasMes11, VentasMes12,VentasTotal, Stock, PrecioMedio, UndPteRecibir, PrecioVenta, 
		IdDescuentos, FechaUltimaVenta, FechaUltimaCompra, Total12Meses, Total6Meses,Q,Exceso,
		ExcesoExcesivo = case when (Exceso - (Total12Meses/2)) < 0 then  0 else (Exceso - (Total12Meses/2))  end,ValorExceso = Exceso*PrecioMedio
		from(
			SELECT        Ano_Periodo, Mes_Periodo, IdEmpresas, Marca=NombreUnidadNegocio,IdMR, IdReferencias, s.Descripcion, IdClasificacion1, DenominacionClasificacion1, IdClasificacion2, 
			DenominacionClasificacion2, IdClasificacion3, DenominacionClasificacion3, IdClasificacion4, DenominacionClasificacion4, IdClasificacion5, DenominacionClasificacion5, IdClasificacion6, 
			DenominacionClasificacion6, VentasMesActual, VentasMes1, VentasMes2, VentasMes3, VentasMes4, VentasMes5, VentasMes6, VentasMes7, VentasMes8, VentasMes9, VentasMes10, VentasMes11, 
			VentasMes12, VentasTotal, Stock, PrecioMedio, UndPteRecibir, PrecioVenta, IdDescuentos, FechaUltimaVenta, FechaUltimaCompra, Total12Meses, Total6Meses,Q=Tiempo,
			Exceso = case when (stock - (Total12Meses * l.tiempo)) < 0 then 0 else (stock - (Total12Meses * l.tiempo)) end
			FROM        vw_ExcesosExcesivos_Stock	s
			left join	ExcesosExcesivos_LeadTime	l	on s.idmr = l.marca
			--WHERE       -- IdReferencias = '021320171'
			--IdReferencias in ('1360A077','1052A472','R515217','A9433230211  27390','003RO05300CAMIJD30')-- '2H3422891C'--'WHT008383'
			--ano_periodo = 2021
			--and mes_periodo = 6
		) a
	)b
)c
--where IdEmpresas = 6
--and IdReferencias = '021320171'

```