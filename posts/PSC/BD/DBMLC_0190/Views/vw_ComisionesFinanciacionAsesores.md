# View: vw_ComisionesFinanciacionAsesores

## Usa los objetos:
- [[vw_ComisionesFinanciacionAsesoresOrdenFact]]
- [[vw_ComisionesFinanciacionAsesoresOrdenFin]]

```sql

CREATE view [dbo].[vw_ComisionesFinanciacionAsesores] as
select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,IdTercerosFinanciera,NombreFinanciera,
IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,IdEmpleadosGestor,NombreGestor,
ImporteFinanciado = case when BaseImponible > 0 then ImporteFinanciado else (ImporteFinanciado * -1) end,
Factura,IdTerceros,Nombre,BaseImponible,TotalFactura
from(
	select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,IdTercerosFinanciera,NombreFinanciera,
	IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,IdEmpleadosGestor,NombreGestor,ImporteFinanciado,Factura,IdTerceros,Nombre,
	BaseImponible,TotalFactura
	from(
		select c.ano_periodo,c.mes_periodo,c.idempresas,f.nombreempresa,c.vin,f.idcentros,f.NombreCentro,
		c.idtercerosfinanciera,c.nombrefinanciera,f.IdEmpleados,f.nombreempleado,f.idmarcas,c.nombremarca,
		c.factura,c.idterceros,c.nombre,f.idempleadosgestor,f.nombregestor,c.baseimponible,c.totalfactura,f.importefinanciado,
		c.fechafactura
		from vw_ComisionesFinanciacionAsesoresOrdenFact			c
		left join vw_ComisionesFinanciacionAsesoresOrdenFin		f	on	c.vin = f.vin
																		and c.orden = f.orden
		where (c.orden = 1 or f.orden=1)
		and f.nombreempresa is not null
		and c.idempresas = 1
		--and c.vin like '%WVWZZZ60ZGT010406%'
		AND (Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE
	)b  
	union all
	select Ano_Periodo,Mes_Periodo,IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,vin,IdTercerosFinanciera,NombreFinanciera,
	IdEmpleados,NombreEmpleado,IdMarcas,NombreMarca,IdEmpleadosGestor,NombreGestor,ImporteFinanciado,Factura,IdTerceros,Nombre,
	BaseImponible,TotalFactura
	from(
			select c.ano_periodo,c.mes_periodo,c.idempresas,f.nombreempresa,c.vin,f.idcentros,f.NombreCentro,
			c.idtercerosfinanciera,c.nombrefinanciera,f.IdEmpleados,f.nombreempleado,f.idmarcas,c.nombremarca,
			c.factura,c.idterceros,c.nombre,f.idempleadosgestor,f.nombregestor,c.baseimponible,c.totalfactura,f.importefinanciado,
			c.fechafactura
			from vw_ComisionesFinanciacionAsesoresOrdenFact			c
			left join vw_ComisionesFinanciacionAsesoresOrdenFin		f	on	c.vin = f.vin
																			and c.orden = f.orden
			where (c.orden = 1 or f.orden=1)
			and f.nombreempresa is not null
			and c.idempresas = 6
	)b  
)c 
--where --vin like '%9BM958156PB261202%'
-- Ano_Periodo = 2022
--and Mes_Periodo = 5

WHERE (Ano_Periodo >= 2022) -- JCS: FILTRO PARA MEJORAR EL PERFORMANCE



```
