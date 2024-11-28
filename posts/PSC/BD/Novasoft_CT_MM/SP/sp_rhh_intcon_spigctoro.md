# Stored Procedure: sp_rhh_intcon_spigctoro

## Usa los objetos:
- [[gen_terceros]]
- [[nom_inf_con]]
- [[rhh_emplea]]
- [[rhh_tbfondos]]

```sql

--	===========================================================================
--	PROCEDIMIENTO QUE GENERA LA INFORMACION CONTABLE A SPIGA
--	VICTOR OLEJO  MAYO 10 2016.
--  EXEC sp_rhh_intcon_spigctoro '800','CASATORO0618','CASATORO0618','20180630','20180630'
--	===========================================================================

CREATE PROCEDURE [dbo].[sp_rhh_intcon_spigctoro]
	@cod_sub	CHAR(5),
	@num_ini	CHAR(14),
	@num_fin	CHAR(14),
	@fch_ini	DATETIME,
	@fch_fin	DATETIME

--WITH ENCRYPTION
AS
BEGIN
		IF  EXISTS (SELECT * FROM tempdb..sysobjects WHERE name like('#terceros%'))
		 DROP TABLE [dbo].[#terceros];

		SELECT DISTINCT Cod_ter,'                ' as Terceros_sap 
			INTO   #terceros
			FROM   nom_inf_con ;

		UPDATE		#terceros
			SET		Terceros_sap = ISNULL(E.cod_reloj,'SIN_CODIGO_SAP' )
			FROM	#terceros T
			INNER JOIN 	rhh_emplea E ON E.cod_emp = T.cod_ter;

		UPDATE		#terceros
			SET		Terceros_sap = ISNULL(F.cod_SAP, 'SIN_CODIGO_SAP' )
			FROM	#terceros T
			INNER JOIN 	rhh_tbfondos F ON F.nit_ter = T.cod_ter	

		/*DIEGO*/
		UPDATE		#terceros
			SET		Terceros_sap = ISNULL(G.fax_ter, 'SIN_CODIGO_SAP' )
			FROM	#terceros T
			INNER JOIN gen_terceros G ON G.ter_nit = T.cod_ter
			WHERE	Terceros_sap  IS NULL OR Terceros_sap  ='' OR Terceros_sap  ='SIN_CODIGO_SAP'
		--SELECT * FROM #terceros --where cod_ter = '0'

		/******* ajmdlo 20201020 *******/

			UPDATE		#terceros
				SET		Terceros_sap = ISNULL(E.cod_reloj,'SIN_CODIGO_SAP' )
				FROM	#terceros T
				INNER JOIN 	rhh_emplea E ON E.num_ide = T.cod_ter;

		/*******************************/

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
			'Centro' AS COD_CCO,
			'Departamento' AS COD_CL2,
			'Seccion' AS COD_CL1,
			'Marca' AS COD_SUC,
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
			
			REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(left(rtrim(des_mov)+replicate(' ',30),30),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Descripcion,
			'4' As Tipo_operacion,
			cod_cta as Cuenta_contable,

			/*DIEGO*/
			CASE  WHEN DEB_MOV > 0 THEN 'D'
				  WHEN DEB_MOV < 0 THEN 'H'
				  WHEN CRE_MOV > 0 THEN 'H'
				  WHEN CRE_MOV < 0 THEN 'D'
			END AS Debe_Haber,
			/*DIEGO*/

			/*DIEGO*/
			CASE WHEN deb_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(deb_mov)))
				 WHEN cre_mov > 0 THEN CONVERT(CHAR,CONVERT(DECIMAL(18,0),ABS(cre_mov)))
			END   AS Valor ,
			/*DIEGO*/
			'' As Cod_banco,
			Te.Terceros_sap As Codigo_alterno,  
			'' AS  Cuenta,
			N.cod_cco AS cod_cco,	
			N.cod_cl2 AS cod_cl2,	
			N.cod_cl1 AS cod_cl1,		
			N.cod_suc AS cod_suc, 		
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
		--LEFT JOIN rhh_emplea E ON E.cod_emp = n.cod_ter  
		WHERE sub_tip= @cod_sub
		AND num_doc BETWEEN  @num_ini AND @num_fin
		AND fch_doc BETWEEN @fch_ini AND @fch_fin;
END
```
