# Stored Procedure: sp_Act_centros_sincr_UnidadNegocio

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]
- [[vw_act_Costos_UnidadNegocio]]

```sql
--DROP PROCEDURE sp_Act_centros_sincr_UnidadNegocio 
CREATE PROCEDURE [dbo].[sp_Act_centros_sincr_UnidadNegocio] AS
BEGIN
	  BEGIN TRAN 
--	  --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
        ----Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 

IF OBJECT_ID('tempdb.dbo.#UnidadDeNegocio ', 'U')IS NOT NULL
DROP TABLE #UnidadDeNegocio 
    --Borra tabla temporal si existe para evitar que el proceso tenga algún error
		SELECT Cod_Empresa,Cod_Centro,cod_seccion,Cod_Departamento
		INTO #UnidadDeNegocio   
		--Se crea la tabla TEMPORAL #UnidadDeNegocio para poder insertar los resultados de la anterior comparación
		--con el objetivo de inputarle los demás datos sigla, división, código empresa, código centro etc.
		FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos 
		WHERE Cod_empresa in (1,5,6,22,24,27) and cod_seccion is not null
		EXCEPT
		--Se realiza el #Except entre [PSCService_DB].dbo.spiga_EstructuraDeCostos y [DBMLC_0190].dbo.UnidadDeNegocio para 
		--determinar los datos que no están insertados en la tabla [DBMLC_0190].dbo.UnidadDeNegocio.
		SELECT CodEmpresa
			  ,CodCentro
			  ,codseccion
			  ,CodDepartamento
		FROM [DBMLC_0190].dbo.UnidadDeNegocio
		WHERE Codempresa in  (1,5,6,22,24,27)
-------------------------------------------------------------------------------------------------
IF OBJECT_ID('tempdb.dbo.#UnidadDeNegocio2', 'U')IS NOT NULL
		DROP TABLE #UnidadDeNegocio2 

		SELECT a.Cod_empresa, a.Cod_Centro, b.Nombre_Centro, a.Cod_seccion, b.Nombre_Seccion, a.Cod_Departamento, b.Nombre_Departamento, b.codUN, b.NombreUnidadNe
		      , b.Sigla , b.Division, b.CodSedeAmbiental, b.SedeAmbiental, b.CodSedeDistCol, b.SedeDistribucionColision, b.UnidadNegocio_Requisicion, b.NombreUnidadNegocio_Requisicion
		INTO #UnidadDeNegocio2 
		FROM  #UnidadDeNegocio a	
		LEFT JOIN vw_act_Costos_UnidadNegocio b on a.Cod_empresa=b.Cod_empresa AND a.Cod_Centro=b.Cod_Centro AND a.Cod_seccion=b.Cod_seccion  
		WHERE a.Cod_Centro <> 186
-------------------------------------------------------------------------
   --SELECT * FROM #UnidadDeNegocio2
   			MERGE INTO [DBMLC_0190].dbo.UnidadDeNegocio CC
				USING #UnidadDeNegocio2 CC2				
				ON CC.CodCentro = CC2.Cod_Centro
				AND CC.CodSeccion=CC2.Cod_seccion
				WHEN MATCHED THEN
				UPDATE SET
					CC.CodCentro=CC2.Cod_Centro
				WHEN NOT MATCHED THEN
				INSERT VALUES (Cod_empresa, Cod_Centro, Nombre_Centro, Cod_seccion, Nombre_Seccion 
				               , Cod_Departamento , Nombre_Departamento , codUN, NombreUnidadNe
							   , Sigla , Division, CodSedeAmbiental , SedeAmbiental , CodSedeDistCol 
							   , SedeDistribucionColision , UnidadNegocio_Requisicion , NombreUnidadNegocio_Requisicion);
		 COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--

```
