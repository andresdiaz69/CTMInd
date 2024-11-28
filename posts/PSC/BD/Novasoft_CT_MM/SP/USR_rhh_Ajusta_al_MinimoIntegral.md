# Stored Procedure: USR_rhh_Ajusta_al_MinimoIntegral

## Usa los objetos:
- [[fn_rhh_VG]]
- [[GTH_ParamContratos]]
- [[Rhh_AsocCptosDet]]
- [[rhh_pertlq]]
- [[Sp_rhh_LiqCte]]

```sql

/*
Calcula la diferencia entre el sueldo mínimo y el concepto 001050
La cantidad de días del 001050 si se usa para mantener la proporcionalidad
con los días trabajados*/
-----Concepto 001059 se liquida únicamente en la segunda quincena
--- Por solicitud del Cliente se crea agrupación de conceptos a excluir en la tabla Rhh_AsocCptosDet where ide_AsocIntCpto ='300' para que los Usuarios puedan 
---registrar los conceptos a exluir en el cálculo de la base a comparar con el Salario Mínimo. M. Pinzón 15/02/2021

CREATE PROCEDURE [dbo].[USR_rhh_Ajusta_al_MinimoIntegral]
		@cCod_emp	CHAR(12),
		@nCodCont	INT,		/*Codigo Contrato*/
		@cTip_Liq	CHAR(2),
		@cCod_con	CHAR(6),
		@fFec_cte	DATETIME
--WITH ENCRYPTION
As

DECLARE	@nSalMin	MONEY

DECLARE @nValorPre	MONEY
DECLARE @nCantPre	MONEY

DECLARE @nValorHis	MONEY
DECLARE @nCantHis	MONEY

DECLARE @nValorMes	MONEY
DECLARE @nCantMes	MONEY

DECLARE @HorasMes	NUMERIC --MPA

DECLARE @nValorAju	MONEY
DECLARE @IDL_num	BIGINT;

DECLARE @mod_liq int;

DECLARE @cla_sal smallint;

SET NOCOUNT ON
SET ROWCOUNT 0

SELECT	@cla_sal = cla_sal
FROM	#T_RHH_EMPLEA
WHERE	cod_emp = @cCod_emp AND cod_cont = @nCodCont;

--select '@cla_sal'=@cla_sal

SET	@nSalMin = (CONVERT(MONEY,dbo.fn_rhh_VG(60,@fFec_cte)) * 13);

--select '@nSalMin'=@nSalMin

--select * from #T_RHH_EMPLEA

SELECT	@IDL_num = IDL_num
FROM	#T_RHH_EMPLEA
WHERE	cod_emp = @cCod_emp AND cod_cont = @nCodCont and cla_sal=2;


SELECT	@mod_liq = mod_liq
FROM	#T_RHH_EMPLEA
WHERE	cod_emp = @cCod_emp AND cod_cont = @nCodCont;

SELECT @HorasMes = horas_mes
FROM   GTH_ParamContratos
WHERE  cod_emp = @cCod_emp AND cod_con = @nCodCont; ----MPA

--select '@HorasMes'=@HorasMes

IF @HorasMes = 120
	SET @nSalMin = @nSalMin/2 ----Modificó Maricela Pinzón

IF @HorasMes = 240
	SET @nSalMin = @nSalMin


--SELECT	@nCantPre = ISNULL(can_liq,0)
--FROM	rhh_liqmes 
--WHERE	cod_emp = @cCod_emp AND cod_con = '001050'
--		AND IDL_num = @IDL_num;	


		--select '@nCantPre'=@nCantPre

--///// se cambia la consulta a tabla #t_resultado ya que en version 3 no consulta liqmes ////----
SELECT	@nCantPre = ISNULL(can_liq,0)
FROM	#t_resultado
WHERE	cod_con in  ('001050','001150','001151','001130','001160','001170') --Se incluye en la suma los dias de ausentismos ya que solo
		--tomaba los dias de salario para dividir los devengos, el usuario indica que esos conceptos tambien debe tenerlos en cuentas en dias trabajados" L.Linares 18/03/2020
		--AND IDL_num = @IDL_num;	

--SELECT '@nCantPre'=@nCantPre

---select *from #t_resultado
--///// se cambia la consulta a tabla #t_resultado ya que en version 3 no consulta liqmes ////----
SELECT	/*@nCantPre = ISNULL(can_liq,0),*/
		@nValorPre = ISNULL(SUM(val_liq),0)
FROM	#t_resultado  ---rhh_liqmes 
WHERE	nat_con=1 and ind_PagIndir=0
		and cod_con not in (select cod_con from  Rhh_AsocCptosDet where ide_AsocIntCpto ='300')----M. Pinzón 15/02/2021
			

--SELECT	@nCantHis = ISNULL(SUM(can_liq),0)
--FROM	rhh_liqhis
--WHERE	cod_emp = @cCod_emp AND cod_con = '001050'
--		AND MONTH(fec_cte) = MONTH(@fFec_cte) AND YEAR(fec_cte) = YEAR(@fFec_cte);


--///// se cambia la consulta a tabla #t_rhh_liqhis ya que en version 3 no consulta liqhis ////----
SELECT	@nCantHis = ISNULL(SUM(can_liq),0)
FROM	#t_rhh_liqhis
WHERE	cod_emp = @cCod_emp AND 
		cod_con in  ('001050','001150','001151','001130','001160','001170')
		AND MONTH(fec_cte) = MONTH(@fFec_cte) AND YEAR(fec_cte) = YEAR(@fFec_cte) AND fec_cte <> @fFec_cte;

--SELECT '@nCantHis'=@nCantHis
--SELECT	/*@nCantHis = ISNULL(SUM(can_liq),0),*/
--		@nValorHis = ISNULL(SUM(val_liq),0)
--FROM	rhh_liqhis
----WHERE	cod_emp = @cCod_emp AND cod_con = '001050'
--WHERE	cod_emp = @cCod_emp AND cod_con in ('001050','100001','100002','100003','100004','100005','100006','100007','100008','100009','100010','100011',
--'100012','100013','100014','100015','100016','100022','100027','100028','100034')
--		AND MONTH(fec_cte) = MONTH(@fFec_cte) AND YEAR(fec_cte) = YEAR(@fFec_cte);

--select * from  #t_rhh_liqhis

SELECT	/*@nCantHis = ISNULL(SUM(can_liq),0),*/
		@nValorHis = ISNULL(SUM(val_liq),0)
FROM	#t_rhh_liqhis
WHERE	cod_emp = @cCod_emp AND nat_liq=1 and ind_PagIndir=0
		and cod_con not in  (select cod_con from  Rhh_AsocCptosDet where ide_AsocIntCpto ='300') ---M. Pinzón 15/02/2021
				AND MONTH(fec_cte) = MONTH(@fFec_cte) AND YEAR(fec_cte) = YEAR(@fFec_cte) --AND fec_cte <> @fFec_cte;
		SET	@nCantMes = @nCantPre + @nCantHis;

--select '@nValorPre'=@nValorPre, '@nValorHis'=@nValorHis

SET	@nValorMes = @nValorPre + @nValorHis;

--select '@nValorMes'=@nValorMes, '@nCantMes'=@nCantMes

SET @nValorAju = 0

IF @nSalMin / 30 > (@nValorMes / @nCantMes)

--SET	@nValorAju = CEILING(@nSalMin / 30 * @nCantMes - @nValorMes)-------adcio

--select '@nValorAju'=@nValorAju
	/*	En caso de estar liquidando contrato debe verificarse y ajustarse al mínimo
	de lo contrario únicamente si es el último período de liquidación del mes, es decir coincide con el fin de mes
	*/
	IF @cTip_Liq = '04' OR EXISTS(SELECT fec_ini FROM rhh_pertlq WHERE fec_fin = @fFec_cte AND cod_tlq = 2)
		
		SET	@nValorAju = CEILING(@nSalMin / 30 * @nCantMes - @nValorMes);

	
	IF @cla_sal =  1
	SET @nValorAju= 0
		
IF @nValorAju = 0
	SET @nCantMes = 0

IF @mod_liq in (1, 8) or @nValorAju <= 0
BEGIN 
	SET @nValorAju = 0
	SET @nCantMes = 0
END

IF OBJECT_ID('TempDb..#T_VarPub') IS NULL
	SELECT 'Cantidad' = @nCantMes, 'Resultado' = @nValorAju
ELSE
	EXEC dbo.Sp_rhh_LiqCte @cCodCon = @cCod_con, @Cantidad = @nCantMes, @Resultado = @nValorAju;


```
