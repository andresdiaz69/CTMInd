# View: vw_Inventario_RemisionesPendFacturar

## Usa los objetos:
- [[spiga_RemisionesDeVentasSinFacturar]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_Inventario_RemisionesPendFacturar] AS   	 
SELECT Ano_Periodo,            Mes_Periodo,  PkFkEmpresas IdEmpresas,    PkFkCentros IdCentros,    Empresa, 
       Centro,                 IdSecciones,  NombreSeccion,              CodUnidadNegocio,         NombreUnidadNegocio, 
	   ValorMedioMovimiento 
  FROM (SELECT Ano_Periodo,  Mes_Periodo,    PkFkEmpresas,      Empresa,              
			   ValorMedioMovimiento=sum(ValorMedioMovimiento), 
			   PkFkCentros = case when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='878' then '147'
			                      when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='889' then '2'
							      else r.PkFkCentros end,
			   IdSecciones = case when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='878' then '705'
			                      when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='889' then '10'
			  				      else r.IdSecciones end,
			   Centro = case when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='878' then 'FR-Bta.-AV 68'
			                 when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='889' then 'MZ-Bta-Cra.30'
			  				 else Centro end,
			   NombreSeccion = case when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='878' then 'Mesa de repuestos FR Av 68'
			                        when r.PkFkEmpresas ='1' and r.PkFkCentros='146' and r.IdSecciones ='889' then 'Bodega MZ Carrera 30'
							        else b.NombreSeccion end,
			   CodUnidadNegocio=CASE WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro ='JD-B/Quilla-Cl.110' THEN 411 
									 WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro ='JD-Itagui-Cra 92'   THEN 411 
									 WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro like 'JD-%'           THEN 410
									 WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 701
								     WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 700
									 WHEN IdSecciones IS NULL THEN (SELECT TOP 1 CodUnidadNegocio 
									                                  FROM vw_UnidadDeNegocio 
																	 WHERE PkFkCentros = CodCentro 
																	   AND PkFkEmpresas=CodEmpresa )
									 ELSE CodUnidadNegocio END,			
			   NombreUnidadNegocio=CASE WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro ='JD-B/Quilla-Cl.110' THEN 'JD CONSTRUCCION' 
										WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro ='JD-Itagui-Cra 92'   THEN 'JD CONSTRUCCION'
										WHEN IdSecciones IS NULL AND FechaDeCorte<convert(datetime,'2022-04-30',120)  and Centro like 'JD-%'           THEN 'JD AGRICOLA'
										WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY MIT' THEN 'Mitsubishi mayorista'
									    WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and Sigla = 'MAY BYD' THEN 'BYD mayorista'
										WHEN IdSecciones IS NULL THEN (SELECT TOP 1 NombreUnidadNegocio 
										                                 FROM vw_UnidadDeNegocio 
																		WHERE PkFkCentros = CodCentro 
																		  AND PkFkEmpresas= CodEmpresa) 
									    ELSE NombreUnidadNegocio END
 		 FROM [PSCService_DB].dbo.spiga_RemisionesDeVentasSinFacturar r
		 LEFT JOIN (SELECT distinct CodEmpresa, CodCentro,CodSeccion,NombreSeccion, CodUnidadNegocio, NombreUnidadNegocio ,Sigla
		              FROM vw_UnidadDeNegocio) b ON PkFkCentros = b.CodCentro 
					                            AND IdSecciones=b.CodSeccion 
												AND PkFkEmpresas=CodEmpresa
 		WHERE PrefijoFactura  IS NULL 
		  --and Ano_Periodo=2024 and Mes_Periodo =4
		  AND PkFkEmpresas in(1,5,6)	
	    GROUP BY Ano_Periodo,      Mes_Periodo,   PkFkEmpresas, PkFkCentros,   Empresa,
		      Centro,              IdSecciones,   FechaDeCorte, IdSecciones ,  CodUnidadNegocio, 
			  NombreUnidadNegocio, NombreSeccion ,Sigla
      )a
 

```
