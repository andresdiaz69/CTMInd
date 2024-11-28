# View: vw_Rechazo_Facturas_CorreoCliente

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVNFechaFactura]]
- [[ComisionesSpigaVOFechaFactura]]
- [[EmpleadosActivos]]
- [[Empresas]]
- [[spiga_FacturasCargosAdicionales]]
- [[spiga_Terceros]]
- [[spiga_TercerosCorreos]]
- [[UnidadDeNegocio]]
- [[vw_Empleados_Jefes]]

```sql


--DROP VIEW vw_Rechazo_Facturas_CorreoCliente
CREATE VIEW [dbo].[vw_Rechazo_Facturas_CorreoCliente] AS 
SELECT DISTINCT 
--ISNULL(ROW_NUMBER() OVER(ORDER BY (SELECT 1)), 0) Id, -- JCS: 2022/09/06 PARA PODERLO MAPEAR EN EL ENTITY
ISNULL(CAST(1 AS BIGINT), 0) AS Id, -- JCS: 2022/09/06 PARA QUE EL WCF NO FALLE
CodigoEmpresa, prefijoFactura, numeroFactura, anoFactura , Email	 
FROM(
	 SELECT prefijoFactura=serie, numeroFactura=numero, anoFactura=Ano_Periodo, h.Email, CodigoEmpresa 	   
	 FROM(
		  SELECT DISTINCT serie, numero=SUBSTRING(numero, CHARINDEX('\',numero) - LEN(numero) , LEN(numero))
		  , Ano_Periodo, Nitcliente, CodigoEmpresa		
		  FROM(
		  SELECT DISTINCT a.NumeroFactura, Ano_Periodo, Nitcliente 
		  , serie=  SUBSTRING(a.NumeroFactura, CHARINDEX('\', a.NumeroFactura ) - LEN(a.NumeroFactura) , LEN(a.NumeroFactura))
		  , numero= SUBSTRING(a.NumeroFactura, CHARINDEX('\', a.NumeroFactura ) + 1 , LEN(a.NumeroFactura)), CodigoEmpresa
		  FROM [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran a
		  WHERE Ano_Periodo >= 2022 AND CedulaVendedorRepuestos IS NOT NULL )a 
  ----------------------------------------------------------------------------------------------------------------------------------------------------
		UNION ALL 
			SELECT DISTINCT serie =SUBSTRING(serie, CHARINDEX('\',serie) - LEN(serie) , LEN(serie))
			, numero= SUBSTRING (num, CHARINDEX('\',num) + 1 , LEN(num) ), Ano_Periodo, Nitcliente, CodigoEmpresa 		
			FROM(
			SELECT DISTINCT b.NumeroFacturaTaller, Ano_Periodo, Nitcliente, CodigoEmpresa			 
			, serie= SUBSTRING(b.NumeroFacturaTaller, CHARINDEX('\', b.NumeroFacturaTaller ) + 1 , LEN(b.NumeroFacturaTaller)) 
			, num=SUBSTRING(b.NumeroFacturaTaller, CHARINDEX('\', b.NumeroFacturaTaller ) + 1 , LEN(b.NumeroFacturaTaller))		
            FROM [DBMLC_0190].dbo.ComisionesSpigaTallerPorOT b
			WHERE Ano_Periodo  >=  2022 AND CedulaVendedorRepuestos IS NOT NULL )b
	--------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
			SELECT DISTINCT serie, numeroFact=SUBSTRING(numero, CHARINDEX('/',numero) - LEN(numero) , LEN(numero))
			, Ano_Periodo, Nitcliente, CodigoEmpresa		
			FROM(
			SELECT DISTINCT c.NumeroFactura, Ano_Periodo, CodigoEmpresa
			, serie= SUBSTRING(c.NumeroFactura, CHARINDEX('/', c.NumeroFactura ) - LEN(c.NumeroFactura) , LEN(c.NumeroFactura)) 	
			, numero=  SUBSTRING(c.NumeroFactura, CHARINDEX('/', c.NumeroFactura ) + 1 , LEN(c.NumeroFactura)) , Nitcliente=Nit
			FROM [DBMLC_0190].dbo.ComisionesSpigaVNFechaFactura c
		    WHERE Ano_Periodo  >= 2022 AND CedulaVendedor IS NOT NULL )c
  --------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
			SELECT DISTINCT serie, numeroFact=SUBSTRING(numero, CHARINDEX('/',numero) - LEN(numero) , LEN(numero))
			, Ano_Periodo, Nitcliente, CodigoEmpresa
			FROM(
			SELECT DISTINCT d.NumeroFactura, Ano_Periodo, CodigoEmpresa, Nitcliente=Nit 
			, serie= SUBSTRING(d.NumeroFactura, CHARINDEX('/', d.NumeroFactura ) - LEN(d.NumeroFactura) , LEN(d.NumeroFactura)) 	
			, numero=  SUBSTRING(d.NumeroFactura, CHARINDEX('/', d.NumeroFactura ) + 1 , LEN(d.NumeroFactura)) 	
			FROM [DBMLC_0190].dbo.ComisionesSpigaVOFechaFactura d
		    WHERE Ano_Periodo  >= 2022 AND CedulaVendedor IS NOT NULL )d
  --------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
				SELECT DISTINCT SerieFactura, NumFactura, AñoFactura, Nitcliente, IdEmpresas			
				FROM(	
				SELECT DISTINCT SerieFactura, NumFactura , AñoFactura, Nitcliente=c.Documento, c.CodigoEmpleado, a.IdEmpresas
				FROM(				
					 SELECT DISTINCT a.SerieFactura, a.NumFactura, a.AñoFactura, IdEmpresas 
					 , Apellido1Empleado=LTRIM(RTRIM(Apellido1Empleado)) , Apellido2Empleado=LTRIM(RTRIM(Apellido2Empleado))
					 , nombre1= LTRIM(RTRIM(SUBSTRING(NombreEmpleado,(CHARINDEX(' ',NombreEmpleado)-len(NombreEmpleado)),len(NombreEmpleado)))) 
					 , nombre2=LTRIM(RTRIM(SUBSTRING(NombreEmpleado,(CHARINDEX(' ',NombreEmpleado)+1),len(NombreEmpleado))))
					 , seccion=CASE
					 WHEN a.Seccion='Vitrina  VO Puente Aranda'           THEN 'Vitrina VO Puente Aranda'           WHEN a.Seccion='Vitrina Mayorista Wirtgen'            THEN 'Vitrina Mayorista JD Wirtgen' 
					 WHEN a.Seccion='Vitrina VN Sogamoso DAI COM'         THEN 'Vitrina VN Cll80 Cota Dai CV'       WHEN a.Seccion='Vitrina VN Cll13 Bta. DAI COM'        THEN 'Vitrina VN Cll13 Bta. Dai CV'
					 WHEN a.Seccion='Vitrina VN Cll170 Bta. DAI COM'      THEN 'Vitrina VN Cll170 Bta. Dai CV'      WHEN a.Seccion='Vitrina VN Cll80 Cota DAI COM'        THEN 'Vitrina VN Cll80 Cota Dai CV' 
					 WHEN a.Seccion='Vitrina VO Dai Mirolindo Ibague VEH' THEN 'Vitrina VO Dai PC Mirolindo Ibague' WHEN a.Seccion='Vitrina VN Mirolindo Ibagué  DAI VEH' THEN 'Vitrina VN Mirolindo Ibagué Dai PC'
					 WHEN a.Seccion='Vitrina JD Construcción Yumbo'       THEN 'Vitrina JD Construcción Palmira'    WHEN a.Seccion='Vitrina VO JD Chía Yerbabuena'        THEN 'Vitrina VO JD Agrícola Chía Yerbabuena' 
					 WHEN a.Seccion='Vitrina VO DAI.C-Cota-Cll80'         THEN 'Vitrina VO DAI.C-Cota-Cll80 Dai CV' WHEN a.Seccion='Vitrina BDY Av 68.'                   THEN 'Vitrina BYD Av 68.' ELSE a.Seccion END				  
					 FROM [PSCService_DB].dbo.spiga_FacturasCargosAdicionales a 
					 WHERE a.Seccion <> 'Vitrina VN Cll170 Bta. MIT' AND a.Seccion <> 'Vitrina VO Carrera 50'  
					 AND AñoFactura >= 2022 )a 
					 LEFT JOIN [DBMLC_0190].dbo.UnidadDeNegocio b ON convert(varchar,LTRIM(RTRIM(a.Seccion)))= convert(varchar, b.NombreSeccion )
					 LEFT JOIN (SELECT DISTINCT nomb1= LTRIM(RTRIM(SUBSTRING(g.nombres,(CHARINDEX(' ',g.nombres)-len(g.nombres)),len(g.nombres))))
								, nomb2=LTRIM(RTRIM(SUBSTRING(g.nombres,(CHARINDEX(' ',g.nombres)+1),len(g.nombres))))
								, Apellido1=LTRIM(RTRIM(g.Apellido1)), Apellido2=LTRIM(RTRIM(g.Apellido2)), g.CodigoEmpleado, g.Documento
								FROM [DBMLC_0190].dbo.EmpleadosActivos g) c 
				     ON a.nombre1=c.nomb1 and a.nombre2=c.nomb2 and a.Apellido1Empleado=c.Apellido1 and a.Apellido2Empleado=c.Apellido2 
				 )b
				LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON b.CodigoEmpleado=e.docEmpleado	
				WHERE b.CodigoEmpleado IS NOT NULL AND Nitcliente IS NOT NULL )a
  ------------------------------------------------------------------------------------------------------------------------------------------------------
 	LEFT JOIN (SELECT codEmp=CodigoEmpresa, nomEmp=NombreEmpresa FROM [DBMLC_0190].dbo.Empresas )    f ON a.CodigoEmpresa=f.codEmp
	LEFT JOIN  (SELECT DISTINCT NifCif, email 
				FROM(SELECT PkTerceros, NifCif, b.email  
				FROM(SELECT DISTINCT PkTerceros, NifCif 
				FROM(SELECT orden=row_number() over (partition by nifcif order by fechamod desc), NifCif, PkTerceros 
				FROM [PSCService_DB].dbo.spiga_Terceros ) b 			    
				WHERE orden = 1 AND PkTerceros IS NOT NULL )a
				LEFT JOIN (SELECT DISTINCT PkFkTerceros, email 
				FROM( SELECT orden=row_number() over (partition by PkFkTerceros order by FechaMod desc), 
				PkFkTerceros,email FROM [PSCService_DB].dbo.spiga_TercerosCorreos		
				WHERE Principal = 1)a WHERE orden = 1 ) b ON a.PkTerceros=b.PkFkTerceros)b)h on a.Nitcliente=h.NifCif )b
--where prefijoFactura='DEP' AND  numeroFactura=1 
 --select   * from [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran a 
 --where NumeroFactura='DEP\1\2022'

```
