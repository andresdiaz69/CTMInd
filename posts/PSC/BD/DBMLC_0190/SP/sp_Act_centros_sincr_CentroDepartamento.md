# Stored Procedure: sp_Act_centros_sincr_CentroDepartamento

## Usa los objetos:
- [[spiga_EmpresaCentroDepartamento]]
- [[spiga_EstructuraDeCostos]]

```sql
---Procedimiento almacenado para conocer los datos nuevos de la base de datos  CentroDepartamento
--drop procedure sp_Act_centros_sincr_CentroDepartamento
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_CentroDepartamento]
AS
BEGIN
	BEGIN TRAN 
		 --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
		--Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
		IF OBJECT_ID('tempdb.dbo.#spiga_EmpresaCentroDepartamento', 'U')IS NOT NULL
		DROP TABLE #spiga_EmpresaCentroDepartamento
	    --Borra tabla temporal si existe para evitar que el proceso tenga algún error
		SELECT Cod_Empresa
			  ,Cod_Centro
			  ,Cod_Departamento
			  ,cod_seccion
		INTO #spiga_EmpresaCentroDepartamento
		--Se crea la tabla TEMPORAL #UnidadDeNegocio para poder insertar los resultados de la anterior comparación
		--con el objetivo de inputarle los demás datos  de nombre empresa, nombre centro y nombre sección etc.
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
		WHERE Cod_Departamento in ('TM','TC')
		AND Cod_empresa in (1,5,6,22,24,27)
		EXCEPT
		--Se realiza el #Except entre [PSCService_DB].dbo.spiga_EstructuraDeCostos y [PSCService_DB].dbo.spiga_EmpresaCentroDepartamento para 
		--determinar los datos que no están insertados en la tabla [PSCService_DB].dbo.spiga_EmpresaCentroDepartamento.
		SELECT  Cod_Empresa
			   ,Cod_Centro
			   ,Departamento
			   ,cod_seccion	   
		FROM [PSCService_DB].dbo.spiga_EmpresaCentroDepartamento
		WHERE Cod_empresa in  (1,5,6,22,24,27)
--Creación de tabla temporal para imputar datos  
		IF OBJECT_ID('tempdb.dbo.#spiga_EmpresaCentroDepartamento2', 'U')IS NOT NULL
		DROP TABLE #spiga_EmpresaCentroDepartamento2
		SELECT  ECD.Cod_empresa
				,(SELECT TOP 1  EC.Nombre_Empresa
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_empresa = ECD.Cod_empresa
				) AS Nombre_Empresa
				,ECD.Cod_Centro
				,(SELECT TOP 1  EC.Nombre_Centro
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_Centro = ECD.Cod_Centro
				) AS Nombre_Centro
				,(SELECT TOP 1  EC.Cod_Departamento
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_seccion = ECD.Cod_seccion
				) AS Departamento
				,ecd.Cod_seccion
				,(SELECT TOP 1  EC.Nombre_Seccion
				 FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos EC     
				 WHERE EC.Cod_seccion = ECD.Cod_seccion
				) AS Nombre_Seccion
	 INTO #spiga_EmpresaCentroDepartamento2
		FROM #spiga_EmpresaCentroDepartamento ECD
		--Merge para unir la tabla  EmpresaCentroDepartamento  y la tabla temporal para poder insertar datos 
				--SELECT * FROM #spiga_EmpresaCentroDepartamento2 D
				MERGE INTO [PSCService_DB].dbo.spiga_EmpresaCentroDepartamento D2
				USING #spiga_EmpresaCentroDepartamento2 D
				ON D.Cod_Empresa= D2.Cod_Empresa
				AND D.Cod_Centro=D2.Cod_Centro
				AND D.cod_seccion =D2.cod_seccion
				WHEN MATCHED THEN
				UPDATE SET
				d2.Cod_Centro=D.Cod_Centro
				WHEN NOT MATCHED THEN
				INSERT VALUES (Cod_Empresa, Nombre_Empresa,Cod_Centro,Nombre_Centro, Departamento, Cod_seccion,Nombre_Seccion);

      			COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--

 

```
