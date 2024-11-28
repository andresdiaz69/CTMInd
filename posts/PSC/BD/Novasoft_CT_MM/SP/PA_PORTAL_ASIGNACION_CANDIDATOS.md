# Stored Procedure: PA_PORTAL_ASIGNACION_CANDIDATOS

## Usa los objetos:
- [[GTH_RequisicionEmp]]

```sql


-- =============================================
-- Author:		Alexander Vargas
-- Create date: 25 Nov 2016
-- Description:	SP usado para traer los candidatos que se van a 
-- asignar en una requisicion y para grabarlos.


-- Solicitud:		SNR2019-0221 Filtro fecha candidato
-- Modified by:		Alexander Vargas
-- Modified date:	11 Sep 2019
-- Description:	Se agrega filtro por fecha, usando la de autorizacion  
-- también se agrega filtro por cédula.
-- =============================================

CREATE PROCEDURE [dbo].[PA_PORTAL_ASIGNACION_CANDIDATOS]

	@opc char(1),

	@barrio varchar (50)=null,
	@genero varchar (1)=null,
	@cargo varchar (50)=null,	
	@experiencia varchar (50)=null,
	@idiomas varchar (50)=null,
	@nivelIdioma varchar (50)=null,

	@niveleduca varchar (50)=null,

	@aniosExp varchar (50)=null,
	@estcivil varchar (50)=null,

	@estaturaIni varchar (50)=null,
	@estaturaFin varchar (50)=null,
	@pesoIni varchar (50)=null,
	@pesoFin varchar (50)=null,

	@edadIni varchar (50)=null,
	@edadFin varchar (50)=null,

	@salarioIni varchar (50)=null,
	@salarioFin varchar (50)=null,

	@depto varchar (50)=null,
	@ciudad varchar (50)=null,

	@cod_emp varchar (50)=null,
	@num_req varchar (50)=null,

	@estudio varchar (50)=null,
	@cedula varchar (20)=null,

	@fecIni varchar (8) = null,
	@fecFin varchar	(8) =null


--WITH ENCRYPTION
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @cCadena VARCHAR(MAX);

	IF(@opc='C')
	BEGIN

	
	SET @cCadena='SELECT DISTINCT emp.cod_emp,
				emp.tip_ide,	
				T.des_tip,
				RTRIM(nom_emp) +' + ''' ''' + ' + RTRIM(ap1_emp) +' + ''' ''' + ' + RTRIM(ap2_emp)  AS nombre, 
				e_mail, 
				dir_res,
				tel_res, 
				tel_cel,
				Fec_aut 
		FROM GTH_RptEmplea emp 
			LEFT JOIN GTH_RptIdioma idi ON EMP.cod_emp=IDI.cod_emp COLLATE DATABASE_DEFAULT  
			LEFT JOIN GTH_RequisicionEmp req ON EMP.cod_emp=req.cod_emp COLLATE DATABASE_DEFAULT  
			LEFT JOIN GTH_ExpLaboral exp ON EMP.cod_emp=exp.cod_emp COLLATE DATABASE_DEFAULT  
			LEFT JOIN GTH_RptEstudio estud ON EMP.cod_emp=estud.cod_emp COLLATE DATABASE_DEFAULT 
			INNER JOIN gen_tipide T ON T.cod_tip = emp.tip_ide COLLATE DATABASE_DEFAULT 
		WHERE EMP.cod_emp LIKE ''%%'' AND req.cod_emp IS NULL  '

		IF @barrio IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND barrio LIKE ' + CHAR(39) + '%' +  @barrio + '%' + CHAR(39)
		END

		IF @estaturaIni IS NOT NULL AND @estaturaFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND tam_emp BETWEEN ' +  @estaturaIni + ' AND ' + @estaturaFin
		END

		IF @pesoIni IS NOT NULL AND @pesoFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND pes_emp BETWEEN ' +  @pesoIni + ' AND ' + @pesoFin
		END

		IF @edadIni IS NOT NULL AND @edadFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND DATEDIFF(year,fec_nac,GETDATE()) BETWEEN ' +  @edadIni + ' AND ' + @edadFin
		END

		IF @salarioIni IS NOT NULL AND @salarioFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND sal_bas BETWEEN ' +  @salarioIni + ' AND ' + @salarioFin
		END

		IF @genero IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND sex_emp LIKE ' + CHAR(39) + '%' +  @genero + '%' + CHAR(39)
		END

		IF @estcivil IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND est_civ LIKE ' + CHAR(39) + '%' +  @estcivil + '%' + CHAR(39)
		END

		IF @ciudad IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND cod_ciu LIKE ' + CHAR(39) + '%' +  @ciudad + '%' + CHAR(39)
		END

		IF @cargo IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND nom_car LIKE ' + CHAR(39) + '%' +  @cargo + '%' + CHAR(39)
		END

		IF @niveleduca IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND niv_aca LIKE ' + CHAR(39) + '%' +  @niveleduca + '%' + CHAR(39)
		END

		IF @aniosExp IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND exp.tpo_exp LIKE ' + CHAR(39) + '%' +  @aniosExp + '%' + CHAR(39)
		END

		IF @idiomas IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND idi.cod_idi LIKE ' + CHAR(39) + '%' +  @idiomas + '%' + CHAR(39)
		END

		IF @nivelIdioma IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND idi.cod_calif LIKE ' + CHAR(39) + '%' +  @nivelIdioma + '%' + CHAR(39)
		END


		IF @experiencia IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND tpo_exp LIKE ' + CHAR(39) + '%' +  @experiencia + '%' + CHAR(39)
		END

		IF @estudio IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND estud.cod_est LIKE ' + CHAR(39) + '%' +  @estudio + '%' + CHAR(39)
		END

		IF @cedula IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND emp.cod_emp LIKE ' + CHAR(39) + '%' +  @cedula + '%' + CHAR(39)
		END


		IF @fecIni IS NOT NULL AND @fecFin IS NOT NULL
		BEGIN
		SET @cCadena=@cCadena + ' AND Fec_aut BETWEEN ' + CHAR(39) +  @fecIni + CHAR(39) + ' AND ' + CHAR(39) + @fecFin + CHAR(39)
		END

		PRINT (@cCadena);
		EXEC (@cCadena);

	END

	IF(@opc='A')
	BEGIN

		INSERT INTO GTH_RequisicionEmp (num_req,cod_emp,cod_fte) VALUES (@num_req,@cod_emp,'0')

	END
	
END

```
