# View: vw_GAC_UnidaNegocio_Facturas_Recibidas

## Usa los objetos:
- [[Empresas]]
- [[spiga_FacturasRecibidas]]
- [[Spiga_InformeFacturas]]
- [[UnidadDeNegocio]]

```sql

--DROP VIEW vw_UnidaNegocio_Facturas_Recibidas
CREATE VIEW [dbo].[vw_GAC_UnidaNegocio_Facturas_Recibidas] AS
SELECT pkfkempresas,NombreEmpresa, linea 
,CodUnidadNegocio, NombreUnidadNegocio
 
FROM(
	 SELECT DISTINCT c.pkfkempresas,c.linea  , e.NombreEmpresa
	 ,CodUnidadNegocio=CASE WHEN  d.CodUnidadNegocio IS NULL AND c.linea='JD' THEN 410 
	                        WHEN  d.CodUnidadNegocio IS NULL AND c.linea='FM' THEN 4 
							WHEN  d.CodUnidadNegocio IS NULL AND c.linea='USC'THEN 4 
							WHEN  d.CodUnidadNegocio IS NULL AND c.linea='DIG'THEN 418
							WHEN  d.CodUnidadNegocio IS NULL AND c.linea='RN' THEN 19 ELSE d.CodUnidadNegocio END 
	 ,NombreUnidadNegocio= CASE 
	                       WHEN d.NombreUnidadNegocio IS NULL AND c.linea='JD' THEN 'John Deere' 
						   WHEN d.NombreUnidadNegocio IS NULL AND c.linea='USC'THEN 'USC (Unidad de Servicios compartidos)'
						   WHEN d.NombreUnidadNegocio IS NULL AND c.linea='FM' THEN 'USC (Unidad de Servicios compartidos)'
						   WHEN d.NombreUnidadNegocio IS NULL AND c.linea='DIG'THEN 'CENTRO DIGITAL'
						   WHEN d.NombreUnidadNegocio IS NULL AND c.linea='RN'THEN 'Renault'
						   WHEN d.NombreUnidadNegocio ='USC (UNIDAD DE SERVICIOS COMPARTIDOS)'THEN 'USC (Unidad de Servicios compartidos)' ELSE d.NombreUnidadNegocio END
				 FROM(
						 SELECT DISTINCT  b.pkfkempresas 
						 ,linea= CASE WHEN b.nombre ='Centro Digital'           THEN 'DIG' 
 									 WHEN b.nombre LIKE 'BYD Bogotá Av. 68'     THEN 'BYD'
    								 WHEN b.nombre LIKE 'VO-B/manga-Cra 27'     THEN 'VO' 	  
									 WHEN b.nombre LIKE 'JD-%'                  THEN 'JD' 
									 WHEN b.nombre LIKE 'CasaToro JD Rental'    THEN 'JD' 
									 WHEN b.nombre LIKE 'Centro Consignaciones' THEN 'JD'
									 WHEN b.nombre LIKE 'bellpi'                THEN 'BELL' 
									 WHEN CHARINDEX('-', b.nombre) = 0          THEN b.nombre
									 ELSE LEFT(b.nombre, CHARINDEX('-',b.nombre) - 1)  END  
						 FROM [PSCService_DB].dbo.spiga_FacturasRecibidas b
						 UNION ALL
						 SELECT V.CodEmpresa
						 ,CASE 
						 WHEN V.Sigla LIKE 'JD%' THEN 'JD' ELSE V.Sigla END AS Sigla
						 FROM UnidadDeNegocio V
				 )c
    LEFT JOIN UnidadDeNegocio d ON d.CodEmpresa=c.pkfkempresas AND d.Sigla=C.linea
    LEFT JOIN [PSCService_DB].dbo.Spiga_InformeFacturas n on d.NombreCentro=n.NombreCentro and d.CodEmpresa=n.IdEmpresas
	INNER JOIN Empresas e ON c.pkfkempresas=e.CodigoEmpresa
 )a

 --select * from UnidadDeNegocio
 --where CodEmpresa=24

 --unidada de negocio BELLPI COD 23 SIGLA BELL

 --SELECT * FROM [PSCService_DB].dbo.spiga_FacturasRecibidas
 --WHERE nombre LIKE 'BELL%'

```
