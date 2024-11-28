# View: v_CF_AgrupacionLinea

## Usa los objetos:
- [[CF_AgrupacionLinea]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE VIEW [dbo].[v_CF_AgrupacionLinea] AS
-- =============================================
-- Control de Cambios
-- 2024|10|07 - ALEXIS - Se cambio las secciones 1393 y 1392 a la unidad de BYD (Estaban en Colision)
-- 2024|11|05 - ALEXIS - Se cambio el nombre de Mayorista Forland
-- =============================================
SELECT	 DISTINCT				 CodEmpresa			,Cod_Linea				,Linea				,Id_Linea
		,Id_Centro				,Centro				,Id_Seccion				,Seccion			,CodDepartamento		
		,Activado
FROM 
(
	SELECT	 DISTINCT			 CodEmpresa				,Cod_Linea				,Linea
			,Id_Linea			,Id_Centro				,Centro					,Id_Seccion
			,Seccion			,CodDepartamento		,Activado
	FROM (

		SELECT	 CodEmpresa					,Cod_Linea=CodUnidadNegocio			,Linea = NombreUnidadNegocio
				,Id_Linea = Sigla			,Id_Centro=CodCentro				,Centro=a.NombreCentro				
				,Id_Seccion=CodSeccion		,Seccion=NombreSeccion				,CodDepartamento					
				,Activado = 1				
		FROM (
			--Información de la tabla unidad de negocio
			SELECT	 DISTINCT				 U.CodEmpresa		,U.CodUnidadNegocio		
					,NombreUnidadNegocio = CASE WHEN Sigla = 'MAY BYD'		THEN 'MAYORISTA BYD' 
												WHEN Sigla = 'MAY MIT'		THEN 'MAYORISTA MITSUBISHI'
												WHEN Sigla = 'MAY FLD'		THEN 'MAYORISTA FORLAND'
												WHEN CodUnidadNegocio = 6	THEN 'VOLKSWAGEN'
												WHEN CodUnidadNegocio = 520 THEN 'JD WIRTGEN'
												WHEN CodUnidadNegocio = 15	THEN 'NEBULA'
												ELSE U2.NombreUnidadNegocio END
					,CodCentro				,U.NombreCentro		,U.CodSeccion			,NombreSeccion
					,U.CodDepartamento		,U.Sigla

			FROM (
				SELECT	 DISTINCT				 CodEmpresa				,CodCentro		
						,NombreCentro			,CodSeccion				,NombreSeccion		
						,CodUnidadNegocio = CASE WHEN (CodCentro = 179 AND CodSeccion = 1103) THEN 1 
												WHEN CodCentro IN (179,178) AND CodSeccion <> 1103 THEN 3
												WHEN CodSeccion IN (1276,1275,1277,1274,1273,1393,1392) THEN 245
												ELSE CodUnidadNegocio END
						,Sigla = CASE WHEN CodCentro = 179 AND CodSeccion = 1103 THEN 'DAI.C' 
									WHEN CodCentro IN (179,178) AND CodSeccion <> 1103 THEN 'DAI.V'
									WHEN CodSeccion IN (1276,1275,1277,1274,1273,1393,1392) THEN 'BYD'
									ELSE LTRIM(RTRIM(Sigla)) END
						,CodDepartamento = CASE WHEN CodCentro IN (179,178) THEN 'TC' ELSE LTRIM(RTRIM(CodDepartamento)) END
				FROM vw_UnidadDeNegocio
				WHERE CodEmpresa NOT IN (3)
			) U
			LEFT JOIN (
				SELECT DISTINCT UnidadNegocio_Requisicion, NombreUnidadNegocio_Requisicion AS NombreUnidadNegocio, CodEmpresa
				FROM vw_UnidadDeNegocio 
				WHERE CodEmpresa NOT IN (3)
			) U2 ON U2.UnidadNegocio_Requisicion = U.CodUnidadNegocio AND U.CodEmpresa = U2.CodEmpresa


			UNION ALL


			--Adición Centro de Usados que no está en Unidad de Negocios
			SELECT	 CodEmpresa = 6										,CodUnidadNegocio = '7'						,NombreUnidadNegocio='USADOS'
				,CodCentro = '95'										,NombreCentro = 'VO-B/manga-Cra 27'			,CodSeccion = '474'			
				,NombreSeccion = 'Vitrina VO Carrera 27 Bmanga.'		,CodDepartamento = 'VO'						,Sigla = 'VO'				


			UNION ALL


			--Adición de Centro Panda para evitar errores de sincronización
			SELECT	 CodEmpresa = 0												,CodUnidadNegocio = -1						,NombreUnidadNegocio = 'PANDA'
				,CodCentro = '112'												,NombreCentro = 'PA-Bta-AV 68 Panda'		,CodSeccion = '510'			
				,NombreSeccion = 'Vitrina VN Av 68 Bta. Forland&Kinglong'		,CodDepartamento = 'VN'						,Sigla = 'PANDA'			


			UNION ALL


			--Adición de JD Agricola Yerbabuena para evitar errores de sincronización
			SELECT	 CodEmpresa = 1									,CodUnidadNegocio = 410						,NombreUnidadNegocio = 'JOHN DEERE AGRÍCOLA'
					,CodCentro = '44'								,NombreCentro = 'JD-Chia-Yerbabuena'		,CodSeccion = '300'			
					,NombreSeccion = 'VN-Agr GMC Yerbabuena'		,CodDepartamento = 'VN'						,Sigla = 'JD.AGR'	
		) A
	)A


	UNION ALL 


	--Agregar la referencia sin linea para las cuentas que no se encuentran en la consulta anterior
	SELECT	 DISTINCT					 CodEmpresa=0					,Cod_Linea = '0'		,Linea				
			,Id_Linea					,Id_Centro						,Centro					,Id_Seccion			
			,Seccion					,CodDepartamento='SIN'			,Activado
	FROM CF_AgrupacionLinea
	WHERE Id_Linea = 'SIN_L'
)A

```
