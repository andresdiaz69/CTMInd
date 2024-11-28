# Stored Procedure: sp_Requisiciones_CandidatosConRegistro

## Usa los objetos:
- [[EmpleadosActivos]]
- [[EmpleadosRetirados]]
- [[Requisiciones_DireccionCandidato]]

```sql

CREATE PROCEDURE [dbo].[sp_Requisiciones_CandidatosConRegistro]
(
	@CodEmpleado BIGINT
) AS

BEGIN 

	SET NOCOUNT ON
	SET FMTONLY OFF

	SELECT A.CodigoEmpleado,				A.Nombres,				A.Apellido1,			A.Apellido2,			A.Fecha_Nacimiento,		
			A.Fecha_Ingreso,				A.Fecha_retiro,			A.Codigo_Cargo, 		A.Nombre_Cargo,			A.Unidad_Negocio, 
			A.Nombre_Unidad_Negocio,		A.CausaRetiro,			DC.CodTipoCalle,		DC.NombreCalle,			DC.NumCalle,
			DC.Piso,						DC.Bloque,				DC.Puerta,				DC.Complemento,			DC.DireccionCompleta
	FROM 
	(
		SELECT TOP 1 * 
		FROM EmpleadosRetirados A 
		WHERE CodigoEmpleado = @CodEmpleado
			AND CodigoEmpleado NOT IN (SELECT CodigoEmpleado FROM EmpleadosActivos 
										WHERE Ano_Periodo = YEAR(GETDATE()) 
											AND Mes_Periodo = MONTH(GETDATE()) 
											AND CodigoEmpleado = @CodEmpleado)
		ORDER BY (CONVERT(NVARCHAR(50),Ano_Periodo) + '-' + CONVERT(NVARCHAR(50),Mes_Periodo)) DESC
	) A
	LEFT JOIN Requisiciones_DireccionCandidato AS DC ON DC.Cedula = CodigoEmpleado

END

```
