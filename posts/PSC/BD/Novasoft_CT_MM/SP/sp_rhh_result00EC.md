# Stored Procedure: sp_rhh_result00EC

## Usa los objetos:
- [[RHH_LIQHIS]]
- [[rhh_liqmes]]
- [[rhh_tipcon]]
- [[Sp_rhh_LiqCte]]
- [[v_rhh_concep]]

```sql
CREATE Procedure [dbo].[sp_rhh_result00EC]
	@nPorcentaje	FLOAT,
	@cIndicador	VARCHAR(15),
	@Cod_Emp 	CHAR(12),
	@nCodCont	INT	,	/*Codigo Contrato*/	
	@fFec_liq	DATETIME,
	@fFec_cte	DATETIME,
	@tip_liq	CHAR(2),
	@cod_con	CHAR(6),
	@tip_nom	Smallint,
	@nfactor	money = 1,
	@nInd_Para	bit = 0 /*1 para parafiscal y 0 para provision*/
 
As

DECLARE @cCadena	VARCHAR(350)
DECLARE @cCad2  	VARCHAR(350)
DECLARE @nValorAux	MONEY
DECLARE @nNat_con	SMALLINT
DECLARE	@nResultado	MONEY
DECLARE	@nResult1	MONEY
DECLARE	@nResult2	MONEY
DECLARE @nAno		SMALLINT
DECLARE @nPer		SMALLINT
DECLARE @MESH		CHAR(2)
DECLARE @ANOH		CHAR(4)
DECLARE @TOT_NOM	MONEY
DECLARE @ind_para	BIT
DECLARE @tip_con	CHAR(2)
DECLARE @ModLiq		CHAR(2)
DECLARE @dia_vac 	NUMERIC  
DECLARE @nPorcVac   DECIMAL(4,2)
DECLARE @cCodcon	CHAR(6)
DECLARE @nDiaPara	TINYINT
DECLARE @nSalBas	MONEY
DECLARE @apl_con	SMALLINT /*Aplicación del conpeto*/
DECLARE	@nResulHis	MONEY	/*El valor del concepto en la primera quincena*/
DECLARE @SQLString	NVARCHAR(500);
DECLARE @ParmDefinition NVARCHAR(500);
DECLARE	@LiqVac		BIT;
DECLARE	@fec_ing	DATETIME
DECLARE @ind_pag_fdr	BIT
DECLARE @dias	NUMERIC	
DECLARE @nDiaParaHis	SMALLINT;
DECLARE @nBaseProvHis	MONEY;

	
SET NOCOUNT ON
SET ROWCOUNT 0

IF @fFec_liq < '20090801' AND @cod_con IN ('004000','004001')
	RETURN
IF @fFec_liq > '20090731' AND @cod_con IN ('002965')
	RETURN


SELECT @nResultado= 0

SELECT	@tip_con = tip_con, @ModLiq = mod_liq, 
		@dia_vac = dia_vac, @nSalBas = sal_bas,
		@Ind_pag_fdr = ind_pag_fdr_EC, @fec_ing = fec_ing
FROM	#t_rhh_emplea 
WHERE	cod_emp = @Cod_Emp AND cod_cont =@nCodCont;


SELECT	@LiqVac = liq_vac 
FROM	rhh_tipcon 
WHERE	tip_con = @tip_con



SELECT @dias = DATEDIFF(DAY,@Fec_ing, @fFec_liq)--+1

IF @nInd_Para = 0 AND @LiqVac = 0 OR (@cod_con IN ('004000','004001') AND @dias <365 ) OR
   (@ind_pag_fdr = 1 AND @cod_con ='004001')
BEGIN
	IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
		SELECT 'Cantidad' = 0, 'Resultado'= 0
	ELSE
		EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cod_con, @Cantidad = 0, @Resultado = 0

	RETURN
END

SELECT @ind_para = 1 


/* ENE-06-2000 JIC. J&J ARREGLO QUE VERIFICA SI SE ESTA LIQUIDANDO CONTRATO Y EN ESE MISMO 
	MES YA TIENE LIQUIDACION DE NOMINA => NO LE PAGA SUELDO DE NUEVO
*/
IF @Tip_liq = '04'
BEGIN
	SELECT	@TOT_NOM= SUM(VAL_LIQ) 
	FROM	RHH_LIQHIS 
	WHERE	COD_EMP = @Cod_Emp AND FEC_LIQ = @fFec_liq AND 
			COD_CON = @Cod_con AND TIP_LIQ = '01' AND cod_cont =@nCodCont;
			
	IF @TOT_NOM <> NULL AND @TOT_NOM > 0
	  BEGIN
	   	PRINT 'EL EMPLEADO YA TIENE LIQUIDACION DE NOMINA'
		IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
			SELECT 'Cantidad' = 0, 'Resultado'= 0
		ELSE
			EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cod_con, @Cantidad = 0, @Resultado = 0
		return (0)	
	  END
END

/********************** Calcula en LIQMES Y T_RESULTADO *****************************/

SELECT @nAno = YEAR(@fFec_cte)
SELECT @nPer = MONTH(@fFec_cte)
SELECT @MESH = RIGHT ('00' + RTRIM(CONVERT(CHAR(2),@nPer)), 2)
SELECT @ANOH = CONVERT(CHAR(4), @nAno)
SET @nResult1 = 0;
SET @nResult2 = 0;
--SET @nResult3 = 0;
--SET @nResult4 = 0;
/*
@apl_con: 1 Primera Q, 2 Segunda Q, 3 Ambas Q
*/
SELECT	@apl_con = apl_con 
FROM	v_rhh_concep V
WHERE	cod_con = @cod_con 
		AND mod_liq = (	SELECT	MAX(mod_liq) 
						FROM	v_rhh_concep M
						WHERE	M.cod_con = V.cod_con 
								AND (M.mod_liq = '0' OR M.mod_liq = @ModLiq ))

/*
No se miran Históricos si el concepto aplica en ambas quincenas y se está liquidando contrato
*/
IF @Tip_liq <> '16'
BEGIN
	SELECT	@nDiaPara = ISNULL(SUM(can_liq),0), @nResulHis = SUM(val_liq) 
	FROM	rhh_liqhis 
	WHERE	cod_emp = @Cod_Emp 
			AND cod_con = @cod_con AND cod_cont = @nCodCont 
			AND MONTH(fec_cte) = @nPer
			AND YEAR(fec_cte) = @nAno
			AND fec_cte <= @fFec_cte; 

	SELECT	@nDiaParaHis = ISNULL(SUM(can_liq),0)
	FROM	rhh_liqhis 
	WHERE	cod_emp = @Cod_Emp 
			AND cod_con = @cod_con AND cod_cont = @nCodCont 
			AND MONTH(fec_cte) = @nPer
			AND YEAR(fec_cte) = @nAno
			AND fec_cte < @fFec_cte; 

	/*SELECT	@nBaseProvHis = SUM(val_liq) 
	FROM	rhh_liqhis
	WHERE	cod_emp = @Cod_Emp  
			AND MONTH(fec_cte) = @nPer
			AND YEAR(fec_cte) = @nAno
			AND fec_cte <= @fFec_cte
			AND cod_con = @CodConBase 
			AND sec_con NOT LIKE '%RETRO%'
			AND cod_cont = @nCodCont;*/	
/*
No se miran Históricos si el concepto aplica en ambas quincenas y se está liquidando contrato
*/
/*JIRV 05/05/2004 SE REALIZA NUEVA VALIDACIÓN PARA @nDiaPara YA QUE NO SE PUEDE VALIDAR POR ESTOS CONCEPTOS 
PORQUE QUEDAN FUERA MUCHOS, MEJOR SE VALIDA POR EL 000020 YA QUE ESTE TIENE LOS DIAS REALMENTE TRABAJADOS
*/

IF @Cod_con IN ('004000','004001')AND (@Dias - 365 < 30)
BEGIN
	SELECT	@nDiaPara = @Dias - 365
	
END
ELSE
BEGIN
	SELECT	@nDiaPara = SUM(dias - dia_int ) 
	FROM	#t_rhh_hislab
END	

--Build the SQL string one time.
	SET @SQLString =	' SELECT @Resultado = SUM(val_liq * '+
						' CASE '+
							' WHEN nat_liq = 1 THEN 1 '+
							' WHEN nat_liq = 2 THEN -1 '+
							' ELSE 1 '+
						' END /*+ '+
						' CASE '+
							' WHEN cod_con = ''001050'' AND ' + RTRIM(CONVERT(CHAR,@ind_para)) + ' = 1 AND ' + 
									RTRIM(CONVERT(CHAR,@nDiaPara)) + ' > 0'+
							' THEN '+ LTRIM(CONVERT(CHAR,ROUND(@nSalBas / 30 * @nDiaPara, 0)))+
							' ELSE 0 '+
						' END */)'+
						' FROM rhh_liqhis'+
		 				' WHERE tip_liq <> ''18'' AND nat_liq <=2 AND (cod_emp = ' + CHAR(39) + RTRIM(@Cod_Emp) + CHAR(39) + 
						' AND ano_liq = ' + CHAR(39) + @ANOH + CHAR(39) + 
						' AND per_liq = ' + CHAR(39) + @MESH + CHAR(39) + ')' +
						' AND cod_cont = ' + CHAR(39) + RTRIM(@nCodCont) + CHAR(39) + 
						CASE 
							WHEN @apl_con = 3 AND @Tip_liq <> '04'  THEN --El cpto se liquida en ambas Quincenas
								' AND ((fec_cte = ' + CHAR(39) + RTRIM(CONVERT(CHAR,@fFec_cte,112)) + CHAR(39) +
								' AND tip_liq <> ' + CHAR(39) + @tip_liq + CHAR(39)+ ')'+
								' OR (fec_cte < ' + CHAR(39) +RTRIM(CONVERT(CHAR,@fFec_cte,112)) + CHAR(39)+
								' AND tip_liq <> 18 ))'
							WHEN @Tip_liq = '04'  THEN --No incluir liq 01 de la misma fecha de liq
								' AND (fec_cte < ' + CHAR(39) + RTRIM(CONVERT(CHAR,@fFec_cte,112)) + CHAR(39) +
								' AND tip_liq <> ' + CHAR(39) + @tip_liq + CHAR(39)+ ')'+
								' AND tip_liq <> 18 ' 
							WHEN @apl_con = 2 /*AND @Tip_liq = '04'*/ THEN --El cpto se liquida en la segunda Quincena
								' AND fec_cte < ' + CHAR(39) + RTRIM(CONVERT(CHAR,@fFec_cte,112)) + CHAR(39)+
								' AND tip_liq <> 18 '
							ELSE
								''
						END +'AND '+RTRIM(@cIndicador)+'=1'
						
						
						
	SET @ParmDefinition = N'@Resultado MONEY OUTPUT'
	--Execute the string with the first parameter value.
	EXECUTE	sp_executesql @SQLString, @ParmDefinition,
			@Resultado = @nResult1 OUTPUT ;
	

	SET	@nResult1 = ISNULL(@nResult1,0)

IF @Cod_con IN ('004000','004001')AND (@Dias - 365 < 30)
	SELECT	@nDiaPara = @Dias - 365 + 1
ELSE
	SELECT	@nDiaPara = SUM(dias - dia_int) 
	FROM	#t_rhh_hislab	


-- Build the SQL string one time.
SET @SQLString =	' SELECT @Resultado = SUM(b.val_liq * CASE a.nat_con WHEN 1 THEN 1 WHEN 2 THEN -1 ELSE 1 END)'+
					' FROM #t_resultado b '+
					' INNER JOIN V_rhh_concep a ON a.cod_con = b.cod_con '+
					' AND a.mod_liq = '+
					' (SELECT MAX(m.mod_liq) FROM v_rhh_concep M WHERE m.cod_con = a.cod_con AND (m.mod_liq = ''0'' OR m.mod_liq = '+ CHAR(39)+@ModLiq+CHAR(39) +'))'+
					' WHERE a.nat_con <= 3 AND a.'+RTRIM(@cIndicador)+'=1'

SET @ParmDefinition = N'@Resultado MONEY OUTPUT';

--Execute the string with the first parameter value.

EXECUTE	sp_executesql @SQLString, @ParmDefinition,
		@Resultado = @nResult2 OUTPUT ;

DECLARE @ValAnticipo MONEY

SELECT @ValAnticipo= ISNULL(SUM(M.val_liq ),0) 
FROM rhh_liqmes M
INNER JOIN v_rhh_concep c ON M.cod_con =C.cod_con 
WHERE C.ind_antc_ec = 1 AND M.Cod_emp = @Cod_Emp AND
M.fec_liq = @fFec_liq AND M.Cod_con <> '001052'



--SELECT @nResult2 = @nResult2 + @ValAnticipo
SET	@nResult2 = ISNULL(@nResult2,0)


SET @nResultado = @nResult1 + @nResult2

IF @nInd_Para = 1
	SELECT @nResultado = round(@nResultado, 2)


--SELECT '@nResultado'=@nResultado,'@cod_con'=@cod_con,'@nResult1'=@nResult1,'@nResult2'=@nResult2, '@nInd_Para'=@nInd_Para
SELECT	@nResulHis = 0

SELECT	@nResulHis = SUM(val_liq) 
FROM	rhh_liqhis
WHERE	cod_emp = @Cod_Emp 
	AND MONTH(fec_liq) = @nPer
	AND YEAR(fec_liq) = @nAno
	--AND fec_liq <> CASE tip_liq WHEN @tip_liq THEN @fFec_liq ELSE '19000101' END
	AND fec_liq <= @fFec_liq
	AND cod_con = @cod_con

SELECT	@nResulHis = ISNULL(@nResulHis,0)


----select '@nPorcentaje' =@nPorcentaje,@Cod_con,@Ind_pag_fdr
IF @Cod_con ='004000' AND @Ind_pag_fdr <>1 OR (@Cod_con IN ('004000','004001') AND @Ind_pag_fdr = 1 AND @dias <365 )
	SELECT	@nPorcentaje= 0

IF @Cod_con IN ('004000','004001') AND @nPorcentaje <> 0
begin 	
--print 'entro aqui' 
	SELECT	@nResultado = @nResultado/30 * @nDiaPara
end 

SELECT @nResultado = ROUND(((@nResultado * @nPorcentaje / 100) - @nResulHis),2)


IF @cod_con = '002980'
	SELECT @nResultado = @nResultado* 0.25


IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
	SELECT 'Cantidad' = @nDiaPara, 'Resultado'= @nResultado
ELSE
	IF @nResultado > 0
		EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cod_con, @Resultado = @nResultado,@Cantidad=@nDiaPara

END



```
