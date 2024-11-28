# View: vw_Act_centros_sincr_estrucCyTC

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[Tramite_Ciudades]]

```sql
--DROP VIEW vw_Act_centros_sincr_estrucCyTC
CREATE VIEW vw_Act_centros_sincr_estrucCyTC AS 
SELECT Cod_empresa, Cod_Centro, Nombre_Centro, ciudad, departamento, codCiudad
FROM(
	 SELECT DISTINCT Cod_empresa, Cod_Centro, Nombre_Centro, ciudad, e.departamento, e.codCiudad
	 FROM(		
		  SELECT Cod_empresa, Cod_Centro
		  , Nombre_Centro
		  , ciudad = CASE 
			 WHEN c.nom3='Bta' OR c.nom3='Btá' OR c.nom3='Bta.' OR c.nom3='Bon' OR c.nom3='Bta CT'
			 OR Nombre_Centro='bellpi' OR Nombre_Centro LIKE 'BN-Bta%' OR Nombre_Centro LIKE 'Bogotá%'
			 OR Nombre_Centro like '%Bta%'              THEN 'BOGOTA' 
			 WHEN c.nom3 LIKE '%B/MANGA%'                      THEN 'BUCARAMANGA'   WHEN c.nom3 LIKE '%B/QUILLA%'                         THEN 'BARRANQUILLA'
			 WHEN Nombre_Centro LIKE '%Centro Consignaciones%' THEN 'BOGOTA'        WHEN Nombre_Centro='Centro Digital'                   THEN 'BOGOTA'	
			 WHEN Nombre_Centro LIKE '%Dai.V Btá-Calle 72%'    THEN 'BOGOTA'        WHEN Nombre_Centro like '%Cali%'                      THEN 'CALI'
			 WHEN Nombre_Centro LIKE '%Administraci%'          THEN 'BOGOTA'        WHEN Nombre_Centro='JD-Ruta 40'                       THEN 'CALI'
			 WHEN c.nom3 LIKE '%Chia%' OR c.nom3 LIKE '%Chía%' THEN 'CHIA'          WHEN c.nom3 LIKE '%Ibague%' OR c.nom3 LIKE '%Ibagué%' THEN 'IBAGUE' 
			 WHEN c.nom3 LIKE '%Villavo%'                      THEN 'VILLAVICENCIO' WHEN c.nom3 LIKE '%Per%'                              THEN 'PEREIRA'			 
			 WHEN (SELECT descripcion FROM [DBMLC_0190].dbo.Tramite_Ciudades WHERE c.nom3=
			 REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(UPPER(descripcion),'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')) IS NULL THEN 'BOGOTA'
			 ELSE REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(UPPER(nom3),'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')
			 END
		  FROM(		
			   SELECT Nombre_Centro, Cod_empresa, Cod_Centro
			   , nom3=SUBSTRING(nom2, 1 ,
			   CASE WHEN CHARINDEX('-', nom2)-1 < 0
			   THEN LEN(nom2) ELSE CHARINDEX('-', nom2)-1 END )
			   FROM(
					SELECT Cod_empresa, a.Cod_Centro, a.Nombre_Centro, nom ,nom2= SUBSTRING(RTRIM(LTRIM(nom)) , (CHARINDEX('-',RTRIM(LTRIM(nom)))+1) , LEN(RTRIM(LTRIM(nom))) ) 
					FROM(  
						 SELECT DISTINCT a.Nombre_Centro, a.Cod_empresa, a.Cod_Centro
						 , nom= SUBSTRING(a.Nombre_Centro, 1 , 
						 CASE WHEN CHARINDEX(' ', a.Nombre_Centro)-1 < 0
						 THEN LEN(a.Nombre_Centro) ELSE CHARINDEX(' ', a.Nombre_Centro)-1 END)		       
						 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos a 
					  )a
				  )b
			  )c
		  )d
	 LEFT JOIN (SELECT Idciudad, codCiudad=Ciudad, descripcion, departamento FROM [DBMLC_0190].dbo.Tramite_Ciudades) e ON d.ciudad=
	 REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(e.descripcion,'Á','A'),'É','E'),'Í','I'),'Ó','O'),'Ú','U')
 )e
 --where Cod_Centro in ( 185, 186)
```
