# Stored Procedure: rs_gth_gth002U_P

## Usa los objetos:
- [[gen_compania]]
- [[GTH_CargoCritico]]
- [[GTH_CategoriaCargo]]
- [[gth_vargen]]
- [[rhh_cargos]]
- [[rhh_emplea]]
- [[rhh_tbclaest]]
- [[v_gth_NivCar]]

```sql
--

CREATE PROCEDURE [dbo].[rs_gth_gth002U_P]
	@cod_emp	CHAR(12) = '%'

-- ======================================================================
-- Author:		Jorge Diaz
-- Create date: Junio 20 de 2019
-- Description:	reporte Perfil del Cargo para Portal
--
--				****************************************************************************************************
--				Observaciones:
--
--				En el encabezado del reporte se muestran textos de la variable general 9002
--				variable 9002 -> Nombre: 'Parámetros para el encabezado del reporte Perfil del Cargo'
--				variable 9002 -> Valor: 'Fecha: 02/01/2019 { Versión: 01 } Código: 123456'
--				Esta variable consta de tres textos separados por { y }.
--
--				2020.07.16 -> Jorge Diaz
--							  Se cambió código del diseño del reporte (RDL) GTH002U_P por GTH002P 
--							  El código del store procedure se deja igual
--
--				****************************************************************************************************
--
-- EXEC rs_gth_gth002U_P '3123171665'
-- EXEC rs_gth_gth002U_P '26151517'
-- ======================================================================


AS
BEGIN
	SET NOCOUNT ON;
	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

	DECLARE @Emp_Gen	VARCHAR(200) = '';
	DECLARE @Car_Gen	VARCHAR(250) = '';
	DECLARE @Emp_Apr	VARCHAR(200) = '';
	DECLARE @Car_Apr	VARCHAR(250) = '';


	--- Textos encabezado
	DECLARE @cadVar VARCHAR(100), @cadFecha VARCHAR(100)='', @cadVersion VARCHAR(100)='', @cadCodigo VARCHAR(100)='';
	SET @cadVar = ISNULL((SELECT val_var FROM gth_vargen WHERE num_var='9002'),'');
	IF @cadVar<>''
	BEGIN
		IF CHARINDEX('{',@cadVar)>1
		BEGIN
			SET @cadFecha = LTRIM(RTRIM(LEFT(@cadVar,CHARINDEX('{',@cadVar)-1)));
			SET @cadVar = LTRIM(RTRIM(REPLACE(@cadVar,@cadFecha,'')));
			SET @cadVar = LTRIM(RTRIM(REPLACE(@cadVar,'{','')));
		END;
		
		IF CHARINDEX('}',@cadVar)>1
		BEGIN
			SET @cadVersion = LTRIM(RTRIM(LEFT(@cadVar,CHARINDEX('}',@cadVar)-1)));
			SET @cadVar = LTRIM(RTRIM(REPLACE(@cadVar,@cadVersion,'')));
			SET @cadCodigo = LTRIM(RTRIM(REPLACE(@cadVar,'}','')));
		END;
	END;
	
	
	SELECT	C.cod_car, C.nom_car, C.car_sup, C1.nom_car AS CarSup, C.niv_car, NC.des_niv, C.des_car, C.func_car, 
			C.resp_car, C.niv_aca, CE.des_est, C.cod_cia, CIA.nom_cia, @Emp_Gen	AS Emp_Gen, @Car_Gen AS Car_Gen, 
			@Emp_Apr AS Emp_Apr, @Car_Apr AS Car_Apr, C.obj_car, 
			@cadFecha AS cadFecha, @cadVersion AS cadVersion, @cadCodigo AS cadCodigo, 
			C.cod_cat_car, ISNULL(cat.des_cat_car,'') AS des_cat_car, 
			C.cod_critico, ISNULL(car.des_critico,'') AS des_critico, 
			RTRIM(emp.nom_emp)+' '+RTRIM(emp.ap1_emp)+' '+RTRIM(emp.ap2_emp) AS nomEmpl 
	FROM	rhh_cargos AS C
	INNER	JOIN gen_compania AS CIA ON C.cod_cia = CIA.cod_cia
	LEFT	JOIN rhh_cargos AS C1 ON C.car_sup = C1.cod_Car
	INNER	JOIN v_gth_NivCar AS NC ON C.cod_car = NC.cod_car
	INNER	JOIN rhh_tbclaest AS CE ON C.niv_aca = CE.tip_est
	LEFT	JOIN GTH_CategoriaCargo cat ON C.cod_cat_car=cat.cod_cat_car 
	LEFT 	JOIN GTH_CargoCritico car ON C.cod_critico=car.cod_critico 
	INNER 	JOIN rhh_emplea emp ON C.cod_car=emp.cod_car 
	WHERE	emp.cod_emp LIKE RTRIM(@cod_emp) 
	ORDER	BY C.cod_car;
	
END;

```
