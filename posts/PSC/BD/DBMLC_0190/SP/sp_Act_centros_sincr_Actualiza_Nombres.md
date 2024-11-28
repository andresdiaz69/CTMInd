# Stored Procedure: sp_Act_centros_sincr_Actualiza_Nombres

## Usa los objetos:
- [[spiga_EstructuraDeCostos]]
- [[UnidadDeNegocio]]

```sql
 --drop procedure sp_Act_centros_sincr_Actualiza_Nombres
CREATE PROCEDURE sp_Act_centros_sincr_Actualiza_Nombres
AS
BEGIN
	  BEGIN TRAN 
--	  --Uso de begin tran para determinar si el proceso fué satisfactorio
		BEGIN TRY
        --Uso de begin try para poder saber si tenemos algún error en la consulta o en la insersión 
			IF OBJECT_ID('tempdb.dbo.#UnidadDeNegocio ', 'U')IS NOT NULL
			DROP TABLE #UnidadDeNegocio 
			SELECT DISTINCT CodEmpresaEC, CodCentEC, NombCentEC, CodDeptoEC, NomDeptoEC, CodSecc, NomSecc
			INTO #UnidadDeNegocio  
			FROM(
				SELECT CodCentEC=a.Cod_Centro, NombCentEC=a.Nombre_Centro, CodDeptoEC=a.Cod_Departamento, NomDeptoEC=a.Nombre_Departamento 
					 , CodEmpresaEC=a.Cod_empresa , CodSecc=a.Cod_seccion, NomSecc=a.Nombre_Seccion 
 				FROM [PSCService_DB].dbo.spiga_EstructuraDeCostos a 
				LEFT JOIN [DBMLC_0190].DBO.UnidadDeNegocio b
				ON a.Cod_empresa=b.CodEmpresa AND a.Cod_Centro=b.CodCentro AND  a.Cod_seccion= b.CodSeccion and a.Cod_Departamento=b.CodDepartamento
				WHERE 
				a.Nombre_Centro <> b.NombreCentro OR a.Nombre_Departamento<>b.NombreDepartamento OR a.Nombre_Seccion <> b.NombreSeccion
				AND
				a.Nombre_Centro IS NOT NULL AND b.NombreCentro IS NOT NULL AND a.Cod_Departamento IS NOT NULL	 
			            )a 
   --SELECT * FROM #UnidadDeNegocio  
			  MERGE INTO [DBMLC_0190].dbo.UnidadDeNegocio a
			   USING #UnidadDeNegocio b			
			   ON  b.CodEmpresaEC = a.CodEmpresa
			   AND b.CodCentEC    = a.CodCentro
			   AND b.CodSecc      = a.Codseccion
			  WHEN MATCHED THEN 
			   UPDATE SET
			   a.NombreCentro       = b.NombCentEC
			  ,a.NombreDepartamento = b.NomDeptoEC
			  ,a.NombreSeccion      = b.NomSecc;
  
		 COMMIT
		END TRY 
		BEGIN CATCH
			ROLLBACK
		END CATCH
END
--**Creado Por Sergio Quizobony**--
```
