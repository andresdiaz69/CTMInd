# Stored Procedure: sp_Compliance

## Usa los objetos:
- [[extraeNumeros]]
- [[gen_tipide]]
- [[rhh_emplea]]
- [[rhh_tipcon]]
- [[spiga_ContabilidadMovimientos]]
- [[spiga_ContabilidadMovimientos]]
- [[spiga_Terceros]]

```sql
CREATE PROCEDURE [dbo].[sp_Compliance]
(
	@Empresa SMALLINT, 
	@Año SMALLINT,
	@Mes SMALLINT
)
AS
BEGIN
	-- =============================================
	-- Control de Cambios
	-- 2024|09|03 - ALEXIS - Ajuste en la estructura principal y cambio en el case que consulta a Novasoft.
	-- =============================================



	--DECLARE @Empresa SMALLINT, @Año SMALLINT, @Mes SMALLINT;
	--SET @empresa = 1;
	--SET @año = 2023;
	--SET @mes = 1;

	SET NOCOUNT ON;

	DECLARE @FechaHasta DATETIME;
	SET @Fechahasta = DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,DATEFROMPARTS ( @Año, @Mes, 1 ))+1,0));

	IF OBJECT_ID(N'tempdb.dbo.#TipoDocumento', N'U') IS NOT NULL
		DROP TABLE #TipoDocumento

	SELECT TipIde, TipoDoc
	INTO #TipoDocumento
	FROM
	(
		SELECT TipIde = 1, TipoDoc = 'CC'  
		UNION ALL SELECT TipIde = 2, TipoDoc = 'CE'  
		UNION ALL SELECT TipIde = 3, TipoDoc = 'TI' 
		UNION ALL SELECT TipIde = 5, TipoDoc = 'RC'
		UNION ALL SELECT TipIde = 6, TipoDoc = 'PA'  
		UNION ALL SELECT TipIde = 21, TipoDoc = 'INT'
		UNION ALL SELECT TipIde = 22, TipoDoc = 'CE' 
		UNION ALL SELECT TipIde = 24, TipoDoc = 'PEP'
		UNION ALL SELECT TipIde = 42, TipoDoc = 'INT' 
		UNION ALL SELECT TipIde = 47, TipoDoc = 'PEP' 
		UNION ALL SELECT TipIde = 50, TipoDoc = 'INT' 		
	) A
	   

	SELECT TipoDoc = CASE WHEN TipoDoc LIKE '%Invalid%' THEN 'NOM' 
						WHEN TipoDoc LIKE '%NoTiene%' THEN 'NOM'	
						ELSE TipoDoc END,
		Num = CASE WHEN TipoDoc LIKE '%Invalid%' THEN NombreTercero 
				WHEN TipoDoc LIKE '%NoTiene%' THEN NombreTercero 
				ELSE Num END,
		NombreTercero,
		@Fechahasta AS FechaHasta
	FROM
	(
		SELECT DISTINCT TipoDoc, Num, NombreTercero
		FROM 
		(
			SELECT DISTINCT  TipoDoc = CASE WHEN TipoDoc='NIT2'    THEN 'NIT' WHEN TipoDoc='NIT-DV1' THEN 'NIT'
											WHEN TipoDoc='NIT2'    THEN 'NIT' WHEN TipoDoc='NIT-DV1' THEN 'NIT'
											WHEN TipoDoc='NIT-DV2' THEN 'NIT' WHEN TipoDoc='NIT3'    THEN 'NIT'
											WHEN TipoDoc='CC-DV'  THEN 'CC'
											WHEN Tipodoc='CC-DV3' THEN 'NOM'
											ELSE TipoDoc END 
							, Num= CASE 
								   WHEN TipoDoc='CC-DV3'  THEN NombreTercero ELSE Num END
							, NombreTercero, NombreComercial
			FROM
			(
				SELECT DISTINCT NombreComercial, NombreTercero, TipoDoc, 
					num = CASE WHEN TipoDoc='NIT-DV1' THEN SUBSTRING( NumeroDoc, CHARINDEX('',NumeroDoc )+1, LEN(NumeroDoc )-1 ) 
							WHEN TipoDoc='NIT-DV2' THEN SUBSTRING( NumeroDoc, CHARINDEX('',NumeroDoc )+1, LEN(NumeroDoc )-1 ) 
							WHEN TipoDoc='NIT2'    THEN SUBSTRING( NumeroDoc, CHARINDEX('',NumeroDoc )+1, LEN(NumeroDoc )-1 )
							WHEN TipoDoc='NIT3'    THEN SUBSTRING( NumeroDoc, CHARINDEX('',NumeroDoc )+1, LEN(NumeroDoc )-1 )
							WHEN TipoDoc='CC-DV'   THEN SUBSTRING( NumeroDoc, CHARINDEX('',NumeroDoc )+1, LEN(NumeroDoc )-1 ) 
							ELSE NumeroDoc END
				FROM
				(
					SELECT DISTINCT NombreComercial, NombreTercero, NumeroDoc,
						---------CC-NO-VALIDAS---------
						TipoDoc= CASE 
							WHEN (TipoDoc= 'CC'  AND LEN(dbo.extraeNumeros(NumeroDoc)) = 10
									AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) 
									BETWEEN 1999999999 AND 3999999999)
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc))>= 12 AND 
									LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 1 AND 2)
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 1 AND 2)
								OR (TipoDoc= 'CC'  AND LEN(dbo.extraeNumeros(NumeroDoc))>= 12)				THEN 'CC-INVALIDA' 
				
							------CC-VALIDAS------
							WHEN (TipoDoc= 'CC'  AND LEN(dbo.extraeNumeros(NumeroDoc)) = 11)				
								OR (TipoDoc= 'CC'  AND LEN(dbo.extraeNumeros(NumeroDoc)) = 9)				
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 11)				THEN 'CC-DV'	    

							WHEN (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc))= 10
									AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc))< 8000000000)
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 3 AND 6)
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 7 AND 8)	THEN 'CC'		  
				
							--Documentos que no corresponden a un documento colombiano y no se pueden cargar al sistema
							WHEN (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) =  9 
									AND NombreComercial IS NULL AND NombreTercero IS NOT NULL 
									AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) < 800000000)
				
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) =  9 
									AND NombreComercial IS NULL AND NombreTercero IS NOT NULL 
									AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) > 800000000)		THEN 'CC-DV3'
				
							------NIT------
							WHEN (TipoDoc= 'NIT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 9)
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 9)			THEN 'NIT'

							WHEN TipoDoc= 'NIT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 10				THEN 'NIT2'

							WHEN (TipoDoc= 'NIT' AND LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 1 AND 8)
								OR (TipoDoc= 'NIT' AND LEN(dbo.extraeNumeros(NumeroDoc)) >= 11)			THEN 'NIT-INVALIDO'
				
							WHEN TipoDoc= 'NIT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 10 
								AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) 
								BETWEEN 8000000000 AND 9999000000 AND NombreComercial IS NOT NULL		THEN 'NIT-DV1'-- 10 Digitios
				
							WHEN (TipoDoc= 'RUT' AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) 
									BETWEEN 800000000  AND  999000000 AND NombreTercero IS NULL)
								OR (TipoDoc= 'RUT' AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) 
									BETWEEN 8000000000 AND 9999000000 AND NombreTercero IS NULL)				
								OR (TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc))=10
									AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc)) 
									BETWEEN 8000000000 AND 9999000000 AND NombreTercero IS NULL)		THEN 'NIT3'   -- 10 Digitios
				
							WHEN TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) = 10
								AND CONVERT(bigint,dbo.extraeNumeros(NumeroDoc))>=8000000000			THEN 'NIT-DV2' -- 10 Digitios 
				
							------CE------
							WHEN TipoDoc= 'CE'  AND LEN(dbo.extraeNumeros(NumeroDoc)) < 5 
									OR TipoDoc= 'CE'  AND LEN(dbo.extraeNumeros(NumeroDoc)) > 8			THEN 'CE-INVALIDA'
				
							------TI------
							WHEN TipoDoc= 'TI'  AND LEN(dbo.extraeNumeros(NumeroDoc))<> 10				THEN 'TI-INVALIDA'	
				
							------NOM------
							WHEN TipoDoc IN ('INT','PA')												THEN 'NOM'
								
							------PEP------
							WHEN TipoDoc= 'PEP'  AND LEN(dbo.extraeNumeros(NumeroDoc)) <> 15			THEN 'PEP-INVALIDA'	--NUEVO
							WHEN TipoDoc= 'RUT'  AND LEN(dbo.extraeNumeros(NumeroDoc)) =  15			THEN 'PEP'	        --NUEVO
				
							------RC------
							WHEN TipoDoc= 'RC'  AND LEN(dbo.extraeNumeros(NumeroDoc)) <> 10				THEN 'RC-INVALIDA'
		
							------ERRORES------
							WHEN TipoDoc= 'RUT' AND LEN(dbo.extraeNumeros(NumeroDoc)) BETWEEN 12 AND 14	THEN 'DOCUMENTO-INVALIDO'
							ELSE TipoDoc END 
					FROM
					(					   
						SELECT DISTINCT	NombreComercial,	NombreTercero,	TipoDoc, 
							NumeroDoc = CASE WHEN TipoDoc IN ('INT','PA') THEN NombreTercero 
											ELSE dbo.extraeNumeros(NumeroDoc) END 
						FROM
						(
							SELECT NumeroDoc = CONVERT(bigint,NumeroDoc),		NombreTercero,			NombreComercial--, Nombre
								,tamano=LEN(CONVERT(bigint,NumeroDoc)),			TipoDoc,				PkTerceros
							FROM
							(
 									SELECT NumeroDoc = dbo.extraeNumeros(numDocu),		NombreTercero,			NombreComercial--, Nombre
										,TipoDoc									,PkTerceros
									FROM 
									(
									SELECT numDocu=nifcif, NombreTercero, NombreComercial, PkTerceros, 
										TipoDoc = CASE WHEN FkDocumentacionTipos = 1 THEN 'NIT' 
													WHEN FkDocumentacionTipos = 2 THEN 'CC' 
													WHEN FkDocumentacionTipos = 5 THEN 'RUT' 
													WHEN FkDocumentacionTipos = 6 THEN 'TI'
													WHEN FkDocumentacionTipos = 3 THEN 'INT' 
													WHEN FkDocumentacionTipos = 4 THEN 'PA' 
													WHEN FkDocumentacionTipos = 7 THEN 'CE' 
													ELSE 'NoTiene' END
									FROM (
											SELECT orden = ROW_NUMBER() OVER (PARTITION BY nifcif ORDER BY fechamod DESC), 
											nifcif,			PkTerceros,			FechaAlta,			NombreComercial, 
											NombreTercero = 
												CASE WHEN Apellido2 IS NULL AND Apellido1 IS NULL THEN Nombre 
													WHEN Apellido2 IS NULL THEN Nombre+' '+Apellido1
													ELSE Nombre+' '+Apellido1+' '+Apellido2 END,
											FkDocumentacionTipos
 											FROM [PSCService_DB].dbo.spiga_Terceros 
											--where nifcif= '444444920'
									) a  
									WHERE orden=1
									--and  NifCif = '444444920'
								)a  

								JOIN 
								(
									--Facturas entregadas
									SELECT DISTINCT CodigoTercero 
									FROM [PSCService_DB].dbo.spiga_ContabilidadMovimientos 
									WHERE TipoFactura='E' 
										--AND FechaAsiento BETWEEN '20230101' AND '20230131' ?
										AND IdEmpresas = @Empresa
										AND Ano_Periodo= @Año
										AND Mes_Periodo= @Mes
									GROUP BY CodigoTercero

								
									UNION ALL
								
									--Facturas recibidas
									SELECT DISTINCT CodigoTercero 
									FROM [PSCService_DB]..spiga_ContabilidadMovimientos 
									WHERE TipoFactura='R' 
										--AND FechaAsiento BETWEEN '20230101' AND '20230131' ?
										AND IdEmpresas = @Empresa
										AND Ano_Periodo= @Año
										AND Mes_Periodo= @mes
									GROUP BY CodigoTercero		 
 								) b ON Codigotercero = PkTerceros					
							)c 
						)d
					 
						UNION ALL 	 

						--Empleados
						SELECT DISTINCT Nombres, Nombres, TipoDoc, NumeroDoc = cedula
							--WHEN TipoDoc IN ('INT','PA') THEN Nombres ELSE cedula END
						FROM
						(
							SELECT cedula = e.cod_emp,	
								Nombres = e.nom_emp + ' ' +e.ap1_emp + ' ' + e.ap2_emp,
								TipoDoc = CASE WHEN Doc.TipIde IS NOT NULL THEN DOC.TipoDoc ELSE 'NoTiene' END
							FROM        [Novasoft_CT_MM].dbo.rhh_emplea e 
							LEFT JOIN	[Novasoft_CT_MM].dbo.gen_tipide i ON e.tip_ide = i.cod_tip 
							LEFT JOIN	[Novasoft_CT_MM].dbo.rhh_tipcon t ON e.tip_con = t .tip_con
							LEFT JOIN	#TipoDocumento AS Doc ON Doc.TipIde = e.tip_ide 
							WHERE  e.cod_emp <> '0' 
								and (e.fec_egr IS NULL OR e.fec_egr > @FechaHasta) 
								and e.cod_cia = @Empresa
						)a   
					)e
				)a
			)c
		)d
		WHERE Num  <> '0'
		and Num not like '%CUANTIAS MENORES%'
		and NombreTercero not like '%GASTOS%'
		--AND TipoDoc = 'NIT'  --14498
	)e
END

```
