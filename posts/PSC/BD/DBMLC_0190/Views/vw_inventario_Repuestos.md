# View: vw_inventario_Repuestos

## Usa los objetos:
- [[Empresas]]
- [[spiga_StockRepuestos]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE view [dbo].[vw_inventario_Repuestos] as 
select IdEmpresas,IdCentros,NombreCentro,CodUnidadNegocio,NombreUnidadNegocio,Ano_Periodo,Mes_Periodo,
ValorStock = sum(ValorPrecioMedio)
from(
	select r.IdEmpresas,c.NombreEmpresa,r.IdCentros,b.NombreCentro,
	       CodUnidadNegocio = case WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 701
								   WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 700
								   else b.CodUnidadNegocio end,
		   NombreUnidadNegocio= CASE WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 'Mitsubishi mayorista'
									 WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 'BYD mayorista'
									 else NombreUnidadNegocio end,r.Ano_Periodo,r.Mes_Periodo,
	ValorPrecioMedio=sum(r.PrecioMedio*r.Stock)
	from		[PSCService_DB].dbo.spiga_StockRepuestos	r
	LEFT JOIN	vw_UnidadDeNegocio								b ON b.CodEmpresa = r.IdEmpresas 
																	AND b.CodCentro  = r.IdCentros  
																	AND b.CodSeccion = r.IdSecciones
	LEFT JOIN	Empresas									c ON c.CodigoEmpresa = r.IdEmpresas 
																	AND c.CodigoEmpresa = b.CodEmpresa
	where  codunidadnegocio not in (410,411,520) 
	--and Ano_Periodo = 2021
	--and Mes_Periodo = 8
	----and r.IdReferencias = '4031500Q1F'
	--and r.idcentros in (2,4,5,17,20,24,47,71,159)
	group by r.IdEmpresas,c.NombreEmpresa,r.IdCentros,b.NombreCentro,b.CodUnidadNegocio,b.NombreUnidadNegocio,r.Ano_Periodo,r.Mes_Periodo,
	FechaUltimaCompra,FechaTraspasoTRE,r.stock,sigla --,r.IdReferencias, 

	union all

	select a.IdEmpresas,a.NombreEmpresa,a.IdCentros,a.NombreCentro,a.CodUnidadNegocio,a.NombreUnidadNegocio,a.Ano_Cierre,
	a.Mes_Cierre,ValorPrecioMedio=sum(a.ValorPrecioMedio)
	from(
			select Ano_Cierre=i.Ano_Periodo,Mes_Cierre=i.Mes_Periodo,i.IdEmpresas,i.IdCentros,ValorPrecioMedio=(i.PrecioMedio*i.stock),
			i.IdMR,i.DenominacionClasificacion5,i.DenominacionClasificacion6,n.nombrecentro,n.nombreseccion,stock,idreferencias,
			year(fechaultimacompra)UltAñoCompra,month(fechaultimacompra)UltMesCompra,concat(i.ano_periodo,'/',i.mes_periodo)Periodo,idsecciones,
		case
			when denominacionclasificacion5 like '%AGRÍC%' and denominacionclasificacion6 like '%Merchandi%' then 'JD Agricola'
			when denominacionclasificacion5 is null and denominacionclasificacion6  is null and nombreseccion like '%AGR%'then 'JD Agricola'
			when denominacionclasificacion5 is null and denominacionclasificacion6 is null and nombreseccion like '%CONS%'then 'JD Construccion'
			when denominacionclasificacion5 is null and denominacionclasificacion6  is null and nombreseccion like '%WIR%'then 'Wirtgen'
			when  denominacionclasificacion6 like '%Lubricantes%'then 'JD Agricola'
			when  denominacionclasificacion6 like '%Merchandising%' then  'JD Construccion'
			when denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
			WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 'Wirtgen'
		ELSE 'JD Agricola'
		END 'NombreUnidadNegocio',
		case 
			when denominacionclasificacion5 like '%AGRÍC%' and denominacionclasificacion6 like '%Agric%' and nombreseccion like '%AGR%'then 410
			when denominacionclasificacion5 like '%AGRÍC%' and denominacionclasificacion6 like '%Merchand%' then 410
			when denominacionclasificacion5 is null and denominacionclasificacion6  is null and nombreseccion like '%AGR%'then 410
			when denominacionclasificacion5 is null and denominacionclasificacion6 is null and nombreseccion like '%CONS%'then 411
			when denominacionclasificacion5 is null and denominacionclasificacion6  is null and nombreseccion like '%WIR%'then  520
			when  denominacionclasificacion6 like '%Merchandising%' then  411
			when  denominacionclasificacion6 like '%Lubricantes%'then 410
			when denominacionclasificacion5 LIKE '%AGRÍC%' THEN 410
			when denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
			WHEN denominacionclasificacion5 like '%WIRTGEN%' THEN 520
		ELSE 410
		END 'CodUnidadNegocio',
		case	when i.IdEmpresas=1 then 'CasaToro'
				when i.IdEmpresas = 5 then 'Bonaparte'
		end NombreEmpresa
	from [PSCService_DB].dbo.spiga_StockRepuestos i
	left join vw_UnidadDeNegocio n on i.IdEmpresas = n.CodEmpresa
	and i.IdCentros = n.CodCentro
	and i.IdSecciones = n.CodSeccion
	where i.IdCentros  in (21,25,124,22,65,46,18,16,49,44,29,149,41,26,23,43) 
	)a
	--where a.ano_cierre=2021 and a.mes_cierre=8 
	--and a.CodUnidadNegocio=411
	--and NombreUnidadNegocio like 'JD Constru%'
	group by  a.IdEmpresas,a.NombreEmpresa,a.IdCentros,a.NombreCentro,a.CodUnidadNegocio,a.NombreUnidadNegocio,
	a.Ano_Cierre,a.Mes_Cierre,a.UltAñoCompra,a.UltMesCompra
)c where NombreEmpresa is not null
--and Ano_Periodo = 2024 and Mes_Periodo = 4 and CodUnidadNegocio = 700
group by IdEmpresas,NombreEmpresa,IdCentros,NombreCentro,CodUnidadNegocio,NombreUnidadNegocio,Ano_Periodo,Mes_Periodo
--order by NombreEmpresa,NombreUnidadNegocio,NombreCentro

```
