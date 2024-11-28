# Stored Procedure: Usr_Sp_Rhh_WebArcAVVillas02_U2

## Usa los objetos:
- [[gen_compania]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[rhh_liqmes]]
- [[rhh_tbForPag]]
- [[rhh_tbTipPag]]
- [[sis_empresa]]

```sql
--EXEC Usr_Sp_Rhh_WebArcAVVillas02_U2 '52','06','%','%','01','20190531','20190530','20190530','528'
CREATE PROCEDURE [dbo].[Usr_Sp_Rhh_WebArcAVVillas02_U2]
	@cCodBan	CHAR(6) = '%',
	@cCodCia	CHAR(3) = '0',
	@cCodSuc	CHAR(3)	= '0',
	@cCodCco	CHAR(10) = '0',
	@cTipLiq	CHAR(2)= '01',
	@fFecCte	DATETIME,
	@fFecTrns	DATETIME,
	@fFecAbo	DATETIME,
	@NumLote	BIGINT = 0
--WITH ENCRYPTION
AS

DECLARE @nit_emp CHAR(15)
DECLARE @tot_reg	INT
DECLARE @val_tot	MONEY

SET ROWCOUNT 0;
SET NOCOUNT ON;
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

--	REGISTRO 1
IF (RTRIM(@cCodCia)= '%')
BEGIN
	SELECT @nit_emp=emp_nit
	FROM sis_empresa 
END
ELSE
BEGIN
	SELECT @nit_emp=ISNULL(RTRIM(nit_cia),'')+ISNULL(RTRIM(dig_ver),'')
	FROM gen_compania
	WHERE cod_cia=@cCodCia
END

SELECT '1' AS tip_reg,
'' AS cta_ori,
'' AS tip_cta,
'' AS cod_prod,
CONVERT(CHAR,@fFecAbo,112) AS fec_efec,
REPLACE(REPLACE(@nit_emp,'.',''),'-','') AS nit_emp,
'' AS tip_ori,
'' AS nom_ori,
'' AS plaz_ori,
'' AS tipo_reg,
'' AS sec_cli,
'' AS canal

-- REGISTRO 2
SELECT '2' AS tip_reg,
'' AS cod_tran,
E.cod_ban,
'' AS cod_plaz,
E.num_ide,
CASE E.tip_ide WHEN '01' THEN '1' WHEN '02' THEN '2' WHEN '10' THEN '3' WHEN '05' THEN '5' ELSE '1' END AS tip_ide,
E.cta_ban,
CASE E.tip_pag WHEN 1 THEN 1 ELSE 0 END AS tip_pag,
REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(RTRIM(E.nom_emp)+' '+RTRIM(E.Ap1_emp)+' '+RTRIM(E.ap2_emp),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Nombre,
'' AS id_aden,
SUM(M.val_liq) AS valor,
'' AS flag,
' ' AS registro
INTO #reg2
FROM rhh_emplea E 
INNER JOIN rhh_liqmes M ON E.cod_emp=M.cod_emp 
WHERE M.cod_con like '9999%' 
AND M.fec_cte = @fFecCte 
AND M.tip_liq LIKE RTRIM(@cTipliq) 
AND E.tip_pag in(1,2)
AND M.cod_cia LIKE RTRIM(@cCodCia) 
AND M.cod_suc LIKE RTRIM(@cCodSuc) 
AND M.cod_cco LIKE RTRIM(@cCodCco)
AND E.cod_emp = 'X.X.X'
GROUP BY E.num_ide, E.cod_ban,E.tip_ide,E.cta_ban,E.tip_pag,E.nom_emp, E.ap1_emp,E.ap2_emp
HAVING SUM(M.val_liq) > 0

IF @NumLote=0 OR @NumLote IS NULL
BEGIN
	INSERT INTO #reg2
	SELECT '2' AS tip_reg,
	'' AS cod_tran,
	E.cod_ban,
	'' AS cod_plaz,
	E.num_ide,
	CASE E.tip_ide WHEN '01' THEN '1' WHEN '02' THEN '2' WHEN '10' THEN '3' WHEN '05' THEN '5' ELSE '1' END AS tip_ide,
	E.cta_ban,
	CASE E.tip_pag WHEN 1 THEN 1 ELSE 0 END AS tip_pag,
	REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(RTRIM(E.nom_emp)+' '+RTRIM(E.Ap1_emp)+' '+RTRIM(E.ap2_emp),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Nombre,
	'' AS id_aden,
	SUM(M.val_liq) AS valor,
	'' AS flag,
	' ' AS registro
	FROM rhh_emplea E 
	INNER JOIN rhh_liqmes M ON E.cod_emp=M.cod_emp 
	WHERE M.cod_con like '9999%' 
	AND M.fec_cte = @fFecCte 
	AND M.tip_liq LIKE RTRIM(@cTipliq) 
	AND E.tip_pag in(1,2)
	AND M.cod_cia LIKE RTRIM(@cCodCia) 
	AND M.cod_suc LIKE RTRIM(@cCodSuc) 
	AND M.cod_cco LIKE RTRIM(@cCodCco)
	AND E.est_lab NOT IN ('00','99')
	GROUP BY E.num_ide, E.cod_ban,E.tip_ide,E.cta_ban,E.tip_pag,E.nom_emp, E.ap1_emp,E.ap2_emp
	HAVING SUM(M.val_liq) > 0
END
ELSE
BEGIN
	INSERT INTO #reg2
	SELECT '2' AS tip_reg,
	'' AS cod_tran,
	E.cod_ban,
	'' AS cod_plaz,
	E.num_ide,
	CASE E.tip_ide WHEN '01' THEN '1' WHEN '02' THEN '2' WHEN '10' THEN '3' WHEN '05' THEN '5' ELSE '1' END AS tip_ide,
	E.cta_ban,
	CASE E.tip_pag WHEN 1 THEN 1 ELSE 0 END AS tip_pag,
	REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(RTRIM(E.nom_emp)+' '+RTRIM(E.Ap1_emp)+' '+RTRIM(E.ap2_emp),'Ñ','N'),'@','a'),'&','Y'),'á','a'),'é','e'),'í','i'),'ó','o'),'ú','u'),'´',''),CHAR(39),'') AS Nombre,
	'' AS id_aden,
	SUM(M.val_liq) AS valor,
	'' AS flag,
	' ' AS registro
	FROM rhh_emplea E 
	INNER JOIN rhh_liqhis M ON E.cod_emp=M.cod_emp 
	INNER JOIN rhh_tbTipPag tp ON E.tip_pag=tp.tip_pag
	INNER JOIN rhh_tbForPag tb ON tb.for_pag=tp.for_pag 
	WHERE M.cod_con like '9999%' 
	AND m.num_lote=@NumLote
	AND tp.for_pag=1
	--AND E.cod_ban='52'
	GROUP BY E.num_ide, E.cod_ban,E.tip_ide,E.cta_ban,E.tip_pag,E.nom_emp, E.ap1_emp,E.ap2_emp
	HAVING SUM(M.val_liq) > 0
END

SELECT * FROM #reg2

-- REGISTRO 3
--SELECT '3' AS tip_reg,
--'' AS EAN,
--'' AS Filler,
--'' AS Referencia,
--'' AS Descripcion

-- REGISTRO 4
SELECT @tot_reg=COUNT(1), @val_tot=SUM(valor)
FROM #reg2

SELECT '4' AS tip_reg,
@tot_reg AS tot_reg,
ROUND(@val_tot,0) AS val_tot,
'' as decimales 
--@val_tot AS val_tot

```
