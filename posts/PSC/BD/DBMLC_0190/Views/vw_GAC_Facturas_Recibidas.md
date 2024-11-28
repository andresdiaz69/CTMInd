# View: vw_GAC_Facturas_Recibidas

## Usa los objetos:
- [[spiga_FacturasRecibidas]]
- [[vw_UnidadDeNegocio]]

```sql

CREATE VIEW [dbo].[vw_GAC_Facturas_Recibidas] AS
SELECT Ano_Periodo,  Mes_Periodo,       NombreEmpresa,        pkfkempresas, 
       CodUnidadNegocio,  NombreUnidadNegocio,  FactRecibidas=sum(cantidad)
FROM (
	  SELECT f.Ano_Periodo,   f.Mes_Periodo,   f.cantidad ,   f.pkfkempresas, 
		     NombreEmpresa=CASE WHEN f.pkfkempresas=1  THEN 'Casatoro'
		                        WHEN f.pkfkempresas=6  THEN 'Motores y Máquinas'
							    WHEN f.pkfkempresas=24 THEN 'Bellpi SAS' 
								WHEN f.pkfkempresas=5  THEN 'Bonaparte'  END,
		     CodUnidadNegocio=CASE  WHEN b.CodUnidadNegocio IS NULL AND  CASE  WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD' 
									                                           WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
									                                           ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  
																			    END = 'Centro Digital'           THEN 418
		                            WHEN b.CodUnidadNegocio IS NULL AND  CASE  WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD'
							                                                   WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
							                                                   ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  END like 'be%'  THEN 23 
                                    WHEN b.CodUnidadNegocio IS NULL AND  CASE  WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD'
							                                                   WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
							                                                   ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  END like'DAi.v%'  THEN 3           
								    when b.Sigla = 'MAY BYD' then 246
									when b.Sigla = 'MAY MIT' then 21
									when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%tagui%' then 411
	                                when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%Rental%' then 411
	                                when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%Ruta 40%' then 520
	                                when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%quilla%' then 411
	                                when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%B/manga%'then 411
	                                when (b.NombreUnidadNegocio is null or CodUnidadNegocio is null) and  nombre like '%JD%' then 410
									--WHEN f.Nombre like '%MIT-Bta-Mayorista%' or nombre like 'MIT-Bta.San Facón' then 21
									--WHEN f.Nombre like '%BYD-Bta-Mayorista%' then 246
									ELSE b.CodUnidadNegocio END,
		     NombreUnidadNegocio=CASE WHEN b.NombreUnidadNegocio IS NULL AND  CASE WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD' 
			                                                                       WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
									                                               ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  END='Centro Digital' THEN 'CENTRO DIGITAL'
		                              WHEN b.NombreUnidadNegocio IS NULL AND  CASE WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD' 
									                                               WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
																				   ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  END like 'be%' THEN 'BELLPI'
					                  WHEN b.NombreUnidadNegocio IS NULL AND  CASE WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD'
							                                                       WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 
							                                                       ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)  END like'DAi.v%'  THEN 'Daimler PC'
									  when b.Sigla = 'MAY BYD' then 'BYD Mayorista'
									  when b.Sigla = 'MAY MIT' then 'Mitsubishi Mayorista' 
									  when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%tagui%' then 'JD Construccion'
	                                  when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%Rental%' then 'JD Construccion'
	                                  when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%Ruta 40%' then 'Wirtgen'
	                                  when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%quilla%' then 'JD Construccion'
	                                  when b.NombreUnidadNegocio is null and nombre like '%JD%'and nombre like '%B/manga%'then 'JD Construccion'
	                                  when (b.NombreUnidadNegocio is null or CodUnidadNegocio is null) and  nombre like '%JD%' then 'JD Agricola'
					      --            WHEN f.nombre like '%MIT-Bta-Mayorista%' or f.nombre like 'MIT-Bta.San Facón' then 'Mitsubishi Mayorista' 
									  --WHEN f.nombre like '%BYD-Bta-Mayorista%' then 'BYD Mayorista'
									  when b.NombreUnidadNegocio is not null then b.NombreUnidadNegocio
									   END, 
		     linea=CASE WHEN f.Nombre='BYD Bogotá Av. 68' THEN 'BYD' 
                        WHEN f.Nombre like 'bellpi' then 'BE'
					    WHEN f.Nombre like 'Centro Digital' then 'DIG'
		                WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 					
				        ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1)   END,f.Nombre 
		FROM [PSCService_DB].dbo.spiga_FacturasRecibidas f 
		left join (select distinct CodEmpresa,Sigla,NombreUnidadNegocio,CodUnidadNegocio,nombrecentro 
		             from [DBMLC_0190].dbo.vw_UnidadDeNegocio) b on replace(replace( b.sigla,'MAY BYD','BYD'),'MAY MIT','MIT') =CASE WHEN f.Nombre ='BYD Bogotá Av. 68' THEN 'BYD' 
                                                                     WHEN f.Nombre like 'bellpi' then 'BELL'
					                                                 WHEN f.Nombre like 'Centro Digital' then 'DIG'
		                                                             WHEN CHARINDEX('-', f.Nombre) = 0 THEN f.Nombre 					
				                                                     ELSE LEFT(f.Nombre, CHARINDEX('-',f.Nombre) - 1) end
		                                            and b.CodEmpresa=f.pkfkempresas 
													and b.nombrecentro=f.nombre 
													--and b.NombreCentro = f.nombre
    where f.Nombre not like '%Dig%' 
	  and f.Nombre not like '%CO-%' --and Ano_Periodo=2023 and   Mes_Periodo in (4,5,6)
	 )a
--where Ano_Periodo=2023 and   Mes_Periodo in (10,11,12)
GROUP BY Ano_Periodo,  Mes_Periodo,NombreEmpresa,pkfkempresas, CodUnidadNegocio, NombreUnidadNegocio

```
