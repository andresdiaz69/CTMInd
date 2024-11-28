# Stored Procedure: sp_prt_Consulta_Evaluados

## Usa los objetos:
- [[eval]]
- [[evaluado]]
- [[GTH_EvaDesem]]
- [[GTH_EvaDesemAsig]]
- [[GTH_EvaDesemGrupoEval]]
- [[GTH_EvaDesemRespComp]]
- [[GTH_EvaDesemRespCompConc]]
- [[GTH_Eval_Estado_Pers]]
- [[GTH_Evalua_estado]]
- [[GTH_Rol]]
- [[rhh_emplea]]
- [[sp_GTH_ListadoEvaluados]]

```sql




-- =============================================
-- Author:		Alexander Vargas
-- Create date: 04/02/2022
-- Description:	Consulta evaluados de un proceso de evaluación de desempeño

--SRS2022 - 0640 Periodo evaluado no muestra las fechas en encabezado evaluación
--Modified by: Alexander Vargas
--Modified date: 15/07/2022
--Description: se agregan los campos PerEval y Proceso para traer
--				las fechas del periodo evaluado

--SRS2022 - 0792 Error estado en evaluacion competencias
--Modified by: Alexander Vargas
--Modified date: 07/09/2022
--Description: se realiza ajuste para revisar si todos los evaluadores respondieron
--la evaluación de competencias del empleado

--SRS2023 - 0016 Error en Evaluacion por competencias muestra grupo que no corresponde
--Modified by: Alexander Vargas
--Modified date: 10/01/2023
--Description: el código del grupo se toma de la variable Counter para evitar 
--error cuando se han borrado grupos del proceso y en la tabla de evaluaciones aún
--siguen estando. En rol lider tambien se agrega una validación

--SRS2023 - 0025 Error en de intercalación en Evaluacion por competencias
--Modified by: Alexander Vargas
--Modified date: 13/01/2023
--Description: se agrega la claúsula COLLATE en algunos JOIN que no la tenian

--SRS2023 - 0084 Error en Evaluacion por competencias muestra registros repetidos
--Modified by: Alexander Vargas
--Modified date: 30/01/2023
--Description: al final en tipo usuario líder se agrega al JOIN el cod_cia y en el filtro
--el codigo del proceso @CodEvaDesem

--SRS2023 - 0104 Error intercalacion Evaluacion competencias
--Modified by: Alexander Vargas
--Modified date: 02/02/2023
--Description: se agrega la claúsula COLLATE en el JOIN de la opción líder

-- =============================================
CREATE PROCEDURE [dbo].[sp_prt_Consulta_Evaluados] 

	@CodCiaEva			CHAR(3), /*Código Compañía*/
	@CodEvaDesem		VARCHAR(6), /*Código Proceso de Evaluación de Competencias*/
	@CodEvaluador		CHAR(12), /*Código Evaluador*/
	@TipoUsuario		VARCHAR(10)='empleado',
	@CodEvaluado		CHAR(12) /*Código del Evaluado*/

--WITH ENCRYPTION
	AS
	BEGIN

	SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED	
	SET NOCOUNT ON;


--Borrar la tabla si existe
	IF OBJECT_ID('TEMPDB.dbo.#tmpEvaluados') IS NOT NULL
	BEGIN
		DROP TABLE #tmpEvaluados
	END

	--Guardar los empleados que va a evaluar el líder o el empleado
	CREATE TABLE #tmpEvaluados (
		cod_emp VARCHAR(100),
		Nombre VARCHAR(100), 
		Documento VARCHAR(100), 
		Cargo VARCHAR(100), 
		Fecha VARCHAR(100), 
		Nota VARCHAR(10), 
		Color VARCHAR(10), 
		Resultado VARCHAR(100), 
		Grupo VARCHAR(100),
		CodCia CHAR(3),
		CodEva VARCHAR(20),
		CodigoEva VARCHAR(20),
		NombreRol VARCHAR(50),
		TipEva	CHAR(1),
		CodRol	CHAR(1),
		CodGrupo INT,
		Foto VARBINARY(MAX),
		NotaEval VARCHAR(10),
		ColorEval VARCHAR(10),
		EstadoEval VARCHAR(20),
		PerEval VARCHAR(100),
		Proceso VARCHAR(100)
		);


	--Guardar las calificaciones de los autoevaluadores
	CREATE TABLE #tmpNotasEvaluadores (
		cod_emp VARCHAR(100),
		Nombre VARCHAR(100), 
		NombreRol VARCHAR(50),
		NotaEval VARCHAR(10), 
		Color VARCHAR(10), 
		CodRol	CHAR(1),
		DesGru VARCHAR(100), 
		PerEval VARCHAR(100),
		codEvaluado VARCHAR(100),
		Proceso VARCHAR(100)
		);

	DECLARE @Counter INT , @MaxGru INT
	DECLARE @NomGrupo VARCHAR(100)
	DECLARE @CodGrupo INT
	DECLARE @TipEva CHAR(1)
	DECLARE @Proceso VARCHAR(100)
	DECLARE @PerEval VARCHAR(100)
       
	SELECT @Counter = min(datos.cod_grup_val) , @MaxGru = max(datos.cod_grup_val) 
	FROM (SELECT * 
			FROM GTH_EvaDesemGrupoEval 
			WHERE cod_eva_des=@CodEvaDesem AND cod_cia=@CodCiaEva) as datos

	SELECT @PerEval=RTRIM(CONVERT(VARCHAR, fec_ini, 103)) + ' - ' + RTRIM(CONVERT(VARCHAR, fec_fin, 103))  from GTH_EvaDesem where cod_eva_des=@CodEvaDesem
	
	WHILE(@Counter IS NOT NULL
		  AND @Counter <= @MaxGru)
	BEGIN

		SELECT @NomGrupo=CONVERT(VARCHAR(100),cod_grup_val) + '-' + des_grup_val 
		FROM GTH_EvaDesemGrupoEval 
		WHERE cod_eva_des=@CodEvaDesem AND cod_cia=@CodCiaEva AND cod_grup_val=@Counter

		SELECT @CodGrupo=cod_grup_val 
		FROM GTH_EvaDesemGrupoEval 
		WHERE cod_eva_des=@CodEvaDesem AND cod_cia=@CodCiaEva AND cod_grup_val=@Counter

		SELECT @TipEva=tip_eva 
		FROM GTH_EvaDesemGrupoEval 
		WHERE cod_eva_des=@CodEvaDesem AND cod_cia=@CodCiaEva AND cod_grup_val=@Counter

		SELECT @Proceso=cod_eva_des 
		FROM GTH_EvaDesemGrupoEval 
		WHERE cod_eva_des=@CodEvaDesem AND cod_cia=@CodCiaEva AND cod_grup_val=@Counter

		INSERT INTO #tmpEvaluados(cod_emp,Nombre,Documento,Cargo,Fecha,Nota,Color,Resultado)
		EXEC sp_GTH_ListadoEvaluados @IndProc=1,@IndCons=1,@CodCia=@CodCiaEva,@CodEvaDes=@CodEvaDesem,@CodGrupVal=@Counter,@CodEmpEvado=NULL,@CodEmpEvador=NULL,@CodRol=0,@CodEva=NULL,@NomEmpFil=NULL

		--El código del grupo se toma del contador para evitar error cuando
		--se han borrado grupos del proceso
		SELECT @CodGrupo=@Counter 

		UPDATE #tmpEvaluados SET grupo=@NomGrupo WHERE grupo IS NULL
		UPDATE #tmpEvaluados SET CodGrupo=@CodGrupo WHERE CodGrupo IS NULL
		UPDATE #tmpEvaluados SET TipEva=@TipEva WHERE TipEva IS NULL

		UPDATE #tmpEvaluados SET Proceso=@Proceso WHERE Proceso IS NULL
		UPDATE #tmpEvaluados SET PerEval=@PerEval WHERE Proceso =@Proceso

	   SET @Counter  = @Counter  + 1        
	END

	--Agregar rol, compañia y codigo evaluación
	UPDATE #tmpEvaluados SET CodCia=@CodCiaEva, 
	CodEva = asig.cod_eva + ' - ' + CONVERT(VARCHAR(10),asig.cod_rol),
	CodigoEva=asig.cod_eva,
	NombreRol=CONVERT(VARCHAR(50),rol.cod_rol)+ ' - ' +rol.desc_rol,
	CodRol=ROL.cod_rol 
	FROM #tmpEvaluados AS eva 
		INNER JOIN GTH_EvaDesemAsig AS asig 
			ON eva.cod_emp=asig.cod_emp_evado COLLATE Database_Default 
			AND asig.cod_cia=@CodCiaEva COLLATE Database_Default
			AND asig.cod_eva_des=@CodEvaDesem COLLATE Database_Default
		INNER JOIN GTH_Rol AS rol
			ON asig.cod_rol=rol.cod_rol
		INNER JOIN GTH_EvaDesemGrupoEval AS gruEval
			ON gruEval.cod_cia=asig.cod_cia COLLATE Database_Default
			AND gruEval.cod_eva_des=asig.cod_eva_des COLLATE Database_Default
			AND gruEval.cod_grup_val=eva.CodGrupo 
			AND gruEval.cod_grup_val=asig.cod_grup_val 
	WHERE asig.cod_emp_evador=@CodEvaluador 

			

	--Para rol 7-concertada, se usa el campo cod_emp_evado
	UPDATE #tmpEvaluados SET CodCia=@CodCiaEva, 
	CodEva = asig.cod_eva + ' - ' + CONVERT(VARCHAR(10),asig.cod_rol),
	CodigoEva=asig.cod_eva,
	NombreRol=CONVERT(VARCHAR(50),rol.cod_rol)+ ' - ' +rol.desc_rol,
	CodRol=ROL.cod_rol 
	FROM #tmpEvaluados AS eva 
		INNER JOIN GTH_EvaDesemAsig AS asig 
			ON eva.cod_emp=asig.cod_emp_evado COLLATE Database_Default 
			AND asig.cod_cia=@CodCiaEva COLLATE Database_Default
			AND asig.cod_eva_des=@CodEvaDesem COLLATE Database_Default
		INNER JOIN GTH_Rol AS rol
			ON asig.cod_rol=rol.cod_rol
		INNER JOIN GTH_EvaDesemGrupoEval AS gruEval
			ON gruEval.cod_cia=asig.cod_cia COLLATE Database_Default
			AND gruEval.cod_eva_des=asig.cod_eva_des  COLLATE Database_Default
			AND gruEval.cod_grup_val=eva.CodGrupo 
			AND gruEval.cod_grup_val=asig.cod_grup_val	
	WHERE asig.cod_emp_evado=@CodEvaluador 
	
	--ajuste para autoevaluación generada
	UPDATE #tmpEvaluados SET CodCia=@CodCiaEva, 
	CodEva = asig.cod_eva + ' - ' + CONVERT(VARCHAR(10),asig.cod_rol),
	CodigoEva=asig.cod_eva,
	NombreRol=CONVERT(VARCHAR(50),rol.cod_rol)+ ' - ' +rol.desc_rol,
	CodRol=ROL.cod_rol 
	FROM #tmpEvaluados AS eva 
		INNER JOIN GTH_EvaDesemAsig AS asig 
			ON eva.cod_emp=asig.cod_emp_evado COLLATE Database_Default 
			AND asig.cod_cia=@CodCiaEva COLLATE Database_Default
			AND asig.cod_eva_des=@CodEvaDesem COLLATE Database_Default
		INNER JOIN GTH_Rol AS rol
			ON asig.cod_rol=rol.cod_rol
		INNER JOIN GTH_EvaDesemGrupoEval AS gruEval
			ON gruEval.cod_cia=asig.cod_cia COLLATE Database_Default
			AND gruEval.cod_eva_des=asig.cod_eva_des COLLATE Database_Default
			AND gruEval.cod_grup_val=eva.CodGrupo 
			AND gruEval.cod_grup_val=asig.cod_grup_val	
	WHERE asig.cod_emp_evador=@CodEvaluador 


	--Agregar la foto del empleado
	UPDATE #tmpEvaluados SET Foto=emp.fto_emp 
	FROM #tmpEvaluados AS eva 
	INNER JOIN rhh_emplea AS emp 
	ON eva.cod_emp=emp.cod_emp COLLATE Database_Default



	--Para agregar los evaluadores con la nota y el color de la evaluacion

	DECLARE @NumEvaluados INT;

	SET @Counter=1

	SELECT * INTO #tmpEvaluadores FROM (SELECT ROW_NUMBER() OVER(ORDER BY  cod_emp) AS num_row,
	* FROM #tmpEvaluados 
	WHERE CodCia IS NOT NULL -- AND cod_emp=@CodEvaluado
	) as datos

	--cantidad de evaluadores para hacer el ciclo y agregarlos
	--a la tabla  #tmpNotasEvaluadores
	SELECT @NumEvaluados=COUNT(cod_emp) FROM #tmpEvaluadores


	DECLARE @CodEmpEvaluado VARCHAR(12)	
	DECLARE @ProcesoEvaluador VARCHAR(100)
	

	WHILE (@Counter<=@NumEvaluados)

	BEGIN

		SELECT @CodEmpEvaluado=cod_emp,@CodGrupo=CodGrupo,@ProcesoEvaluador=Proceso FROM #tmpEvaluadores WHERE num_row=@Counter

		INSERT INTO #tmpNotasEvaluadores(cod_emp,Nombre,NombreRol,NotaEval,Color,DesGru,PerEval)
		EXEC sp_GTH_ListadoEvaluados @IndProc=1,@IndCons=2,@CodCia=@CodCiaEva,@CodEvaDes=@CodEvaDesem,@CodGrupVal=@CodGrupo,@CodEmpEvado=@CodEmpEvaluado,@CodEmpEvador=NULL,@CodRol=0,@CodEva=NULL,@NomEmpFil=NULL		

		UPDATE #tmpNotasEvaluadores SET CodRol=CONVERT(INT,SUBSTRING(NombreRol,1,1))

		UPDATE #tmpNotasEvaluadores SET codEvaluado=@CodEmpEvaluado WHERE codEvaluado IS NULL

		UPDATE #tmpNotasEvaluadores SET Proceso=@ProcesoEvaluador WHERE Proceso IS NULL


		SET @Counter  = @Counter  + 1

	END


	--actualiza la nota y el color de la evaluacion realizada
		UPDATE  eval SET NotaEval=nota.NotaEval, ColorEval=nota.Color
		FROM #tmpEvaluados eval
		INNER JOIN #tmpNotasEvaluadores nota
		ON RTRIM(eval.cod_emp)=RTRIM(nota.codEvaluado) COLLATE Database_Default 
		AND nota.NotaEval IS NOT NULL
		AND eval.CodRol=nota.CodRol COLLATE Database_Default 

		--select * into tmpNotasEvaluadores from #tmpNotasEvaluadores
		--para actualizar el estado de la evaluación de acuerdo 
		-- a si el campo fec_fin es nulo o no
		
		--Para evaluación personalizada
		--Se agrega la función promedio para revisar que todos los evaluadores hayan respondido
		UPDATE evaluado set EstadoEval=	(SELECT IIF(Final=1,'Finalizada','Pendiente') FROM 
			(select AVG(IIF(fec_fin IS NULL,0,1)) as Final from GTH_Eval_Estado_Pers AS per
			INNER JOIN GTH_Evalua_estado AS est 
				ON per.cod_eva=est.cod_eva COLLATE Database_Default 
				and per.consec_eva=est.consec_eva 
			RIGHT JOIN #tmpNotasEvaluadores AS nota 
			ON per.cod_emp_respond=nota.cod_emp COLLATE Database_Default
			where per.cod_emp_evado=Estado.cod_emp_evado and est.codigo=@CodEvaDesem AND per.cod_emp_evado=@CodEvaluado
			)
			AS DATOS) 
		FROM #tmpEvaluados as evaluado
		INNER JOIN GTH_Eval_Estado_Pers AS Estado
		--ON evaluado.cod_emp=Estado.cod_emp_evado 
		ON evaluado.CodigoEva=Estado.cod_eva COLLATE Database_Default
		AND Estado.cod_emp_evado=evaluado.cod_emp COLLATE Database_Default


		--para evaluación generada
		--se realiza Join con trabla de evaluadores para tener encuenta los que no 
		--han iniciado la evaluación. Para que esté finalizado todos los evaluadores
		--deben responder
		UPDATE evaluado set EstadoEval=	(SELECT IIF(Final=1,'Finalizada','Pendiente') FROM 
			(select AVG(IIF(eva.fec_fin_proc IS NULL,0,1)) as Final FROM 
					(select * from GTH_EvaDesemRespComp where cod_eva_des=@CodEvaDesem AND cod_emp_evado=Estado.cod_emp_evado ) AS eva
			RIGHT JOIN #tmpNotasEvaluadores AS nota 
			ON eva.cod_emp_evador=nota.cod_emp COLLATE Database_Default
			WHERE nota.codEvaluado=Estado.cod_emp_evado COLLATE Database_Default --AND eva.cod_emp_evado=@CodEvaluado AND nota.Proceso=@CodEvaDesem
			)
			AS DATOS) 
		FROM #tmpEvaluados as evaluado
		INNER JOIN GTH_EvaDesemRespComp AS Estado
		ON evaluado.cod_emp=Estado.cod_emp_evado COLLATE Database_Default
		AND evaluado.CodRol=Estado.cod_rol 
		AND evaluado.CodCia=Estado.cod_cia COLLATE Database_Default
		AND evaluado.CodGrupo=Estado.cod_grup_val 
		where Estado.cod_eva_des=@CodEvaDesem
		--AND evaluado.NotaEval=Estado.nota_eva
		
		--para evaluación concertada
		UPDATE evaluado set EstadoEval=IIF(Estado.fec_fin_proc IS NULL,'Pendiente','Finalizada'),
		evaluado.CodRol=Estado.cod_rol
		FROM #tmpEvaluados as evaluado
		INNER JOIN GTH_EvaDesemRespCompConc AS Estado
		ON evaluado.cod_emp=Estado.cod_emp_evado COLLATE Database_Default
		--AND evaluado.CodRol=Estado.cod_rol 
		AND evaluado.CodCia=Estado.cod_cia COLLATE Database_Default
		AND evaluado.CodGrupo=Estado.cod_grup_val
		where Estado.cod_eva_des=@CodEvaDesem

		--Ajuste para cuando el estado esté en Nulo muestre el 'Pendiente'
		UPDATE #tmpEvaluados SET EstadoEval=IIF(EstadoEval IS NULL,'Pendiente',EstadoEval)

		--Ajuste para cuando la nota sea 0.00 no la muestre
		UPDATE #tmpEvaluados SET Nota=IIF(Nota='0.00' ,'',Nota),Color=IIF(Nota='0.00' ,NULL,Color)
		UPDATE #tmpEvaluados SET NotaEval=IIF(NotaEval='0.00' ,'',NotaEval),ColorEval=IIF(NotaEval='0.00' ,NULL,ColorEval)


	IF @TipoUsuario='empleado'
		BEGIN
			--Cuando CodRol es nulo es porque es concertada y autoevaluación
			select * from #tmpEvaluados WHERE (CodRol IS NULL AND cod_emp=@CodEvaluado) OR CodRol <> '1' --1 es superior que equivale al 
		END

	IF @TipoUsuario='lider'
		BEGIN
		--Para mostrar los evaluados del lider de los grupo configurados
		--en el proceso de evalución (tabla GTH_EvaDesemGrupoEval)
			select eval.* from #tmpEvaluados AS eval
			INNER JOIN GTH_EvaDesemGrupoEval AS gruEval 
			ON eval.CodGrupo=gruEval.cod_grup_val AND eval.CodCia=gruEval.cod_cia COLLATE Database_Default 
			AND eval.proceso=gruEval.cod_eva_des COLLATE Database_Default
			WHERE  eval.cod_emp=@CodEvaluado 
			AND gruEval.cod_eva_des=@CodEvaDesem

		END

END

```
