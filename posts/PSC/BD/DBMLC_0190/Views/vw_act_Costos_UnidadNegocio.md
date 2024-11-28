# View: vw_act_Costos_UnidadNegocio

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]

```sql
--DROP VIEW vw_act_Costos_UnidadNegocio
CREATE VIEW vw_act_Costos_UnidadNegocio AS 
SELECT DISTINCT Cod_empresa, Nombre_Empresa, Cod_Centro, Nombre_Centro, Cod_seccion, Nombre_Seccion, Cod_Departamento, Nombre_Departamento
, codUN, NombreUnidadNe, Sigla, Division, CodSedeAmbiental, SedeAmbiental, CodSedeDistCol, SedeDistribucionColision
, UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion
FROM(

			 SELECT Cod_empresa, Nombre_Empresa, Cod_Centro, Nombre_Centro, Cod_seccion, Nombre_Seccion, Cod_Departamento, Nombre_Departamento
			, b.codUN, b.NombreUnidadNe, b.Sigla, b.Division, b.CodSedeAmbiental, b.SedeAmbiental, b.CodSedeDistCol, b.SedeDistribucionColision
		    , b.UnidadNegocio_Requisicion, b.NombreUnidadNegocio_Requisicion
		    FROM(
			 SELECT DISTINCT a.Cod_empresa, a.Nombre_Empresa, a.Cod_Centro, a.Nombre_Centro, a.Cod_seccion, a.Nombre_Seccion, a.Cod_Departamento, a.Nombre_Departamento
			 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos a
			 WHERE a.Cod_seccion IS NOT NULL AND a.Nombre_Centro <> 'PA-Bta-AV 68 Panda'  
			 )a
			 LEFT JOIN (SELECT codEmp=CodEmpresa, codCent=CodCentro, codSec=CodSeccion, Sigla, Division, CodSedeAmbiental, SedeAmbiental, CodSedeDistCol, SedeDistribucionColision, UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion 
			 , codUN=CodUnidadNegocio, NombreUnidadNe=NombreUnidadNegocio, nomCent=NombreCentro, nomSec=NombreSeccion FROM [DBMLC_0190].dbo.UnidadDeNegocio) b ON b.CodEmp=a.Cod_empresa AND b.codCent=a.Cod_Centro AND a.Cod_seccion=b.CodSec 
			 WHERE b.codUN IS NOT NULL	AND a.Nombre_Centro not like 'JD%'

		UNION ALL

			 SELECT Cod_empresa, Nombre_Empresa, Cod_Centro, Nombre_Centro, Cod_seccion, Nombre_Seccion  
			 , Cod_Departamento, Nombre_Departamento
			 , coduniNegocio= CASE WHEN coduniNeg  IS NULL THEN d.coduni     ELSE coduniNeg  END
			 , nomuniNeg    = CASE WHEN nomuniNeg  IS NULL THEN d.nomuni     ELSE nomuniNeg  END
			 , sig=           CASE WHEN b.sigla    IS NULL THEN d.sig        ELSE b.sigla    END
			 , divic=         CASE WHEN b.divi     IS NULL THEN d.divi       ELSE b.divi     END
			 , codsedam=      CASE WHEN d.codsedam IS NULL THEN 999          ELSE d.codsedam END
			 , sedeam=        CASE WHEN d.sedeam   IS NULL THEN 'Nueva Sede' ELSE d.sedeam   END
			 , d.codseddist, d.sededistri
			 , unirequi=    CASE WHEN coduniNeg IS NULL THEN d.coduni ELSE coduniNeg END
			 , nomunirequi= CASE WHEN nomuniNeg IS NULL THEN d.nomuni ELSE nomuniNeg END
		     FROM(
			 SELECT DISTINCT  a.Cod_empresa, a.Nombre_Empresa, a.Cod_Centro, a.Nombre_Centro, a.Cod_seccion, a.Nombre_Seccion, a.Cod_Departamento, a.Nombre_Departamento
			 , coduniNeg = CASE
			  WHEN Nombre_Centro LIKE 'DAI.C%'             THEN 1     WHEN Nombre_Centro LIKE 'VW-%'                THEN 2
			  WHEN Nombre_Centro LIKE 'DAI.V%'             THEN 3     WHEN Nombre_Centro LIKE 'FM-%'                THEN 4 
			  WHEN Nombre_Centro LIKE 'USC-%'              THEN 4     WHEN Nombre_Centro LIKE 'CO-%'                THEN 5 
			  WHEN Nombre_Centro  LIKE 'VO-%'              THEN 7     WHEN Nombre_Centro LIKE 'FR-%'                THEN 12
			  WHEN Nombre_Centro  LIKE 'RN-%'              THEN 19    WHEN Nombre_Centro LIKE 'MIT-%'               THEN 20	   
			  WHEN Nombre_Centro  LIKE 'MZ-%'              THEN 22    WHEN Nombre_Centro LIKE 'bell%'               THEN 23
			  WHEN Nombre_Centro  LIKE 'BE-%'              THEN 23    WHEN Nombre_Centro LIKE 'BYD%'                THEN 245 
			  WHEN Nombre_Centro  LIKE 'BN-%'              THEN 417   WHEN Nombre_Centro = 'JD-Ruta 40'             THEN 520
			  WHEN Nombre_Seccion LIKE '%JD Agrícola%'     THEN 410   WHEN Nombre_Seccion LIKE '%JD Agricola%'      THEN 410 
			  WHEN Nombre_Seccion LIKE '%Agricola%'        THEN 410   WHEN Nombre_Seccion LIKE '%Agrícola%'         THEN 410 
			  WHEN Nombre_Seccion LIKE '%JD Agr%'          THEN 410   WHEN Nombre_Seccion LIKE '%JD Construccion%'  THEN 411 
			  WHEN Nombre_Seccion LIKE '%JD Construcción%' THEN 411   WHEN Nombre_Seccion LIKE '%Construcción%'     THEN 411
			  WHEN Nombre_Seccion LIKE '%Construccion%'    THEN 411   WHEN Nombre_Seccion LIKE '%Construcciòn%'     THEN 411  
			  WHEN Nombre_Seccion LIKE '%JD Wirtgen%'      THEN 520   WHEN Nombre_Seccion LIKE '%Wirtgen%'          THEN 520 
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administración Central'                       THEN 11  
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administracion Central'                       THEN 11
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion =  'IR-Administración Central'                       THEN 4    
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion =  'IR-Administracion Central'                       THEN 4
			  WHEN Nombre_Centro = 'JD-Itagui-Cra 92'   AND Nombre_Seccion  = 'Vitrina VN-CF GMC Carrera 92'        THEN 410
			  WHEN Nombre_Centro = 'JD-Chia-Yerbabuena' AND Nombre_Seccion  = 'VN-Ag GMC Yerbabuena'                THEN 411
			  WHEN Nombre_Centro LIKE 'Operaciones Cerradas-Bta-%'                                                  THEN 20 
			  WHEN a.Cod_seccion = 410                                                                              THEN 410 
			  WHEN Nombre_Centro = 'Centro Digital' AND Nombre_Seccion <> 'bellpi App'                              THEN 418  
			  WHEN Nombre_Centro = 'Centro Digital' AND Nombre_Seccion  = 'bellpi App'                              THEN 15 
			  WHEN Nombre_Centro = 'Centro Consignaciones'                                                          THEN 410 
			  WHEN a.Cod_seccion = 1128                                                                             THEN 7
			  WHEN a.Cod_seccion = 1129                                                                             THEN 7 END
			  , nomuniNeg =CASE 
			  WHEN Nombre_Centro LIKE 'DAI.V%' THEN 'Daimler PC'                   WHEN Nombre_Centro LIKE 'FR-%'               THEN 'Ford'    
			  WHEN Nombre_Centro LIKE 'MIT-%'  THEN 'Mitsubishi'                   WHEN Nombre_Centro LIKE 'MZ-%'               THEN 'Mazda'      
			  WHEN Nombre_Centro LIKE 'RN-%'   THEN 'Renault'                      WHEN Nombre_Centro LIKE 'VO-%'               THEN 'Usados'     
			  WHEN Nombre_Centro LIKE 'VW-%'   THEN 'Volkswagen'                   WHEN Nombre_Centro LIKE 'USC-%'              THEN 'USC (Unidad de Servicios compartidos)'
			  WHEN Nombre_Centro LIKE 'CO-%'   THEN 'Colisión'                     WHEN Nombre_Centro LIKE 'BN-%'               THEN 'Bonaparte'
			  WHEN Nombre_Centro LIKE 'BYD%'   THEN 'BYD'		                   WHEN Nombre_Centro LIKE 'bell%'              THEN 'BELLPI'     
			  WHEN Nombre_Centro LIKE 'BE-%'   THEN 'BELLPI'                       WHEN Nombre_Centro LIKE 'FM-%'               THEN 'USC (Unidad de Servicios compartidos)'
		      WHEN Nombre_Centro LIKE 'DAI.C%' THEN 'Daimler VC'                   WHEN Nombre_Centro = 'JD-Ruta 40'            THEN 'Wirtgen'          
			  WHEN Nombre_Seccion LIKE '%JD Agrícola%' THEN 'JD Agricola'          WHEN Nombre_Seccion LIKE '%JD Agricola%'     THEN 'JD Agricola'     
			  WHEN Nombre_Seccion LIKE '%Agrícola%'    THEN 'JD Agricola'          WHEN Nombre_Seccion LIKE '%Agricola%'        THEN 'JD Agricola'      
			  WHEN Nombre_Seccion LIKE '%JD Agr%'      THEN 'JD Agricola'          WHEN Nombre_Seccion LIKE '%JD Construcción%' THEN 'JD Construccion'  
			  WHEN Nombre_Seccion LIKE '%JD Construccion%' THEN 'JD Construccion'  WHEN Nombre_Seccion LIKE '%Construcción%'    THEN 'JD Construccion'  
			  WHEN Nombre_Seccion LIKE '%Construccion%' THEN 'JD Construccion'     WHEN Nombre_Seccion LIKE '%Construcciòn%'    THEN 'JD Construccion' 
			  WHEN Nombre_Seccion LIKE '%JD Wirtgen%'         THEN 'Wirtgen'       WHEN Nombre_Seccion LIKE '%Wirtgen%'         THEN 'Wirtgen' 
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administración Central'  THEN 'Israriego'       
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administracion Central'  THEN 'Israriego' 
			  WHEN Cod_seccion=410 THEN 'JD Agricola'
			  WHEN Nombre_Seccion = 'Vitrina VN-CF GMC Carrera 92' THEN 'JD Agricola'
			  WHEN Nombre_Centro = 'JD-Chia-Yerbabuena' AND Nombre_Seccion = 'VN-Ag GMC Yerbabuena'         THEN 'JD Construccion'
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion =  'IR-Administración Central' THEN 'USC (UNIDAD DE SERVICIOS COMPARTIDOS)'
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion =  'IR-Administracion Central' THEN 'USC (UNIDAD DE SERVICIOS COMPARTIDOS)'
			  WHEN Nombre_Centro = 'Centro Digital' AND Nombre_Seccion <> 'bellpi App'        THEN 'NEBULA' 
			  WHEN Nombre_Centro = 'Centro Digital' AND Nombre_Seccion = 'bellpi App'         THEN 'BELLPI' 
			  WHEN Nombre_Centro = 'Operaciones Cerradas-Bta-'                                THEN 'Mitsubishi' 
			  WHEN a.Cod_seccion = 1128                                                       THEN 'Usados'
			  WHEN a.Cod_seccion = 1129                                                       THEN 'Usados' END
			  , sigla= CASE 
			  WHEN Nombre_Centro LIKE 'DAI.V%' THEN 'DAI.V' WHEN Nombre_Centro LIKE 'DAi.V%' THEN 'DAI.V'
			  WHEN Nombre_Centro LIKE 'FR-%'   THEN 'FR'    WHEN Nombre_Centro LIKE 'MIT-%'  THEN 'MIT'  
			  WHEN Nombre_Centro LIKE 'MZ-%'   THEN 'MZ'    WHEN Nombre_Centro LIKE 'RN-%'   THEN 'RN'     
			  WHEN Nombre_Centro LIKE 'VO-%'   THEN 'VO'    WHEN Nombre_Centro LIKE 'VW-%'   THEN 'VW'  
			  WHEN Nombre_Centro LIKE 'USC-%'  THEN 'USC'   WHEN Nombre_Centro LIKE 'BN-%'   THEN 'BN'
			  WHEN Nombre_Centro LIKE 'BYD%'   THEN 'BYD'   WHEN Nombre_Centro LIKE 'bell%'  THEN 'BELL'     
			  WHEN Nombre_Centro LIKE 'BE-%'   THEN 'BELL'  WHEN Nombre_Centro LIKE 'FM-%'   THEN 'USC'
			  WHEN Nombre_Centro LIKE 'DAI.C%' THEN 'DAI.C' WHEN Cod_seccion=410             THEN 'JD.AGR'
		      WHEN Nombre_Centro LIKE 'CO-Chia-Fabrica Colision%'  THEN 'CO' 
			  WHEN Nombre_Centro LIKE 'CO-Bta-Cl 170%'             THEN 'CO'
			  WHEN Nombre_Centro LIKE 'CO-Ibague-Z.I. Mirolindo%'  THEN 'CO'
			  WHEN Nombre_Centro LIKE 'CO-Bta-DAI AV 68%'          THEN 'CO'
			  WHEN Nombre_Centro LIKE 'CO-Per-DAI Tierra Buena%'   THEN 'CO'
			  WHEN Nombre_Centro = 'JD-Ruta 40'                    THEN 'WIR'
			  WHEN Nombre_Centro = 'Centro Digital'                THEN 'DIG'
			  WHEN Nombre_Seccion ='VN-Ag GMC Yerbabuena'          THEN 'JD.CONS'
			  WHEN Nombre_Seccion LIKE '%JD Agrícola%'     THEN 'JD.AGR'  WHEN Nombre_Seccion LIKE '%JD Agricola%'     THEN 'JD.AGR'     
			  WHEN Nombre_Seccion LIKE '%Agrícola%'        THEN 'JD.AGR'  WHEN Nombre_Seccion LIKE '%Agricola%'        THEN 'JD.AGR'      
			  WHEN Nombre_Seccion LIKE '%JD Agr%'          THEN 'JD.AGR'  WHEN Nombre_Seccion LIKE '%JD Construcción%' THEN 'JD.CONS'  
			  WHEN Nombre_Seccion LIKE '%JD Construccion%' THEN 'JD.CONS' WHEN Nombre_Seccion LIKE '%Construcción%'    THEN 'JD.CONS'  
			  WHEN Nombre_Seccion LIKE '%Construccion%'    THEN 'JD.CONS' WHEN Nombre_Seccion LIKE '%Construcciòn%'    THEN 'JD.CONS' 
			  WHEN Nombre_Seccion LIKE '%JD Wirtgen%'      THEN 'WIR'     WHEN Nombre_Seccion LIKE '%Wirtgen%'         THEN 'WIR' 
              WHEN Nombre_Seccion LIKE 'Vitrina VN-CF GMC Carrera 92'  THEN 'JD.AGR'  
			  WHEN Nombre_Seccion LIKE 'Taller Colisión Puente Aranda' THEN 'CO'
			  WHEN Nombre_Seccion LIKE 'Taller Colisión Anillo Víal 1' THEN 'CO'			  
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administración Central' THEN 'IR'       
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administracion Central' THEN 'IR'
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion = 'IR-Administración Central'  THEN 'USC'       
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion = 'IR-Administracion Central'  THEN 'USC' 
			  WHEN a.Cod_seccion = 1128                                                       THEN 'VO'
			  WHEN a.Cod_seccion = 1129                                                       THEN 'VO' END
			  , divi= CASE 
			  WHEN Nombre_Centro LIKE 'DAI.V%' THEN 'Daimler' WHEN Nombre_Centro LIKE 'DAi.V%' THEN 'Daimler'
			  WHEN Nombre_Centro LIKE 'FR-%'   THEN 'Ford'    WHEN Nombre_Centro LIKE 'MIT-%'  THEN 'Mitsubishi'  
			  WHEN Nombre_Centro LIKE 'MZ-%'   THEN 'Mazda'   WHEN Nombre_Centro LIKE 'RN-%'   THEN 'Renault'     
			  WHEN Nombre_Centro LIKE 'VO-%'   THEN 'Usados'  WHEN Nombre_Centro LIKE 'VW-%'   THEN 'Volkswagen'  
			  WHEN Nombre_Centro LIKE 'USC-%'  THEN 'USC'     WHEN Nombre_Centro LIKE 'BN-%'   THEN 'Bonaparte'
			  WHEN Nombre_Centro LIKE 'BYD%'   THEN 'BYD'     WHEN Nombre_Centro LIKE 'bell%'  THEN 'BELL'     
			  WHEN Nombre_Centro LIKE 'BE-%'   THEN 'BELLPI'  WHEN Nombre_Centro LIKE 'FM-%'   THEN 'USC'
			  WHEN Nombre_Centro LIKE 'DAI.C%' THEN 'Daimler' WHEN Nombre_Centro LIKE 'DAi.C%' THEN 'Daimler' 
			  WHEN Nombre_Centro = 'Centro Digital'                                            THEN 'Digital'
			  WHEN Nombre_Centro LIKE 'JD%'    THEN 'John Deere'			  
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administración Central'  THEN 'ISRARIEGO'       
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion <> 'IR-Administracion Central'  THEN 'ISRARIEGO'
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion = 'IR-Administración Central'   THEN 'USC'       
			  WHEN Nombre_Centro LIKE 'IR%' AND Nombre_Seccion = 'IR-Administracion Central'   THEN 'USC' 
			  WHEN Nombre_Seccion = 'Taller Colisión Dai Av 68'                                THEN 'Colisión'   
			  WHEN Nombre_Seccion = 'Taller Colisión Dai PC Tierra Buena'                      THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Dai CV Tierra Buena'                      THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Puente Aranda'                            THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Anillo Víal 1'							   THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Dai Av 68'								   THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión CO-Bta-DAI AV 68'						   THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Dai PC Tierra Buena'					   THEN 'Colisión'
			  WHEN Nombre_Seccion = 'Taller Colisión Dai CV Tierra Buena'					   THEN 'Colisión'
			  WHEN a.Cod_seccion = 1128                                                        THEN 'Usados'
			  WHEN a.Cod_seccion = 1129                                                        THEN 'Usados' END 
			 FROM(
			 SELECT DISTINCT a.Cod_empresa, a.Nombre_Empresa, a.Cod_Centro, a.Nombre_Centro, a.Cod_seccion, a.Nombre_Seccion, a.Cod_Departamento, a.Nombre_Departamento
      		 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos a
			 WHERE a.Cod_seccion IS NOT NULL AND a.Nombre_Centro <> 'PA-Bta-AV 68 Panda' 
			 UNION ALL
 			 SELECT DISTINCT a.Cod_empresa, a.Nombre_Empresa, a.Cod_Centro, a.Nombre_Centro, a.Cod_seccion, a.Nombre_Seccion, a.Cod_Departamento, a.Nombre_Departamento
	         FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos a
			 WHERE a.Cod_seccion IS NOT NULL AND a.Nombre_Centro <> 'PA-Bta-AV 68 Panda' AND a.Nombre_Centro LIKE 'JD%'
             )a
             )b
			 LEFT JOIN (SELECT codEmp=CodEmpresa, codCent=CodCentro, codSec=CodSeccion, Sigla, Division, CodSedeAmbiental, SedeAmbiental, CodSedeDistCol, SedeDistribucionColision, UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion 
			 , codUN=CodUnidadNegocio, NombreUnidadNe=NombreUnidadNegocio, nomCent=NombreCentro, nomSec=NombreSeccion FROM [DBMLC_0190].dbo.UnidadDeNegocio) c ON c.CodEmp=b.Cod_empresa AND c.codCent=b.Cod_Centro AND b.Cod_seccion=c.CodSec 
			 LEFT JOIN (SELECT DISTINCT codsecc=CodSeccion, nomsec=nombreSeccion, coduni= CodUnidadNegocio, nomuni=NombreUnidadNegocio, sig=Sigla, divi=Division, codsedam=CodSedeAmbiental, sedeam=SedeAmbiental, codseddist=CodSedeDistCol
			 , sededistri=SedeDistribucionColision, unirequi= UnidadNegocio_Requisicion, nomunirequi= NombreUnidadNegocio_Requisicion FROM [DBMLC_0190].dbo.UnidadDeNegocio)d ON b.Cod_seccion=d.codsecc
)a
 WHERE Cod_Centro <> 186
```
