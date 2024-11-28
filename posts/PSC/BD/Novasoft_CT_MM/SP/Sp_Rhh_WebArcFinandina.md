# Stored Procedure: Sp_Rhh_WebArcFinandina

## Usa los objetos:
- [[gen_bancos]]
- [[gen_tipide]]
- [[rhh_emplea]]
- [[rhh_liqhis]]
- [[rhh_LotesBanco]]

```sql

--================================================
-- PLANOBANCOFINANDINA
-- AUTOR JORGE RUIZ
-- FECHA DE CREACION 2021/08/03 
-- exec Sp_Rhh_WebArcFinandina '%','%','%','%','%','20210831','20210831','20210831','10016'
--================================================
CREATE PROCEDURE [dbo].[Sp_Rhh_WebArcFinandina]
	@cCodBan  CHAR(6)  = '%',
	@cCodCia  CHAR(3)  = '0',
	@cCodSuc  CHAR(3)  = '0',
	@cCodCco  CHAR(10) = '0',
	@cTipLiq  CHAR(2)  = '01',
	@fFecCte  DATETIME,
	@fFecTrns DATETIME,
	@fFecAbo  DATETIME,
	@NumLote  BIGINT
AS
BEGIN

    SET NOCOUNT ON;
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

    ---ENCABEZADO
    SELECT '1' AS Tip_Reg,
		 '0000' AS Consecutivo,
		 CONVERT(VARCHAR(8), fec_prog, 112) AS fec_pag,
		 '' AS ID_archivo, ---Campo para nombrar el consecutivo del archivo de acuerdo al control del cliente
		 '' AS Tip_CtaOrig,
		 '' AS Cta_Orig,
		 '00000' AS Ceros
    FROM rhh_LotesBanco AS L
    WHERE L.num_lote LIKE RTRIM(@NumLote);

    ---CUERPO
    SELECT '2' AS Tip_Reg,
		 ROW_NUMBER() OVER(
		 ORDER BY E.cod_emp) AS Consecutivo,
		 I.tip_tip AS TipID,
		 E.cod_pagelec AS Identificacion,
		 RTRIM(E.nom_emp) AS Nombres,
		 RTRIM(E.ap1_emp) + ' ' + RTRIM(E.ap2_emp) AS Apellidos,
		 '' AS PersonaJuridica,
		 E.cta_ban AS CuentaDestino,
		 CASE E.tip_pag
			WHEN 1 THEN '1'
			WHEN 2 THEN '6'
		 END AS Tip_CtaDest,
		 E.cod_ban AS BancoDestino,
		 L.val_liq AS Valor,
		 '00' AS Dec_Valor,
		 '' AS RefPago1,
		 '' AS RefPago2
    FROM rhh_liqhis AS L
    INNER JOIN rhh_emplea AS E ON E.cod_emp = L.cod_emp
    INNER JOIN gen_bancos AS B ON B.cod_ban = E.cod_ban
    INNER JOIN gen_tipide AS I ON I.cod_tip = E.tip_ide
    WHERE L.cod_con LIKE '9999%' AND num_lote = @NumLote;

    ---FINAL
    SELECT '3' AS Tip_Reg,
		 '9999' AS Consecutivo,
		 COUNT(L.cod_con) AS NroRegistros,
		 SUM(L.val_liq) AS ValorTotal,
		 '00' AS Dec_ValorTotal,
		 '0000' AS Ceros
    FROM rhh_liqhis AS L
    INNER JOIN rhh_emplea AS E ON E.cod_emp = L.cod_emp
    WHERE L.cod_con LIKE '9999%' AND num_lote = @NumLote;
END;
```
