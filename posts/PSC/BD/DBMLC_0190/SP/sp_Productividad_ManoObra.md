# Stored Procedure: sp_Productividad_ManoObra

## Usa los objetos:
- [[EstadosEmpleado]]
- [[Periodos]]
- [[ProductividadManoObra]]

```sql
CREATE PROCEDURE [dbo].[sp_Productividad_ManoObra]  (
--DECLARE
@AñoPrimerFecha int, 
@MesesPrimeraFecha nvarchar(255), 
@AñoSegundoFecha int, 
@MesesSegundoFecha nvarchar(255)
) AS
--set @AñoPrimerFecha = 2020
--set @MesesPrimeraFecha = ',1,2,3,4,5,6,7,8,9,'
--set @AñoSegundoFecha = 0--2019
--set @MesesSegundoFecha = ''--',11,12,'

BEGIN 
SELECT DISTINCT Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,UnidadesVendidas,EstadoEmpleado
FROM 
(
	SELECT Ano_Spiga,Mes_Spiga,A.CodigoEmpresa,a.Empresa,A.CodigoUnidadNegocio,A.UnidadNegocio,A.CodigoCentro,a.Centro,
		CedulaOperario, NombreOperario = REPLACE(REPLACE(REPLACE(NombreOperario,' ','<>'),'><',''),'<>',' '), UnidadesVendidas, EstadoEmpleado 
	FROM 
	(
		SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UPPER(UnidadNegocio) AS UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,UnidadesVendidas,EstadoEmpleado 
		FROM
		(
			SELECT  p.Ano_Periodo AS Ano_Spiga,p.Mes_Periodo AS Mes_Spiga,P.CodigoEmpresa,p.Empresa,p.CodigoUnidadNegocio,p.UnidadNegocio,p.CodigoCentro,p.Centro,
				p.CedulaOperario,p.NombreOperario,p.UnidadesVendidas,est.Estado AS EstadoEmpleado
			FROM 
			(
				SELECT p.Ano_Periodo,p.Mes_Periodo,p.CodigoEmpresa,p.Empresa,p.CodigoUnidadNegocio,p.UnidadNegocio,p.CodigoCentro,p.Centro,p.CedulaOperario,
					p.NombreOperario,ISNULL(c.UnidadesVendidas,0) AS UnidadesVendidas
				FROM 
				(
					SELECT Per.Ano_Periodo,Per.Mes_Periodo,Datos.CodigoEmpresa,Datos.Empresa,Datos.CodigoUnidadNegocio,Datos.UnidadNegocio,Datos.CodigoCentro,
						Datos.Centro,Datos.CedulaOperario,Datos.NombreOperario
					FROM   dbo.Periodos AS Per
					CROSS JOIN 
					(
						SELECT DISTINCT CodigoEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario
						FROM ProductividadManoObra
						WHERE (Ano_Spiga = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesPrimeraFecha)>0) 
								OR (Ano_Spiga = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesSegundoFecha)>0)
					)AS Datos
					WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
							OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
				) AS P
		
				LEFT JOIN 
				(
					SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,Estado,UnidadesVendidas
					FROM ProductividadManoObra 
				)AS C ON P.Ano_Periodo = C.Ano_Spiga AND P.Mes_Periodo = C.Mes_Spiga AND p.CodigoEmpresa = c.CodigoEmpresa 
														AND p.CodigoCentro = c.CodigoCentro AND p.CedulaOperario = c.CedulaOperario
			) p

			INNER JOIN EstadosEmpleado as est on p.CedulaOperario = est.CodigoEmpleado AND p.Ano_Periodo = est.Año_Periodo AND p.Mes_Periodo = est.Mes_Periodo
		) Primera
	
		UNION ALL

		SELECT  Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UPPER(UnidadNegocio) AS UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,UnidadesVendidas,EstadoEmpleado = 'ACTIVO' 
		FROM 
		(
			SELECT p.Ano_Periodo AS Ano_Spiga,p.Mes_Periodo AS Mes_Spiga,p.CodigoEmpresa,p.Empresa,p.CodigoUnidadNegocio,p.UnidadNegocio,p.CodigoCentro,
				p.Centro,p.CedulaOperario,p.NombreOperario,ISNULL(c.UnidadesVendidas,0) AS UnidadesVendidas
			FROM 
			(
				SELECT Per.Ano_Periodo,Per.Mes_Periodo,Datos.CodigoEmpresa,Datos.Empresa,Datos.CodigoUnidadNegocio,Datos.UnidadNegocio,
					Datos.CodigoCentro,Datos.Centro,Datos.CedulaOperario,Datos.NombreOperario
				FROM   dbo.Periodos AS Per
				CROSS JOIN 
				(
					SELECT DISTINCT  CodigoEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario 
					FROM ProductividadManoObra
					WHERE (Ano_Spiga = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesPrimeraFecha)>0 AND CedulaOperario in (8300049938, 9002830997, 9003362494, 8600190638, 86000000))
						OR (Ano_Spiga = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesSegundoFecha)>0 AND CedulaOperario in (8300049938, 9002830997, 9003362494, 8600190638, 86000000))
				)AS Datos
				WHERE (Per.Ano_Periodo = @AñoPrimerFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesPrimeraFecha)>0) 
						OR (Per.Ano_Periodo = @AñoSegundoFecha AND CHARINDEX(','+CAST(Per.Mes_Periodo AS varchar)+',',@MesesSegundoFecha)>0)
			) AS P
		
			LEFT JOIN 
			(
				SELECT Ano_Spiga,Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,Estado,UnidadesVendidas
				FROM ProductividadManoObra 
			)AS C ON P.Ano_Periodo = C.Ano_Spiga AND P.Mes_Periodo = C.Mes_Spiga AND p.CodigoEmpresa = c.CodigoEmpresa 
													AND p.CodigoCentro = c.CodigoCentro AND p.CedulaOperario = c.CedulaOperario 
		) p

		UNION ALL 

		SELECT Año_Periodo = Ano_Spiga,Mes_Periodo = Mes_Spiga,CodigoEmpresa,Empresa,CodigoUnidadNegocio,UPPER(UnidadNegocio) AS UnidadNegocio,CodigoCentro,Centro,CedulaOperario,NombreOperario,UnidadesVendidas,Estado 
		FROM ProductividadManoObra
		WHERE (Ano_Spiga = @AñoPrimerFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesPrimeraFecha)>0 AND Estado = 'INACTIVO')
			OR (Ano_Spiga = @AñoSegundoFecha AND CHARINDEX(','+CAST(Mes_Spiga AS varchar)+',',@MesesSegundoFecha)>0 AND Estado = 'INACTIVO')
	) A
) A
WHERE CodigoUnidadNegocio IS NOT NULL
END

```
