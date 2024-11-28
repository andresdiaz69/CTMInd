# Stored Procedure: sp_Act_centros_sincr_CentrosMunicipios

## Usa los objetos:
- [[CentrosMunicipios]]
- [[spiga_EstructuraDeCostos]]
- [[vw_Act_centros_sincr_estrucCyTC]]

```sql
--DROP PROCEDURE sp_Act_centros_sincr_CentrosMunicipios
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_CentrosMunicipios] AS
 BEGIN
		BEGIN TRAN 
			 --Uso de begin tran para determinar si el proceso fué satisfactorio
			BEGIN TRY
			--Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
			IF OBJECT_ID('tempdb.dbo.#EmpresaCentroMunicipio', 'U')IS NOT NULL
			DROP TABLE #EmpresaCentroMunicipio
			SELECT Cod_Empresa
				  ,Cod_Centro
			INTO #EmpresaCentroMunicipio
			--Se crea la tabla TEMPORAL  #EmpresaCentroMunicipio para poder insertar los resultados de la anterior comparación
			--con el objetivo de inputarle los demás datos  de nombre empresa, nombre centro y nombre sección etc.
			FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
			WHERE Cod_empresa in (1,5,6,22,24,27)
			EXCEPT 
			--Se realiza el #Except entre [PSCService_DB].dbo.spiga_EstructuraDeCostos y dbo.CentrosMunicipios para 
			--determinar los datos que no están insertados en la tabla CentrosMunicipios.
			SELECT  CodigoEmpresa
				   ,CodigoCentro	
			FROM [DBMLC_0190].dbo.CentrosMunicipios 
			WHERE CodigoEmpresa in  (1,5,6,22,24,27) 
-----------------------------------------------------------------------------------------------------------------------
        --Creación de tabla temporal para imputar datos  
	IF OBJECT_ID('tempdb.dbo.#CentrosMunicipios2', 'U')IS NOT NULL
        DROP TABLE #CentrosMunicipios2
	 SELECT a.Cod_empresa, a.Cod_Centro, b.departamento, b.codCiudad        
          INTO #CentrosMunicipios2
          FROM #EmpresaCentroMunicipio a 
	 LEFT JOIN vw_Act_centros_sincr_estrucCyTC b ON a.Cod_empresa=b.Cod_empresa AND a.Cod_Centro=b.Cod_Centro
		--WHERE a.Cod_Centro <> 186
-----------------------------------------------------------------------------------------------------------------------
		--Merge para unir la tabla  EmpresaCentroDepartamento  y la tabla temporal para poder insertar datos  
				--SELECT * FROM #CentrosMunicipios2
				MERGE INTO [DBMLC_0190].dbo.CentrosMunicipios CM 
				USING #CentrosMunicipios2 TC
				ON CM.CodigoCentro= TC.Cod_Centro 
				AND cm.CodigoEmpresa=tc.Cod_empresa
				WHEN MATCHED THEN
				UPDATE SET
				CM.CodigoCentro=TC.Cod_Centro
				WHEN NOT MATCHED THEN
				INSERT VALUES (Cod_empresa, Cod_Centro, departamento, codCiudad );
-----------------------------------------------------------------------------------------------------------------------
      			COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--
```
