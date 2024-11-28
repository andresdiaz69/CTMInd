# Stored Procedure: sp_Requisiciones_UnidadNegocio

## Usa los objetos:
- [[Requisiciones_UsuariosCentros]]
- [[Requisiciones_UsuariosDepartamentos]]
- [[Requisiciones_UsuariosSecciones]]
- [[Requisiciones_UsuariosUnidadNegocio]]
- [[UnidadDeNegocio]]
- [[vw_UnidadDeNegocio]]

```sql
CREATE PROCEDURE [dbo].[sp_Requisiciones_UnidadNegocio]
(
	@UserID NVARCHAR(100), 
	@TipoUsuario NVARCHAR(50)
) AS
BEGIN

	SET NOCOUNT ON
	SET FMTONLY OFF
	--DECLARE @UserID NVARCHAR(100), @TipoUsuario NVARCHAR(50);
	--SET @UserID = '0129f1f4-b284-47be-bd43-13585f62f5ad';
	--SET @TipoUsuario = 'GENERAL';

	IF @TipoUsuario = 'JEFE'
		BEGIN 
			--Lista General
			SELECT  CodEmpresa,		NombreEmpresa,		CodUnidad,			NombreUnidad,			CodCentro,		NombreCentro,		
					CodSeccion,		NombreSeccion,		CodDepartamento,	NombreDepartamento,		CodSede,		NombreSede,
					Sigla

			INTO #TempInfoGeneral

			FROM
			(
				SELECT  CodEmpresa,		NombreEmpresa,		CodUnidad,			NombreUnidad,			CodCentro,		NombreCentro,		
						CodSeccion,		NombreSeccion,		CodDepartamento,	NombreDepartamento,		CodSede,		NombreSede,
						Sigla
				FROM 
				(
					SELECT	Unidad.CodEmpresa,			Unidad.CodCentro,				CodUnidad = Unidad.UnidadNegocio_Requisicion,	
							Unidad.NombreEmpresa,		Unidad.NombreCentro,			NombreUnidad = Unidad.NombreUnidadNegocio_Requisicion,
							Unidad.CodSeccion,			Unidad.CodDepartamento,			CodSede = Unidad.CodSedeAmbiental,				
							Unidad.NombreSeccion,		Unidad.NombreDepartamento,		NombreSede = Unidad.SedeAmbiental,
							Unidad.Sigla
 	
					FROM vw_UnidadDeNegocio AS Unidad
					INNER JOIN (
						SELECT * FROM Requisiciones_UsuariosUnidadNegocio 
						WHERE UserID = @UserID
					) AS Usuario ON Unidad.UnidadNegocio_Requisicion = Usuario.CodUnidadNegocio
	
					INNER JOIN (
						SELECT * FROM Requisiciones_UsuariosCentros
						WHERE UserID = @UserID
					) AS UsuarioCentro ON Unidad.CodCentro = UsuarioCentro.CodigoCentro

				) Unidad_2

				WHERE
					(
						SELECT COUNT(*) 
						FROM Requisiciones_UsuariosDepartamentos 
						WHERE UserID = @UserID
					) = 0 
					OR Unidad_2.CodDepartamento IN (
						SELECT DISTINCT CodDepartamento 
						FROM Requisiciones_UsuariosDepartamentos 
						WHERE UserID = @UserID
					)
			) Unidad_3

			--Lista filtrada con la sección y el resultado a retornar
			SELECT	CodEmpresa,		NombreEmpresa,		CodUnidad,			NombreUnidad,			CodCentro,		NombreCentro,		
					CodSeccion,		NombreSeccion,		CodDepartamento,	NombreDepartamento,		CodSede,		NombreSede,
					Sigla
			FROM 
			(
				--Unidades sin sección
				SELECT * FROM #TempInfoGeneral 
				WHERE CodUnidad NOT IN (
						SELECT DISTINCT UnidadNegocio_Requisicion
						FROM UnidadDeNegocio U
						INNER JOIN Requisiciones_UsuariosSecciones AS S ON U.CodSeccion = S.CodSeccion AND S.UserID = @UserID
						where UnidadNegocio_Requisicion IN (418,4,23)
					)

				UNION ALL

				--Unidades con seccion
				SELECT * 
				FROM (
					SELECT * FROM #TempInfoGeneral 
					WHERE CodUnidad IN (
							SELECT DISTINCT UnidadNegocio_Requisicion
							FROM UnidadDeNegocio U
							INNER JOIN Requisiciones_UsuariosSecciones AS S ON U.CodSeccion = S.CodSeccion AND S.UserID = @UserID
							where UnidadNegocio_Requisicion IN (418,4,23)
						)
				) Unidad

				WHERE 
					(
						SELECT COUNT(*) 
						FROM Requisiciones_UsuariosSecciones 
						WHERE UserID = @UserID
					) = 0 
					OR Unidad.CodSeccion IN (
						SELECT DISTINCT CodSeccion 
						FROM Requisiciones_UsuariosSecciones 
						WHERE UserID = @UserID
					)
			) Result
		END


	ELSE IF @TipoUsuario = 'GERENTE-LINEA'
		BEGIN 
			SELECT	CodEmpresa,		NombreEmpresa,		CodUnidad,			NombreUnidad,			CodCentro,		NombreCentro,		
					CodSeccion,		NombreSeccion,		CodDepartamento,	NombreDepartamento,		CodSede,		NombreSede,
					Sigla
			FROM 
			(
				SELECT	Unidad.CodEmpresa,			Unidad.NombreEmpresa,		CodUnidad = Unidad.UnidadNegocio_Requisicion,	
						Unidad.CodCentro,			Unidad.NombreCentro,		NombreUnidad = Unidad.NombreUnidadNegocio_Requisicion,
						Unidad.CodSeccion,			Unidad.NombreSeccion,		CodSede = Unidad.CodSedeAmbiental,				
						Unidad.NombreDepartamento,	Unidad.Sigla,				NombreSede = Unidad.SedeAmbiental,
						Unidad.CodDepartamento
	
				FROM vw_UnidadDeNegocio AS Unidad
				INNER JOIN (
					SELECT * FROM Requisiciones_UsuariosUnidadNegocio 
					WHERE UserID = @UserID
				) AS Usuario ON Unidad.UnidadNegocio_Requisicion = Usuario.CodUnidadNegocio
			) Result
		END


	ELSE IF @TipoUsuario = 'GERENTE-USC'
		BEGIN 
			SELECT	CodEmpresa,					NombreEmpresa,					CodUnidad,				NombreUnidad,			
					CodCentro,					NombreCentro,					CodSeccion,				NombreSeccion,			
					CodDepartamento,			NombreDepartamento,				CodSede,				NombreSede,				
					Sigla
			FROM 
			(
				SELECT	CodEmpresa,				CodCentro,					CodUnidad = UnidadNegocio_Requisicion,
						NombreEmpresa, 			NombreCentro,				NombreUnidad = NombreUnidadNegocio_Requisicion,
						CodSeccion,				CodDepartamento,			CodSede = CodSedeAmbiental,
						NombreSeccion,			NombreDepartamento,			NombreSede = SedeAmbiental,
						Sigla
 	
				FROM vw_UnidadDeNegocio AS Unidad
				WHERE UnidadNegocio_Requisicion = 4
			) Result
		END


	ELSE
		BEGIN
			SELECT	CodEmpresa,					NombreEmpresa,					CodUnidad,				NombreUnidad,			
					CodCentro,					NombreCentro,					CodSeccion,				NombreSeccion,			
					CodDepartamento,			NombreDepartamento,				CodSede,				NombreSede,				
					Sigla
			FROM 
			(
				SELECT	CodEmpresa,				CodCentro,					CodUnidad = UnidadNegocio_Requisicion,
						NombreEmpresa, 			NombreCentro,				NombreUnidad = NombreUnidadNegocio_Requisicion,
						CodSeccion,				CodDepartamento,			CodSede = CodSedeAmbiental,
						NombreSeccion,			NombreDepartamento,			NombreSede = SedeAmbiental,
						Sigla
				FROM vw_UnidadDeNegocio
			) Result
		END

END

```
