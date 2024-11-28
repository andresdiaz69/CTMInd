# View: vw_GAC_Cartera

## Usa los objetos:
- [[spiga_Cartera]]
- [[v_MarginadorMostradorJohnDeere]]
- [[v_MarginadorTallerJohnDeere]]
- [[vw_UnidadDeNegocio]]
- [[vw_UnidadDeNegocio]]

```sql


--DROP VIEW vw_GAC_Cartera 
CREATE VIEW [dbo].[vw_GAC_Cartera] AS
SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio, valor
  FROM (
		 SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio, SUM(valor)valor
		   FROM ( SELECT a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, b.CodCentro, a.NombreCentro, a.DescripcionSeccion, valor=SUM(CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END ), a.Factura,
		                 CodUnidadNegocio=CASE WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%Mit%' THEN 700
								               WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%byd%' THEN 701								  
								               WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion <> 'bellpi App'  THEN 418
								               WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion  = 'bellpi App'  THEN 15
								               else CodUnidadNegocio END,
	                      NombreUnidadNegocio=CASE WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%Mit%' THEN 'Mitsubishi mayorista'
									               WHEN NombreUnidadNegocio = 'MAYORISTA VEHICULOS' and a.NombreCentro like '%byd%' THEN 'BYD mayorista'									
									               WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion <> 'bellpi App'  THEN 'NEBULA'
									               WHEN a.NombreCentro = 'Centro Digital' AND a.DescripcionSeccion = 'bellpi App'   THEN 'BELLPI'  
									               else b.NombreUnidadNegocio end
		            FROM [PSCService_DB].[dbo].spiga_Cartera a
		            LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro, nomcent=NombreCentro ,NombreUnidadNegocio,CodUnidadNegocio
		                         FROM [dbo].[vw_UnidadDeNegocio]
							  )b ON  REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ')=b.NombreCentro
		           WHERE a.NombreCentro NOT LIKE 'JD-%' --a.NombreCentro <> 'PA-Bta-AV 68 Panda'  --AND a.NombreCentro <> 'BN-Bta-Usados 79'         
		             AND a.NombreCentro NOT LIKE 'CO-%' 
		           --AND a.NombreCentro <> 'JD-Cali-Yumbo'         AND a.NombreCentro <> 'JD-P.Gaitan-Alto Neblinas' AND a.NombreCentro <> 'MIT-Bta-Cll 170'
		           --AND a.NombreCentro <> 'MIT-Bta-Gran Estacion' AND a.NombreCentro <> 'RN-Bta-Aut.Norte 222'      AND a.NombreCentro <> 'VO-Bta-Cra 50' 
		           --AND a.NombreCentro <> 'VO-Bta-Dg.79'          AND a.NombreCentro <> 'VW-Bta-Aut.Sur'            AND a.NombreCentro <> 'BYD Bogotá Av. 68'
	               GROUP BY a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, b.CodCentro, a.NombreCentro, a.DescripcionSeccion, a.Factura,NombreUnidadNegocio,CodUnidadNegocio)a
	     GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio
         UNION ALL
 	    SELECT Ano_Periodo,Mes_Periodo,IdEmpresas, CodCentro,NombreCentro, CodUnidadNegocio,NombreUnidadNegocio, valor=SUM(Saldo)
	      FROM (
		    	SELECT Ano_Periodo,Mes_Periodo, A.IdEmpresas,CodCentro,a.NombreCentro, CodUnidadNegocio,NombreUnidadNegocio, Saldo
			      FROM (
				        SELECT Ano_Periodo,Mes_Periodo, A.IdEmpresas,a.NombreCentro,
					           Saldo = SUM(CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END)
				          FROM [PSCService_DB].[dbo].[spiga_Cartera] A
				     --  WHERE Ano_Periodo = 2023 AND Mes_Periodo in (4,5,6) 
				         WHERE NombreCentro LIKE 'CO-%' AND DescripcionSeccion IS NULL
				         GROUP BY Ano_Periodo,Mes_Periodo,IdEmpresas, NombreCentro
			           ) A
			      LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro ,NombreUnidadNegocio,CodUnidadNegocio
		                            FROM [dbo].[vw_UnidadDeNegocio]
			                ) B ON REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ') = B.NombreCentro 
			     WHERE CodCentro NOT IN (51,54,62,68,69,79,87,92,97,179)

			     UNION ALL

			    SELECT DISTINCT Ano_Periodo,Mes_Periodo,A.IdEmpresas,		
				       CodCentro = CASE WHEN B.CodCentro IS NOT NULL THEN B.CodCentro ELSE C.CodCentro END,
				       NombreCentro = CASE WHEN B.NombreCentro IS NOT NULL THEN B.NombreCentro ELSE c.NombreCentro END,
				       CodUnidadNegocio = CASE WHEN (c.CodCentro = 179 AND b.codseccion = 1103) THEN 1 
					    					   WHEN c.CodCentro IN (179,178) AND b.codseccion not in (1103,1104) THEN 3	
					    					   WHEN B.CodUnidadNegocio IS NOT NULL THEN B.CodUnidadNegocio 
					    			           WHEN C.CodCentro IN (74, 79, 92, 101) AND DescripcionSeccion LIKE '%MIT%' THEN 20
					    			           WHEN C.CodCentro IN (74, 79, 92, 101) AND DescripcionSeccion NOT LIKE '%MIT%' THEN 5 										   									   
					    			           ELSE C.CodUnidadNegocio END,
				       NombreUnidadNegocio = CASE WHEN c.CodCentro = 179 AND b.codseccion = 1103 THEN 'DAIMLER VC ' 
									              WHEN c.CodCentro IN (179,178) AND b.codseccion not in (1103,1104) THEN 'DAIMLER PC'
											      WHEN B.NombreUnidadNegocio IS NOT NULL THEN B.NombreUnidadNegocio 
				   				                  WHEN C.CodCentro IN (74, 79, 92, 101) AND DescripcionSeccion LIKE '%MIT%' THEN 'MITSUBISHI'
				   				                  WHEN C.CodCentro IN (74, 79, 92, 101) AND DescripcionSeccion NOT LIKE '%MIT%' THEN 'Colision' 											  
				   				                  ELSE C.NombreUnidadNegocio END,	  Saldo
			     FROM (
				       SELECT Ano_Periodo,Mes_Periodo,IdEmpresas, NombreCentro, DescripcionSeccion,
					          Saldo = SUM(CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END)
				         FROM [PSCService_DB].[dbo].[spiga_Cartera] A
				        WHERE NombreCentro LIKE 'CO-%' AND DescripcionSeccion IS NOT NULL-- Ano_Periodo = 2023AND Mes_Periodo in (4,5,6) 
				        GROUP BY Ano_Periodo,Mes_Periodo,IdEmpresas, NombreCentro, DescripcionSeccion
			          ) A
			     LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro,codseccion,NombreSeccion ,NombreUnidadNegocio,CodUnidadNegocio
		                      FROM [dbo].[vw_UnidadDeNegocio]-- where codcentro = 97
			               ) B ON  REPLACE(REPLACE(REPLACE(A.DescripcionSeccion,' ','<>'),'><',''),'<>',' ') = B.NombreSeccion
			     LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro ,NombreUnidadNegocio,CodUnidadNegocio
		                      FROM [dbo].[vw_UnidadDeNegocio]  --where NombreSeccion like  '%Taller Colisión Dai Av 68%'
			               ) C ON C.NombreCentro  =  REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ') 
				--where c.CodCentro in (97)
		       ) A
	   GROUP BY Ano_Periodo,Mes_Periodo,IdEmpresas, CodCentro,a.NombreCentro, CodUnidadNegocio,NombreUnidadNegocio

	   union all

	  SELECT Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, CodUnidadNegocio,
	         NombreUnidadNegocio, sum(valor)valor
	    FROM (
	          SELECT distinct Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, 
	                 CodUnidadNegocio = CASE  WHEN c.CodUnidadNegocio  IS not NULL  THEN c.CodUnidadNegocio 										     
					                          WHEN b.CodUnidadNegocio  IS not NULL  then b.CodUnidadNegocio
											  WHEN CodMarcaNuevo       IS not null  then CodMarcaNuevo
											 -- WHEN d.CodUnidadNegocio  IS not NULL  then d.CodUnidadNegocio
											  WHEN IdTerceros IN (441634, 245933) THEN 410
									          WHEN IdTerceros IN (245949) THEN 411
									          WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 520
											  WHEN CodCentro IN (25, 29, 43, 153) THEN 411
									          WHEN CodCentro IN (26) THEN 520			        
	                                          WHEN b.CodUnidadNegocio IS NULL AND CodCentro=16     THEN 410	                
	                                          else 410 END,
	                 NombreUnidadNegocio = CASE WHEN c.NombreUnidadNegocio  IS not NULL  THEN c.NombreUnidadNegocio 
												WHEN b.NombreUnidadNegocio  IS not NULL  then b.NombreUnidadNegocio 
												WHEN MarcaNueva             IS not null  then MarcaNueva
												--WHEN d.NombreUnidadNegocio  IS not NULL  then d.NombreUnidadNegocio 
												WHEN IdTerceros IN (441634, 245933) THEN 'JD AGRICOLA'
									            WHEN IdTerceros IN (245949) THEN 'JD Construccion'
									            WHEN IdTerceros IN (931248, 794428, 517951, 517941, 517912, 517941, 517972) THEN 'WIRTGEN'
												WHEN CodCentro IN (25, 29, 43, 153) THEN 'JD Construccion'
									            WHEN CodCentro IN (26) THEN 'WIRTGEN'
	                                            WHEN b.NombreUnidadNegocio IS NULL AND CodCentro=16  THEN 'JD AGRICOLA'
	                                            else 'JD AGRICOLA' END,	SUM(valor) valor	 ,DescripcionSeccion, IdTerceros
	           FROM (SELECT a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, b.CodCentro,IdTerceros,
							CASE WHEN A.NombreCentro LIKE '%JD-Cali-Yumbo%' THEN 'JD-Cali-Palmira'
				                 WHEN A.NombreCentro LIKE '%VO-Bta-Cra 50%' THEN 'VO-Bta.-bellpi Usados'
				                 WHEN A.NombreCentro LIKE '%BYD Bogotá Av. 68%' THEN 'BYD-Bogotá Av. 68'
				                 WHEN A.NombreCentro LIKE '%JD-P.Gaitan-Alto Neblinas%' THEN 'JD-Ruta 40'
				                 WHEN A.NombreCentro LIKE '%MIT-Bta-Cll 170%' THEN 'MIT-Bta-Vitrina itinerante sabana'
				                 WHEN DescripcionSeccion = 'Taller Móvil JD Wirtgen Itaguí Carrera 92' THEN 'JD-Itagui-Cra 92'
				                 ELSE REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ') END NombreCentro,  a.DescripcionSeccion, 
							CASE WHEN CodMarcaNuevo = 410  THEN 'JD AGRICOLA'
				                 WHEN CodMarcaNuevo = 411  THEN 'JD CONSTRUCCION'
				                 WHEN CodMarcaNuevo = 520  THEN 'WIRTGEN' END MarcaNueva,
							CodMarcaNuevo, valor= sum(CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto 
														   ELSE ImportePendiente END)  --, a.Factura	       
	                   FROM [PSCService_DB].[dbo].spiga_Cartera a
			           LEFT JOIN (SELECT DISTINCT CodMarcaNuevo,MarcaNueva  , NumeroFactura 
		                            FROM (
		                  	              SELECT CodMarcaNuevo,MarcaNueva , NumeroFactura 
		                  	                FROM v_MarginadorMostradorJohnDeere 	
		                  	               UNION ALL
		                  	              SELECT CodMarcaNuevo,MarcaNueva, NumeroFactura
		                  	                FROM v_MarginadorTallerJohnDeere
		                                 ) A
					 	         ) c ON A.Factura = c.NumeroFactura
								     and DescripcionSeccion is null
								     
	                   LEFT JOIN (SELECT DISTINCT CodCentro, NombreCentro, nomcent=NombreCentro 
						            FROM vw_UnidadDeNegocio
								 )b ON  REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ')=b.NombreCentro
	                  WHERE a.NombreCentro LIKE 'JD-%' --and a.NombreCentro = ('JD-Bta-P. Aranda') and Ano_Periodo=2024 and Mes_Periodo=4
	                  GROUP BY a.Ano_Periodo, a.Mes_Periodo, a.IdEmpresas, b.CodCentro, a.NombreCentro, a.DescripcionSeccion, a.Factura,
					        CodMarcaNuevo ,IdTerceros)a
	           LEFT JOIN (SELECT DISTINCT codemp=CodEmpresa, codcent=CodCentro, CodSeccion,  nombreSeccion,
			                     CodUnidadNegocio, NombreUnidadNegocio
	                        FROM vw_UnidadDeNegocio
						 )c ON a.IdEmpresas=c.codemp 
						   AND a.CodCentro=codcent 
						   AND REPLACE(REPLACE(REPLACE(A.DescripcionSeccion,' ','<>'),'><',''),'<>',' ')=c.NombreSeccion
			   LEFT JOIN (SELECT DISTINCT nomcent=NombreCentro , NombreSeccion,
			                     CodUnidadNegocio, NombreUnidadNegocio
						    FROM vw_UnidadDeNegocio
						 )b ON  REPLACE(REPLACE(REPLACE(A.DescripcionSeccion,' ','<>'),'><',''),'<>',' ')=b.NombreSeccion
			   LEFT JOIN (SELECT DISTINCT   nomcent=NombreCentro ,CodUnidadNegocio, NombreUnidadNegocio
						    FROM vw_UnidadDeNegocio 
						 )d ON  REPLACE(REPLACE(REPLACE(A.NombreCentro,' ','<>'),'><',''),'<>',' ')=d.nomcent
			--	WHERE a.NombreCentro = ('JD-Villavo-Ag Del Llano') and Ano_Periodo=2024 and Mes_Periodo=3
              GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, c.CodUnidadNegocio, c.NombreUnidadNegocio, IdTerceros,
	                CodMarcaNuevo,b.CodUnidadNegocio,b.NombreUnidadNegocio,MarcaNueva,d.CodUnidadNegocio,d.NombreUnidadNegocio,DescripcionSeccion
					)b  
					--WHERE NombreCentro = ('JD-Ibague-ZI Mirolindo') and Ano_Periodo=2024 and Mes_Periodo=4
	 GROUP BY Ano_Periodo, Mes_Periodo, IdEmpresas, CodCentro, NombreCentro, CodUnidadNegocio, NombreUnidadNegocio 
     )c
 WHERE NombreUnidadNegocio not in ('NEBULA','Colision','Colisión','USC (Unidad de Servicios compartidos)','FOMENTA') 
   --CodUnidadNegocio IS not  NULL
  and IdEmpresas  not in (9)
 -- and NombreCentro  not like 'CO-%'
--NombreCentro='JD-Yopal-Yopal'
--AND Ano_Periodo=2024
--AND Mes_Periodo in(3)


--select distinct * from UnidadDeNegocio  where codcentro --NombreCentro like '%JD-Villavo-Ag Del Llano%' 
--in (162)
--No ENCONTRADOS 
--JD-B/Quilla-Cl.110
--JD-Bta-P. Aranda
--JD-Bta-Rental
--JD-Cali-Palmira
--JD-Chia-Mayorista
--JD-Chia-Yerbabuena
--JD-Ibague-ZI Mirolindo
--JD-Itagui-Cra 92
--JD-Monteria-Via Cereté 
--JD-Neiva-Cra 5 
--JD-Valledupar-5 Nov.
--JD-Villavo-Anillo Vial 1
--JD-Yopal-Yopal 
--select * from Empresas  

--SELECT MarcaNueva,SUM (  CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END ) 
--FROM [PSCService_DB].[dbo].spiga_Cartera a
--  LEFT JOIN (SELECT DISTINCT CodMarcaNuevo,MarcaNueva  , NumeroFactura 
--		                            FROM (
--		                  	              SELECT CodMarcaNuevo,MarcaNueva , NumeroFactura 
--		                  	                FROM v_MarginadorMostradorJohnDeere 	
--		                  	               UNION ALL
--		                  	              SELECT CodMarcaNuevo,MarcaNueva, NumeroFactura
--		                  	                FROM v_MarginadorTallerJohnDeere
--		                                 ) A
--					 	         ) c ON A.Factura = c.NumeroFactura
--WHERE NombreCentro like 'jd%'
--AND Ano_Periodo=2024 and Mes_Periodo in(4)
--group by MarcaNueva
  
--SELECT distinct (  CASE WHEN DescripcionSituacionEfectos = 'Remesado' THEN ImporteEfecto ELSE ImportePendiente END ),  *
--FROM [PSCService_DB].[dbo].spiga_Cartera
--WHERE NombreCentro = 
--('JD-Villavo-Ag Del Llano')
--and Ano_Periodo = 2024
--and Mes_Periodo = 4

--'JD-Bta-P. Aranda',   agricola
--'JD-Bta-Rental',      construccion
--'JD-Cali-Palmira',   agricola
--'JD-Chia-Mayorista', agricola
--'JD-Chia-Yerbabuena', agricola
--'JD-Ibague-ZI Mirolindo', agricola
--'JD-Itagui-Cra 92',     construccion
--'JD-Monteria-Via Cereté' , agricola
--'JD-Neiva-Cra 5',      agricola
--'JD-Valledupar-5 Nov.',     agricola
--'JD-Villavo-Anillo Vial 1', agricola
--'JD-Yopal-Yopal'            agricola
--)
----and Ano_Periodo=2019 and Mes_Periodo=8
--AND DescripcionSeccion IS NULL

--SELECT *
--DEPARTAMENTO ='FI'
--INDUSTRIAS JOHN DEERE S.A DE CV - AGRICOLA
--EQUIRENT - AGRICOLA
--&FORESTRY- CONSTRUCCION

--select top 1 * from ComisionesSpigaAlmacenAlbaran 
--where NumeroFactura='Z24\14\2019'

```
