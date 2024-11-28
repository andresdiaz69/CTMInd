# View: Vw_Error_Compra_inventario

## Usa los objetos:
- [[Empresas]]
- [[spiga_StockRepuestos]]
- [[UnidadDeNegocio]]
- [[View_Spiga_Compras_Calculo_Error_Compra]]

```sql
create view Vw_Error_Compra_inventario as
SELECT a.IdEmpresas,			a.NombreEmpresa,	a.IdCentros,
	   a.IdSecciones,			a.NombreSeccion,    a.NombreCentro,		CodUnidadNegocio,
	   a.NombreUnidadNegocio,	Ano_Periodo,		Mes_Periodo,
	   IdMR,				    IdReferencias,	    Descripcion,
	   PrecioMedio,      	    UltAñoCompra, 	    UltMesCompra,
	   ValorPrecioMedio,	    NumReferencias,     b.VrCompras
FROM (SELECT r.IdEmpresas,  	    c.NombreEmpresa, 
			 r.Ano_Periodo,		    r.Mes_Periodo,
			 r.IdMR,				r.IdReferencias,	
			 r.PrecioMedio,         r.Descripcion,
			 IdCentros = case when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='878' then '147'
			                  when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='889' then '2'
							  else r.IdCentros end,
			 IdSecciones = case when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='878' then '705'
			                  when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='889' then '10'
							  else r.IdSecciones end,
			 NombreCentro = case when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='878' then 'FR-Bta.-AV 68'
			                  when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='889' then 'MZ-Bta-Cra.30'
							  else b.NombreCentro end,
			 NombreSeccion = case when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='878' then 'Mesa de repuestos FR Av 68'
			                  when r.IdEmpresas ='1' and r.IdCentros='146' and r.IdSecciones ='889' then 'Bodega MZ Carrera 30'
							  else b.NombreSeccion end,
			 CASE WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%AGRÍC%' and denominacionclasificacion6 LIKE '%Merchandi%' THEN 'JD Agricola'
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6  IS NULL AND b.NombreSeccion LIKE '%AGR%'THEN 'JD Agricola'
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6  IS NULL AND b.NombreSeccion LIKE '%CONS%'THEN 'JD Construccion'
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6  IS NULL AND b.NombreSeccion LIKE '%WIR%'THEN 'JD Wirtgen'
				  WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion6 LIKE '%Lubricantes%'THEN 'JD Agricola'
				  WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion6 LIKE '%Merchandising%' THEN  'JD Construccion'
				  WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 'JD Construccion'
				  WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%WIRTGEN%' THEN 'JD Wirtgen'	
				  when codUnidadNegocio in (410,411,520)  then'JD Agricola'
				  else NombreUnidadNegocio
				   END NombreUnidadNegocio,

             CASE WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%AGRÍC%' and denominacionclasificacion6 LIKE '%Agric%' and nombreseccion LIKE '%AGR%'THEN 410
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%AGRÍC%' and denominacionclasificacion6 LIKE '%Merchand%' THEN 410
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6  IS NULL AND nombreseccion LIKE '%AGR%'THEN 410
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6 IS NULL AND nombreseccion LIKE '%CONS%'THEN 411
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 IS NULL AND denominacionclasificacion6  IS NULL AND nombreseccion LIKE '%WIR%'THEN  520
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion6 LIKE '%Merchandising%' THEN  411
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion6 LIKE '%Lubricantes%'THEN 410
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%AGRÍC%' THEN 410
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%CONSTRUCCI%' THEN 411
		          WHEN codUnidadNegocio in (410,411,520) and denominacionclasificacion5 LIKE '%WIRTGEN%' THEN 520
		          when codUnidadNegocio in (410,411,520) then 410
				  else codUnidadNegocio
		           END CodUnidadNegocio,
			 UltAñoCompra=year (case when FechaUltimaCompra IS NOT NULL then FechaUltimaCompra else FechaTraspasoTRE end),
			 UltMesCompra=month(case when FechaUltimaCompra IS NOT NULL then FechaUltimaCompra else FechaTraspasoTRE end),
			 ValorPrecioMedio=sum(r.PrecioMedio*r.Stock),
			 NumReferencias=case when r.stock <> 0 then COUNT(r.IdReferencias) else 0 end
        FROM PSCService_DB.dbo.spiga_StockRepuestos r
        LEFT JOIN	DBMLC_0190..UnidadDeNegocio (nolock) b ON b.CodEmpresa = r.IdEmpresas 
		                                         AND b.CodCentro  = r.IdCentros 
												 AND b.CodSeccion = r.IdSecciones
        LEFT JOIN	DBMLC_0190..Empresas (nolock)c ON c.CodigoEmpresa = r.IdEmpresas 
		                                         AND c.CodigoEmpresa = b.CodEmpresa
       --where Ano_Periodo = 2023
       --  and Mes_Periodo = 2
       ----and r.IdReferencias = '4031500Q1F'
       -- -- and b.NombreCentro not like 'JD%'
       group by r.IdEmpresas,			c.NombreEmpresa,	         r.IdCentros,
			    r.IdSecciones,			b.NombreCentro,		         b.CodUnidadNegocio,
				b.NombreUnidadNegocio,	r.Ano_Periodo,		         r.Mes_Periodo,
				FechaUltimaCompra,		FechaTraspasoTRE,	         r.stock,
				r.IdMR,					r.IdReferencias,	         r.Descripcion,
				r.PrecioMedio,          denominacionclasificacion5,  DenominacionClasificacion6,
				b.NombreSeccion) a
 LEFT JOIN PSCService_DB.dbo.View_Spiga_Compras_Calculo_Error_Compra b ON a.IdEmpresas   = b.IdEmpresas 
                                                                      AND a.IdCentros    = b.IdCentros  
																	  AND a.UltAñoCompra = b.Ano_Cierre
																	  AND a.UltMesCompra = b.Mes_Cierre


```
