# View: vw_Rechazo_Facturas_Emitidas

## Usa los objetos:
- [[ComisionesSpigaAlmacenAlbaran]]
- [[ComisionesSpigaTallerPorOT]]
- [[ComisionesSpigaVNFechaFactura]]
- [[ComisionesSpigaVOFechaFactura]]
- [[EmpleadosActivos]]
- [[Empresas]]
- [[spiga_FacturasCargosAdicionales]]
- [[UnidadDeNegocio]]
- [[vw_Empleados_Jefes]]

```sql
--DROP VIEW vw_Rechazo_Facturas_Emitidas
CREATE VIEW [dbo].[vw_Rechazo_Facturas_Emitidas] AS 
SELECT DISTINCT 
--ISNULL(ROW_NUMBER() OVER(ORDER BY (SELECT 1)), 0) Id, -- JCS: 2022/09/06 PARA PODERLO MAPEAR EN EL ENTITY
ISNULL(CAST(1 AS BIGINT), 0) AS Id, -- JCS: 2022/09/06 PARA QUE EL WCF NO FALLE
prefijoFactura, numeroFactura, anoFactura, codigoCompania, compania, CodigoCentro, centro, FechaFactura, nombreVendedor, 

correoVendedor = case when  (correoVendedor like '%@casatoro%' or correoVendedor like '%@motorysa%' or correoVendedor like '%@bonaparte%' or correoVendedor like '%@fomenta%' 
or correoVendedor like '%@bellpi%' or correoVendedor like '%@usc%' or correoVendedor like '%@nebula%' or correoVendedor like '%inverinmobiliariassas%' or correoVendedor like '%@panda%')
then correoVendedor else NULL end,

nombreJefevendedor, 

correojefevendedor =
case when correojefevendedor like '%@casatoro%' or correojefevendedor like '%@motorysa%' or correojefevendedor like '%@bonaparte%' or correojefevendedor like '%@fomenta%' 
or correojefevendedor like '%@bellpi%' or correojefevendedor like '%@usc%' or correojefevendedor like '%@nebula%' or correojefevendedor like '%inverinmobiliariassas%'
or correojefevendedor like '%@panda%' then correojefevendedor else NULL end

FROM(
	 SELECT prefijoFactura=serie, numeroFactura=numero, anoFactura=Ano_Periodo, codigoCompania=CodigoEmpresa, compania=f.nomEmp, CodigoCentro, centro=g.nomCent
		   , FechaFactura=FechaFactura, nombreVendedor=NombreVendedorRepuestos, correoVendedor=correoEmpleado, nombreJefevendedor=nombreJefe, correojefevendedor=correoJefe
	 FROM(
			SELECT DISTINCT serie, numero=SUBSTRING(numero, CHARINDEX('\',numero) - LEN(numero) , LEN(numero))
			, Ano_Periodo, CodigoEmpresa 
			, CodigoCentro, FechaFactura, CedulaVendedorRepuestos, NombreVendedorRepuestos, e.correoEmpleado, e.nombreJefe, e.correoJefe
			FROM(
			SELECT DISTINCT a.NumeroFactura, Ano_Periodo, CodigoEmpresa
			, serie=  SUBSTRING(a.NumeroFactura, CHARINDEX('\', a.NumeroFactura ) - LEN(a.NumeroFactura) , LEN(a.NumeroFactura))
			, numero= SUBSTRING(a.NumeroFactura, CHARINDEX('\', a.NumeroFactura ) + 1 , LEN(a.NumeroFactura)) 
			, CodigoCentro, FechaFactura, CedulaVendedorRepuestos, NombreVendedorRepuestos
			FROM [DBMLC_0190].dbo.ComisionesSpigaAlmacenAlbaran a
			WHERE 
			Ano_Periodo >= 2022 
			AND 
			CedulaVendedorRepuestos IS NOT NULL
			 )a
			 LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON a.CedulaVendedorRepuestos=e.docEmpleado 
  ----------------------------------------------------------------------------------------------------------------------------------------------------
		UNION ALL 
			SELECT DISTINCT serie =SUBSTRING(serie, CHARINDEX('\',serie) - LEN(serie) , LEN(serie))
			, numero= SUBSTRING (num, CHARINDEX('\',num) + 1 , LEN(num) )
			, Ano_Periodo, CodigoEmpresa
			, CodigoCentro, FechaFactura, CedulaVendedorRepuestos=CedulaAsesorServicioResponsable, 
			NombreVendedorRepuestos=AsesorServicioResponsable, e.correoEmpleado, e.nombreJefe, e.correoJefe
			FROM(
			SELECT DISTINCT b.NumeroFacturaTaller, Ano_Periodo, CodigoEmpresa
			, serie= SUBSTRING(b.NumeroFacturaTaller, CHARINDEX('\', b.NumeroFacturaTaller ) + 1 , LEN(b.NumeroFacturaTaller)) 
			, num=SUBSTRING(b.NumeroFacturaTaller, CHARINDEX('\', b.NumeroFacturaTaller ) + 1 , LEN(b.NumeroFacturaTaller))
			, CodigoCentro, FechaFactura, CedulaAsesorServicioResponsable, AsesorServicioResponsable
			FROM [DBMLC_0190].dbo.ComisionesSpigaTallerPorOT b
			WHERE Ano_Periodo  >=  2022 
			and CedulaAsesorServicioResponsable IS NOT NULL
			--and b.NumeroFacturaTaller like '%T051%'
			--and b.NumeroFacturaTaller like '%102445%'
			)b
			LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON b.CedulaAsesorServicioResponsable=e.docEmpleado
	----------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
			SELECT DISTINCT serie, numeroFact=SUBSTRING(numero, CHARINDEX('/',numero) - LEN(numero) , LEN(numero))
			, Ano_Periodo, CodigoEmpresa
			, CodigoCentro, FechaFactura, CedulaVendedor , NombreVendedor, e.correoEmpleado, e.nombreJefe, e.correoJefe
			FROM(
			SELECT DISTINCT c.NumeroFactura, Ano_Periodo, CodigoEmpresa
			, serie= SUBSTRING(c.NumeroFactura, CHARINDEX('/', c.NumeroFactura ) - LEN(c.NumeroFactura) , LEN(c.NumeroFactura)) 	
			, numero=  SUBSTRING(c.NumeroFactura, CHARINDEX('/', c.NumeroFactura ) + 1 , LEN(c.NumeroFactura)) 
			, CodigoCentro, FechaFactura, CedulaVendedor, NombreVendedor 
			FROM [DBMLC_0190].dbo.ComisionesSpigaVNFechaFactura c
		    WHERE 
			Ano_Periodo  >= 2022 
			AND 
			CedulaVendedor IS NOT NULL
			)c
			LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON c.CedulaVendedor=e.docEmpleado
  ----------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
			SELECT DISTINCT serie, numeroFact=SUBSTRING(numero, CHARINDEX('/',numero) - LEN(numero) , LEN(numero))
			, Ano_Periodo, CodigoEmpresa
			, CodigoCentro, FechaFactura, CedulaVendedor , NombreVendedor, e.correoEmpleado, e.nombreJefe, e.correoJefe
			FROM(
			SELECT DISTINCT d.NumeroFactura, Ano_Periodo, CodigoEmpresa
			, serie= SUBSTRING(d.NumeroFactura, CHARINDEX('/', d.NumeroFactura ) - LEN(d.NumeroFactura) , LEN(d.NumeroFactura)) 	
			, numero=  SUBSTRING(d.NumeroFactura, CHARINDEX('/', d.NumeroFactura ) + 1 , LEN(d.NumeroFactura)) 
			, CodigoCentro, FechaFactura, CedulaVendedor, NombreVendedor 
			FROM [DBMLC_0190].dbo.ComisionesSpigaVOFechaFactura d
		    WHERE 
			Ano_Periodo  >= 2022 
			AND
			CedulaVendedor IS NOT NULL
			)d
			LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON d.CedulaVendedor=e.docEmpleado
  ----------------------------------------------------------------------------------------------------------------------------------------------------
		 UNION ALL 
				SELECT DISTINCT SerieFactura, NumFactura , AñoFactura, IdEmpresas, CodCentro, FechaFactura, CodigoEmpleado, nom, e.correoEmpleado, e.nombreJefe, e.correoJefe
				FROM(	
				SELECT DISTINCT SerieFactura, NumFactura , AñoFactura, a.IdEmpresas, b.CodCentro, FechaFactura, c.CodigoEmpleado
				, nom= a.nombre1+' '+a.nombre2+' '+a.Apellido1Empleado+' '+a.Apellido2Empleado, f.NombreEmpresa, b.NombreCentro
				FROM(				
					 SELECT DISTINCT a.SerieFactura , a.NumFactura, a.AñoFactura, IdEmpresas, FechaFactura 
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
					 AND AñoFactura >= 2022  
					 )a 
					 LEFT JOIN [DBMLC_0190].dbo.UnidadDeNegocio b ON convert(varchar,LTRIM(RTRIM(a.Seccion)))= convert(varchar, b.NombreSeccion )
					 LEFT JOIN [DBMLC_0190].dbo.Empresas        f ON a.IdEmpresas=f.CodigoEmpresa
					 LEFT JOIN (SELECT DISTINCT nomb1= LTRIM(RTRIM(SUBSTRING(g.nombres,(CHARINDEX(' ',g.nombres)-len(g.nombres)),len(g.nombres))))
								 , nomb2=LTRIM(RTRIM(SUBSTRING(g.nombres,(CHARINDEX(' ',g.nombres)+1),len(g.nombres))))
								 , Apellido1=LTRIM(RTRIM(g.Apellido1))
								 , Apellido2=LTRIM(RTRIM(g.Apellido2))
								 , g.CodigoEmpleado
								 FROM [DBMLC_0190].dbo.EmpleadosActivos g) c 
						 ON a.nombre1=c.nomb1 and a.nombre2=c.nomb2 and a.Apellido1Empleado=c.Apellido1 and a.Apellido2Empleado=c.Apellido2 
				 )b
				LEFT JOIN [DBMLC_0190].dbo.vw_Empleados_Jefes e ON b.CodigoEmpleado=e.docEmpleado	
				WHERE b.CodigoEmpleado IS NOT NULL
  ----------------------------------------------------------------------------------------------------------------------------------------------------
	  )a	
	LEFT JOIN (SELECT codEmp=CodigoEmpresa, nomEmp=NombreEmpresa FROM [DBMLC_0190].dbo.Empresas )    f ON a.CodigoEmpresa=f.codEmp
	LEFT JOIN (SELECT codCent=CodCentro, nomCent=NombreCentro FROM [DBMLC_0190].dbo.UnidadDeNegocio) g ON a.CodigoCentro=g.codCent
 )b
--WHERE YEAR(FechaFactura)=2024
--and month(FechaFactura)=1
--prefijoFactura='R002' 
--AND numeroFactura like'%105814%'

```
