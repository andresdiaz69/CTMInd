# Stored Procedure: sp_tes_pagoscajaporc_crea_usu

## Usa los objetos:
- [[cxc_facrec]]
- [[tes_usucaj]]
- [[tes_vargen]]

```sql



--	PROCEDIMIENTO QUE PUEDE SER PERSONALIZADO PARA USUARIO QUE CREA EL DOCUMENTO DE ACUERDO A LA FORMA DE PAGO
--	JSARMIENTO SEPTIEMBRE/2013 SRS: 2013-0934
CREATE PROCEDURE [dbo].[sp_tes_pagoscajaporc_crea_usu]
		@num_refere		CHAR(15),
		@num_concil		VARCHAR(30)=''
AS

DECLARE @ano_doc		CHAR(4)
DECLARE @per_doc		CHAR(2)
DECLARE @num_orden		CHAR(14)
DECLARE @caja			CHAR(3)
DECLARE @usuario		VARCHAR(50)
DECLARE @fecha			DATETIME,
		@sub_tip		CHAR(5),
		@for_pag		CHAR(3),
		@cod_cli		CHAR(15),
		@moneda			CHAR(2),
		@fec_tas		DATETIME,
		@valor_pago		MONEY,
		@ind_cons		BIT
DECLARE @cod_alum		CHAR(15)
DECLARE @proc_usr		SMALLINT


SET NOCOUNT ON
SET ROWCOUNT 0

SELECT @proc_usr=val_var FROM tes_vargen WHERE num_var=40

SET @usuario=SUSER_NAME()

SET @fecha=GETDATE()
SET @ano_doc=CONVERT(VARCHAR,YEAR(@fecha))
SET @per_doc=RIGHT('0'+RTRIM(CONVERT(VARCHAR,MONTH(@fecha))),2)
SET @sub_tip='040'
SET @for_pag='01'
SET @moneda='00'
SET @fec_tas=GETDATE()
SET @valor_pago=0

--SELECT @cod_alum=ISNULL(cod_alum,'0'),@num_orden=num_orden  FROM usr_cxc_orden_matri WHERE num_refe=@num_refere
--SELECT @cod_alum=ISNULL(usr_cod_alum,'0') FROM cxc_cliente WHERE cod_cli=@cod_cli
--SELECT @cod_cli=docum_alumno  FROM usr_cxc_alum_matri WHERE cod_alum=@cod_alum

UPDATE cxc_facrec set tasa=1 where tasa=0 or tasa is null

SELECT TOP 1 @caja = cod_caja FROM tes_usucaj WHERE cod_usu = @usuario
	
--EXEC usr_sp_tes_docsingre_crearec @cod_cli,@usuario,@fecha,@sub_tip,@caja,@fec_tas,@num_concil
	
--UPDATE usr_cxc_orden_matri SET ind_pago=1,fec_recibo=@fecha WHERE num_refe=@num_refere




```
