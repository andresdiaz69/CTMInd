# Stored Procedure: usr_sp_rhh_intcon_spigctoro

## Usa los objetos:
- [[gen_terceros]]
- [[rhh_emplea]]
- [[rhh_intconta_detalle]]
- [[rhh_tbfondos]]
- [[usr_rhh_concetes]]

```sql

--	===========================================================================
--	PROCEDIMIENTO QUE GENERA LA INFORMACION CONTABLE A SPIGA
--	VICTOR OLEJO  MAYO 10 2016.
--  EXEC sp_rhh_intcon_spigctoro '800','CTN10201','CTN10201','20201001','20201015'
--	===========================================================================

CREATE PROCEDURE [dbo].[usr_sp_rhh_intcon_spigctoro]
	@cod_sub	CHAR(5),
	@num_ini	CHAR(14),
	@num_fin	CHAR(14),
	@fch_ini	DATETIME,
	@fch_fin	DATETIME

--WITH ENCRYPTION
AS
BEGIN
	declare @Suma MONEY;

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	SELECT DISTINCT Cod_ter,'                ' as Terceros_sap 
		INTO   #tercerosT
		FROM   rhh_intconta_detalle; 

	UPDATE		#tercerosT
		SET		Terceros_sap = ISNULL(E.cod_reloj,'SIN_CODIGO_SAP' )
		FROM	#tercerosT T
		INNER JOIN 	rhh_emplea E ON E.cod_emp = T.cod_ter;	

	UPDATE		#tercerosT
		SET		Terceros_sap = ISNULL(F.cod_SAP, 'SIN_CODIGO_SAP' )
		FROM	#tercerosT T
		INNER JOIN 	rhh_tbfondos F ON F.nit_ter = T.cod_ter;	

	/*DIEGO*/
	UPDATE		#tercerosT
		SET		Terceros_sap = ISNULL(G.fax_ter, 'SIN_CODIGO_SAP' )
		FROM	#tercerosT T
		INNER JOIN gen_terceros G ON G.ter_nit = T.cod_ter
		WHERE	Terceros_sap  IS NULL OR Terceros_sap  ='' OR Terceros_sap  ='SIN_CODIGO_SAP'


	/******* ajmdlo 20201020 *******/

	UPDATE		#tercerosT
		SET		Terceros_sap = ISNULL(E.cod_reloj,'SIN_CODIGO_SAP' )
		FROM	#tercerosT T
		INNER JOIN 	rhh_emplea E ON E.num_ide = T.cod_ter;

	/*******************************/

PRINT 'AQUI'
	
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
		
		SUBSTRING(LTRIM(STR(DATEPART(YEAR,fch_doc))),1,4)+RIGHT('00'+LTRIM(STR(DATEPART(MM,fch_doc))),2)+RIGHT('00'+LTRIM(STR(DATEPART(DD,fch_doc))),2) as fch_liq,
		'NO' AS Tipoasiento,	
		
		REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(left(rtrim(des_con)+replicate(' ',30),30),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Descripcion,
		'4' As Tipo_operacion,
		N.cod_cue as Cuenta_contable,
		

		/*DIEGO*/
		CASE  WHEN DEB_MOV > 0 THEN 'D'
			  WHEN DEB_MOV < 0 THEN 'D'
			  WHEN CRE_MOV > 0 THEN 'D'
			  WHEN CRE_MOV < 0 THEN 'D'
		END AS Debe_Haber,
		/*DIEGO*/

		/*DIEGO*/
		CASE WHEN deb_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)))
			 WHEN cre_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(cre_mov)))
		--sum (n.cre_mov) as valor,
		END   AS Valor ,
		/*DIEGO*/

		'   ' As Cod_banco,
		Te.Terceros_sap As Codigo_alterno,  
		'           ' AS  Cuenta,
	
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
		INTO #SELEC22
	FROM rhh_intconta_detalle N 
	INNER JOIN #tercerosT Te  ON Te.cod_ter =N.cod_ter 
	--LEFT JOIN rhh_emplea E ON E.cod_emp = N.cod_TER 
	
	WHERE sub_tip= @cod_sub
	AND num_doc BETWEEN  @num_ini AND @num_fin
	AND fch_doc BETWEEN @fch_ini AND @fch_fin
	AND N.cod_con in (SELECT distinct cod_con FROM usr_rhh_concetes)

	
	SELECT @Suma = sum (CONVERT(INT,CONVERT(DECIMAL(18,0),ABS(valor)))) From #SELEC22
--SELECT * FROM #SELEC22 	
	INSERT INTO #SELEC22 VALUES (
		  1,2,SUBSTRING(LTRIM(STR(DATEPART(YEAR,GETDATE()))),1,4)+RIGHT('00'+LTRIM(STR(DATEPART(MM,GETDATE()))),2)+RIGHT('00'+LTRIM(STR(DATEPART(DD,GETDATE()))),2),
		'NO','Pago Terceros Nomina','4','1110050505','H',CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(@Suma))),'007','19352','04329124569','7','CO','208','0','','','','','','','','COP','')


	SELECT * FROM #SELEC22;
	
END
```
