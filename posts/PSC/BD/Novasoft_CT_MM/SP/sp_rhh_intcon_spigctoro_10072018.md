# Stored Procedure: sp_rhh_intcon_spigctoro_10072018

## Usa los objetos:
- [[gen_terceros]]
- [[nom_inf_con]]
- [[rhh_emplea]]
- [[rhh_tbfondos]]

```sql




--	===========================================================================
--	PROCEDIMIENTO QUE GENERA LA INFORMACION CONTABLE A SPIGA
--	VICTOR OLEJO  MAYO 10 2016.
--  EXEC sp_rhh_intcon_spigctoro '800','0717CASATORO2Q','0717CASATORO2Q','20170731','20170731'
--	===========================================================================

CREATE PROCEDURE [dbo].[sp_rhh_intcon_spigctoro]
	@cod_sub	CHAR(5),
	@num_ini	CHAR(14),
	@num_fin	CHAR(14),
	@fch_ini	DATETIME,
	@fch_fin	DATETIME

--WITH ENCRYPTION
AS

IF  EXISTS (SELECT * FROM tempdb..sysobjects WHERE name like('#terceros%'))
 DROP TABLE [dbo].[#terceros]

SELECT DISTINCT Cod_ter,'                ' as Terceros_sap 
	INTO   #terceros
	FROM   nom_inf_con 

UPDATE		#terceros
	SET		Terceros_sap = ISNULL(E.cod_reloj,'SIN_CODIGO_SAP' )
	FROM	#terceros T
	INNER JOIN 	rhh_emplea E ON E.cod_emp = T.cod_ter	

UPDATE		#terceros
	SET		Terceros_sap = ISNULL(F.cod_SAP, 'SIN_CODIGO_SAP' )
	FROM	#terceros T
	INNER JOIN 	rhh_tbfondos F ON F.nit_ter = T.cod_ter	


--UPDATE		#terceros
--	SET		Terceros_sap = ISNULL(cod_ter, 'SIN_CODIGO_SAP' )
--	FROM	#terceros T
--	--WHERE	Terceros_sap  IS NULL OR Terceros_sap  =''
----	INNER JOIN gen_terceros G ON G.fax_ter = T.cod_ter

--/*DIEGO*/
--UPDATE		#terceros
--	SET		Terceros_sap = ISNULL(G.fax_ter, 'SIN_CODIGO_SAP' )
--	FROM	#terceros T
--	--WHERE	Terceros_sap  IS NULL OR Terceros_sap  =''
--	INNER JOIN gen_terceros G ON G.ter_nit = T.cod_ter
--	WHERE	Terceros_sap  IS NULL OR Terceros_sap  =''
--	SELECT * FROM #terceros WHERE cod_ter = '860034594'
--/*DIEGO*/
/*DIEGO*/
UPDATE		#terceros
	SET		Terceros_sap = ISNULL(G.fax_ter, 'SIN_CODIGO_SAP' )
	FROM	#terceros T
	--WHERE	Terceros_sap  IS NULL OR Terceros_sap  =''
	INNER JOIN gen_terceros G ON G.ter_nit = T.cod_ter
	WHERE	Terceros_sap  IS NULL OR Terceros_sap  ='' OR Terceros_sap  ='SIN_CODIGO_SAP'
--SELECT * FROM #terceros --where cod_ter = '0'

/*DIEGO*/	
   SELECT 
	'1' AS tip_arc,
	'1' AS tip_reg,
	'Fecha Asiento'AS  fch_liq,	
	'Tipo Asiento' AS Tipoasiento,
	'Concepto Asiento' AS Descripcion,
	'Tipo operacion' AS Tipo_operacion,
	'Cuenta' as Cuenta_contable,
	'Debe/Haber' AS Debe_Haber,
	'Importe' AS Valor,
	'Entidad' AS Cod_banco,
	'Tercero' AS Codigo_alterno,
	'Cuenta Bancaria' AS Cuenta,
	'Centro' AS COD_CL1,
	'Departamento' AS COD_CL2,
	'Seccion' AS COD_CL3,
	'Marca' AS COD_CL4,
	'Gama' AS Gama,
	'Mr' AS Mr,
	'Clasificacion 1' AS Clasificacion1,
	'Referencia' As Referencia,
	'Canal de venta' As Canal_venta,
     'Canal de compra' As Canal_compra,
     'Concepto Bancario' As Concepto_Bancario,
     'Moneda' As Moneda,
     'Factor de cambio' As Factor_cambio
--ION ALL
SELECT
	'1' AS tip_arc, 
	'2' AS tip_reg,
	--SUBSTRING(LTRIM(STR(DATEPART(YEAR,fch_doc))),3,4)+char(47)+RIGHT('00'+LTRIM(STR(DATEPART(MM,fch_doc))),2)+char(47)+RIGHT('00'+LTRIM(STR(DATEPART(DD,fch_doc))),2) as fch_liq,
	SUBSTRING(LTRIM(STR(DATEPART(YEAR,fch_doc))),1,4)+RIGHT('00'+LTRIM(STR(DATEPART(MM,fch_doc))),2)+RIGHT('00'+LTRIM(STR(DATEPART(DD,fch_doc))),2) as fch_liq,
	'NO' AS Tipoasiento,	
	--REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(left(rtrim(des_mov)+replicate(' ',30),30),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Descripcion,
	REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(left(rtrim(des_mov)+replicate(' ',30),30),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Descripcion,
	'4' As Tipo_operacion,
	cod_cta as Cuenta_contable,
	--CASE  WHEN SUBSTRING(COD_CTA,1,1) =  '1' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '2' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '3' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '4' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '5' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '6' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '7' AND DEB_MOV > 0 THEN 'D'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '1' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '2' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '3' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '4' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '5' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '6' AND CRE_MOV > 0 THEN 'H'
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '7' AND CRE_MOV > 0 THEN 'H'
	--END AS Debe_Haber,

	/*DIEGO*/
	CASE  WHEN DEB_MOV > 0 THEN 'D'
		  WHEN DEB_MOV < 0 THEN 'H'
		  WHEN CRE_MOV > 0 THEN 'H'
		  WHEN CRE_MOV < 0 THEN 'D'
	END AS Debe_Haber,
	/*DIEGO*/

	--CASE  WHEN SUBSTRING(COD_CTA,1,1) =  '1' THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)-ABS(cre_mov))) 
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '5' THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)-ABS(cre_mov)))
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '6' THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)-ABS(cre_mov)))
	--	  WHEN SUBSTRING(COD_CTA,1,1) =  '7' THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)-ABS(cre_mov)))
	--	  ELSE CONVERT(CHAR,CONVERT(DECIMAL(18,0),(ABS(cre_mov)-ABS(deb_mov))))
	--END   AS Valor ,

	/*DIEGO*/
	CASE WHEN deb_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)))
		 WHEN cre_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(cre_mov)))
	END   AS Valor ,
	/*DIEGO*/

	--ISNULL (E.cod_ban,'') AS  Cod_Banco ,
	'' As Cod_banco,
	Te.Terceros_sap As Codigo_alterno,  
	'' AS  Cuenta,
	--ISNULL (E.cta_ban ,'') AS  Cuenta,
	N.cod_cl1 AS cod_cl1,	
	N.cod_cl2 AS cod_cl2,	
	N.cod_cl3 AS cod_cl3,		
	N.cod_cl4 AS cod_cl4, 		
	'' AS Gama, 	
	'' AS MR, 	
	'' AS Clasificacion1,
	'' AS Referencia,
	'' AS Canal_venta,
	'' AS Canal_compra,
	'' AS Concepto_Bancario,
	'COP' AS Moneda,
	'' AS Factor_cambio
FROM NOM_INF_CON N
INNER JOIN #terceros Te  ON Te.cod_ter =N.cod_ter 
LEFT JOIN rhh_emplea E ON E.cod_emp = n.cod_ter  
WHERE sub_tip= @cod_sub
AND num_doc BETWEEN  @num_ini AND @num_fin
AND fch_doc BETWEEN @fch_ini AND @fch_fin

```
