# View: vw_GAC_Activos_Fijos

## Usa los objetos:
- [[spiga_ActivosFijos]]
- [[vw_UnidadDeNegocio]]

```sql

--DROP   VIEW vw_GAC_Activos_Fijos
CREATE VIEW [dbo].[vw_GAC_Activos_Fijos] AS
SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio, SUM(valor)valor,x
  FROM (
	    SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentro, NombreCentro, valor,CodUnidadNegocio, NombreUnidadNegocio ,x
	           
	     FROM (
			   SELECT distinct a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, a.IdCentro, a.NombreCentro, a.IdSecciones, a.DescripcionSeccion,
			          valor=(ValorAmortizable - AmortizacionAcumulada) * Porcentaje,
			          CodUnidadNegocio=CASE WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%Mit%' THEN 700
								            WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%byd%' THEN 701								  
								            WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion <> 'bellpi App'  THEN 418
								            WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion  = 'bellpi App'  THEN 15
								            else CodUnidadNegocio END,
	                  NombreUnidadNegocio=CASE WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%Mit%' THEN 'Mitsubishi mayorista'
									           WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%byd%' THEN 'BYD mayorista'									
									           WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion <> 'bellpi App'  THEN 'NEBULA'
									           WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion = 'bellpi App'   THEN 'BELLPI'  
									           else NombreUnidadNegocio end, X='t'
			     FROM (
			           SELECT A.IdEmpresas	,IdCentro = ISNULL(A.IdCentrosDesg,0),NombreCentroDesg	NombreCentro,ValorAmortizable=sum(ISNULL(ValorAmortizable,0)),	
			                  Porcentaje,AmortizacionAcumulada=sum(ISNULL(AmortizacionAcumulada,0))	,a.DescripcionSeccion,IdSecciones,a.Ano_Periodo, a.Mes_Periodo			                  
		 	             FROM [PSCService_DB].[dbo].spiga_ActivosFijos a 
			            WHERE FechaBaja IS NULL 
		                  AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		                  AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
						  and NombreCentroDesg NOT LIKE 'JD-%' 
			         	  AND NombreCentroDesg NOT LIKE 'CO-%'
						  --AND IdCentros=IdCentrosDesg
						  --and Ano_Periodo =2024 and Mes_Periodo=4 --and IdCentrosDesg = 162
			            GROUP BY a.Ano_Periodo, a.Mes_Periodo, NombreCentroDesg, a.IdCentrosDesg, a.IdEmpresas, a.IdSecciones , a.DescripcionSeccion,Porcentaje
				     )a
			    LEFT JOIN (SELECT CodEmpresa, CodSeccion, CodCentro, CodUnidadNegocio, NombreUnidadNegocio 
				             FROM vw_UnidadDeNegocio --where CodCentro
						   )b	 ON a.IdEmpresas =b.CodEmpresa 
						      --and a.IdSecciones=b.CodSeccion 
						        and a.IdCentro  =b.CodCentro
			   
				 --where a.Ano_Periodo =2024 and a.Mes_Periodo=4 and IdCentro = 70
			   --group by a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, a.IdCentro, a.NombreCentro, a.IdSecciones, a.DescripcionSeccion,
			  --        b.CodUnidadNegocio, b.NombreUnidadNegocio 
			   UNION ALL

				--CONSULTA DE LOS CENTROS DE COLISIÓN
			  SELECT distinct Ano_Periodo, Mes_Periodo, IdEmpresas	,IdCentro,NombreCentro ,IdSecciones,DescripcionSeccion,
			         valor=(ValorAmortizable - AmortizacionAcumulada) * Porcentaje,CodUnidadNegocio, NombreUnidadNegocio , X='c1'
				FROM (
			           SELECT A.IdEmpresas	,IdCentro = ISNULL(A.IdCentrosDesg,0),NombreCentroDesg	NombreCentro,ValorAmortizable=sum(ISNULL(ValorAmortizable,0)),	
			                  Porcentaje,AmortizacionAcumulada=sum(ISNULL(AmortizacionAcumulada,0))	,a.DescripcionSeccion,IdSecciones,a.Ano_Periodo, a.Mes_Periodo
		 	             FROM [PSCService_DB].[dbo].spiga_ActivosFijos a 
			            WHERE FechaBaja IS NULL 
		                  AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		                  AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
						  and NombreCentroDesg LIKE 'CO-%'
						  --AND IdCentros=IdCentrosDesg
			            GROUP BY a.Ano_Periodo, a.Mes_Periodo, NombreCentroDesg, a.IdCentrosDesg, a.IdEmpresas, a.IdSecciones , a.DescripcionSeccion,Porcentaje
				     ) C
				LEFT JOIN (SELECT DISTINCT CodEmpresa, CodSeccion, CodCentro, CodUnidadNegocio, NombreUnidadNegocio 
				             FROM vw_UnidadDeNegocio 
				          ) A ON C.IdCentro = a.CodCentro 
						     AND C.IdSecciones = A.CodSeccion
			   WHERE  A.CodCentro IS NOT NULL 
				 AND C.IdCentro  IN (51,54,62,68,69,79,87,97,179) 
                 --and Ano_Periodo =2024 and Mes_Periodo=4 and IdCentro = 58
			  -- GROUP BY Ano_Periodo, Mes_Periodo,C.IdEmpresas ,CodUnidadNegocio, NombreUnidadNegocio ,C.IdCentro,NombreCentro ,IdSecciones,DescripcionSeccion
               UNION ALL

				--CONSULTA DE LOS CENTROS DE COLISIÓN
			  SELECT distinct Ano_Periodo, Mes_Periodo, IdEmpresas	,IdCentro,NombreCentro ,IdSecciones,DescripcionSeccion,
			         valor=(ValorAmortizable - AmortizacionAcumulada) * Porcentaje,CodUnidadNegocio, NombreUnidadNegocio , X='c2'
				FROM (
			           SELECT A.IdEmpresas	,IdCentro = ISNULL(A.IdCentrosDesg,0),NombreCentroDesg	NombreCentro,ValorAmortizable=sum(ISNULL(ValorAmortizable,0)),	
			                  Porcentaje,AmortizacionAcumulada=sum(ISNULL(AmortizacionAcumulada,0))	,a.DescripcionSeccion,IdSecciones,a.Ano_Periodo, a.Mes_Periodo
		 	             FROM [PSCService_DB].[dbo].spiga_ActivosFijos a 
			            WHERE FechaBaja IS NULL 
		                  AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		                  AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
						  and NombreCentroDesg LIKE 'CO-%'
						  --AND IdCentros=IdCentrosDesg
			            GROUP BY a.Ano_Periodo, a.Mes_Periodo, NombreCentroDesg, a.IdCentrosDesg, a.IdEmpresas, a.IdSecciones , a.DescripcionSeccion,Porcentaje
				     ) C
			    LEFT JOIN (SELECT DISTINCT CodEmpresa, CodSeccion, CodCentro, CodUnidadNegocio, NombreUnidadNegocio 
				             FROM vw_UnidadDeNegocio 
				          ) A ON C.IdCentro = a.CodCentro 
						    -- AND C.IdSecciones = A.CodSeccion
			   WHERE C.IdCentro not  IN (51,54,62,68,69,79,87,97,179) 
	 		    --and Ano_Periodo =2024 and Mes_Periodo=4 and IdCentro = 70
	          UNION ALL

			 SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentro, NombreCentro= NombreCentro, IdSecciones, DescripcionSeccion, valor,
			        CodUnidadNegocio, NombreUnidadNegocio, X='j'
			   FROM (
			         SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentro, NombreCentro, IdSecciones, DescripcionSeccion, valor,
			                CodUnidadNegocio =  b.CodUnidadNegocio , 
			                NombreUnidadNegocio= b.NombreUnidadNegocio 
			         FROM (
			               SELECT a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas,a.IdCentro,  a.NombreCentro, a.IdSecciones, a.DescripcionSeccion,
						          Valor = (ValorAmortizable - AmortizacionAcumulada) * Porcentaje,  CodUnidadNegocio, NombreUnidadNegocio 
			                 FROM (	SELECT A.IdEmpresas	,IdCentro = ISNULL(A.IdCentrosDesg,0),NombreCentroDesg	NombreCentro,ValorAmortizable=sum(ISNULL(ValorAmortizable,0)),	
			                               Porcentaje,AmortizacionAcumulada=sum(ISNULL(AmortizacionAcumulada,0))	,a.DescripcionSeccion,IdSecciones,a.Ano_Periodo, a.Mes_Periodo
		 	                          FROM [PSCService_DB].[dbo].spiga_ActivosFijos a 
			                         WHERE FechaBaja IS NULL 
		                               AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		                               AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
						               and NombreCentroDesg LIKE 'JD-%' 
									   AND IdSecciones NOT IN (44,90,92,300,332,338,363,369,579)--AND IdCentros<>IdCentrosDesg
			                         GROUP BY a.Ano_Periodo, a.Mes_Periodo, NombreCentro, a.IdCentrosDesg, a.IdEmpresas, a.IdSecciones , a.DescripcionSeccion,Porcentaje,
									       a.NombreCentroDesg,a.IdCentros
			                      )a
			                 LEFT JOIN (SELECT NombreCentro, CodEmpresa, CodSeccion, CodCentro, CodUnidadNegocio, NombreUnidadNegocio 
							              FROM vw_UnidadDeNegocio
									   )b  ON a.IdEmpresas=b.CodEmpresa 
									      and a.IdSecciones=b.CodSeccion 
										  and a.IdCentro=b.CodCentro		
							union all
						   SELECT a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas,a.IdCentro,  a.NombreCentro, a.IdSecciones, a.DescripcionSeccion,
						          Valor = (ValorAmortizable - AmortizacionAcumulada) * Porcentaje,  
								  case WHEN IdSecciones IN (44,90,92,300,332,338) THEN 410
									   WHEN IdSecciones IN (363,369,579) THEN 411 end   CodUnidadNegocio,
								  case WHEN IdSecciones IN (44,90,92,300,332,338) THEN 'JD Agricola'
									   WHEN IdSecciones IN (363,369,579) THEN 'JD Construccion' end NombreUnidadNegocio 
			                 FROM (	SELECT A.IdEmpresas	,IdCentro = ISNULL(A.IdCentrosDesg,0),NombreCentroDesg	NombreCentro,ValorAmortizable=sum(ISNULL(ValorAmortizable,0)),	
			                               Porcentaje,AmortizacionAcumulada=sum(ISNULL(AmortizacionAcumulada,0))	,a.DescripcionSeccion,IdSecciones,a.Ano_Periodo, a.Mes_Periodo
		 	                          FROM [PSCService_DB].[dbo].spiga_ActivosFijos a 
			                         WHERE FechaBaja IS NULL 
		                               AND DescripcionInmovilizadoTipos NOT LIKE '%Diferido%'
		                               AND IdEmpresas IN (1, 5, 6, 19, 20, 24, 25, 27)
						               and NombreCentroDesg LIKE 'JD-%' 
									   AND IdSecciones IN (44,90,92,300,332,338,363,369,579)--AND IdCentros<>IdCentrosDesg
			                         GROUP BY a.Ano_Periodo, a.Mes_Periodo,  a.IdCentrosDesg, a.IdEmpresas, a.IdSecciones , a.DescripcionSeccion,Porcentaje,
									       NombreCentroDesg
			                      )a
			         --        LEFT JOIN (SELECT NombreCentro, CodEmpresa, CodSeccion, CodCentro, CodUnidadNegocio, NombreUnidadNegocio 
							     --         FROM vw_UnidadDeNegocio
									   --)b  ON a.IdEmpresas=b.CodEmpresa 
									   --   and a.IdSecciones=b.CodSeccion 
										  --and a.IdCentro=b.CodCentro	
			)b
			)f
	 )b
 )c
WHERE NombreUnidadNegocio not in ('NEBULA','Colision','Colisión','USC (Unidad de Servicios compartidos)','FOMENTA')  
--and Ano_Periodo =2024and Mes_Periodo =4

GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, IdCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio,x
 
 --select valor=sum   ((ValorAmortizable - AmortizacionAcumulada) * Porcentaje)
 --FROM [PSCService_DB].[dbo].spiga_ActivosFijos where IdCentrosDesg=70 and Ano_Periodo=2024and Mes_Periodo =4 and FechaBaja IS NULL 

 --CENTROS QUE TIENEN SECCIONES NULL usc
-- Centro Digital  
--JD-B/Quilla-Cl.110       || CONSRUCCION WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-B/Quilla-Cl.110'  THEN 411
--JD-Cali-Palmira          || agricola    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Cali-Palmira'  THEN 410
--JD-Cali-Yumbo			   ||             WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Cali-Yumbo'  THEN 410
--JD-Chia-Mayorista        || AGRICOLA    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Chia-Mayorista'   THEN 410
--JD-Chia-Yerbabuena       || AGRICOLA    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Chia-Yerbabuena'  THEN 410
--JD-Monteria-Via Cereté   || AGRICOLA    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Monteria-Via Cereté'  THEN 410
--JD-Valledupar-5 Nov.     || AGRICOLA    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Valledupar-5 Nov.'  THEN 410
--JD-Villavo-Anillo Vial 1 || AGRICOLA    WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Villavo-Anillo Vial 1'  THEN 410
--JD-Itagui-Cra 92 construccion || CONSRUCCION WHEN c.CodUnidadNegocio IS NULL AND NombreCentro='JD-Itagui-Cra 92'  THEN 411
 

```
