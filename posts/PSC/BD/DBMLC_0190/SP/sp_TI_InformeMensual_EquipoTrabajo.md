# Stored Procedure: sp_TI_InformeMensual_EquipoTrabajo

## Usa los objetos:
- [[EmpleadosActivos]]
- [[TI_InformeMensual_Area]]
- [[TI_InformeMensual_EquipoTrabajo]]
- [[TI_InformeMensual_EquipoTrabajo_Historico]]
- [[TI_InformesMensual_Programadores]]

```sql
CREATE PROCEDURE [dbo].[sp_TI_InformeMensual_EquipoTrabajo] 
(
	@Año INT, 
	@Mes INT
) AS
BEGIN
--DECLARE @Año INT, @Mes INT
--SET @Año = 2021
--SET @Mes = 4

SELECT DISTINCT Año=@Año, Mes=@Mes, Cedula, NombreCompleto, CodigoArea, Area
FROM
(
	SELECT Cedula, NombreCompleto,  CodigoArea = CONVERT(SMALLINT,ISNULL(CodigoArea,0)),
		CASE WHEN (CodigoArea IS NULL or CodigoArea = 0) THEN 'Sin Area' ELSE C.Area END Area
	FROM 
	(
		SELECT A.Cedula, A.NombreCompleto, CASE WHEN B.Cedula IS NOT NULL THEN B.CodigoArea ELSE A.CodigoArea END CodigoArea
		FROM 
		(
			SELECT Cedula, NombreCompleto=REPLACE(REPLACE(REPLACE(NombreCompleto,' ','<>'),'><',''),'<>',' '), 
				CASE WHEN B.CodigoArea IS NULL THEN 0 ELSE B.CodigoArea END CodigoArea
			FROM
			(
				SELECT Cedula=Cedulaprogramador, NombreCompleto=NombreProgramador
				FROM TI_InformesMensual_Programadores
				WHERE Activo = 1

				UNION ALL

				SELECT Cedula=CodigoEmpleado, NombreCompleto=Nombres+' '+Apellido1+' '+Apellido2 
				FROM EmpleadosActivos
				WHERE Ano_Periodo = @Año and Mes_Periodo = @Mes and Codigo_Cargo in (369,646,653,371,154,353) 
			) A

			LEFT JOIN TI_InformeMensual_EquipoTrabajo B ON A.Cedula = B.CodigoEmpleado
		) A

		LEFT JOIN 
		(			
			SELECT B.Año, B.Mes, A.Cedula, B.NombreCompleto, B.CodigoArea, B.Area 
			FROM
			(
				SELECT Cedula,
					(	
						SELECT TOP(1) IdRegistro FROM TI_InformeMensual_EquipoTrabajo_Historico 
						WHERE Cedula = a.Cedula AND Año = @Año AND Mes = @Mes 
						ORDER BY IdRegistro DESC) IdRegistro
				FROM TI_InformeMensual_EquipoTrabajo_Historico A
				GROUP BY Cedula
			) A

			LEFT JOIN 
			(
				SELECT * FROM
				(
					SELECT Año=@Año, Mes=@Mes, A.IdRegistro, A.Cedula, NombreCompleto=REPLACE(REPLACE(REPLACE(A.NombreCompleto,' ','<>'),'><',''),'<>',' '), 
						CodigoArea=CONVERT(SMALLINT,A.CodigoArea), B.Area
					FROM TI_InformeMensual_EquipoTrabajo_Historico A
					LEFT JOIN TI_InformeMensual_Area B ON A.CodigoArea = B.IdArea
					WHERE Año = @Año AND Mes = @Mes
				)A
			) B ON A.IdRegistro = B.IdRegistro
		) B ON A.Cedula = B.Cedula
	) A

	LEFT JOIN TI_InformeMensual_Area C ON A.CodigoArea = C.IdArea
) A
END

```
